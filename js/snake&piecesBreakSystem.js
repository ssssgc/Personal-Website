// snakeBreakSystem.js — Snake breaking / shattered pieces system

// Piece data arrays
const greenPieceData = [
  { cx: 225, cy: 320, w: 55, h: 65 },
  { cx: 238, cy: 250, w: 55, h: 80 },
  { cx: 265, cy: 190, w: 75, h: 75 },
  { cx: 330, cy: 160, w: 85, h: 48 },
  { cx: 397, cy: 166, w: 85, h: 50 },
  { cx: 460, cy: 185, w: 85, h: 52 },
  { cx: 505, cy: 216, w: 70, h: 55 },
  { cx: 535, cy: 250, w: 65, h: 70 },
  { cx: 562, cy: 306, w: 55, h: 78 },
  { cx: 575, cy: 365, w: 50, h: 80 },
  { cx: 565, cy: 430, w: 55, h: 80 },
  { cx: 545, cy: 490, w: 65, h: 85 },
  { cx: 500, cy: 535, w: 85, h: 65 },
  { cx: 430, cy: 560, w: 95, h: 48 },
  { cx: 360, cy: 560, w: 85, h: 45 },
  { cx: 295, cy: 545, w: 85, h: 50 },
  { cx: 230, cy: 525, w: 80, h: 55 },
  { cx: 165, cy: 490, w: 82, h: 70 },
  { cx: 110, cy: 440, w: 70, h: 80 },
  { cx: 70, cy: 375, w: 65, h: 90 },
  { cx: 58, cy: 300, w: 55, h: 80 },
  { cx: 72, cy: 240, w: 60, h: 75 },
  { cx: 95, cy: 190, w: 65, h: 65 },
  { cx: 135, cy: 145, w: 80, h: 65 },
  { cx: 185, cy: 100, w: 80, h: 60 },
  { cx: 235, cy: 75, w: 85, h: 55 },
  { cx: 300, cy: 62, w: 90, h: 50 },
  { cx: 365, cy: 62, w: 90, h: 50 },
  { cx: 425, cy: 82, w: 85, h: 55 },
  { cx: 485, cy: 110, w: 75, h: 60 },
  { cx: 525, cy: 145, w: 75, h: 65 },
  { cx: 565, cy: 190, w: 70, h: 75 }
];

const whitePieceData = [
  { cx: 121, cy: 213, w: 50, h: 80 },
  { cx: 145, cy: 152, w: 60, h: 100 },
  { cx: 190, cy: 104, w: 110, h: 55 },
  { cx: 292, cy: 100, w: 115, h: 50 },
  { cx: 386, cy: 137, w: 95, h: 80 },
  { cx: 445, cy: 213, w: 80, h: 115 },
  { cx: 470, cy: 317, w: 45, h: 105 },
  { cx: 453, cy: 413, w: 65, h: 120 }
];

const redPieceData = [
  { cx: 55, cy: 72, w: 45, h: 65 },
  { cx: 90, cy: 108, w: 55, h: 55 },
  { cx: 135, cy: 134, w: 70, h: 42 },
  { cx: 190, cy: 148, w: 70, h: 34 },
  { cx: 246, cy: 142, w: 70, h: 35 },
  { cx: 300, cy: 121, w: 72, h: 45 },
  { cx: 346, cy: 82, w: 65, h: 55 },
  { cx: 382, cy: 33, w: 55, h: 65 },
  { cx: 426, cy: 24, w: 65, h: 42 },
  { cx: 474, cy: 45, w: 75, h: 45 },
  { cx: 512, cy: 72, w: 60, h: 52 },
  { cx: 543, cy: 115, w: 55, h: 65 },
  { cx: 570, cy: 179, w: 42, h: 82 },
  { cx: 570, cy: 250, w: 42, h: 82 },
  { cx: 540, cy: 320, w: 58, h: 82 },
  { cx: 500, cy: 374, w: 72, h: 68 },
  { cx: 445, cy: 407, w: 80, h: 55 },
  { cx: 370, cy: 423, w: 95, h: 38 },
  { cx: 300, cy: 416, w: 82, h: 42 },
  { cx: 244, cy: 391, w: 75, h: 60 },
  { cx: 174, cy: 362, w: 92, h: 42 },
  { cx: 110, cy: 383, w: 72, h: 65 },
  { cx: 70, cy: 430, w: 55, h: 82 },
  { cx: 56, cy: 486, w: 45, h: 92 },
  { cx: 70, cy: 536, w: 55, h: 62 },
  { cx: 104, cy: 570, w: 55, h: 42 }
];

