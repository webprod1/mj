(()=>{
const sections=[...document.querySelectorAll('main>section')];
sections.forEach((section,index)=>{const layer=document.createElement('div');layer.className='atmosphere';layer.setAttribute('aria-hidden','true');layer.innerHTML='<div class="light light-a"></div><div class="light light-b"></div><div class="line"></div>'+Array.from({length:10},(_,i)=>'<i class="dust" style="--x:'+((i*29+index*13)%96)+'%;--y:'+((i*41+index*7)%91)+'%;--speed:'+(7+i%5)+'s;--delay:-'+i+'s"></i>').join('');section.prepend(layer)});
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);let scheduled=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--scroll-progress',max>0?String(scrollY/max):'0');scheduled=false}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
const visibility=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('atmosphere-paused',!entry.isIntersecting)),{rootMargin:'100px'});sections.forEach(s=>visibility.observe(s));
const currentSection=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.nav-panel a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})})},{rootMargin:'-25% 0px -45% 0px'});sections.forEach(s=>currentSection.observe(s));
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('tab-inactive',document.hidden));
})();
