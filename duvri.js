// PhotoSurvey – DUVRI Q8 (Check List): compilazione sul telefono, firme e PDF dal modello originale.
// Il PDF si genera sul telefono (pdf-lib): niente viene salvato sul telefono oltre alla coda di invio all'archivio.
(function(){
const SPEC=[{"id": "A", "titolo": "PARTE A – Verifica della reciproca conoscenza dei rischi dovuti alle interferenze e delle relative misure di protezione e prevenzione", "items": [{"f": "01", "t": "1. Sono stati concordati con il Referente gli orari per l'effettuazione delle attività?"}, {"f": "02", "t": "2. Le Schede di Sicurezza (SdS) contenenti le caratteristiche di pericolosità e tossicità delle sostanze presenti sono disponibili sul PV ed è stata presa visione delle stesse?"}, {"f": "03", "t": "3. Prima dell'inizio dei lavori è stata effettuata un'azione esplorativa al fine di individuare zone con potenziale pericolo di caduta e/o scivolamento?"}, {"f": "04", "t": "4. L'area di lavoro è pulita, libera e sgombra da ostacoli?"}, {"f": "05", "t": "5. Le corsie e le vie di fuga sono sgombre?"}, {"h": "6. Sono disponibili gli appropriati DPI per i rischi presenti: scarpe di sicurezza"}, {"f": "06.1", "t": "guanti protettivi in materiale adeguato", "sub": 1}, {"f": "06.2", "t": "mascherina con filtro", "sub": 1}, {"f": "06.3", "t": "occhiali o visiere protettivi", "sub": 1}, {"f": "06.4", "t": "indumenti antistatici", "sub": 1}, {"f": "06.5", "t": "appropriati DPI per la protezione di corpo, mani e piedi", "sub": 1}, {"f": "06.6", "t": "appropriati DPI per la protezione delle vie respiratorie e della cute ustione", "sub": 1}, {"f": "07", "t": "7. All'interno o in prossimità di ambienti con possibile presenza di atmosfera esplosiva, ove non sia possibile rendere l'atmosfera NON pericolosa i lavoratori sono provvisti di idonei dispositivi di protezione individuale delle vie respiratore, nonché di cintura/imbragatura di sicurezza collegata ad un sistema di salvataggio?"}, {"f": "08", "t": "8. E' stata fornita dal Referente l'esatta localizzazione delle aree del PV con presenza di atmosfera esplosiva (specifiche indicazioni sono contenute nel Documento per la Prevenzione e Protezione da Atmosfere Esplosive, disponibile presso il PV)?"}, {"f": "09", "t": "9. Sono noti i luoghi e le attrezzature pericolose per presenza di elettricità (pompe per la movimentazione dei prodotti, elementi di illuminazione motori, cabine elettriche, cavi elettrici aerei e sotterranei, ecc.) relativamente all'intervento che si sta per iniziare?"}, {"f": "10", "t": "10. E' nota la necessità di prestare attenzione al contatto con le superfici e/o i prodotti caldi e/o freddi presenti sul PV?"}, {"f": "11", "t": "11. È noto che sarà necessario predisporre eventuali barriere e indicazioni/segnali di pericolo specifici (caduta, inciampo, schiacciamento)?"}, {"f": "12", "t": "12. Sono state predisposte adeguate misure preventive e protettive (ad esempio imbracature) per evitare cadute dall'alto?"}, {"f": "13", "t": "13. È noto che prima dell'intervento bisogna agire sulle attrezzature sulle quali si deve intervenire in modo che esse siano state sezionate, bonificate e messe fuori servizio?"}, {"f": "14", "t": "14. È stato comunicato al Referente che il circuito elettrico interessato dai lavori sarà disenergizzato (cioè messo fuori tensione) e bloccato ed bisognerà esporre il segnale di divieto di energizzazione?"}, {"f": "15", "t": "15. È stato comunicato al Referente che l'accesso a quadri e a cabine elettriche è vietato alle persone non autorizzate?"}, {"h": "E' noto che, prima di introdurre gli operatori all'interno e/o in prossimità di ambienti con possibile presenza di atmosfera esplosiva:"}, {"f": "16", "t": "16. Deve essere attiva e idonea la strumentazione atta a rilevare all'interno degli ambienti sospetti le concentrazioni pericolose delle sostanze esplosive"}, {"f": "17", "t": "17. si deve provvedere a ventilare i medesimi adeguatamente?"}, {"f": "18", "t": "18. È stato comunicato al Referente che saranno predisposti segnali di pericolo, coni, recinzioni e divieto di ingresso agli estranei nell'area di lavoro?"}, {"f": "19", "t": "19. In caso di operazioni notturne o in aree a scarsa visibilità vengono indossati indumenti ad alta visibilità?"}, {"f": "20", "t": "20. E' noto che in caso di situazioni anomale, incidenti o quasi incidenti tali situazioni vadano immediatamente riportate al gestore dell'impianto o ad un suo incaricato, e che i lavori vadano immediatamente sospesi, messi in sicurezza e ripresi solo dopo l'eliminazione delle cause?"}, {"h": "In caso vi siano altre imprese:"}, {"f": "21", "t": "21. sono noti i rispettivi reciproci tipi e piani di lavoro?"}, {"f": "22", "t": "22. la tipologia, i piani, le modalità e/o le attrezzature di lavoro delle varie imprese che operano sul sito sono tali da impedire interferenze e rischi reciproci per la salute e la sicurezza dei loro lavoratori?"}, {"f": "23", "t": "23. sono note e concordate le modalità di comunicazione reciproca e le misure per prevenire i rischi dovuti a interferenze?"}]}, {"id": "B", "titolo": "PARTE B – Da compilare in presenza di lavorazioni in spazi totalmente o parzialmente chiusi (pozzetti passo d'uomo, serbatoi carburante/GPL/acqua, vasche di disoleazione, cassa di contenimento serbatoi GPL, sala pompe GPL)", "items": [{"f": "24", "t": "24. E' noto che all'interno di ambienti confinati e/o sospetti di inquinamento possono svilupparsi sostanze tossico/nocive o asfissianti?"}, {"f": "25", "t": "25. È stato testato OGGI il corretto funzionamento dell'esplosimetro con il Bump Test?"}, {"f": "26", "t": "26. Sono stati eseguiti i test atmosferici utilizzando un dispositivo di test certificato?"}, {"f": "27", "t": "27. I requisiti di ventilazione sono stati identificati e l'attrezzatura di ventilazione è disponibile?"}, {"f": "28", "t": "28. Le attrezzature e gli indumenti utilizzati per gli interventi all'interno di ambienti confinati e/o sospetti di inquinamento sono idonei a proteggere gli operatori dai vari rischi?"}, {"f": "29", "t": "29. Le attrezzature e gli indumenti utilizzati per gli interventi all'interno di ambienti confinati e/o sospetti di inquinamento per presenza di GPL o vapori di benzina sono tutti del tipo antistatico?"}, {"f": "30", "t": "30. L'apertura di accesso ad ambienti confinati e/o sospetti di inquinamento ha dimensioni tali da poter consentire l'agevole recupero di un lavoratore privo di sensi?"}, {"f": "31", "t": "31. Almeno un'uscita è raggiungibile da tutti i punti dello spazio confinato?"}, {"f": "32", "t": "32. Sono state erette barriere idonee a proteggere le persone da veicoli in movimento e dalle cadute all'interno dello spazio confinato ed è stato posizionato un estintore facilmente raggiungibile?"}, {"f": "33", "t": "33. Un Piano di Soccorso documentato è disponibile ed è stato rivisto da tutti i lavoratori che operano nello spazio confinato?"}, {"f": "34", "t": "34. È disponibile una persona di supporto per estrarre il lavoratore?"}, {"f": "35", "t": "35. Tutte le attrezzature di soccorso sono disponibili sul sito e ne è stata ispezionata la conformità ai requisiti del prodotto?"}, {"f": "36", "t": "36. È stata eseguita l'ispezione delle imbracature e delle cinghie/funi approvate e ne è stato verificato l'utilizzo da parte del lavoratore che entra nello spazio confinato?"}, {"f": "37", "t": "37. Sono stati presi accordi con il Referente affinché anch'egli verifichi che la cinghia/fune di sicurezza sia stata agganciata all'imbracatura e che l'altro capo è a portata di mano delle persone di supporto o collegato ad un tripode?"}]}, {"id": "C", "titolo": "PARTE C – Da compilare in presenza di lavorazioni che possono esporre il personale a rilasci di fibre da materiali contenenti amianto (MCA)", "items": [{"f": "38", "t": "38. E' noto che all'interno del PV sono stati censiti fabbricati/manufatti o materiali di vario genere che possano contenere amianto?"}, {"f": "39", "t": "39. Prima dell'inizio dei lavori è stata effettuata un'azione esplorativa al fine di individuare i punti in cui sono presenti MCA?"}, {"f": "40", "t": "40. E' stata fornita dal Referente l'esatta localizzazione delle aree del PV con presenza di MCA?"}, {"f": "41", "t": "41. È noto che sarà necessario predisporre eventuali barriere e indicazioni/segnali di pericolo specifici?"}, {"f": "42", "t": "42. I Lavoratori dell'impresa appaltatrice sono in possesso dei DPI specifici per la protezione dai rischi correlati alla presenza di MCA assegnati dal Datore di Lavoro dell'Impresa a seguito della Valutazione dei Rischi?"}, {"f": "43", "t": "43. Le attrezzature e gli indumenti utilizzati per gli interventi sono considerati idonei dall'Appaltatore ai fini della protezione degli operatori dai rischi correlati alla presenza di MCA?"}, {"f": "44", "t": "44. Sono state individuate aree in cui è possibile mangiare e bere senza il rischio di contaminazione da polvere o fibre di amianto?"}, {"f": "45", "t": "45. I lavoratori sono stati informati sul divieto di fumo? Sono stati individuati eventuali postazioni in cui è possibile fumare?"}, {"f": "46", "t": "46. Sono presenti segnalazioni o cartelli di avvertimento in merito ai rischi correlati alla presenza di MCA?"}, {"f": "47", "t": "47. L'appaltatore dispone di specifiche procedure per la gestione dei DPI e degli indumenti potenzialmente contaminati da polveri/fibre provenienti da MCA?"}, {"h": "In caso vi siano altre imprese:"}, {"f": "48", "t": "48. Sono presenti altre imprese impegnate in attività dirette o indirette sui MCA presenti presso il PV?"}, {"f": "49", "t": "49. Sono noti i rispettivi reciproci tipi e piani di lavoro?"}, {"f": "50", "t": "50. Sono note e concordate le modalità di comunicazione reciproca e le misure per prevenire i rischi dovuti a interferenze?"}]}];
const PDFLIB='https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
const TEMPLATE='12%20-%20Check%20List%20DUVRI.pdf';
const INTERVENTI=['MANUTENZIONE ORDINARIA','MANUTENZIONE PROGRAMMATA','MANUTENZIONE EXTRA'];
const css=`
#pDuvri .dv{padding:12px 14px 30px;overflow:auto;flex:1}
#pDuvri .blk{background:#fff;border-radius:12px;padding:12px 14px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
#pDuvri h3{margin:0 0 8px;font-size:15px;color:var(--navy)}
#pDuvri label.f{display:block;font-size:12px;color:#556;margin:8px 0 3px}
#pDuvri input,#pDuvri select{width:100%;box-sizing:border-box;font:inherit;font-size:15px;padding:8px 10px;border:1px solid #d5dae1;border-radius:8px;background:#fff}
#pDuvri input[readonly]{background:#f1f3f6;color:#334}
#pDuvri .g2{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
#pDuvri .q{display:flex;gap:8px;align-items:flex-start;padding:8px 0;border-top:1px solid #eef0f3;font-size:13.5px;line-height:1.35}
#pDuvri .q.sub{padding-left:16px}
#pDuvri .q .t{flex:1}
#pDuvri .q .o{display:flex;gap:4px;flex:none}
#pDuvri .q .o button{width:40px;height:32px;border:1px solid #cfd5dd;border-radius:7px;background:#fff;font-weight:700;font-size:12px;color:#445}
#pDuvri .q .o button.on[data-v="Scelta1"]{background:#2e7d32;border-color:#2e7d32;color:#fff}
#pDuvri .q .o button.on[data-v="Scelta2"]{background:#c62828;border-color:#c62828;color:#fff}
#pDuvri .q .o button.on[data-v="Scelta3"]{background:#607d8b;border-color:#607d8b;color:#fff}
#pDuvri .qh{font-size:13px;font-weight:600;color:#334;padding:8px 0 2px;border-top:1px solid #eef0f3}
#pDuvri .all{display:flex;gap:6px;margin:4px 0 6px}
#pDuvri .all button{flex:1;font-size:12px;padding:6px;border:1px solid #cfd5dd;border-radius:8px;background:#f7f8fa}
#pDuvri .cnt{font-size:12px;color:#778;margin-left:6px;font-weight:400}
#pDuvri .sig{border:1px dashed #9aa6b5;border-radius:10px;background:#fbfcfd;touch-action:none;width:100%;height:130px;display:block}
#pDuvri .sigh{display:flex;justify-content:space-between;align-items:center;margin:10px 0 4px;font-size:13px;font-weight:600;color:#334}
#pDuvri .sigh button{font-size:12px;border:0;background:none;color:var(--navy);text-decoration:underline}
#pDuvri .done{display:none}
#pDuvri .done.on{display:block}
`;
let st=null, cur=null, lib=null;
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const p2=n=>String(n).padStart(2,'0');
function loadLib(){ if(window.PDFLib) return Promise.resolve(); return new Promise((ok,ko)=>{ const s=document.createElement('script'); s.src=PDFLIB; s.onload=ok; s.onerror=()=>ko(new Error('Libreria PDF non disponibile: serve la rete la prima volta')); document.head.appendChild(s); }); }
function build(){
  if($('#pDuvri')) return;
  const sty=document.createElement('style'); sty.textContent=css; document.head.appendChild(sty);
  const sec=document.createElement('section'); sec.className='page'; sec.id='pDuvri'; sec.setAttribute('aria-label','DUVRI');
  const parti=SPEC.map(p=>`<div class="blk" data-part="${p.id}"><h3>${esc(p.titolo)} <span class="cnt" id="cnt${p.id}"></span></h3>
    <div class="all"><button data-all="Scelta1">Tutte SÌ</button><button data-all="Scelta2">Tutte NO</button><button data-all="Scelta3">Tutte NA</button><button data-all="">Azzera</button></div>
    ${p.items.map(i=>i.h?`<div class="qh">${esc(i.h)}</div>`:`<div class="q${i.sub?' sub':''}" data-f="${i.f}"><div class="t">${esc(i.t)}</div><div class="o"><button data-v="Scelta1">SÌ</button><button data-v="Scelta2">NO</button><button data-v="Scelta3">NA</button></div></div>`).join('')}</div>`).join('');
  sec.innerHTML=`<header><button class="back" id="bDvBack" aria-label="Indietro">←</button><h2>📄 DUVRI – Check List Q8</h2></header>
  <div class="dv">
    <div class="blk"><h3>Informazioni generali</h3>
      <div class="g2"><div><label class="f">N. richiesta (RS)</label><input id="dvRS" readonly></div><div><label class="f">Data</label><input id="dvData" type="date"></div></div>
      <label class="f">Intervento di</label><select id="dvInt">${INTERVENTI.map(x=>`<option>${x}</option>`).join('')}</select>
      <div class="g2"><div><label class="f">Codice PV (Outlet)</label><input id="dvPV" readonly></div><div><label class="f">Ditta</label><input value="ARGELATO SRL" readonly></div></div>
      <label class="f">Indirizzo PV</label><input id="dvInd">
      <div class="g2"><div><label class="f">Ora inizio lavori</label><input id="dvOra1" type="time"></div><div><label class="f">Ora fine lavori</label><input id="dvOra2" type="time"></div></div>
      <label class="f">Responsabile dell'intervento</label><input id="dvResp">
      <div class="g2"><div><label class="f">N. operai</label><input id="dvOper" type="number" min="1" inputmode="numeric"></div><div><label class="f">Altre imprese presenti</label><select id="dvAltre"><option></option><option>NO</option><option>SI</option></select></div></div>
      <div class="g2"><div><label class="f">Scarico autobotte dalle ore</label><input id="dvAb1" type="time"></div><div><label class="f">alle ore</label><input id="dvAb2" type="time"></div></div>
      <label class="f">Cambio del personale del PV durante i lavori</label><input id="dvCambio" placeholder="es. NO / alle ore 14:00">
      <label class="f">È necessario sospendere l'attività del PV?</label><select id="dvSosp"><option></option><option>NO</option><option>SI</option></select>
      <label class="f">Referente PV (gestore)</label><input id="dvRef">
    </div>
    ${parti}
    <div class="blk"><h3>Firme</h3>
      <div class="sigh"><span>Firma del responsabile dell'attività</span><button data-clr="0">Cancella</button></div><canvas class="sig" id="dvSig0"></canvas>
      <div class="sigh"><span>Firma del Referente / gestore</span><button data-clr="1">Cancella</button></div><canvas class="sig" id="dvSig1"></canvas>
    </div>
    <button class="btn a" id="bDvOk" style="width:100%">✅ Completo</button>
    <div class="blk done" id="dvDone" style="margin-top:12px"><h3>DUVRI pronto</h3><div id="dvName" style="font-size:13px;margin-bottom:8px;word-break:break-all"></div>
      <div class="row2" style="display:flex;gap:8px"><button class="btn s" id="bDvDl" style="flex:1">⬇ Scarica</button><button class="btn s" id="bDvSh" style="flex:1">📤 Invia (WhatsApp…)</button></div>
      <div id="dvArch" style="font-size:12px;color:#667;margin-top:8px"></div></div>
  </div>`;
  document.body.appendChild(sec);
  $('#bDvBack').onclick=()=>{ if(history.state&&history.state.duvri) history.back(); else close(); };
  sec.addEventListener('click',e=>{
    const b=e.target.closest('.q .o button'); if(b){ const q=b.closest('.q'); const v=st.r[q.dataset.f]===b.dataset.v?'':b.dataset.v; st.r[q.dataset.f]=v; paint(); return; }
    const a=e.target.closest('[data-all]'); if(a){ a.closest('.blk').querySelectorAll('.q').forEach(q=>st.r[q.dataset.f]=a.dataset.all); paint(); return; }
    const c=e.target.closest('[data-clr]'); if(c){ clearSig(+c.dataset.clr); }
  });
  ['dvData','dvInt','dvInd','dvOra1','dvOra2','dvResp','dvOper','dvAltre','dvAb1','dvAb2','dvCambio','dvSosp','dvRef'].forEach(id=>$('#'+id).addEventListener('input',()=>{ st.f[id]=$('#'+id).value; }));
  [0,1].forEach(initSig);
  $('#bDvOk').onclick=complete;
  $('#bDvDl').onclick=()=>{ if(!st.pdf) return; const a=document.createElement('a'); a.href=URL.createObjectURL(st.pdf); a.download=st.name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},4000); };
  $('#bDvSh').onclick=async()=>{ if(!st.pdf) return; const f=new File([st.pdf],st.name,{type:'application/pdf'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){ try{ await navigator.share({files:[f],title:'DUVRI '+st.pv}); }catch(e){} } else { window.toast&&toast('Condivisione non disponibile: usa Scarica e allega il file',3500); } };
}
function paint(){
  document.querySelectorAll('#pDuvri .q').forEach(q=>{ const v=st.r[q.dataset.f]||''; q.querySelectorAll('.o button').forEach(b=>b.classList.toggle('on',b.dataset.v===v)); });
  SPEC.forEach(p=>{ const fs=p.items.filter(i=>i.f); const n=fs.filter(i=>st.r[i.f]).length; $('#cnt'+p.id).textContent=`(${n}/${fs.length})`; });
}
function initSig(k){
  const cv=$('#dvSig'+k); let drawing=false,last=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]; };
  cv.addEventListener('pointerdown',e=>{ drawing=true; last=pos(e); cv.setPointerCapture(e.pointerId); st.sig[k]=true; e.preventDefault(); });
  cv.addEventListener('pointermove',e=>{ if(!drawing) return; const p=pos(e), g=cv.getContext('2d'); g.lineWidth=3.2; g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='#0b2a5b'; g.beginPath(); g.moveTo(last[0],last[1]); g.lineTo(p[0],p[1]); g.stroke(); last=p; e.preventDefault(); });
  ['pointerup','pointercancel','pointerleave'].forEach(t=>cv.addEventListener(t,()=>{ drawing=false; }));
}
function sizeSig(){ [0,1].forEach(k=>{ const cv=$('#dvSig'+k); const w=Math.round(cv.getBoundingClientRect().width*2)||640; if(cv.width!==w){ cv.width=w; cv.height=Math.round(w*130/Math.max(1,cv.getBoundingClientRect().width)); st.sig[k]=false; } }); }
function clearSig(k){ const cv=$('#dvSig'+k); cv.getContext('2d').clearRect(0,0,cv.width,cv.height); st.sig[k]=false; }
function tipoToInt(r){ const t=String(r.tipo||'').toUpperCase(); return t==='PROGRAMMATA'?INTERVENTI[1]:(t==='EXTRAFORFAIT'?INTERVENTI[2]:INTERVENTI[0]); }
function fill(){
  const set=(id,v)=>{ $('#'+id).value=v==null?'':v; };
  Object.entries(st.f).forEach(([k,v])=>set(k,v));
  set('dvRS',st.rs); set('dvPV',st.pv);
}
window.openDuvri=function(r,ctx){
  build();
  const key=(ctx.pv||'')+'|'+(r.n||'');
  if(!st||st.key!==key){
    const d=new Date();
    st={key,rs:r.n||'',pv:ctx.pv,r:{},sig:[false,false],pdf:null,name:'',
      f:{dvData:`${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`,dvInt:tipoToInt(r),dvInd:ctx.addr||'',dvOra1:`${p2(d.getHours())}:${p2(d.getMinutes())}`,dvOra2:'',
         dvResp:ctx.user||'',dvOper:'',dvAltre:'',dvAb1:'',dvAb2:'',dvCambio:'',dvSosp:'',dvRef:ctx.ref||''},ctx};
    $('#dvDone').classList.remove('on');
  }
  fill(); paint();
  $('#pDuvri').classList.add('open'); history.pushState({duvri:1},'');
  requestAnimationFrame(()=>{ const had=st.sig.slice(); sizeSig(); if(had.some(Boolean)){ /* ridimensionamento: firme da rifare */ } });
  $('#pDuvri .dv').scrollTop=0;
};
function close(){ $('#pDuvri').classList.remove('open'); }
window.duvriOpen=()=>!!($('#pDuvri')&&$('#pDuvri').classList.contains('open'));
window.closeDuvri=close;
function clean(s){ return String(s==null?'':s).normalize('NFC').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/[^\x20-\x7E\xA0-\xFF]/g,''); }
const norm=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase().replace(/[^A-Z0-9]/g,'');
function trimCanvas(cv){
  const g=cv.getContext('2d'), {width:w,height:h}=cv, d=g.getImageData(0,0,w,h).data; let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) if(d[(y*w+x)*4+3]>10){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
  if(x1<0) return null; const pad=6; x0=Math.max(0,x0-pad); y0=Math.max(0,y0-pad); x1=Math.min(w-1,x1+pad); y1=Math.min(h-1,y1+pad);
  const o=document.createElement('canvas'); o.width=x1-x0+1; o.height=y1-y0+1; o.getContext('2d').drawImage(cv,x0,y0,o.width,o.height,0,0,o.width,o.height); return o;
}
async function complete(){
  const btn=$('#bDvOk');
  const miss=SPEC.flatMap(p=>p.items.filter(i=>i.f&&!st.r[i.f]).map(i=>p.id)).length;
  const warn=[]; if(miss) warn.push(miss+' domande senza risposta'); if(!st.sig[0]) warn.push('manca la firma del responsabile'); if(!st.sig[1]) warn.push('manca la firma del referente');
  if(warn.length&&!confirm('Attenzione: '+warn.join(', ')+'.\nGenero comunque il PDF?')) return;
  btn.disabled=true; btn.textContent='⏳ Genero il PDF…';
  try{
    await loadLib(); const L=window.PDFLib;
    const bytes=await fetch(TEMPLATE,{cache:'no-cache'}).then(r=>{ if(!r.ok) throw new Error('Modello DUVRI non trovato'); return r.arrayBuffer(); });
    const doc=await L.PDFDocument.load(bytes); const form=doc.getForm();
    const byName={}; form.getFields().forEach(f=>byName[norm(f.getName())]=f);
    const T=(n,v)=>{ const f=byName[norm(n)]; if(f&&f.setText){ try{ f.setText(clean(v)); }catch(e){} } };
    const [yy,mm,dd]=(st.f.dvData||'').split('-');
    const dataIt=dd?`${dd}/${mm}/${yy}`:'';
    T('DITTA','ARGELATO SRL'); T('data',dataIt); T('INTERVENTO DI',st.f.dvInt); T('CODICEPV',st.pv); T('INDIRIZZOPV',st.f.dvInd);
    T('ORA',st.f.dvOra1); T('ORA_2',st.f.dvOra2); T('RESPONSABILE DELLINTERVENTO',st.f.dvResp); T('N OPERAI',st.f.dvOper);
    T('PRESENZA DI ALTRE IMPRESE CHE ESEGUONO I LAVORI SINO',st.f.dvAltre); T('SCARICO AUTOBOTTE PREVISTO DALLE ORE',st.f.dvAb1); T('ALLE ORE',st.f.dvAb2);
    T('CAMBIO DEL PERSONALE DEL PV DURANTE IL CORSO DEI LAVORI',st.f.dvCambio); T('È NECESSARIO SOSPENDERE LATTIVITÀ DEL PV SINO',st.f.dvSosp);
    T('REFERENTE PV',st.f.dvRef); T('RS',st.rs);
    // Caselle SÌ/NO/NA: le lascio vuote nel modulo e disegno una X nella casella scelta (resa uguale su tutti i lettori PDF)
    const pages=doc.getPages(), refOf=w=>doc.context.getObjectRef(w.dict);
    const pageOf=w=>{ const r=refOf(w); return pages.find(p=>{ const a=p.node.Annots(); return a&&a.asArray().some(x=>x===r||String(x)===String(r)); }); };
    const marks=[];
    Object.entries(st.r).forEach(([k,v])=>{ if(!v) return; const f=byName[norm(k)]; if(!f||!f.acroField.getWidgets) return;
      f.acroField.getWidgets().forEach(w=>{ const on=w.getOnValue&&w.getOnValue(); if(on&&String(on).replace('/','')===v){ const pg=pageOf(w); if(pg) marks.push([pg,w.getRectangle()]); } }); });
    // pulsanti del modulo (Stampa, Reset): tolti dal PDF finale
    form.getFields().forEach(f=>{ if(!(f instanceof L.PDFButton)) return;
      f.acroField.getWidgets().forEach(w=>{ const r=refOf(w); pages.forEach(p=>{ if(r) p.node.removeAnnot(r); }); });
      form.acroForm.removeField(f.acroField); });
    const font=await doc.embedFont(L.StandardFonts.Helvetica), bold=await doc.embedFont(L.StandardFonts.HelveticaBold);
    form.updateFieldAppearances(font); form.flatten();
    // dopo flatten pdf-lib lascia nelle pagine riferimenti ai widget eliminati: le stampanti/Acrobat vedono il file come danneggiato. Li tolgo.
    await doc.flush();
    { const ctx=doc.context, has=r=>!!ctx.lookup(r);
      const fixArr=a=>{ for(let i=a.size()-1;i>=0;i--){ const v=a.get(i); if(v instanceof L.PDFRef&&!has(v)) a.remove(i); } };
      const fixDict=d=>{ for(const [k,v] of d.entries()){ if(v instanceof L.PDFRef&&!has(v)) d.delete(k); else if(v instanceof L.PDFArray) fixArr(v); else if(v instanceof L.PDFDict) fixDict(v); } };
      for(const [,o] of ctx.enumerateIndirectObjects()){ if(o instanceof L.PDFArray) fixArr(o); else if(o instanceof L.PDFDict) fixDict(o); else if(o instanceof L.PDFStream) fixDict(o.dict); }
      pages.forEach(p=>{ const a=p.node.lookup(L.PDFName.of('Annots')); if(a instanceof L.PDFArray&&a.size()===0) p.node.delete(L.PDFName.of('Annots')); });
      const af=doc.catalog.lookup(L.PDFName.of('AcroForm')); if(af instanceof L.PDFDict){ af.set(L.PDFName.of('Fields'),ctx.obj([])); af.delete(L.PDFName.of('CO')); af.delete(L.PDFName.of('NeedAppearances')); } }
    marks.forEach(([p,r])=>{ const sz=Math.min(r.width,r.height)*0.95, w=bold.widthOfTextAtSize('X',sz);
      p.drawText('X',{x:r.x+(r.width-w)/2,y:r.y+(r.height-sz*0.72)/2,size:sz,font:bold,color:L.rgb(0.05,0.17,0.36)}); });
    const pg=pages[3];
    const boxes=[[58,262,220,26],[342,262,186,26]];
    for(const k of [0,1]){ if(!st.sig[k]) continue; const t=trimCanvas($('#dvSig'+k)); if(!t) continue;
      const png=await doc.embedPng(t.toDataURL('image/png')); const [bx,by,bw,bh]=boxes[k]; const s=Math.min(bw/png.width,bh/png.height);
      pg.drawImage(png,{x:bx+(bw-png.width*s)/2,y:by,width:png.width*s,height:png.height*s}); }
    doc.setTitle('DUVRI '+st.pv+' '+st.rs); doc.setProducer('PhotoSurvey');
    const out=await doc.save({useObjectStreams:false});
    st.pdf=new Blob([out],{type:'application/pdf'});
    st.name=`${yy.slice(2)}${mm}${dd}.${String(st.pv).padStart(5,'0')}.${st.ctx.code}.DUVRI.pdf`;
    $('#dvName').textContent=st.name; $('#dvDone').classList.add('on'); $('#dvDone').scrollIntoView({behavior:'smooth'});
    if(st.ctx.archive){ $('#dvArch').textContent='⏳ Invio all\'archivio del PV in corso…'; try{ await st.ctx.archive(st.pdf,st.name); $('#dvArch').textContent='📁 Inviato all\'archivio del PV (o in coda se manca la rete).'; }catch(e){ $('#dvArch').textContent='⚠️ Archiviazione non riuscita: '+e.message; } }
  }catch(e){ alert('Errore nella generazione del PDF: '+e.message); }
  finally{ btn.disabled=false; btn.textContent='✅ Completo'; }
}
})();