const bluePieceData = [
  { cx: 480, cy: 237, w: 55, h: 80 },
  { cx: 461, cy: 300, w: 55, h: 65 },
  { cx: 431, cy: 343, w: 60, h: 70 },
  { cx: 380, cy: 385, w: 80, h: 55 },
  { cx: 311, cy: 403, w: 70, h: 40 },
  { cx: 251, cy: 400, w: 65, h: 45 },
  { cx: 205, cy: 379, w: 65, h: 55 },
  { cx: 167, cy: 344, w: 55, h: 60 },
  { cx: 138, cy: 304, w: 50, h: 60 },
  { cx: 129, cy: 244, w: 50, h: 75 }
];

const smashedPieceSources = Array.from({ length: 58 }, (_, index) => {
  const fileIndex = String(index + 1).padStart(4, "0");
  const layerIndex = index + 2;
  return `assets/smashed_pieces/smashed-pieces_${fileIndex}_Layer-${layerIndex}.png`;
});

const smashedPieces = smashedPieceSources.map((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.className = "smashed-piece";
  img.style.display = "none";
  document.body.appendChild(img);

  return {
    index,
    img,
    body: null,
    width: 0,
    height: 0,
    spawned: false,
    readyPromise: null,
  };
});

// shattered pieces spawn only when triggered by `explodeSnakes()` (on snake click)

// Helper canvas for contour tracing
const smashedPieceTraceCanvas = document.createElement("canvas");
const smashedPieceTraceContext = smashedPieceTraceCanvas.getContext("2d", { willReadFrequently: true });

function rotatePoint(x, y, centerX, centerY, angle) {
  const dx = x - centerX;
  const dy = y - centerY;

  return {
    x: centerX + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: centerY + dx * Math.sin(angle) + dy * Math.cos(angle)
  };
}

function createApproxPolygonVertices(width, height, seed) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const basePoints = [
    { x: 0, y: -1 },
    { x: 0.68, y: -0.72 },
    { x: 1, y: 0 },
    { x: 0.68, y: 0.74 },
    { x: 0, y: 1 },
    { x: -0.68, y: 0.72 },
    { x: -1, y: 0 },
    { x: -0.68, y: -0.74 }
  ];

  return basePoints.map((point, index) => {
    const variation = 0.92 + 0.06 * Math.sin(seed * 1.7 + index * 1.31);

    return {
      x: point.x * halfWidth * variation,
      y: point.y * halfHeight * variation
    };
  });
}

function ensureSmashedPieceLoaded(piece) {
  if (piece.readyPromise) return piece.readyPromise;

  piece.readyPromise = new Promise((resolve, reject) => {
    if (piece.img.complete && piece.img.naturalWidth) {
      resolve(piece.img);
      return;
    }

    piece.img.addEventListener("load", () => resolve(piece.img), { once: true });
    piece.img.addEventListener("error", reject, { once: true });
  });

  return piece.readyPromise;
}

