const { Engine, Render, Runner, Bodies, Composite, Constraint } = Matter;

const engine = Engine.create();
window.engine = engine;
engine.positionIterations = 6;
engine.velocityIterations = 6;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: true,
    background: 'transparent'
  }
});
render.canvas.style.position = "fixed";
render.canvas.style.left = "0";
render.canvas.style.top = "0";
render.canvas.style.pointerEvents = "none";
render.canvas.style.zIndex = "1";

render.options.wireframeStrokeStyle = '#00ff00';

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

  render.canvas.width = width;
  render.canvas.height = height;
  render.canvas.style.width = `${width}px`;
  render.canvas.style.height = `${height}px`;
  render.options.width = width;
  render.options.height = height;
}

rebuildFrame();
window.addEventListener("resize", rebuildFrame);

const runner = Runner.create();
Runner.run(runner, engine);

