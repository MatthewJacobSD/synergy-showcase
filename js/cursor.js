/* =========================================================
   CUSTOM CURSOR
   Ring follows instantly, gold dot eases behind it.
   Disabled on touch / coarse pointers.
   ========================================================= */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;

const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (hasFinePointer) {
  document.body.classList.add('has-custom-cursor');
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
} else {
  cursor.hidden = true;
  cursorDot.hidden = true;
}
(function animateDot() {
  dotX += (mouseX - dotX) * 0.22;
  dotY += (mouseY - dotY) * 0.22;
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  requestAnimationFrame(animateDot);
})();

document.querySelectorAll('a, button, .bubble, .chamber, .paper-sheet, .book-tab').forEach((el) => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
