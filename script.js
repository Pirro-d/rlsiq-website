const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.side-menu');
const links = [...menu.querySelectorAll('a')];
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');document.body.style.overflow='';}
toggle.addEventListener('click',()=>{const opening=!menu.classList.contains('open');menu.classList.toggle('open',opening);toggle.setAttribute('aria-expanded',String(opening));toggle.setAttribute('aria-label',opening?'Close navigation':'Open navigation');document.body.style.overflow=opening?'hidden':'';});
links.forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(innerWidth>720)closeMenu()});
const sections=[...document.querySelectorAll('main section[id]')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(!visible.length)return;const id=visible[0].target.id;links.forEach(a=>{const active=a.getAttribute('href')==='#'+id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-15% 0px -55% 0px',threshold:[0,.1,.25,.5]});sections.forEach(s=>observer.observe(s));
document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('inspection-form');
form.addEventListener('submit',event=>{event.preventDefault();const status=document.getElementById('form-status');if(!form.reportValidity()){status.textContent='Please complete all required fields.';return;}const d=new FormData(form);const subject='RLS IQ Inspection Request — '+d.get('company');const body=`Name: ${d.get('firstName')} ${d.get('lastName')}\nCompany: ${d.get('company')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nFacility address: ${d.get('address')}\nService: ${d.get('service')}\n\nDetails:\n${d.get('details')||'None provided'}`;const draft=`Subject: ${subject}\n\n${body}`;navigator.clipboard?.writeText(draft).then(()=>{status.textContent='Request copied to clipboard. Email it to RLS IQ when you have their confirmed address.'}).catch(()=>{status.textContent='Your request is ready. Please copy the details manually; the form is not connected to an inbox yet.'});});
