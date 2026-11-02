(() => {
  'use strict';
  const CASES = [
  {
    "id": "warning",
    "name": "大店预警监管",
    "category": "监测与提醒",
    "headline": "把待出库监管，串成完整流程。",
    "desc": "读取待出库记录，核对页面总数与抓取结果，再按类目和商家汇总。报告先生成，通知按已配置的授权规则处理。",
    "steps": [
      "读取记录",
      "总量对账",
      "分类汇总",
      "生成交付"
    ],
    "outputs": [
      "分类 Excel",
      "监管总览",
      "执行记录"
    ],
    "note": "既有项目包含按时执行、异常重试与回执核对，支持核对通知内容与执行记录。"
  },
  {
    "id": "mapping",
    "name": "大店对应表",
    "category": "资料维护",
    "headline": "维护主表，也把检查做完整。",
    "desc": "从导出数据、关联商家、核对重复 SKU，到生成候选表、写后回读和维护报告。每轮沿用已有规则，减少从头整理。",
    "steps": [
      "导出数据",
      "匹配与查重",
      "验收候选",
      "写后回读"
    ],
    "outputs": [
      "候选主表",
      "变更明细",
      "维护报告"
    ],
    "note": "以当前表和本轮导出为依据，保留历史基线与回读结果。"
  },
  {
    "id": "newproduct",
    "name": "新品表，上新全流程",
    "category": "新品跟进",
    "headline": "从供应商报价，接着往下办。",
    "desc": "整理报价与规格，计算暂定价，补齐商家、图片和商品入口，再登记到新品跟进表。把零散信息放回同一条工作线索。",
    "steps": [
      "整理报价",
      "核对规格",
      "补齐资料",
      "登记跟进"
    ],
    "outputs": [
      "新品跟进表",
      "规格与价格",
      "商品入口"
    ],
    "note": "登记跟进与实际上架、改价分开处理；线上变更按具体任务授权执行。"
  },
  {
    "id": "materials",
    "name": "大店商品素材巡检",
    "category": "商品运营",
    "headline": "找到缺口，补齐，再复查。",
    "desc": "巡检卖点文本、场景图、透明图等素材，整理待补项，按要求准备素材与导入文件。提交之后，再核对结果和驳回项。",
    "steps": [
      "扫描缺口",
      "准备素材",
      "组织导入",
      "复查结果"
    ],
    "outputs": [
      "素材巡检表",
      "图片与卖点",
      "结果清单"
    ],
    "note": "已有流程已整理成可复用技能；图片生成、素材准备和平台验收是不同环节。"
  },
  {
    "id": "tagging",
    "name": "大店自动化新品打标",
    "category": "规则与表格",
    "headline": "识别新品，准备一整套打标材料。",
    "desc": "复用历史数据与既有处理规则，整理新品清单、校验日期和重复记录，生成用于后续打标的表格与材料。",
    "steps": [
      "读取数据",
      "核对历史",
      "整理新品",
      "生成材料"
    ],
    "outputs": [
      "新品清单",
      "打标材料",
      "校验记录"
    ],
    "note": "沿用真实项目的历史基线与规则，避免重复整理、漏项和重复打标。"
  },
  {
    "id": "aftersale",
    "name": "拉取京麦近30天售后明细",
    "category": "数据与分析",
    "headline": "从导出明细，到看清问题。",
    "desc": "设置近30天范围，核对日期和导出任务，校验原始行数与服务单号，再按约定口径生成商家、商品排名和分析文件。",
    "steps": [
      "设置范围",
      "导出与校验",
      "按口径分析",
      "交付 Excel"
    ],
    "outputs": [
      "原始明细",
      "商家与商品排名",
      "口径说明"
    ],
    "note": "历史记录：首次搭建及排查约34分钟；复用流程目标为2–4分钟，另计平台等待，并非每次实测保证。"
  },
  {
    "id": "robotdev",
    "name": "机器人开发",
    "category": "工具接入",
    "headline": "一句需求，进入配置流程。",
    "desc": "检测现有状态，打开必要页面，指引本人登录和创建应用。能自动处理的配置由助手完成，测试消息在明确授权后发送。",
    "steps": [
      "检查状态",
      "补齐配置",
      "本人授权",
      "验证连接"
    ],
    "outputs": [
      "配置状态",
      "连接核验",
      "测试回执"
    ],
    "note": "不在公开网页中展示真实凭据，也不会因观看演示而发送测试消息。"
  },
  {
    "id": "diagnosis",
    "name": "电脑卡顿原因排查",
    "category": "本机诊断",
    "headline": "先找到原因，再决定怎么处理。",
    "desc": "读取内存、磁盘和进程占用，解释瓶颈与可能原因，提出处理步骤，再复检指标。把“感觉卡”变成可检查的线索。",
    "steps": [
      "读取指标",
      "定位占用",
      "给出方案",
      "再次复检"
    ],
    "outputs": [
      "资源诊断",
      "处理建议",
      "前后对比"
    ],
    "note": "诊断与实际清理分开；涉及清理或重启时由你决定。"
  },
  {
    "id": "monitor",
    "name": "自动抢占脚本",
    "category": "条件监测",
    "headline": "条件满足时，接着执行已配置动作。",
    "desc": "监测目标排期页签、表格是否可编辑以及是否有空位，按既有规则执行填写；登录失效或表格结构异常时提醒。",
    "steps": [
      "监测条件",
      "校验页面",
      "执行规则",
      "异常提醒"
    ],
    "outputs": [
      "监测状态",
      "执行记录",
      "异常通知"
    ],
    "note": "这里介绍既有项目的条件监测能力，不在演示中触发真实填写。"
  }
];
  const ASSET_HASHES = {"poster-robot.jpg":"29e702a1ef2b","xp-robot-native.jpg":"b46cc5fb3866","demo-automation.mp4":"c26f64f3cfb2","xp-template-native.jpg":"2cacc8a58314","poster-setup.jpg":"017618394fed","poster-automation.jpg":"8c42452e6b9a","native-overview.mp4":"ae347b1aa25f","native-poster-overview.jpg":"3e5958505673","xp-template-example.png":"59e07eebea0b","xp-icon.png":"6a498b063921","social-card.jpg":"c9e95baac0d2","xp-robot.png":"56b5bd4a4122","poster-rag.jpg":"c9e95baac0d2","xp-overview.jpg":"32c396f077e5","native-poster-templates.jpg":"2cacc8a58314","native-setup.mp4":"7410d6d61a2f","preview-templates.mp4":"78554a96d0dc","xp-pinned-projects.png":"217651eea047","native-robot.mp4":"96c0166c549a","preview-robot.mp4":"1328f6eb2a89","demo-robot.mp4":"c1300eef8ce0","native-templates.mp4":"d804069b3b0e","preview-setup.mp4":"6631051baa74","demo-setup.mp4":"82f11e5a9c8a","native-automation.mp4":"2f1e9e831815","native-poster-automation.jpg":"e1675872bf8b","preview-automation.mp4":"6ab1491300ec","demo-rag.mp4":"0e712f6ba514","poster-templates.jpg":"2de94c4598e8","demo-templates.mp4":"940ff189385c","xp-images.png":"274832e1f0e4","native-poster-setup.jpg":"0669e70ff211","xp-knowledge.png":"629c4247c0ca","native-poster-robot.jpg":"b46cc5fb3866","xp-mark.png":"0abcb6ce6641"};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 760px)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const nav = document.querySelector('.localnav');
  const hero = document.querySelector('.launch-hero');
  const heroPin = document.querySelector('.launch-pin');
  const heroCopy = document.querySelector('.launch-copy');
  const heroWindow = document.querySelector('.launch-product-scroll');
  const heroDock = document.querySelector('.launch-dock');
  const viewport = document.querySelector('.gallery-viewport');
  const track = document.querySelector('.gallery-track');
  const cards = [...document.querySelectorAll('.native-card')];
  const dots = [...document.querySelectorAll('.gallery-dots [role=tab]')];
  const dotGroup = document.querySelector('.gallery-dots');
  const galleryToggle = document.querySelector('.gallery-toggle');
  const prev = document.querySelector('.gallery-prev');
  const next = document.querySelector('.gallery-next');
  const inlineVideos = [...document.querySelectorAll('.inline-film')];
  const filmDialog = document.querySelector('.film-dialog');
  const fullFilm = document.querySelector('#feature-film');
  const imageDialog = document.querySelector('.image-dialog');
  const caseButtons = [...document.querySelectorAll('[data-case]')];
  const caseDetail = document.querySelector('.case-detail');
  const knowledge = document.querySelector('.knowledge-scene');
  const knowledgeMedia = document.querySelector('.knowledge-media');
  const knowledgeSteps = [...document.querySelectorAll('.knowledge-step')];
  const visibleVideos = new Set();
  const animations = new Set();
  const filmInfo = {
    overview: {title:'XP BOT 工作空间 · 实机操作', file:'native-overview.mp4', poster:'xp-overview.jpg'},
    automation: {title:'定时任务状态与搜索 · 实机界面', file:'native-automation.mp4', poster:'native-poster-automation.jpg'},
    robot: {title:'机器人入口与输入 · 完整配置演示待补录', file:'native-robot.mp4', poster:'native-poster-robot.jpg'},
    setup: {title:'接入设置 · 实机界面', file:'native-setup.mp4', poster:'native-poster-setup.jpg'},
    templates: {title:'图片模板 · 实机操作', file:'native-templates.mp4', poster:'native-poster-templates.jpg'}
  };
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const ramp = (p,a,b) => clamp((p-a)/(b-a));
  const url = name => `./${name}?v=${ASSET_HASHES[name] || 'native3'}`;
  let selected = 0;
  let playing = !reduced.matches;
  let advance = true;
  let galleryVisible = false;
  let galleryStep = 1;
  let progressFrame = 0;
  let galleryScrollFrame = 0;
  let staticCardStart = 0;
  let scrollFrame = 0;
  let resizeFrame = 0;
  let measured = {};
  let activeKnowledge = -1;
  let drag = null;
  let suppressClick = false;
  let currentFilm = '';
  let previousFocus;
  let savedScroll = 0;
  let lastNavState;

  function animate(element,frames,options={}) {
    if (!element || reduced.matches || !element.animate) return null;
    const a=element.animate(frames,{duration:700,easing:'cubic-bezier(.22,1,.36,1)',...options});
    animations.add(a);
    a.addEventListener('finish',()=>animations.delete(a),{once:true});
    a.addEventListener('cancel',()=>animations.delete(a),{once:true});
    return a;
  }
  function ensureVideo(video) {
    if (video.getAttribute('src') || !video.dataset.src) return;
    video.dataset.loading='true';
    video.src=url(video.dataset.src.replace(/^\.\//,''));
    video.load();
  }
  function canPlay(video) {
    if (document.hidden || reduced.matches || filmDialog.open || imageDialog.open || !visibleVideos.has(video)) return false;
    const card=video.closest('.native-card');
    return !card || (card===cards[selected] && playing);
  }
  function updateVideos() {
    viewport.classList.toggle('is-paused',!playing);
    cards.forEach((c,i)=>c.classList.toggle('is-playing',i===selected&&playing));
    inlineVideos.forEach(video=>{
      if (canPlay(video)) {
        ensureVideo(video);
        video.play().catch(()=>{});
      } else video.pause();
    });
    updateProgressLoop();
  }
  inlineVideos.forEach(video=>{
    video.addEventListener('loadeddata',()=>{video.dataset.loading='false';video.classList.add('is-ready');});
    video.addEventListener('error',()=>{video.dataset.loading='false';video.dataset.error='true';});
    if (video.classList.contains('gallery-film')) {
      video.addEventListener('ended',()=>{
        if (playing && advance && galleryVisible && !reduced.matches) selectCard(selected+1,{scroll:true});
        else if (playing && galleryVisible && !reduced.matches) {video.currentTime=0;video.play().catch(()=>{});}
      });
    }
  });
  const videoObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting && entry.intersectionRatio>=.18) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
    });
    updateVideos();
  },{threshold:[0,.18,.5]});
  inlineVideos.forEach(video=>videoObserver.observe(video));

  function progressTick() {
    progressFrame=0;
    const v=cards[selected].querySelector('video');
    if (!playing || !galleryVisible || document.hidden || reduced.matches || filmDialog.open) return;
    if(!v&&!staticCardStart)staticCardStart=performance.now();
    const p=v?(Number.isFinite(v.duration)&&v.duration>0?v.currentTime/v.duration:0):(performance.now()-staticCardStart)/7000;
    if(!v&&p>=1&&advance){staticCardStart=0;selectCard(selected+1,{scroll:true});return;}
    dotGroup.style.setProperty('--gallery-progress',String(clamp(p)));
    progressFrame=requestAnimationFrame(progressTick);
  }
  function updateProgressLoop() {
    if (playing && galleryVisible && !document.hidden && !reduced.matches && !filmDialog.open) {
      if (!progressFrame) progressFrame=requestAnimationFrame(progressTick);
    } else {cancelAnimationFrame(progressFrame);progressFrame=0;}
  }
  function selectCard(index,{scroll=false,user=false,focus=false}={}) {
    const bounded=(index+cards.length)%cards.length;
    if (user) advance=false;
    const changed=bounded!==selected;
    selected=bounded;
    cards.forEach((card,i)=>{
      const active=i===selected;
      card.classList.toggle('is-active',active);
      card.setAttribute('aria-hidden',String(!active));
      card.querySelector('.card-watch').tabIndex=active?0:-1;
      dots[i].setAttribute('aria-selected',String(active));
      dots[i].tabIndex=active?0:-1;
      const cv=card.querySelector('video');if(cv)cv.loop=!advance;
      card.classList.toggle('is-playing',active&&playing);
    });
    if (changed) {
      const v=cards[selected].querySelector('video');
      if (v&&Number.isFinite(v.duration)) v.currentTime=0;
      staticCardStart=0;
      dotGroup.style.setProperty('--gallery-progress','0');
      animate(cards[selected].querySelector('.highlight-copy'),[{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:750});
      animate(cards[selected].querySelector('.card-depth'),[{opacity:.3,transform:'translateY(18px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:900});
    }
    if (scroll) viewport.scrollTo({left:selected*galleryStep,behavior:reduced.matches?'instant':'smooth'});
    if (focus) dots[selected].focus({preventScroll:true});
    prev.disabled=selected===0;
    next.disabled=selected===cards.length-1;
    updateVideos();
  }
  dots.forEach((dot,i)=>{
    dot.addEventListener('click',()=>selectCard(i,{scroll:true,user:true}));
    dot.addEventListener('keydown',event=>{
      let target;
      if (event.key==='ArrowRight') target=selected+1;
      if (event.key==='ArrowLeft') target=selected-1;
      if (event.key==='Home') target=0;
      if (event.key==='End') target=cards.length-1;
      if (target===undefined) return;
      event.preventDefault();selectCard(target,{scroll:true,user:true,focus:true});
    });
  });
  prev.addEventListener('click',()=>selectCard(selected-1,{scroll:true,user:true}));
  next.addEventListener('click',()=>selectCard(selected+1,{scroll:true,user:true}));
  cards.forEach((card,i)=>card.addEventListener('click',event=>{
    if (suppressClick) {event.preventDefault();return;}
    if (i!==selected) selectCard(i,{scroll:true,user:true});
  }));
  galleryToggle.addEventListener('click',()=>{
    playing=!playing;advance=playing;
    galleryToggle.setAttribute('aria-pressed',String(playing));
    galleryToggle.setAttribute('aria-label',`${playing?'暂停':'播放'}亮点动态演示`);
    cards.forEach((card,i)=>{const cv=card.querySelector('video');if(cv)cv.loop=!advance;card.classList.toggle('is-playing',i===selected&&playing);});
    staticCardStart=0;
    updateVideos();
  });
  viewport.addEventListener('scroll',()=>{
    if (galleryScrollFrame) return;
    galleryScrollFrame=requestAnimationFrame(()=>{
      galleryScrollFrame=0;
      const index=clamp(Math.round(viewport.scrollLeft/galleryStep),0,cards.length-1);
      if (index!==selected) selectCard(index);
    });
  },{passive:true});
  viewport.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)>2)advance=false;},{passive:true});
  viewport.addEventListener('pointerdown',event=>{
    if (event.pointerType!=='mouse') {advance=false;return;}
    if (event.button!==0 || event.target.closest('button')) return;
    drag={x:event.clientX,y:event.clientY,left:viewport.scrollLeft,lastX:event.clientX,lastTime:event.timeStamp,v:0,active:false,id:event.pointerId};
  });
  viewport.addEventListener('pointermove',event=>{
    if(!drag)return;
    const dx=event.clientX-drag.x;
    if(!drag.active && Math.abs(dx)>7 && Math.abs(dx)>Math.abs(event.clientY-drag.y)){
      drag.active=true;advance=false;viewport.classList.add('is-dragging');viewport.setPointerCapture(event.pointerId);
    }
    if(!drag.active)return;
    event.preventDefault();
    const dt=Math.max(1,event.timeStamp-drag.lastTime);
    drag.v=clamp((event.clientX-drag.lastX)/dt,-2.2,2.2);
    drag.lastX=event.clientX;drag.lastTime=event.timeStamp;
    viewport.scrollLeft=drag.left-dx;
  });
  function finishDrag() {
    if(!drag)return;
    const d=drag;drag=null;
    viewport.classList.remove('is-dragging');
    if(d.active){
      suppressClick=true;
      const target=clamp(Math.round((viewport.scrollLeft-d.v*160)/galleryStep),0,cards.length-1);
      selectCard(target,{scroll:true,user:true});
      setTimeout(()=>{suppressClick=false;},0);
    }
  }
  viewport.addEventListener('pointerup',finishDrag);
  viewport.addEventListener('pointercancel',finishDrag);
  viewport.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();}},true);
  new IntersectionObserver(entries=>{galleryVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>.18;updateVideos();},{threshold:[0,.18,.6]}).observe(viewport);

  const presets={
    rag:{image:'xp-overview.jpg',scale:1.25,x:'-3%',y:'3%',origin:'62% 43%',alt:'XP BOT 知识库助手实机界面'},
    automation:{image:'xp-pinned-projects.png',scale:1.04,x:'0%',y:'0%',origin:'50% 50%',alt:'XP BOT 置顶的九个真实项目'},
    templates:{image:'xp-template-native.jpg',scale:1.2,x:'-3%',y:'3%',origin:'70% 32%',alt:'XP BOT 图片与模板实机界面'},
    robot:{image:'xp-robot-native.jpg',scale:1.25,x:'-3%',y:'3%',origin:'65% 45%',alt:'XP BOT 机器人助手实机界面'}
  };
  const tourCamera=document.querySelector('.tour-camera');
  const tourImage=document.querySelector('#tour-image');
  let tourSelected='';
  document.querySelectorAll('[data-tour]').forEach(button=>{
    const body=button.parentElement.querySelector('.hotspot-body');
    body.id=`hotspot-detail-${button.dataset.tour}`;button.setAttribute('aria-controls',body.id);
    button.addEventListener('click',()=>{
      tourSelected=tourSelected===button.dataset.tour?'':button.dataset.tour;
      document.querySelectorAll('[data-tour]').forEach(b=>{
        const active=b.dataset.tour===tourSelected;
        b.setAttribute('aria-expanded',String(active));b.parentElement.classList.toggle('is-open',active);
      });
      tourImage.closest('.tour-viewport').dataset.view=tourSelected;
      const target=presets[tourSelected]||{image:'xp-overview.jpg',scale:1,x:'0%',y:'0%',origin:'50% 50%',alt:'XP BOT 实机工作空间'};
      if(tourImage.getAttribute('src')!==`./${target.image}`){
        tourImage.src=`./${target.image}`;tourImage.alt=target.alt;
        animate(tourImage,[{opacity:.25},{opacity:1}],{duration:600});
      }
      tourCamera.style.setProperty('--tour-scale',target.scale);
      tourCamera.style.setProperty('--tour-x',target.x);
      tourCamera.style.setProperty('--tour-y',target.y);
      tourCamera.style.setProperty('--tour-origin',target.origin);
      animate(button,[{transform:'scale(.94)'},{transform:'scale(1.035)',offset:.7},{transform:'scale(1)'}],{duration:440});
      requestMeasure();
    });
  });

  function selectCase(index,{focus=false}={}) {
    const c=CASES[index];if(!c)return;
    caseButtons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
    caseDetail.setAttribute('aria-labelledby',`case-tab-${c.id}`);
    caseDetail.innerHTML=`<p class="case-category">${c.category}</p><h3>${c.headline}</h3><p class="case-description">${c.desc}</p><ol class="case-flow">${c.steps.map((step,i)=>`<li><span>0${i+1}</span><b>${step}</b></li>`).join('')}</ol><div class="case-outputs"><span>交付</span>${c.outputs.map(v=>`<b>${v}</b>`).join('')}</div><p class="case-note">${c.note}</p>`;
    animate(caseDetail,[{opacity:.3,transform:'translateX(15px)'},{opacity:1,transform:'translateX(0)'}],{duration:600});
    if(focus)caseButtons[index].focus({preventScroll:true});
    if(narrow.matches){const b=caseButtons[index],parent=b.parentElement;parent.scrollTo({left:b.offsetLeft-parent.offsetLeft-parent.clientWidth/2+b.offsetWidth/2,behavior:reduced.matches?'instant':'smooth'});}
    requestMeasure();
  }
  caseButtons.forEach((button,i)=>{
    button.addEventListener('click',()=>selectCase(i));
    button.addEventListener('keydown',event=>{
      let j;
      if(['ArrowRight','ArrowDown'].includes(event.key))j=(i+1)%CASES.length;
      if(['ArrowLeft','ArrowUp'].includes(event.key))j=(i-1+CASES.length)%CASES.length;
      if(event.key==='Home')j=0;if(event.key==='End')j=CASES.length-1;
      if(j===undefined)return;event.preventDefault();selectCase(j,{focus:true});
    });
  });

  function openFilm(kind,trigger) {
    const info=filmInfo[kind];if(!info)return;
    if(!filmDialog.open){previousFocus=trigger;savedScroll=scrollY;filmDialog.showModal();document.body.style.overflow='hidden';}
    document.querySelector('#film-title').textContent=info.title;
    if(currentFilm!==kind){fullFilm.pause();fullFilm.src=url(info.file);fullFilm.poster=url(info.poster);fullFilm.setAttribute('aria-label',info.title);fullFilm.load();currentFilm=kind;filmDialog.querySelector('.film-error')?.remove();}
    filmDialog.querySelectorAll('[data-film]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.film===kind)));
    inlineVideos.forEach(video=>video.pause());updateProgressLoop();
    fullFilm.play().catch(()=>{});
    animate(filmDialog,[{opacity:0,transform:'translateY(30px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:500});
  }
  document.querySelectorAll('[data-film]').forEach(button=>button.addEventListener('click',()=>{if(!suppressClick)openFilm(button.dataset.film,button);}));
  function closeDialog(dialog){if(dialog.dataset.closing==='true')return;dialog.dataset.closing='true';const a=animate(dialog,[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(18px) scale(.975)'}],{duration:220});const done=()=>{dialog.dataset.closing='false';dialog.close();};if(a)a.finished.then(done,done);else done();}
  document.querySelector('.film-close').addEventListener('click',()=>closeDialog(filmDialog));
  filmDialog.addEventListener('close',()=>{fullFilm.pause();document.body.style.overflow='';previousFocus?.focus({preventScroll:true});scrollTo({top:savedScroll,behavior:'instant'});updateVideos();});
  fullFilm.addEventListener('error',()=>{
    if(filmDialog.querySelector('.film-error'))return;
    const p=document.createElement('p');p.className='film-error';
    const a=document.createElement('a');a.href=url(filmInfo[currentFilm].file);a.textContent='视频暂时无法播放，点此直接打开。';p.append(a);fullFilm.insertAdjacentElement('afterend',p);
  });
  document.querySelectorAll('[data-expand]').forEach(button=>button.addEventListener('click',()=>{
    const source=document.getElementById(button.dataset.expand),image=imageDialog.querySelector('img'),start=source.closest('.tour-viewport').getBoundingClientRect();
    previousFocus=button;savedScroll=scrollY;image.src=source.src;image.alt=source.alt;imageDialog.showModal();document.body.style.overflow='hidden';inlineVideos.forEach(video=>video.pause());
    const end=image.getBoundingClientRect();
    animate(image,[{opacity:.35,transform:`translate(${start.x-end.x}px,${start.y-end.y}px) scale(${start.width/end.width})`},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:550});
  }));
  document.querySelector('.image-close').addEventListener('click',()=>closeDialog(imageDialog));
  imageDialog.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus({preventScroll:true});scrollTo({top:savedScroll,behavior:'instant'});updateVideos();});
  [filmDialog,imageDialog].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}));
  [filmDialog,imageDialog].forEach(dialog=>dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);}));

  const pointerRecords=[];
  let pointerFrame=0,pointerClock=0;
  function pointerTick(time) {
    pointerFrame=0;
    if(reduced.matches||!finePointer.matches||document.hidden)return;
    const dt=pointerClock?Math.min(.05,(time-pointerClock)/1000):1/60;pointerClock=time;
    const alpha=1-Math.exp(-16*dt);let moving=false;
    pointerRecords.forEach(r=>{
      if(!r.visible)return;
      r.x+=(r.tx-r.x)*alpha;r.y+=(r.ty-r.y)*alpha;
      if(Math.abs(r.tx-r.x)+Math.abs(r.ty-r.y)>.001)moving=true;
      r.host.style.setProperty('--pointer-rx',`${-r.y*3.5}deg`);
      r.host.style.setProperty('--pointer-ry',`${r.x*4}deg`);
      r.host.style.setProperty('--pointer-x',`${50+r.x*50}%`);
      r.host.style.setProperty('--pointer-y',`${50+r.y*50}%`);
      r.host.style.setProperty('--media-parallax-x',`${r.x*9}px`);
      r.host.style.setProperty('--media-parallax-y',`${r.y*7}px`);
      r.host.style.setProperty('--copy-parallax-x',`${r.x*-5}px`);
      r.host.style.setProperty('--copy-parallax-y',`${r.y*-4}px`);
    });
    if(moving)pointerFrame=requestAnimationFrame(pointerTick);else pointerClock=0;
  }
  function startPointer(){if(!pointerFrame&&!reduced.matches&&finePointer.matches)pointerFrame=requestAnimationFrame(pointerTick);}
  const pointerObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{const r=pointerRecords.find(v=>v.host===entry.target);if(!r)return;r.visible=entry.isIntersecting;if(!r.visible){r.x=r.y=r.tx=r.ty=0;r.host.style.setProperty('--pointer-rx','0deg');r.host.style.setProperty('--pointer-ry','0deg');}}));
  document.querySelectorAll('[data-parallax]').forEach(element=>{
    const host=element.closest('.native-card')||element;
    if(pointerRecords.some(r=>r.host===host))return;
    const r={host,x:0,y:0,tx:0,ty:0,visible:false,rect:null};pointerRecords.push(r);pointerObserver.observe(host);
    host.addEventListener('pointerenter',()=>{r.rect=host.getBoundingClientRect();});
    host.addEventListener('pointermove',event=>{if(!finePointer.matches||reduced.matches||!r.rect)return;r.tx=clamp((event.clientX-r.rect.left)/r.rect.width)*2-1;r.ty=clamp((event.clientY-r.rect.top)/r.rect.height)*2-1;startPointer();});
    host.addEventListener('pointerleave',()=>{r.tx=r.ty=0;startPointer();});
  });

  function measure() {
    resizeFrame=0;
    const top=narrow.matches?60:66;
    measured={heroTop:hero.getBoundingClientRect().top+scrollY,heroRange:Math.max(1,hero.offsetHeight-heroPin.offsetHeight),knowledgeTop:knowledge.getBoundingClientRect().top+scrollY-top,knowledgeRange:Math.max(1,knowledge.offsetHeight-(innerHeight-top))};
    galleryStep=cards[0].offsetWidth+parseFloat(getComputedStyle(track).gap);
    if(!drag)viewport.scrollLeft=selected*galleryStep;
    requestScroll();
  }
  function requestMeasure(){if(!resizeFrame)resizeFrame=requestAnimationFrame(measure);}
  function renderScroll() {
    scrollFrame=0;
    const y=scrollY;
    const showNav=y>50;
    if(showNav!==lastNavState){lastNavState=showNav;nav.classList.toggle('is-visible',showNav);nav.inert=!showNav;nav.setAttribute('aria-hidden',String(!showNav));}
    if(reduced.matches)return;
    const p=clamp((y-measured.heroTop)/measured.heroRange);
    heroCopy.style.opacity=String(1-ramp(p,.12,.62));
    heroCopy.style.transform=`translate3d(0,${-35*ramp(p,0,.65)}px,0)`;
    heroWindow.style.transform=`translate3d(0,${-150*p}px,0) rotateX(${15*(1-ramp(p,0,.65))}deg) scale(${1-.12*p})`;
    heroDock.style.opacity=String(1-ramp(p,.75,1));
    heroDock.inert=p>.95;
    const k=clamp((y-measured.knowledgeTop)/measured.knowledgeRange);
    if(!narrow.matches){
      const stage=Math.min(2,Math.floor(k*3));
      if(stage!==activeKnowledge){activeKnowledge=stage;knowledgeSteps.forEach((e,i)=>{e.classList.toggle('is-active',i===stage);e.setAttribute('aria-hidden',String(i!==stage));});}
      knowledgeMedia.style.transform=`translate3d(0,${22-44*k}px,0) scale(${.94+.06*k})`;
    }
  }
  function requestScroll(){if(!scrollFrame)scrollFrame=requestAnimationFrame(renderScroll);}
  addEventListener('scroll',requestScroll,{passive:true});
  addEventListener('resize',requestMeasure,{passive:true});
  addEventListener('load',requestMeasure,{once:true});
  if(document.fonts)document.fonts.ready.then(requestMeasure);
  if('ResizeObserver'in window)new ResizeObserver(requestMeasure).observe(document.body);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){inlineVideos.forEach(v=>v.pause());fullFilm.pause();cancelAnimationFrame(pointerFrame);pointerFrame=0;}else updateVideos();updateProgressLoop();});

  const revealTargets=[...document.querySelectorAll('[data-reveal]')];
  revealTargets.forEach(element=>{
    const pieces=element.innerHTML.split(/<br\s*\/?\s*>/i);
    element.innerHTML=pieces.map(line=>`<span class="reveal-line"><span>${line}</span></span>`).join('');
  });
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;revealObserver.unobserve(entry.target);
    entry.target.querySelectorAll('.reveal-line>span').forEach((line,i)=>animate(line,[{transform:'translateY(105%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:1050,delay:i*120,fill:'backwards'}));
  }),{threshold:.18});
  revealTargets.forEach(element=>revealObserver.observe(element));
  document.querySelectorAll('[data-intro]').forEach((element,i)=>animate(element,[{opacity:0,transform:'translateY(38px)'},{opacity:1,transform:'translateY(0)'}],{duration:1100,delay:80+i*120,fill:'backwards'}));
  document.querySelectorAll('details').forEach(details=>{
    details.addEventListener('toggle',()=>{if(details.open){const answer=details.querySelector('.faq-answer')||details.querySelector(':scope>p');animate(answer,[{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:400});}requestMeasure();});
  });
  function motionPreferenceChanged(){
    activeKnowledge=-1;
    animations.forEach(a=>a.cancel());playing=!reduced.matches;advance=playing;
    galleryToggle.setAttribute('aria-pressed',String(playing));galleryToggle.setAttribute('aria-label',`${playing?'暂停':'播放'}亮点动态演示`);
    if(reduced.matches){heroCopy.style.opacity='';heroCopy.style.transform='';heroWindow.style.transform='';heroDock.style.opacity='';heroDock.inert=false;knowledgeMedia.style.transform='';}
    knowledgeSteps.forEach(e=>{if(reduced.matches||narrow.matches)e.removeAttribute('aria-hidden');});
    updateVideos();requestMeasure();
  }
  reduced.addEventListener('change',motionPreferenceChanged);
  narrow.addEventListener('change',()=>{knowledgeSteps.forEach(e=>e.removeAttribute('aria-hidden'));activeKnowledge=-1;requestMeasure();});
  selectCard(0);measure();
  if(new URLSearchParams(location.search).has('motionQA')){
    const meter=document.createElement('output');meter.id='motion-metrics';meter.style.cssText='position:fixed;right:8px;bottom:8px;z-index:1000;background:#111d;color:#ddd;font:11px monospace;padding:7px 10px;border:1px solid #444;border-radius:6px;pointer-events:none';document.body.append(meter);
    let last=0,times=[],lastReport=0;
    function sample(t){if(last)times.push(t-last);last=t;if(times.length>180)times.shift();if(t-lastReport>500&&times.length){lastReport=t;const a=[...times].sort((x,y)=>x-y);meter.textContent=`${Math.round(1000/(times.reduce((x,y)=>x+y,0)/times.length))} fps · p95 ${a[Math.floor(a.length*.95)].toFixed(1)} ms`;meter.dataset.p95=a[Math.floor(a.length*.95)].toFixed(1);}requestAnimationFrame(sample);}requestAnimationFrame(sample);
  }
})();
