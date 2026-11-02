(() => {
  'use strict';
  const tablist = document.querySelector('.feature-tabs');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function selectTab(index, moveFocus = false) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
      panels[i].classList.remove('panel-enter');
    });
    if (!reducedMotion.matches) panels[index].classList.add('panel-enter');
    if (moveFocus) tabs[index].focus();
  }
  // With no JavaScript, all three stories remain visible and readable.
  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.tabIndex = 0;
  });
  tablist.hidden = false;
  selectTab(0);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(next, true);
    });
  });
  document.querySelectorAll('figure img').forEach(img => {
    img.addEventListener('error', () => {
      const note = document.createElement('p');
      note.className = 'media-unavailable';
      note.textContent = '界面图片暂时未能加载，请刷新页面重试。';
      img.replaceWith(note);
    }, { once: true });
  });
})();
