const methodStages=[
 {title:'Todo empieza por escucharlo.',text:'Describa qué sucedió y qué necesita aclarar. No hace falta conocer términos jurídicos para dar el primer paso.',icon:'messages-square',action:'Cuéntenos su caso',href:'#diag',label:'CLARIDAD'},
 {title:'La información, en su lugar.',text:'Ordene fechas, comunicaciones y documentos. El diagnóstico de muestra ayuda a preparar las preguntas para su consulta.',icon:'files',action:'Organice su consulta',href:'#diag',label:'PERSPECTIVA'},
 {title:'Criterio profesional. Trato humano.',text:'Una conversación con el despacho permite revisar los hechos, resolver dudas y acordar el alcance de una asesoría.',icon:'scan-face',action:'Converse con el despacho',href:'#contacto',label:'CRITERIO'},
 {title:'Un próximo paso que se entiende.',text:'Proponga una fecha y hora, envíe su solicitud por WhatsApp y espere la confirmación del despacho antes de la consulta.',icon:'calendar-check',action:'Solicite su asesoría',href:'#contacto',label:'DIRECCIÓN'}
];
function selectMethod(index){
 index=Math.max(0,Math.min(3,index));const s=methodStages[index];
 document.querySelectorAll('[data-method]').forEach((tab,i)=>{tab.classList.toggle('active',i===index);tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
 document.getElementById('methodTitle').textContent=s.title;document.getElementById('methodText').textContent=s.text;document.getElementById('methodCount').textContent='0'+(index+1)+' / 04';document.getElementById('methodProgress').style.width=((index+1)*25)+'%';document.getElementById('methodAction').href=s.href;
 document.getElementById('methodAction').innerHTML=s.action+' <i data-lucide="arrow-right"></i>';document.getElementById('methodPanel').setAttribute('aria-labelledby','methodTab'+index);
 document.querySelector('.orbit-core').innerHTML='<i data-lucide="'+s.icon+'"></i>';document.querySelector('.orbit-label').textContent=s.label;
 try{lucide.createIcons();}catch{}
}
document.querySelectorAll('[data-method]').forEach((tab,index)=>{
 tab.tabIndex=index===0?0:-1;tab.addEventListener('click',()=>selectMethod(index));
 tab.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%4;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();selectMethod(next);document.getElementById('methodTab'+next).focus();});
});
const track=document.getElementById('practiceTrack');
function moveAreas(direction){const card=track.querySelector('.practice-card');track.scrollBy({left:direction*(card.getBoundingClientRect().width+24),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
document.getElementById('areasPrev').addEventListener('click',()=>moveAreas(-1));document.getElementById('areasNext').addEventListener('click',()=>moveAreas(1));
document.querySelectorAll('[data-practice]').forEach(card=>card.addEventListener('click',()=>{const area=card.dataset.practice;if(examples[area]){document.getElementById('caseText').value=examples[area].text;document.getElementById('objText').value=examples[area].goal;}const names={familiar:'Familiar',laboral:'Laboral',civil:'Civil',penal:'Penal',administrativo:'Administrativo'};document.getElementById('cArea').value=names[area];}));
const shouldReduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealNodes=document.querySelectorAll('.experience-copy,.architecture-frame,.principles>div,.section-heading,.method-panel,.diag-rail,.appointment-copy');
if(!shouldReduce&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12});revealNodes.forEach(el=>{el.classList.add('scroll-reveal');observer.observe(el);});}
if(!shouldReduce){let scheduled=false;const sculpture=document.querySelector('.hero-object'),architecture=document.querySelector('.architecture-frame img');
 function motion(){scheduled=false;const y=window.scrollY||0;const height=window.innerHeight;if(y<1400){sculpture.style.transform='translateY('+Math.min(65,y*.09)+'px) scale('+(1+Math.min(.09,y*.00008))+')';}const box=architecture.parentElement.getBoundingClientRect();if(box.top<height&&box.bottom>0){const p=(height-box.top)/(height+box.height);architecture.style.transform='scale(1.1) translateY('+((p-.5)*35)+'px)';}}
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(motion);}},{passive:true});
}
const originalToggleMenu=toggleMenu;toggleMenu=function(){originalToggleMenu();document.querySelector('.burger').setAttribute('aria-expanded',String(document.getElementById('mobileMenu').style.display==='block'));};
