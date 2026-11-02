(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 760px)');
  const root = document.documentElement;
  const nav = document.querySelector('.localnav');
  const track = document.querySelector('.gallery-track');
  const cards = [...document.querySelectorAll('.highlight-card')];
  const dots = [...document.querySelectorAll('.gallery-dots [role="tab"]')];
  const toggle = document.querySelector('.gallery-toggle');
  const rag = document.querySelector('.rag-scroll');
  const auto = document.querySelector('.automation-scroll');
  const pipeline = [...document.querySelectorAll('.pipeline > div')];
  const dialog = document.querySelector('.film-dialog');
  const film = document.querySelector('#feature-film');
  const mediaVersions = {"rag": "0e712f6ba514", "robot": "c1300eef8ce0", "setup": "82f11e5a9c8a", "templates": "940ff189385c", "automation": "c26f64f3cfb2"};
  const films = {
    rag: { title: 'RAG 知识库', image: 'xp-knowledge.png', caption: '<b>RAG 知识库。</b>检索已接入的原文与图片，回答保留来源。' },
    robot: { title: '自动配置机器人', image: 'xp-robot.png', caption: '<b>机器人。</b>检查环境、补齐配置，需要本人操作时再提示你。' },
    setup: { title: '零成本上手' },
    templates: { title: '图片模板', image: 'xp-images.png', caption: '<b>图片模板。</b>保存构图、配色与创作要求，下次继续复用。' },
    automation: { title: '自动化托管', caption: '<b>自动化。</b>配置流程与运行环境，按计划执行，回来查看结果。' }
  };
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ramp = (p, from, to) => clamp((p - from) / (to - from));
  let selected = 0;
  let automatic = !reduced.matches;
  let galleryVisible = false;
  let elapsed = 0;
  let lastTime = 0;
  let cycleFrame = 0;
  let scrollFrame = 0;
  let lastTrigger;
  let currentFilm;
  let lastDone = -1;
  let drag;
  let suppressClick = false;
  const interval = 8000;

  function positionGallery(offset = 0) {
    track.style.transform = `translate3d(${-selected * (cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap)) + offset}px,0,0)`;
  }
  function selectCard(index, focus = false, user = false) {
    if (user) setAutomatic(false);
    selected = (index + cards.length) % cards.length;
    elapsed = 0;
    root.style.setProperty('--gallery-progress', '0');
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === selected);
      card.inert = i !== selected;
      dots[i].setAttribute('aria-selected', String(i === selected));
      dots[i].tabIndex = i === selected ? 0 : -1;
    });
    positionGallery();
    if (focus) dots[selected].focus({ preventScroll: true });
  }
  function stopCycle() {
    cancelAnimationFrame(cycleFrame);
    cycleFrame = 0;
    lastTime = 0;
  }
  function tick(time) {
    cycleFrame = 0;
    if (!automatic || !galleryVisible || document.hidden || dialog.open || reduced.matches) { lastTime = 0; return; }
    if (lastTime) elapsed += Math.min(100, time - lastTime);
    lastTime = time;
    if (elapsed >= interval) selectCard(selected + 1);
    root.style.setProperty('--gallery-progress', String(elapsed / interval));
    cycleFrame = requestAnimationFrame(tick);
  }
  function resumeCycle() {
    if (!cycleFrame && automatic && galleryVisible && !document.hidden && !dialog.open && !reduced.matches) cycleFrame = requestAnimationFrame(tick);
  }
  function setAutomatic(wanted) {
    automatic = wanted;
    toggle.setAttribute('aria-pressed', String(wanted));
    toggle.setAttribute('aria-label', `${wanted ? '暂停' : '播放'}重点功能轮播`);
    if (wanted) resumeCycle(); else stopCycle();
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => selectCard(i, false, true));
    dot.addEventListener('keydown', e => {
      let index;
      if (e.key === 'ArrowRight') index = selected + 1;
      else if (e.key === 'ArrowLeft') index = selected - 1;
      else if (e.key === 'Home') index = 0;
      else if (e.key === 'End') index = cards.length - 1;
      if (index !== undefined) { e.preventDefault(); selectCard(index, true, true); }
    });
  });
  toggle.addEventListener('click', () => setAutomatic(!automatic));
  const gallery = document.querySelector('.gallery-viewport');
  gallery.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, dx: 0, horizontal: false };
  });
  gallery.addEventListener('pointermove', e => {
    if (!drag) return;
    drag.dx = e.clientX - drag.x;
    if (!drag.horizontal && Math.abs(drag.dx) > 12 && Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) {
      drag.horizontal = true;
      setAutomatic(false);
      track.style.transition = 'none';
      gallery.setPointerCapture(e.pointerId);
    }
    if (drag.horizontal) positionGallery(drag.dx * .75);
  });
  function finishDrag() {
    if (!drag) return;
    if (drag.horizontal) {
      suppressClick = true;
      track.style.transition = '';
      if (Math.abs(drag.dx) > 45) selectCard(selected + (drag.dx < 0 ? 1 : -1), false, true);
      else positionGallery();
      setTimeout(() => { suppressClick = false; }, 0);
    }
    drag = null;
  }
  gallery.addEventListener('pointerup', finishDrag);
  gallery.addEventListener('pointercancel', finishDrag);
  gallery.addEventListener('click', e => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);

  document.querySelectorAll('[data-tour]').forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.tour;
      const img = document.querySelector('.tour-screen > img');
      const jobs = document.querySelector('.tour-job-screen');
      document.querySelectorAll('[data-tour]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      img.hidden = kind === 'automation';
      jobs.hidden = kind !== 'automation';
      if (kind !== 'automation') { img.src = `./${films[kind].image}`; img.alt = `XP BOT ${films[kind].title}开发版界面`; }
      document.querySelector('.tour-caption').innerHTML = films[kind].caption;
      if (!reduced.matches) document.querySelector('.tour-screen').animate([{ opacity: .25, transform: 'scale(.97)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 550, easing: 'cubic-bezier(.2,.65,.3,1)' });
    });
  });

  function openFilm(kind, trigger) {
    if (!films[kind]) return;
    if (!dialog.open) {
      lastTrigger = trigger;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      stopCycle();
    }
    document.querySelector('#film-title').textContent = films[kind].title;
    if (currentFilm !== kind) {
      film.pause();
      film.src = `./demo-${kind}.mp4?v=${mediaVersions[kind]}`;
      film.poster = `./poster-${kind}.jpg?v=${mediaVersions[kind]}`;
      film.setAttribute('aria-label', `${films[kind].title}功能流程演示`);
      currentFilm = kind;
      film.load();
    }
    document.querySelectorAll('.film-picker [data-film]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.film === kind)));
    film.play().catch(() => {});
  }
  document.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => openFilm(button.dataset.film, button)));
  document.querySelector('.film-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    film.pause();
    document.body.style.overflow = '';
    lastTrigger?.focus({ preventScroll: true });
    resumeCycle();
  });
  film.addEventListener('error', () => {
    const existing = dialog.querySelector('.film-error');
    if (existing) existing.remove();
    const message = document.createElement('p');
    message.className = 'film-error';
    const link = document.createElement('a');
    link.href = `./demo-${currentFilm}.mp4?v=${mediaVersions[currentFilm]}`;
    link.textContent = '视频暂时无法播放，点此直接打开。';
    message.append(link);
    film.insertAdjacentElement('afterend', message);
  });

  function scrollProgress(el, top) {
    const rect = el.getBoundingClientRect();
    return clamp((top - rect.top) / Math.max(1, rect.height - (innerHeight - top)));
  }
  function renderScroll() {
    scrollFrame = 0;
    const visible = scrollY > 50;
    nav.classList.toggle('is-visible', visible);
    nav.inert = !visible;
    nav.setAttribute('aria-hidden', String(!visible));
    if (reduced.matches) {
      pipeline.forEach(el => { el.classList.add('is-done'); el.querySelector('.pipeline-status').textContent = '按配置执行'; });
      return;
    }
    const top = narrow.matches ? 60 : 66;
    const p = scrollProgress(rag, top);
    const ragStyles = {
      '--rag-scale': narrow.matches ? .9 + .15 * ramp(p, 0, .72) : .78 + .34 * ramp(p, 0, .35) + .55 * ramp(p, .6, .85),
      '--rag-real-opacity': 1 - ramp(p, .07, .2),
      '--rag-demo-opacity': ramp(p, .07, .2),
      '--rag-query-opacity': ramp(p, .13, .23),
      '--rag-sources-opacity': ramp(p, .22, .3) * (1 - ramp(p, .5, .58)),
      '--rag-answer-opacity': ramp(p, .53, .64),
      '--rag-camera-opacity': 1 - ramp(p, .75, .86),
      '--rag-summary-opacity': ramp(p, .79, .91)
    };
    Object.entries(ragStyles).forEach(([key, value]) => rag.style.setProperty(key, value));
    document.querySelectorAll('.source-card').forEach((source, i) => {
      const v = ramp(p, .25 + i * .055, .32 + i * .055);
      source.style.setProperty('--source-opacity', v);
      source.style.setProperty('--source-y', `${(1 - v) * 20}px`);
    });
    const a = scrollProgress(auto, top);
    auto.style.setProperty('--manual-opacity', 1 - .6 * ramp(a, .1, .65));
    const done = Math.min(4, Math.floor(ramp(a, .08, .82) * 4.99));
    if (done !== lastDone) {
      lastDone = done;
      pipeline.forEach((step, i) => {
        step.classList.toggle('is-done', i < done);
        step.querySelector('.pipeline-status').textContent = i < done ? '示例 · 已完成' : '等待执行';
      });
      document.querySelector('.execution-status').textContent = done === 0 ? '一次配置，按计划执行。' : done === 4 ? '示例流程完成，回来查看成果。' : `示例流程 · ${['采集中','整理中','生成中','交付中'][done - 1]}`;
    }
  }
  function requestScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll); }
  addEventListener('scroll', requestScroll, { passive: true });
  addEventListener('resize', () => { positionGallery(); requestScroll(); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopCycle(); film.pause(); } else resumeCycle();
  });
  new IntersectionObserver(entries => {
    galleryVisible = entries[0].isIntersecting && entries[0].intersectionRatio > .2;
    if (galleryVisible) resumeCycle(); else stopCycle();
  }, { threshold: [0, .2, .6] }).observe(gallery);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reduced.matches) return;
        if (entry.target.matches('.robot-checks')) {
          entry.target.querySelectorAll('div').forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(15px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: i * 180, easing: 'ease', fill: 'backwards' }));
        } else if (entry.target.matches('.template-rules')) {
          entry.target.animate([{ transform: 'translateX(35px)', opacity: .3 }, { transform: 'translateX(0)', opacity: 1 }], { duration: 1000, easing: 'cubic-bezier(.2,.65,.3,1)' });
        }
      });
    }, { threshold: .25 });
    document.querySelectorAll('.robot-checks,.template-rules').forEach(el => observer.observe(el));
  }
  reduced.addEventListener('change', () => {
    setAutomatic(false);
    if (reduced.matches) document.getAnimations().forEach(a => a.cancel());
    lastDone = -1;
    requestScroll();
  });
  selectCard(0);
  setAutomatic(automatic);
  renderScroll();
})();
