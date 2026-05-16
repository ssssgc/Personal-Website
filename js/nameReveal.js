const hero = document.getElementById("hero");
const name = document.getElementById("name");

hero.style.pointerEvents = "auto";
name.style.pointerEvents = "none";

let nameVisible = false;

window.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const dist = Math.sqrt(dx * dx + dy * dy);

  const appearThreshold = 230;
  const disappearThreshold = 280;

  if (dist < appearThreshold && !nameVisible) {
    nameVisible = true;

    // 🔥 强制重置为远处状态
    name.style.transition = "none";
    name.style.transform = "translate(-50%, -50%) scale(3)";
    name.style.filter = "blur(20px)";
    name.style.opacity = 0;

    // 💥 强制浏览器reflow（关键！）
    name.offsetHeight;

    // 恢复动画
    name.style.transition = "all 1.3s cubic-bezier(0.2, 0.8, 0.2, 1)";

    requestAnimationFrame(() => {
      name.style.transform = "translate(-50%, -50%) scale(1)";
      name.style.filter = "blur(0px)";
      name.style.opacity = 1;
    });
  }

  if (dist > disappearThreshold && nameVisible) {
    nameVisible = false;
    name.style.transition = "all 2s cubic-bezier(0.2, 0.8, 0.2, 1)";
    name.style.transform = "translate(-50%, -50%) scale(0.2)";
    name.style.filter = "blur(20px)";
    name.style.opacity = 0;
  }
});

name.addEventListener("mouseenter", () => {
  name.style.pointerEvents = "none";
});
