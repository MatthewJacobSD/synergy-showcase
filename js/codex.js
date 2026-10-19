/* =========================================================
   AUTHORS CODEX
   Side tabs swap content pages and update the left-page seal
   ========================================================= */
const tabs = document.querySelectorAll('.book-tab');
const contentPanels = document.querySelectorAll('.content-panel');
const sealTitle = document.getElementById('sealTitle');
const sealSub = document.getElementById('sealSub');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    contentPanels.forEach((panel) => {
      const match = panel.id === 'panel-' + id;
      panel.classList.toggle('active', match);
      if (match) {
        sealTitle.textContent = panel.dataset.sealTitle;
        sealSub.textContent = panel.dataset.sealSub;
      }
    });
  });
});