function createContourVerticesFromImage(image, displayScale) {
  const naturalWidth = image.naturalWidth || image.width || 1;
  const naturalHeight = image.naturalHeight || image.height || 1;
  const traceLimit = 220;
  const traceScale = Math.min(1, traceLimit / Math.max(naturalWidth, naturalHeight));
  const traceWidth = Math.max(48, Math.round(naturalWidth * traceScale));
  const traceHeight = Math.max(48, Math.round(naturalHeight * traceScale));

  smashedPieceTraceCanvas.width = traceWidth;
  smashedPieceTraceCanvas.height = traceHeight;
  smashedPieceTraceContext.clearRect(0, 0, traceWidth, traceHeight);
  smashedPieceTraceContext.drawImage(image, 0, 0, traceWidth, traceHeight);

  let imageData;
  try {
    imageData = smashedPieceTraceContext.getImageData(0, 0, traceWidth, traceHeight).data;
  } catch (e) {
    console.warn("Canvas tainted, fallback to approx polygon", e);
    return createApproxPolygonVertices(naturalWidth * displayScale, naturalHeight * displayScale, 1);
  }
  const alphaThreshold = 12;
  let sumX = 0;
  let sumY = 0;
  let opaqueCount = 0;

  for (let y = 0; y < traceHeight; y++) {
    for (let x = 0; x < traceWidth; x++) {
      const alpha = imageData[(y * traceWidth + x) * 4 + 3];
      if (alpha > alphaThreshold) {
        sumX += x;
        sumY += y;
        opaqueCount++;
      }
    }
  }

  if (!opaqueCount) {
    return createApproxPolygonVertices(naturalWidth * displayScale, naturalHeight * displayScale, 1);
  }

  const centerX = sumX / opaqueCount;
  const centerY = sumY / opaqueCount;
  const maxRadius = Math.hypot(traceWidth, traceHeight);
  const sampledPoints = [];
  const sampleCount = 20;

  for (let i = 0; i < sampleCount; i++) {
    const angle = (Math.PI * 2 * i) / sampleCount;
    let lastHit = null;

    for (let radius = 0; radius <= maxRadius; radius += 1.5) {
      const sampleX = Math.round(centerX + Math.cos(angle) * radius);
      const sampleY = Math.round(centerY + Math.sin(angle) * radius);

      if (sampleX < 0 || sampleX >= traceWidth || sampleY < 0 || sampleY >= traceHeight) {
        break;
      }

      const alpha = imageData[(sampleY * traceWidth + sampleX) * 4 + 3];
      if (alpha > alphaThreshold) {
        lastHit = { x: sampleX, y: sampleY };
      } else if (lastHit) {
        break;
      }
    }

    if (lastHit) {
      sampledPoints.push({
        x: (lastHit.x - centerX) * (displayScale / traceScale),
        y: (lastHit.y - centerY) * (displayScale / traceScale)
      });
    }
  }

  if (sampledPoints.length < 3) {
    return createApproxPolygonVertices(naturalWidth * displayScale, naturalHeight * displayScale, 1);
  }

  return Matter.Vertices.hull(sampledPoints).map((point) => ({
    x: point.x * 0.95,
    y: point.y * 0.95
  }));
}

async function spawnSmashedPieces() {
  if (smashedPiecesSpawned) return;

  smashedPiecesSpawned = true;
  const smashedVisualScale = 0.6;
  const smashedCollisionScale = 1.296;
  smashedPieceBodies = await Promise.all(smashedPieces.map(async (piece, index) => {
    await ensureSmashedPieceLoaded(piece);

    const naturalWidth = piece.img.naturalWidth || 120;
    const naturalHeight = piece.img.naturalHeight || 120;
    const maxDimension = Math.max(naturalWidth, naturalHeight);
    const displayScale = Math.min(0.8, Math.max(0.32, 120 / maxDimension)) * smashedVisualScale;
    const displayWidth = naturalWidth * displayScale;
    const displayHeight = naturalHeight * displayScale;
    const spawnColumn = index % 8;
    const spawnRow = Math.floor(index / 8);
    const startX = 70 + (spawnColumn / 7) * (window.innerWidth - 140) + (Math.random() - 0.5) * 60;
    // spawn above the visible viewport so pieces fall into the frame
    const startY = -120 - spawnRow * 95 - Math.random() * 130;
    const contourVertices = createContourVerticesFromImage(piece.img, displayScale);
    const vertices = contourVertices.length >= 3
      ? contourVertices.map((point) => ({
          x: point.x * smashedCollisionScale,
          y: point.y * smashedCollisionScale
        }))
      : createApproxPolygonVertices(displayWidth * smashedCollisionScale, displayHeight * smashedCollisionScale, index + 1);
    const body = Matter.Bodies.fromVertices(startX, startY, [vertices], {
      restitution: 0.22,
      friction: 0.82,
      frictionAir: 0.018
    }, true);

    piece.body = body;
    piece.width = displayWidth;
    piece.height = displayHeight;
    piece.spawned = true;
    piece.img.style.display = "block";
    piece.img.style.width = `${displayWidth}px`;
    piece.img.style.height = `${displayHeight}px`;

    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 1.5,
      y: 1 + Math.random() * 2.5
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
    Matter.Composite.add(engine.world, body);

    return piece;
  }));
}

