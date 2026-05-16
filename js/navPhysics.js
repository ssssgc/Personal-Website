let navTriangleBodies = [];

function createNavTriangleBodies() {
  if (navTriangleBodies.length) {
    Matter.Composite.remove(window.engine.world, navTriangleBodies);
    navTriangleBodies = [];
  }

  const links = document.querySelectorAll('#nav a.nav-link');
  const w = 160;
  const h = 100;
  const halfW = w / 2;

  links.forEach((link, i) => {
    const rect = link.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const elemX = cx - halfW;
    const offsets = [-16, -27, -16];
    const offsetY = offsets[i] || 0;
    const elemY = cy - h * 0.6;

    let vertices;
    if (i === 1) {
      vertices = [
        { x: elemX, y: elemY },
        { x: elemX + w, y: elemY },
        { x: elemX + halfW, y: elemY + h }
      ];
    } else {
      vertices = [
        { x: elemX + halfW, y: elemY },
        { x: elemX, y: elemY + h },
        { x: elemX + w, y: elemY + h }
      ];
    }

    const triCx = (vertices[0].x + vertices[1].x + vertices[2].x) / 3;
    const triCy = (vertices[0].y + vertices[1].y + vertices[2].y) / 3;
    vertices = vertices.map(v => ({
      x: triCx + (v.x - triCx) * 1,
      y: triCy + (v.y - triCy) * 1
    }));

    const body = Matter.Bodies.fromVertices(cx, cy + offsetY, [vertices], {
      isStatic: true,
      restitution: 0.3,
      friction: 0.8
    });

    navTriangleBodies.push(body);
  });

  Matter.Composite.add(window.engine.world, navTriangleBodies);
}

window.addEventListener("resize", createNavTriangleBodies);
