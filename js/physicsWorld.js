const { Engine, Runner, Bodies, Composite, Constraint } = Matter;

const engine = Engine.create();
window.engine = engine;
engine.positionIterations = 6;
engine.velocityIterations = 6;

let frameBodies = [];

function rebuildFrame() {
  if (frameBodies.length) {
    Composite.remove(engine.world, frameBodies);
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const thickness = 120;

  frameBodies = [
    Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { isStatic: true }),
    Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true }),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, { isStatic: true })
  ];

  Composite.add(engine.world, frameBodies);
}

rebuildFrame();
window.addEventListener("resize", rebuildFrame);

const runner = Runner.create();
Runner.run(runner, engine);