async function dropSmashedPiecesAt(x) {
  if (!smashedPiecesSpawned) return;

  const count = 10;
  const smashedVisualScale = 0.6;
  const smashedCollisionScale = 1.296;

  for (let i = 0; i < count; i++) {
    const src = smashedPieceSources[Math.floor(Math.random() * smashedPieceSources.length)];
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.className = "smashed-piece";
    img.style.display = "none";
    document.body.appendChild(img);

    const piece = {
      index: smashedPieceBodies.length,
      img,
      body: null,
      width: 0,
      height: 0,
      spawned: false,
      readyPromise: null,
    };

    await ensureSmashedPieceLoaded(piece);

    const naturalWidth = piece.img.naturalWidth || 120;
    const naturalHeight = piece.img.naturalHeight || 120;
    const maxDimension = Math.max(naturalWidth, naturalHeight);
    const displayScale = Math.min(0.8, Math.max(0.32, 120 / maxDimension)) * smashedVisualScale;
    const displayWidth = naturalWidth * displayScale;
    const displayHeight = naturalHeight * displayScale;
    const startX = x + (Math.random() - 0.5) * 80;
    const startY = -120 - Math.random() * 120;
    const contourVertices = createContourVerticesFromImage(piece.img, displayScale);
    const vertices = contourVertices.length >= 3
      ? contourVertices.map((point) => ({
          x: point.x * smashedCollisionScale,
          y: point.y * smashedCollisionScale
        }))
      : createApproxPolygonVertices(displayWidth * smashedCollisionScale, displayHeight * smashedCollisionScale, Math.random() * 1000);
    const body = Matter.Bodies.fromVertices(startX, startY, [vertices], {
      restitution: 0.22,
      friction: 0.82,
      frictionAir: 0.018
    }, true);

    piece.body = body;
    piece.width = displayWidth;
    piece.height = displayHeight;
    piece.spawned = true;
    piece.img.style.display = "block";
    piece.img.style.width = `${displayWidth}px`;
    piece.img.style.height = `${displayHeight}px`;

    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 1.5,
      y: 1 + Math.random() * 2.5
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
    Matter.Composite.add(engine.world, body);

    smashedPieceBodies.push(piece);
  }
}

function breakBlueSnake() {
  if (blueBroken) return;

  blueBroken = true;
  falling = true;
  s4.style.opacity = 0;
  snake4Pieces.style.opacity = 1;
  snake4Pieces.style.transform = "none";

  const containerRect = snake.getBoundingClientRect();
  const scale = 250 / 593.48;
  const fullCenterX = 250 / 2;
  const fullCenterY = (591.41 * scale) / 2;
  const pieceEls = [...snake4Pieces.querySelectorAll("img")];

  brokenBluePieces = bluePieceData.map((piece, i) => {
    const el = pieceEls[i];
    const originX = piece.cx * scale;
    const originY = piece.cy * scale;
    const localPoint = rotatePoint(
      originX,
      originY,
      fullCenterX,
      fullCenterY,
      blueSnakeState.angle
    );
    const body = Matter.Bodies.rectangle(
      containerRect.left + blueSnakeState.x + localPoint.x,
      containerRect.top + blueSnakeState.y + localPoint.y,
      Math.max(piece.w * scale, 18),
      Math.max(piece.h * scale, 18),
      {
        restitution: 0.35,
        friction: 0.7,
        frictionAir: 0.015
      }
    );

    el.style.transformOrigin = `${originX}px ${originY}px`;
    Matter.Body.setAngle(body, blueSnakeState.angle);
    Matter.Body.setVelocity(body, {
      x: (i - 4.5) * 1.4,
      y: -6 - Math.random() * 4
    });
    Matter.Body.setAngularVelocity(body, (i % 2 ? 1 : -1) * (0.08 + Math.random() * 0.08));
    Matter.Composite.add(engine.world, body);

    return { el, body, originX, originY };
  });
}

