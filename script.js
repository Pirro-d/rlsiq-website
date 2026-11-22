const header=document.getElementById('header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});const toggle=document.getElementById('menuToggle'),nav=document.getElementById('nav');toggle.addEventListener('click',()=>{let open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));document.getElementById('year').textContent=new Date().getFullYear();
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
// Animate numbers once when the statistics bar enters the viewport.
const stats=document.querySelector('.stats');
const counters=[...stats.querySelectorAll('[data-target]')];
let counted=false;
counters.forEach(el=>{el.textContent='0'});
function startStatsCounters(){
 if(counted)return;
 counted=true;
 counters.forEach(el=>{
  const target=Number(el.dataset.target);
  if(reduced){el.textContent=String(target);return}
  let startTime=null;
  const duration=1900;
  function tick(now){
   if(startTime===null)startTime=now;
   const progress=Math.min((now-startTime)/duration,1);
   el.textContent=String(Math.min(target,Math.floor(target*progress)));
   if(progress<1)requestAnimationFrame(tick);
   else el.textContent=String(target);
  }
  requestAnimationFrame(tick);
 });
}
if('IntersectionObserver' in window){
 const statObserver=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
   startStatsCounters();statObserver.disconnect();
  }
 },{threshold:0,rootMargin:'0px 0px -15% 0px'});
 statObserver.observe(stats);
}else startStatsCounters();
const heroImages=['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1500&q=85','https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=85','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1500&q=85'];let heroIndex=0;function changeHero(dir){heroIndex=(heroIndex+dir+heroImages.length)%heroImages.length;document.querySelector('.hero-photo').style.backgroundImage=`url('${heroImages[heroIndex]}')`;}document.getElementById('prevHero').addEventListener('click',()=>changeHero(-1));document.getElementById('nextHero').addEventListener('click',()=>changeHero(1));
const quotes=[['“Better visibility into fire door conditions helps facilities make informed safety decisions.”','RLS IQ — Our approach'],['“Clear records make it easier to identify what needs attention and plan next steps.”','RLS IQ — Our commitment'],['“Inspection, documentation, and asset intelligence work better together.”','RLS IQ — Our philosophy']];let quoteIndex=0;function quote(dir){quoteIndex=(quoteIndex+dir+quotes.length)%quotes.length;document.getElementById('testimonialText').innerHTML=`${quotes[quoteIndex][0]}<small>${quotes[quoteIndex][1]}</small>`}document.getElementById('quotePrev').addEventListener('click',()=>quote(-1));document.getElementById('quoteNext').addEventListener('click',()=>quote(1));
document.getElementById('requestForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('formNote').textContent='Demo only: your information has not been sent. We will connect this form before launch.'});
