// Cursor field elements
const cursorAura = document.getElementById("cursorAura");
const cursorAuraSecondary = document.getElementById("cursorAuraSecondary");
const hoverRangeDebug = document.getElementById("hoverRangeDebug");

// Shared state — used by snakeSystem.js, snakeBreakSystem.js, and inline scripts
let falling = false;
let greenBroken = false;
let whiteBroken = false;
let redBroken = false;
let blueBroken = false;

let brokenGreenPieces = [];
let brokenWhitePieces = [];
let brokenRedPieces = [];
let brokenBluePieces = [];
let smashedPieceBodies = [];
let smashedPiecesSpawned = false;
let snakeBreakTime = 0;

// Cursor field state
let auraX = window.innerWidth / 2;
let auraY = window.innerHeight / 2;
let clickPulse = 0;
const REPULSE_RADIUS = 150;
let fear = 0;
let targetFear = 0;
let lastMouse = { x: -9999, y: -9999 };
let chasing = false;
let locked = false;
let chaseStartTime = 0;
const CHASE_RADIUS = 300;
let lastAuraTime = performance.now();

// Activation progress — 0→1 over 2000ms after snakeBreakTime is set
function getActivationProgress() {
  if (!snakeBreakTime) return 0;
  return Math.min(1, (performance.now() - snakeBreakTime) / 2000);
}

// Track cursor for repulsion and proximity
window.addEventListener("mousemove", (e) => {
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
});

function isSnakePage() {
  return window.scrollY / window.innerHeight >= 0.79;
}

window.addEventListener("click", (e) => {
  spawnRipple(e.clientX, e.clientY);
  if (isSnakePage() && typeof smashedPiecesSpawned !== 'undefined' && smashedPiecesSpawned) {
    if (typeof dropSmashedPiecesAt === 'function') dropSmashedPiecesAt(e.clientX);
  }
  clickPulse = 1;
});

// Called from animateSnake each frame
function updateCursorField(snakeCenterX, snakeCenterY, snakeOpacity) {
  // Position the hover debug indicator at the snake center
  hoverRangeDebug.style.left = `${snakeCenterX}px`;
  hoverRangeDebug.style.top = `${snakeCenterY}px`;
  hoverRangeDebug.style.opacity = snakeOpacity;

  // Fear system — proximity-based snake reaction
  const dx = lastMouse.x - snakeCenterX;
  const dy = lastMouse.y - snakeCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const hoverRadius = 250 * 1.5;
  const proximity = Math.max(0, 1 - distance / hoverRadius);
  targetFear = proximity * proximity;
  fear += (targetFear - fear) * 0.12;
  const jitter = fear * fear;
  const activationProgress = getActivationProgress();

  // Repulsion — push physics bodies away from cursor
  if (typeof snakeBreakTime !== 'undefined' && snakeBreakTime) {
    const REPULSE_STRENGTH = 0.010 * activationProgress;
    const allBodies = [
      ...brokenGreenPieces,
      ...brokenWhitePieces,
      ...brokenRedPieces,
      ...brokenBluePieces,
      ...(smashedPiecesSpawned ? smashedPieceBodies : [])
    ];
    allBodies.forEach(item => {
      if (!item.body) return;
      const dx = item.body.position.x - lastMouse.x;
      const dy = item.body.position.y - lastMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSE_RADIUS && dist > 1) {
        const t = 1 - dist / REPULSE_RADIUS;
        const rJitter = 1 + (Math.random() - 0.5) * 0.3;
        const fearFactor = 1 + fear * 2;
        const force = REPULSE_STRENGTH * t * t * item.body.mass * rJitter * fearFactor;
        Matter.Body.applyForce(item.body, item.body.position, {
          x: (dx / dist) * force,
          y: (dy / dist) * force
        });
      }
    });
  }

  // Cursor aura — chase mouse when within range, then lock
  const now = performance.now();
  const deltaSec = Math.min(0.05, (now - lastAuraTime) / 1000);
  lastAuraTime = now;

  if (locked) {
    auraX = lastMouse.x;
    auraY = lastMouse.y;
  } else {
    const dx = lastMouse.x - auraX;
    const dy = lastMouse.y - auraY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (!chasing && dist <= CHASE_RADIUS) { chasing = true; chaseStartTime = performance.now(); }
    if (chasing) {
      const elapsed = (performance.now() - chaseStartTime) / 1000;
      const speed = Math.min(700, 450 + elapsed * 200);
      const step = speed * deltaSec;
      if (dist <= step) {
        locked = true; chaseStartTime = 0;
        auraX = lastMouse.x;
        auraY = lastMouse.y;
      } else {
        auraX += (dx / dist) * step;
        auraY += (dy / dist) * step;
      }
    }
  }
  const breath = 0.5 + 0.5 * Math.sin(performance.now() * 0.0012);
  let opacity = 0.2 + breath * 0.15;
  let scale = 1;
  clickPulse *= 0.85;
  if (clickPulse > 0.001) {
    opacity += clickPulse * 0.1;
    scale = 1 + clickPulse * 0.35;
  }
  cursorAura.style.opacity = opacity;
  cursorAura.style.transform =
    `translate(${auraX}px, ${auraY}px) translate(-50%, -50%) scale(${scale})`;

  return jitter;
}

// Ripple on click — soft expanding ring
function spawnRipple(x, y) {
  const size = 80;
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ripple = document.createElement('div');
      ripple.className = 'aura-ripple';
      ripple.style.left = (x - size / 2) + 'px';
      ripple.style.top = (y - size / 2) + 'px';
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }, i * 90);
  }
}