function breakGreenSnake() {
  if (greenBroken) return;

  greenBroken = true;
  falling = true;
  s1.style.opacity = 0;
  snake1Pieces.style.opacity = 1;
  snake1Pieces.style.transform = "none";

  const containerRect = snake.getBoundingClientRect();
  const scale = 250 / 593.48;
  const fullCenterX = 250 / 2;
  const fullCenterY = (586 * scale) / 2;
  const pieceEls = [...snake1Pieces.querySelectorAll("img")];

  brokenGreenPieces = greenPieceData.map((piece, i) => {
    const el = pieceEls[i];
    const originX = piece.cx * scale;
    const originY = piece.cy * scale;
    const localPoint = rotatePoint(
      originX,
      originY,
      fullCenterX,
      fullCenterY,
      greenSnakeState.angle
    );
    const body = Matter.Bodies.rectangle(
      containerRect.left + greenSnakeState.x + localPoint.x,
      containerRect.top + greenSnakeState.y + localPoint.y,
      Math.max(piece.w * scale, 15),
      Math.max(piece.h * scale, 15),
      {
        restitution: 0.34,
        friction: 0.72,
        frictionAir: 0.017
      }
    );

    el.style.transformOrigin = `${originX}px ${originY}px`;
    Matter.Body.setAngle(body, greenSnakeState.angle);
    Matter.Body.setVelocity(body, {
      x: (piece.cx - 300) / 44,
      y: -7 - Math.random() * 5
    });
    Matter.Composite.add(engine.world, body);

    return { el, body, originX, originY };
  });
}

function breakWhiteSnake() {
  if (whiteBroken) return;

  whiteBroken = true;
  falling = true;
  s2.style.opacity = 0;
  snake2Pieces.style.opacity = 1;
  snake2Pieces.style.transform = "none";

  const containerRect = snake.getBoundingClientRect();
  const scale = 250 / 593.48;
  const fullCenterX = 250 / 2;
  const fullCenterY = (591.41 * scale) / 2;
  const pieceEls = [...snake2Pieces.querySelectorAll("img")];

  brokenWhitePieces = whitePieceData.map((piece, i) => {
    const el = pieceEls[i];
    const originX = piece.cx * scale;
    const originY = piece.cy * scale;
    const localPoint = rotatePoint(
      originX,
      originY,
      fullCenterX,
      fullCenterY,
      whiteSnakeState.angle
    );
    const body = Matter.Bodies.rectangle(
      containerRect.left + whiteSnakeState.x + localPoint.x,
      containerRect.top + whiteSnakeState.y + localPoint.y,
      Math.max(piece.w * scale, 16),
      Math.max(piece.h * scale, 16),
      {
        restitution: 0.38,
        friction: 0.68,
        frictionAir: 0.014
      }
    );

    el.style.transformOrigin = `${originX}px ${originY}px`;
    Matter.Body.setAngle(body, whiteSnakeState.angle);
    Matter.Body.setVelocity(body, {
      x: (i - 3.5) * 1.2,
      y: -6.5 - Math.random() * 4
    });
    Matter.Body.setAngularVelocity(body, (i % 2 ? 1 : -1) * (0.08 + Math.random() * 0.1));
    Matter.Composite.add(engine.world, body);

    return { el, body, originX, originY };
  });
}

