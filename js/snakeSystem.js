// snakeSystem.js — Continuous snake animation (transforms, wobble, fear, hover)

let hapticBurst = 0;
let t = 0;
let lastFrameTime = performance.now();
const tPerSecond = 0.03 * 80;

// Snake state objects (read by break functions in index.html)
let greenSnakeState = { x: -200, y: -170, angle: 0 };
let whiteSnakeState = { x: -150, y: -140, angle: 0 };
let redSnakeState = { x: -190, y: -170, angle: 0 };
let blueSnakeState = { x: -180, y: -125, angle: 0 };

// Callbacks for per-frame rendering
let _postFrameCallbacks = [];
function setPostFrameCallback(cb) {
  _postFrameCallbacks.push(cb);
}

function animateSnake(now = performance.now()) {
  try {
    const deltaSec = Math.min(0.05, (now - lastFrameTime) / 1000);
    lastFrameTime = now;
    t += deltaSec * tPerSecond;

    hapticBurst *= 0.85;

    const snakeRect = snake.getBoundingClientRect();
    const snakeCenterX = snakeRect.left - 55;
    const snakeCenterY = snakeRect.top - 27;
    const dx = lastMouse.x - snakeCenterX;
    const dy = lastMouse.y - snakeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hoverRadius = 250 * 1.5;
    const proximity = Math.max(0, 1 - distance / hoverRadius);
    const jitter = fear * fear;
    const burstX = (Math.random() - 0.5) * 100 * hapticBurst;
    const burstY = (Math.random() - 0.5) * 100 * hapticBurst;

    hoverRangeDebug.style.left = `${snakeCenterX}px`;
    hoverRangeDebug.style.top = `${snakeCenterY}px`;
    hoverRangeDebug.style.opacity = snake.style.opacity;

    targetFear = proximity * proximity;
    fear += (targetFear - fear) * 0.12;

    const hoverSwing = 1 + fear * 3;

    greenSnakeState = {
      x: -200, y: -170,
      angle: (Math.sin(t * 1.2) * 6 * hoverSwing) * Math.PI / 180
    };
    const greenJitterX = Math.sin(t * 18.0) * 1.8 * jitter;
    const greenJitterY = Math.cos(t * 21.0) * 1.4 * jitter;
    const greenJitterR = Math.sin(t * 24.0) * 0.9 * jitter;
    const greenSnakeTransform =
      `translate(${-200 + greenJitterX + burstX}px, ${-170 + greenJitterY + burstY}px)
       rotate(${Math.sin(t * 1.2) * 6 * hoverSwing + greenJitterR}deg)`;
    if (!greenBroken) {
      s1.style.transform = greenSnakeTransform;
      snake1Pieces.style.transform = greenSnakeTransform;
    }

    whiteSnakeState = {
      x: -150, y: -140,
      angle: (Math.sin(t * 1.6) * 4 * hoverSwing) * Math.PI / 180
    };
    const whiteJitterX = Math.sin(t * 19.0 + 1.7) * 1.6 * jitter;
    const whiteJitterY = Math.cos(t * 23.0 + 0.9) * 1.2 * jitter;
    const whiteJitterR = Math.sin(t * 27.0 + 0.4) * 0.8 * jitter;
    const whiteSnakeTransform =
      `translate(${-150 + whiteJitterX + burstX}px, ${-140 + whiteJitterY + burstY}px)
       rotate(${Math.sin(t * 1.6) * 4 * hoverSwing + whiteJitterR}deg)`;
    if (!whiteBroken) {
      s2.style.transform = whiteSnakeTransform;
      snake2Pieces.style.transform = whiteSnakeTransform;
    }

    redSnakeState = {
      x: -190, y: -170,
      angle: (Math.sin(t * 1.0) * 8 * hoverSwing) * Math.PI / 180
    };
    const redJitterX = Math.sin(t * 17.0 + 2.4) * 1.9 * jitter;
    const redJitterY = Math.cos(t * 20.0 + 1.1) * 1.5 * jitter;
    const redJitterR = Math.sin(t * 22.0 + 0.8) * 1.0 * jitter;
    const redSnakeTransform =
      `translate(${-190 + redJitterX + burstX}px, ${-170 + redJitterY + burstY}px)
       rotate(${Math.sin(t * 1.0) * 8 * hoverSwing + redJitterR}deg)`;
    if (!redBroken) {
      s3.style.transform = redSnakeTransform;
      snake3Pieces.style.transform = redSnakeTransform;
    }

    blueSnakeState = {
      x: -180, y: -125,
      angle: (Math.sin(t * 1.4) * 6 * hoverSwing) * Math.PI / 180
    };
    const blueJitterX = Math.sin(t * 21.0 + 0.6) * 1.7 * jitter;
    const blueJitterY = Math.cos(t * 25.0 + 2.0) * 1.3 * jitter;
    const blueJitterR = Math.sin(t * 29.0 + 1.2) * 0.85 * jitter;
    const blueSnakeTransform =
      `translate(${-180 + blueJitterX + burstX}px, ${-125 + blueJitterY + burstY}px)
       rotate(${Math.sin(t * 1.4) * 6 * hoverSwing + blueJitterR}deg)`;
    if (!blueBroken) {
      s4.style.transform = blueSnakeTransform;
      snake4Pieces.style.transform = blueSnakeTransform;
    }

    _postFrameCallbacks.forEach(cb => cb());
  } catch (e) {
    console.warn('animateSnake() error:', e);
  }
  requestAnimationFrame(animateSnake);
}

requestAnimationFrame(animateSnake);
