(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const tabs=[...document.querySelectorAll('[data-data-tab]')];
 const copy={keywords:['“导出上周的搜索词榜单。”','选定日期与范围，保留榜单和原始来源。'],metrics:['“看一下昨天的经营概况。”','按明确口径查询，再整理成可以回查的结果。'],daily:['“帮我生成一份经营日报。”','确定人员或部门，汇总三周期表现与同比变化。']};
 function select(index,focus=false){
   tabs.forEach((button,i)=>{
    const active=i===index,panel=document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;panel.hidden=!active;
    if(active){const lines=copy[button.dataset.dataTab];document.getElementById('data-prompt').textContent=lines[0];document.getElementById('data-note').textContent=lines[1];
     if(!reduced.matches){panel.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.22,1,.36,1)'});button.animate([{transform:'scale(.95)'},{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:360,easing:'ease-out'});}
     if(focus)button.focus();
    }
   });
 }
 tabs.forEach((button,i)=>{button.addEventListener('click',()=>select(i));button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(i+1)%tabs.length;if(event.key==='ArrowLeft')target=(i+tabs.length-1)%tabs.length;if(event.key==='Home')target=0;if(event.key==='End')target=tabs.length-1;if(target!==undefined){event.preventDefault();select(target,true);}});});
 const scenes=[...document.querySelectorAll('[data-feature-demo],.watch-product')];
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-inview',entry.isIntersecting&&!document.hidden)),{threshold:.15});
 scenes.forEach(scene=>observer.observe(scene));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)scenes.forEach(s=>s.classList.remove('is-inview'));else scenes.forEach(s=>{const r=s.getBoundingClientRect();s.classList.toggle('is-inview',r.bottom>0&&r.top<innerHeight);});});
 document.querySelector('.replay-route')?.addEventListener('click',event=>{if(reduced.matches)return;const scene=event.currentTarget.closest('.crawl-route');scene.querySelectorAll('.route-stream i,.crawl-table>div:not(:first-child)').forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*120,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));});
})();
