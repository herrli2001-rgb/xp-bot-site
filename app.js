(() => {
  'use strict';
  const CASES = [
  {
    "id": "warning",
    "name": "大店预警监管",
    "category": "经营监管 · 定时采集与报告",
    "manualMinutes": 60,
    "manualLabel": "1 小时",
    "mode": "按计划后台执行",
    "headline": "星级、履约、售后，一起盯。",
    "desc": "把店铺星级、体验分及拖累因子，与揽收超时、待出库和售后明细放进同一套监管流程。按类目、商家归集，整理成日报、预警和通知草稿。",
    "steps": [
      "检查环境与登录",
      "全量取数并对账",
      "拆解星级与体验分",
      "汇总履约和售后",
      "生成报告与明细",
      "按既定规则通知"
    ],
    "outputs": [
      "经营监管报告",
      "分类明细 Excel",
      "风险与原因说明",
      "执行记录"
    ],
    "detailTitle": "真正连起来的，是一整套经营线索。",
    "details": [
      "星级报告不只报一个分数，还对照历史变化，找出拖累体验分的因子。",
      "揽收、待出库与售后按各自口径处理；抓取量和页面总数对不上时，先处理异常。",
      "按类目与商家组织明细，再把需要跟进的事项交给对应责任人。"
    ],
    "note": "人工单次用时由创建者提供。固定计划仍需本机、平台登录及相关服务可用；通知遵循已配置的授权规则。"
  },
  {
    "id": "mapping",
    "name": "大店对应表",
    "category": "主表维护 · 全量核验",
    "manualMinutes": 50,
    "manualLabel": "50 分钟",
    "mode": "自动维护与回读",
    "headline": "关系表持续更新，人工信息接着保留。",
    "desc": "从本轮新鲜全量源，建立大店商品与商家商品的对应关系。识别新增、变化和恢复在售，保留未在售历史，再把人工维护的信息带回新表。",
    "steps": [
      "取得本轮全量",
      "核对分页与唯一项",
      "比较历史基线",
      "合并人工信息",
      "导入并完整回读",
      "更新基线与收尾"
    ],
    "outputs": [
      "更新后的主表",
      "变更与异常清单",
      "原始记录留档",
      "回读验收报告"
    ],
    "detailTitle": "维护完整，也保护你已经整理的内容。",
    "details": [
      "按完整 SKU 对应，保留负责人、物流、产地、发货地和有意清空的字段。",
      "长编号保持精确静态值；发现重复 SKU 或商家冲突时，回到本轮来源核实并留档。",
      "写后刷新、完整导出并逐格回读，通过后才更新成功基线，完成后核对解锁状态。"
    ],
    "note": "已有历史执行记录及可复用技能。每轮以最新数据为准，耗时随数据量、供应商确认及平台等待变化。"
  },
  {
    "id": "newproduct",
    "name": "新品表，上新全流程",
    "category": "新品跟进 · 从报价到商品内容",
    "manualMinutes": 30,
    "manualLabel": "30 分钟",
    "mode": "按确认阶段接续执行",
    "headline": "报价、铺货、上架，到主图和视频。",
    "desc": "供应商报价先进入跟进表，按规则计算建议售价，核对商家和规格；再按本次授权接续供销铺货、改价上架，以及京麦主图、前台规格名称和主图视频配置。",
    "steps": [
      "整理报价与规格",
      "登记跟进并查重",
      "核对货源与铺货",
      "改价回读并上架",
      "配置主图与视频",
      "更新台账并复核"
    ],
    "outputs": [
      "新品跟进表",
      "价格差异与建议",
      "商品内容与素材",
      "执行及回读记录"
    ],
    "detailTitle": "不只登记报价，后面的上新步骤也接上。",
    "details": [
      "按商家、商品和规格共同核对，不能只凭同名商品或相近价格判断归属。",
      "区分供销货源和京麦编辑入口，核验商品确实生成、售价已保存、上架状态有效。",
      "主图、前台规格名和视频均有实际流程；已有内容按本次要求保留或替换，修改后再回读。"
    ],
    "note": "这个项目包含多个可独立执行的阶段。每次只推进本次确认的步骤，登记报价与线上改动分开处理。"
  },
  {
    "id": "materials",
    "name": "大店商品素材巡检",
    "category": "素材巡检 · 补全与复检",
    "manualMinutes": 180,
    "manualLabel": "3 小时",
    "mode": "巡检、补全与复检代办",
    "headline": "从发现缺口，到补齐并复查。",
    "desc": "逐项检查在售商品的通用卖点、透明图、白底图、场景图和卖点图，区分缺失、已有与审核驳回。先复用合适素材，再处理需要新生成或修订的内容。",
    "steps": [
      "扫描在售商品",
      "区分缺口与驳回",
      "补卖点与复用图",
      "按需生成和处理",
      "合并材料一次导入",
      "回查结果与审核"
    ],
    "outputs": [
      "素材巡检与缺口表",
      "卖点与素材文件",
      "合并导入材料",
      "复检及驳回清单"
    ],
    "detailTitle": "复用、生成、提交、验收，各有位置。",
    "details": [
      "同一商品的合适图片可复用到对应规格；颜色、比例和图像类型仍要逐项核对。",
      "把卖点与多类图片合并成一份导入材料，减少多轮等待，保留不需要改动的内容。",
      "场景图要符合背景要求，透明图要检查抠图边缘；提交完成后再分清处理中、通过和驳回。"
    ],
    "note": "3 小时指创建者提供的典型人工单次处理时间。平台生成、处理和审核等待不等于需要持续人工值守。"
  },
  {
    "id": "tagging",
    "name": "大店自动化新品打标",
    "category": "新品申报 · 历史查重与材料",
    "manualMinutes": 30,
    "manualLabel": "30 分钟",
    "mode": "自动出稿，审批后接续",
    "headline": "先找出真正的新品，再整理申请材料。",
    "desc": "从本轮在售列表读取完整 SPU、上架时间和标题，与正式历史批次查重。生成申请 Excel、带序号截图和邮件文案，审批后再按授权补图、接续申请表。",
    "steps": [
      "采集本轮在售",
      "按完整 SPU 查重",
      "核对批次与日期",
      "生成表格与截图",
      "接收对应审批图",
      "按授权追加申请"
    ],
    "outputs": [
      "新品申请 Excel",
      "带序号申请截图",
      "审批邮件文案",
      "查重与校验记录"
    ],
    "detailTitle": "“出材料”和“已申报”，状态说清楚。",
    "details": [
      "草稿、演练和正式历史分开；缺失历史时先核实，避免把已有商品重新当成新品。",
      "核对采集总量、唯一 SPU、日期与数量，长编号保持完整，表格保存后再回读。",
      "审批截图对应本批次后再补入；邮件发送和线上追加按具体授权推进。"
    ],
    "note": "30 分钟指创建者提供的典型人工单次处理时间。自动出稿不代表邮件已发送、审批已完成或平台已审核。"
  }
];
  const ASSET_HASHES = {"native-automation.mp4":"8bc4ab238314","native-overview.mp4":"15f7d0567411","native-poster-automation.jpg":"bb20afa37144","native-poster-robot.jpg":"a7c0115ca8ea","native-poster-setup.jpg":"230f65e49cf6","native-poster-templates.jpg":"6dc4582ac850","native-robot.mp4":"23d1d10b465f","native-setup.mp4":"2ba5f52e3745","native-templates.mp4":"356be873e10f","preview-automation.mp4":"3ac7f0616dc7","preview-robot.mp4":"319706bfbd3e","preview-setup.mp4":"7682bd990160","preview-templates.mp4":"bcd1edba3e33","xp-automation-overview.svg":"74abdd8b0ffc","xp-overview.jpg":"32c396f077e5","xp-robot-native.jpg":"a7c0115ca8ea","xp-template-native.jpg":"6dc4582ac850"};
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
    automation:{image:'xp-automation-overview.svg',scale:1.04,x:'0%',y:'0%',origin:'50% 50%',alt:'五个真实流程的概览示意'},
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
    caseDetail.innerHTML=`<p class="case-category">${c.category}</p><div class="case-timing"><div><span>原来 · 人工完整做一次</span><strong>${c.manualLabel}</strong></div><i aria-hidden="true">→</i><div><span>现在 · 已沉淀的流程</span><b>${c.mode}</b></div></div><h3>${c.headline}</h3><p class="case-description">${c.desc}</p><ol class="case-flow">${c.steps.map((step,i)=>`<li><span>0${i+1}</span><b>${step}</b></li>`).join('')}</ol><div class="case-outputs"><span>交付</span>${c.outputs.map(v=>`<b>${v}</b>`).join('')}</div><div class="case-experience"><h4>${c.detailTitle}</h4><ul>${c.details.map(v=>`<li>${v}</li>`).join('')}</ul></div><p class="case-note">${c.note}</p>`;
    animate(caseDetail,[{opacity:.3,transform:'translateX(15px)'},{opacity:1,transform:'translateX(0)'}],{duration:600});
    if(focus)caseButtons[index].focus({preventScroll:true});
    const detailTop=caseDetail.getBoundingClientRect().top;
    if(detailTop<86)scrollTo({top:scrollY+detailTop-92,behavior:reduced.matches?'instant':'smooth'});
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

  const quickStage=document.querySelector('.quicklinks-stage');
  if(quickStage)new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){quickStage.classList.add('is-visible');observer.unobserve(quickStage);}});},{threshold:.2}).observe(quickStage);
  const kbDiagram=document.querySelector('.kb-diagram');
  if(kbDiagram)new IntersectionObserver(entries=>kbDiagram.classList.toggle('is-inview',entries[0].isIntersecting),{threshold:.2}).observe(kbDiagram);
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
