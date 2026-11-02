(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = matchMedia('(max-width: 760px)');
  const tablist = document.querySelector('.feature-tabs');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const panelContainer = document.querySelector('.feature-panels');
  const showcaseButton = document.querySelector('.showcase-toggle');
  const meter = document.querySelector('.showcase-meter > span');
  const introControls = document.querySelector('.intro-controls');
  const replayButton = document.querySelector('.motion-replay');
  const scene = document.querySelector('.product-scene');
  const pin = document.querySelector('.product-pin');
  const surface = document.querySelector('.product-surface');
  const workflowLines = [...document.querySelectorAll('.workflow-copyline')];
  const animations = new Set();
  let currentTab = 0;
  let panelAnimations = [];
  let introAnimations = [];
  let cycleAnimation = null;
  let autoWanted = !reducedMotion.matches;
  let featureVisible = false;
  let frameRequested = false;
  let measured = {};
  let resizeTimer;

  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  function animate(el, keyframes, options) {
    if (reducedMotion.matches || !el.animate) return null;
    const animation = el.animate(keyframes, { easing: 'cubic-bezier(.22,1,.36,1)', ...options });
    animations.add(animation);
    const cleanup = () => animations.delete(animation);
    animation.addEventListener('finish', cleanup, { once: true });
    animation.addEventListener('cancel', cleanup, { once: true });
    return animation;
  }
  function cancel(list) {
    list.forEach(animation => animation?.cancel());
    list.length = 0;
  }

  function playIntro() {
    if (reducedMotion.matches) return;
    cancel(introAnimations);
    document.querySelectorAll('.headline-line').forEach((line, i) => {
      introAnimations.push(animate(line, [
        { transform: 'translateY(115%) rotate(3deg)' },
        { transform: 'translateY(0) rotate(0)' }
      ], { duration: 1150, delay: i * 180, fill: 'backwards' }));
    });
    ['.hero-eyebrow', '.hero-description', '.hero-actions', '.hero-status', '.intro-controls'].forEach((selector, i) => {
      introAnimations.push(animate(document.querySelector(selector), [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 780, delay: i === 0 ? 0 : 360 + i * 100, fill: 'backwards' }));
    });
    introAnimations.push(animate(document.querySelector('.hero-product'), [
      { opacity: 0, translate: '0 70px' }, { opacity: 1, translate: '0 0' }
    ], { duration: 1100, delay: 600, fill: 'backwards' }));
  }
  replayButton.addEventListener('click', () => {
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    scrollTo(0, 0);
    root.style.scrollBehavior = previous;
    playIntro();
  });

  function markerPosition() {
    const tab = tabs[currentTab];
    tablist.style.setProperty('--marker-x', `${tab.offsetLeft}px`);
    tablist.style.setProperty('--marker-width', tab.offsetWidth);
  }
  function stopCycle() {
    if (cycleAnimation) {
      cycleAnimation.onfinish = null;
      cycleAnimation.cancel();
      cycleAnimation = null;
    }
    meter.style.transform = 'scaleX(0)';
  }
  function updateShowcaseButton() {
    showcaseButton.setAttribute('aria-pressed', String(autoWanted));
    showcaseButton.querySelector('.showcase-label').textContent = autoWanted ? '暂停演示' : '播放演示';
    showcaseButton.querySelector('.showcase-symbol').textContent = autoWanted ? 'Ⅱ' : '▶';
  }
  function startCycle() {
    stopCycle();
    if (!autoWanted || !featureVisible || document.hidden || reducedMotion.matches) return;
    cycleAnimation = animate(meter, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: 7500, easing: 'linear', fill: 'forwards'
    });
    if (cycleAnimation) cycleAnimation.onfinish = () => {
      selectTab((currentTab + 1) % tabs.length, { automatic: true });
      startCycle();
    };
  }
  function pauseShowcase() {
    autoWanted = false;
    stopCycle();
    updateShowcaseButton();
  }
  function selectTab(index, { user = false, moveFocus = false, motion = true } = {}) {
    const direction = index >= currentTab ? 1 : -1;
    if (user) pauseShowcase();
    cancel(panelAnimations);
    currentTab = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
      if (!selected) panels[i].querySelector('video')?.pause();
    });
    markerPosition();
    if (tablist.scrollWidth > tablist.clientWidth) {
      tablist.scrollTo({ left: Math.max(0, tabs[index].offsetLeft - tablist.clientWidth / 2 + tabs[index].offsetWidth / 2), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    if (motion && !reducedMotion.matches) {
      const panel = panels[index];
      panelAnimations.push(animate(panel.querySelector('.feature-visual'), [
        { transform: `translateX(${direction * 70}px) rotate(${direction * 2}deg) scale(.94)`, opacity: .2 },
        { transform: 'translateX(0) rotate(0) scale(1)', opacity: 1 }
      ], { duration: 850 }));
      [...panel.querySelectorAll('.feature-index, h3, .feature-story > p, .feature-points')].forEach((el, i) => {
        panelAnimations.push(animate(el, [
          { opacity: 0, transform: `translateX(${-direction * 26}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 650, delay: i * 55, fill: 'backwards' }));
      });
    }
    if (moveFocus) {
      tabs[index].focus({ preventScroll: true });
      tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  }
  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.tabIndex = 0;
  });
  tablist.hidden = false;
  selectTab(0, { motion: false });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index, { user: true }));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(next, { user: true, moveFocus: true });
    });
    tab.addEventListener('focus', pauseShowcase);
  });
  showcaseButton.addEventListener('click', () => {
    autoWanted = !autoWanted;
    updateShowcaseButton();
    if (autoWanted) startCycle(); else stopCycle();
  });

  // Keep different-length descriptions from moving the page during an automatic change.
  function measurePanels() {
    panelContainer.style.minHeight = '';
    let maxHeight = 0;
    const containerWidth = panelContainer.clientWidth;
    panels.forEach(panel => {
      const wasHidden = panel.hidden;
      const before = panel.getAttribute('style');
      panel.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:${containerWidth}px;`;
      panel.hidden = false;
      maxHeight = Math.max(maxHeight, panel.offsetHeight);
      panel.hidden = wasHidden;
      if (before === null) panel.removeAttribute('style'); else panel.setAttribute('style', before);
    });
    panelContainer.style.minHeight = `${maxHeight}px`;
  }

  document.querySelectorAll('.video-wrap').forEach(wrap => {
    const video = wrap.querySelector('video');
    const button = wrap.querySelector('.video-play');
    button.hidden = false;
    video.controls = false;
    button.addEventListener('click', async () => {
      pauseShowcase();
      video.controls = true;
      button.hidden = true;
      try { await video.play(); } catch { video.controls = true; }
    });
    video.addEventListener('play', pauseShowcase);
    video.addEventListener('error', () => {
      video.controls = true;
      button.hidden = true;
      const message = document.createElement('p');
      message.className = 'video-error';
      message.append('视频暂时无法加载，');
      const link = document.createElement('a');
      link.href = video.querySelector('source').getAttribute('src');
      link.textContent = '点这里打开视频';
      message.append(link);
      wrap.insertAdjacentElement('afterend', message);
    }, { once: true });
  });

  function measureScene() {
    const y = scrollY;
    measured = {
      start: scene.getBoundingClientRect().top + y - 80,
      range: Math.max(1, scene.offsetHeight - pin.offsetHeight),
      documentRange: Math.max(1, root.scrollHeight - innerHeight),
      lines: workflowLines.map(line => line.getBoundingClientRect().top + y)
    };
    root.style.setProperty('--product-fit', `${Math.max(260, Math.min(1024, (innerHeight - 195) * 1280 / 860))}px`);
    markerPosition();
    requestRender();
  }
  function render() {
    frameRequested = false;
    const y = scrollY;
    root.style.setProperty('--reading-progress', clamp(y / measured.documentRange));
    if (reducedMotion.matches) return;
    let progress;
    if (smallScreen.matches) {
      const rect = scene.getBoundingClientRect();
      progress = clamp((innerHeight * .88 - rect.top) / Math.max(1, innerHeight * .7));
    } else {
      progress = clamp((y - measured.start) / (measured.range * .82));
    }
    scene.style.setProperty('--scene-progress', progress);
    surface.style.transform = smallScreen.matches
      ? `perspective(1100px) translate3d(0,${(1-progress)*28}px,0) rotateX(${(1-progress)*12}deg) scale(${.88+.12*progress})`
      : `perspective(1700px) translate3d(0,${(1-progress)*38}px,0) rotateX(${(1-progress)*23}deg) rotateZ(${(1-progress)*-3}deg) scale(${.76+.24*progress})`;
    surface.style.setProperty('--reflection-x', `${45 - progress * 90}%`);
    surface.style.setProperty('--reflection-opacity', (1 - progress) * .62);
    measured.lines.forEach((top, i) => {
      const p = clamp((innerHeight * .82 - (top - y)) / (innerHeight * .38));
      workflowLines[i].style.opacity = .25 + .75 * p;
      workflowLines[i].style.transform = `translateX(${(1-p)*18}px)`;
    });
  }
  function requestRender() {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(render);
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { measurePanels(); measureScene(); }, 100);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCycle(); else startCycle();
  });

  if ('IntersectionObserver' in window) {
    const featureObserver = new IntersectionObserver(entries => {
      featureVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= .15;
      if (featureVisible) startCycle(); else stopCycle();
    }, { threshold: [0, .15, .5] });
    featureObserver.observe(panelContainer);
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        revealObserver.unobserve(el);
        if (el.matches('.workflow h2')) {
          animate(el, [{ clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-36px)' }, { clipPath: 'inset(0)', transform: 'translateX(0)' }], { duration: 1000 });
        } else if (el.matches('.case-connector > span')) {
          animate(el, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1200, delay: 250, fill: 'backwards' });
        } else if (el.matches('.download-card')) {
          animate(el, [{ transform: 'translateY(70px) scale(.92)', opacity: .35 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], { duration: 1000 });
        } else {
          const delay = el.matches('.setup-steps li') ? [...el.parentNode.children].indexOf(el) * 130 : 0;
          animate(el, [{ transform: 'translateY(42px)', opacity: .15 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 850, delay, fill: 'backwards' });
        }
      }
    }, { threshold: .15 });
    document.querySelectorAll('.section-heading, .workflow h2, .case-connector > span, .setup-steps li, .download-card').forEach(el => revealObserver.observe(el));
  }

  function configureMotion() {
    const enabled = !reducedMotion.matches;
    root.classList.toggle('motion-enabled', enabled);
    introControls.hidden = !enabled;
    showcaseButton.hidden = !enabled;
    if (!enabled) {
      animations.forEach(animation => animation.cancel());
      stopCycle();
      surface.style.removeProperty('transform');
      workflowLines.forEach(line => { line.style.opacity = ''; line.style.transform = ''; });
      autoWanted = false;
    }
    updateShowcaseButton();
    measurePanels();
    measureScene();
    if (enabled && scrollY < innerHeight * .5) playIntro();
  }
  reducedMotion.addEventListener('change', configureMotion);
  smallScreen.addEventListener('change', () => { measurePanels(); measureScene(); });
  configureMotion();
  addEventListener('load', () => { measurePanels(); measureScene(); }, { once: true });
  if (document.fonts) document.fonts.ready.then(() => { measurePanels(); measureScene(); });
})();
