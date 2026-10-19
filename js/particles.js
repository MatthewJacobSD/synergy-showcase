/* =========================================================
   LANGUAGE PARTICLES
   Drifting glyphs from many writing systems, spawned randomly
   ========================================================= */
const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZaeiouäöüßøåéèàçñяжあか中文تب'.split('');
const box = document.getElementById('particles');
for (let i = 0; i < 32; i++) {
  const s = document.createElement('span');
  s.className = 'particle';
  s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = (18 + Math.random() * 22) + 's';
  s.style.animationDelay = (Math.random() * -30) + 's';
  s.style.fontSize = (0.85 + Math.random() * 1.2) + 'rem';
  box.appendChild(s);
}
