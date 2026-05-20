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
