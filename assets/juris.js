/* Juris demo: inherited GM classification, explicit sample guidance, real WhatsApp handoff. */
function diagnose(relato,objetivo,gen){
  const sample=originalDiagnose(relato,objetivo,gen);
  return {
    area:sample.area, urgencia:sample.urgencia,
    empatia:'Este es un ejemplo de cómo Juris organiza su consulta. Por lo que describe, el área inicial a revisar es '+sample.area.toLowerCase()+'.',
    marco_legal:['Contexto — Qué sucedió, en qué lugar y en qué fecha.','Documentación — Qué documentos o comunicaciones tiene disponibles.','Objetivo — Qué desea aclarar o resolver con el despacho.'],
    hilo_negro:'Antes de definir una vía, un abogado necesita revisar los hechos y la documentación. Esta demo muestra la preparación de esa conversación.',
    estrategia:'Prepare un resumen breve y consulte al despacho para una valoración personalizada. La clasificación es de muestra y puede cambiar después de revisar el caso.',
    plan:['Organice los hechos en orden de fecha.','Reúna los documentos relacionados sin cargarlos a esta demo.','Comparta su consulta por WhatsApp o proponga una cita.','Espere la confirmación y la revisión de un abogado antes de tomar decisiones.'],
    alcances:'La consulta permite aclarar las opciones y requisitos de su caso. Esta orientación de muestra no predice resultados ni calcula plazos legales.',
    que_traer:['Resumen con fechas','Documentos relacionados','Preguntas para el abogado']
  };
}
function organicChat(text){
  const t=extractSignals(text).t;
  if(/(hola|buenas|saludos)/.test(t)&&t.length<35) return {reply:'¡Hola! Soy el asistente de muestra de Juris Abogados. Puedo ayudarle a explorar las áreas de atención y preparar una solicitud. ¿Qué desea consultar?',diag:false};
  if(/(donde|direccion|ubicacion|horario|abren)/.test(t)) return {reply:'Consulte ubicación, modalidad y disponibilidad con el despacho por WhatsApp al 811 519 1418.',diag:false};
  if(/(costo|cuesta|precio|cobran|honorario|gratis)/.test(t)) return {reply:'Los honorarios y la disponibilidad se confirman directamente con el despacho. Puede preguntar por WhatsApp al 811 519 1418.',diag:false};
  if(/(cita|agend|consulta|hablar con)/.test(t)) return {reply:'Use la sección Agenda para proponer fecha y hora; después envíe la solicitud por WhatsApp. El despacho debe confirmar disponibilidad.',diag:false};
  if(/(ia|inteligencia|leyes|actualiz)/.test(t)) return {reply:'Esta demo conserva el sistema de respuestas programadas de GM. No está conectada a una IA ni consulta legislación en tiempo real. La orientación legal se confirma con un abogado.',diag:false};
  if(/(gracias|perfecto)/.test(t)&&t.length<35) return {reply:'Con gusto. Puede continuar por WhatsApp al 811 519 1418 cuando quiera solicitar la asesoría.',diag:false};
  const d=originalDiagnose(text,'','x');
  return {reply:'Por lo que menciona, el área inicial de atención podría ser '+d.area.toLowerCase()+'. Explore el diagnóstico de muestra para organizar su consulta y compártala con el despacho. La revisión legal la realiza un abogado.',diag:true};
}
const inheritedRenderMemo=renderMemo;
renderMemo=function(d){
  inheritedRenderMemo(d);
  $('diagWa').href='https://wa.me/'+CONFIG.PHONE_INTL+'?text='+encodeURIComponent('Hola, Juris Abogados. Quiero consultar mi caso.\n\nSituación: '+$('caseText').value.trim()+'\nObjetivo: '+($('objText').value.trim()||'Por definir')+'\nÁrea sugerida por la demo: '+d.area+'\n\n¿Podemos coordinar una asesoría?');
};
function validateCita(nombre,tel,mail,fecha,hora){
  let error='';
  if(!nombre||!tel||!mail||!fecha) error='Complete su nombre, teléfono, correo y la fecha propuesta.';
  else if(tel.replace(/\D/g,'').length<10||tel.replace(/\D/g,'').length>15) error='Escriba un teléfono válido con al menos 10 dígitos.';
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)||!$('cMail').checkValidity()) error='Revise que su correo tenga un formato válido.';
  else if(new Date(fecha+'T'+hora+':00-06:00').getTime()<=Date.now()) error='Elija una fecha y hora futura (hora de Ciudad de México).';
  if(error){$('citaError').querySelector('span').textContent=error;$('citaError').style.display='flex';return false;}
  return true;
}
const examples={
 laboral:{text:'Me despidieron hace una semana después de trabajar cuatro años. Me entregaron un documento y necesito entender qué información llevar a una consulta.',goal:'Preparar una consulta sobre mi despido.'},
 familiar:{text:'Quiero consultar un asunto de pensión alimenticia y convivencia con mis hijos. Necesito ordenar mis documentos y conocer qué revisar con un abogado.',goal:'Preparar una consulta sobre mi situación familiar.'},
 civil:{text:'Firmé un contrato de arrendamiento y existe un desacuerdo sobre la devolución del depósito. Tengo el contrato y los comprobantes de pago.',goal:'Consultar el desacuerdo sobre mi contrato.'}
};
document.querySelectorAll('[data-example]').forEach(btn=>btn.addEventListener('click',()=>{const example=examples[btn.dataset.example];$('caseText').value=example.text;$('objText').value=example.goal;$('caseText').focus();}));
document.querySelectorAll('.fgroup').forEach(group=>{const label=group.querySelector('label'),input=group.querySelector('input,select');if(label&&input)label.htmlFor=input.id;});
$('caseText').setAttribute('aria-label','Describa su situación');$('objText').setAttribute('aria-label','Qué resultado busca');$('genSel').setAttribute('aria-label','Cómo nos dirigimos a usted');
$('chatMsgs').setAttribute('aria-live','polite');$('memo').setAttribute('aria-live','polite');$('diagError').setAttribute('role','alert');$('citaError').setAttribute('role','alert');
document.querySelectorAll('.xp-row').forEach(row=>{row.tabIndex=0;row.setAttribute('role','button');row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();goDiag();}});});
const floating=document.createElement('a');floating.className='floating-wa';floating.href='https://wa.me/'+CONFIG.PHONE_INTL;floating.target='_blank';floating.rel='noopener';floating.setAttribute('aria-label','Contactar a Juris Abogados por WhatsApp al 811 519 1418');floating.innerHTML=WA_SVG+'<span>WhatsApp · 811 519 1418</span>';document.body.appendChild(floating);
$('infoWa').textContent=CONFIG.PHONE_DISPLAY;

examples.penal={text:"Quiero consultar una situación relacionada con una investigación penal. Necesito organizar los documentos y las fechas antes de hablar con un abogado.",goal:"Preparar una consulta en materia penal."};
examples.administrativo={text:"La autoridad dejó una multa y una notificación de clausura en mi negocio. Tengo los documentos y quiero consultar qué información revisar con un abogado.",goal:"Preparar una consulta sobre un acto de autoridad."};
