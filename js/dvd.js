const dvd = document.getElementById("dvd");

let x = 100, y = 100, vx = 2.5, vy = 2;

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

function moveDVD() {
  if (!window.__lastDVDTime) window.__lastDVDTime = performance.now();
  const now = performance.now();
  const deltaSec = Math.min(0.05, (now - window.__lastDVDTime) / 1000);
  window.__lastDVDTime = now;

  x += vx * 60 * deltaSec;
  y += vy * 60 * deltaSec;

  if (x <= 0 || x + dvd.offsetWidth >= window.innerWidth) {
    vx *= -1;
    dvd.style.color = randomColor();
  }

  if (y <= 0 || y + dvd.offsetHeight >= window.innerHeight) {
    vy *= -1;
    dvd.style.color = randomColor();
  }

  dvd.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(moveDVD);
}
moveDVD();