function breakRedSnake() {
  if (redBroken) return;

  redBroken = true;
  falling = true;
  s3.style.opacity = 0;
  snake3Pieces.style.opacity = 1;
  snake3Pieces.style.transform = "none";

  const containerRect = snake.getBoundingClientRect();
  const scale = 250 / 593.48;
  const fullCenterX = 250 / 2;
  const fullCenterY = (591.41 * scale) / 2;
  const pieceEls = [...snake3Pieces.querySelectorAll("img")];

  brokenRedPieces = redPieceData.map((piece, i) => {
    const el = pieceEls[i];
    const originX = piece.cx * scale;
    const originY = piece.cy * scale;
    const localPoint = rotatePoint(
      originX,
      originY,
      fullCenterX,
      fullCenterY,
      redSnakeState.angle
    );
    const body = Matter.Bodies.rectangle(
      containerRect.left + redSnakeState.x + localPoint.x,
      containerRect.top + redSnakeState.y + localPoint.y,
      Math.max(piece.w * scale, 16),
      Math.max(piece.h * scale, 16),
      {
        restitution: 0.32,
        friction: 0.75,
        frictionAir: 0.018
      }
    );

    el.style.transformOrigin = `${originX}px ${originY}px`;
    Matter.Body.setAngle(body, redSnakeState.angle);
    Matter.Body.setVelocity(body, {
      x: (piece.cx - 300) / 42,
      y: -7 - Math.random() * 5
    });
    Matter.Body.setAngularVelocity(body, (i % 2 ? 1 : -1) * (0.07 + Math.random() * 0.12));
    Matter.Composite.add(engine.world, body);

    return { el, body, originX, originY };
  });
}

function explodeSnakes() {
  breakGreenSnake();
  breakWhiteSnake();
  breakRedSnake();
  breakBlueSnake();
  snakeBreakTime = performance.now();

    setTimeout(() => {
      spawnSmashedPieces();
    }, 1000);
}

// Mac-style fake haptic system
function triggerMacClick(targetEl) {
  // 1️⃣ 瞬间压缩（click down）
  targetEl.style.transition = "none";
  targetEl.style.transform += " scale(0.96)";

  // 强制reflow
  targetEl.offsetHeight;

  // 2️⃣ 回弹（click up）
  setTimeout(() => {
    targetEl.style.transition = "transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)";
    targetEl.style.transform = targetEl.style.transform.replace(" scale(0.96)", "") + " scale(1)";
  }, 30);

  // 3️⃣ 高频震动 burst
  hapticBurst = 1;
}

// Post-frame callback — snake explosion animation logic + smash effects
setPostFrameCallback(function() {
  if (falling) {
    const containerRect = snake.getBoundingClientRect();

    brokenGreenPieces.forEach(({ el, body, originX, originY }) => {
      el.style.transform =
        `translate(${body.position.x - containerRect.left - originX}px,
                   ${body.position.y - containerRect.top - originY}px)
         rotate(${body.angle}rad)`;
    });

    brokenWhitePieces.forEach(({ el, body, originX, originY }) => {
      el.style.transform =
        `translate(${body.position.x - containerRect.left - originX}px,
                   ${body.position.y - containerRect.top - originY}px)
         rotate(${body.angle}rad)`;
    });

    brokenRedPieces.forEach(({ el, body, originX, originY }) => {
      el.style.transform =
        `translate(${body.position.x - containerRect.left - originX}px,
                   ${body.position.y - containerRect.top - originY}px)
         rotate(${body.angle}rad)`;
    });

    brokenBluePieces.forEach(({ el, body, originX, originY }) => {
      el.style.transform =
        `translate(${body.position.x - containerRect.left - originX}px,
                   ${body.position.y - containerRect.top - originY}px)
         rotate(${body.angle}rad)`;
    });
  }

  if (smashedPiecesSpawned) {
    let snakeOpacity = Math.min(window.scrollY / window.innerHeight, 1);
    snakeOpacity = snakeOpacity >= 0.79 ? Math.min(1, (snakeOpacity - 0.79) / 0.21) : 0;
    smashedPieceBodies.forEach((piece) => {
      if (!piece.body || !piece.spawned) return;

      piece.img.style.transform =
        `translate(${piece.body.position.x - piece.width / 2}px,
                   ${piece.body.position.y - piece.height / 2}px)
         rotate(${piece.body.angle}rad)`;
      piece.img.style.opacity = snakeOpacity;
    });
  }

  if (snakeBreakTime && performance.now() - snakeBreakTime > 1500) {
    const REPULSE_STRENGTH = 0.015;

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
        const jitter = 1 + (Math.random() - 0.5) * 0.3;
        const fearFactor = 1 + fear * 2;
        const force = REPULSE_STRENGTH * t * t * item.body.mass * jitter * fearFactor;
        Matter.Body.applyForce(item.body, item.body.position, {
          x: (dx / dist) * force,
          y: (dy / dist) * force
        });
      }
    });
  }
});
