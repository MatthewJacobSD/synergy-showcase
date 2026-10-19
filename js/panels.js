/* =========================================================
   PANELS
   Bubble → panel navigation with portal (clip-path) transition
   ========================================================= */
const landing = document.getElementById('landing');
const panels = {
  chambers: document.getElementById('panel-chambers'),
  journey: document.getElementById('panel-journey'),
  ai: document.getElementById('panel-ai'),
  authors: document.getElementById('panel-authors'),
  reflection: document.getElementById('panel-reflection')
};

const transitionVeil = document.getElementById('transitionVeil');
let transitionBusy = false;

function runPortalTransition(origin, callback) {
  if (transitionBusy) return;
  transitionBusy = true;

  const rect = origin
    ? origin.getBoundingClientRect()
    : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  transitionVeil.style.setProperty('--portal-x', `${x}px`);
  transitionVeil.style.setProperty('--portal-y', `${y}px`);
  transitionVeil.classList.add('is-active');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    callback();
    window.setTimeout(() => {
      transitionVeil.classList.remove('is-active');
      window.setTimeout(() => { transitionBusy = false; }, reducedMotion ? 10 : 650);
    }, reducedMotion ? 0 : 100);
  }, reducedMotion ? 0 : 380);
}

function openPanel(id, origin) {
  const panel = panels[id];
  if (!panel) return;

  runPortalTransition(origin, () => {
    landing.classList.add('is-hidden');
    Object.values(panels).forEach((p) => p.classList.remove('is-open'));
    panel.classList.add('is-open');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  });
}

function closePanels(origin) {
  runPortalTransition(origin || document.querySelector('.btn-exit'), () => {
    Object.values(panels).forEach((p) => p.classList.remove('is-open'));
    landing.classList.remove('is-hidden');
    document.body.style.overflow = '';
  });
}

document.querySelectorAll('.bubble').forEach((btn) => {
  btn.addEventListener('click', () => openPanel(btn.dataset.panel, btn));
});
document.querySelectorAll('[data-exit]').forEach((btn) => {
  btn.addEventListener('click', () => closePanels(btn));
});

/* Escape key closes panel */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanels();
});
