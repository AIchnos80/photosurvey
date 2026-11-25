// PhotoSurvey – DUVRI ENILIVE (Scheda operativa della Procedura Applicativa del DUVRI - RDI):
// compilazione sul telefono, 4 firme col dito e PDF dal modello originale (pdf-lib). Il PDF e le firme restano solo in memoria.
(function(){
const PDFLIB='https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
const TEMPLATES=['DUVRI_Enilive.pdf','DUVRI%20Enilive.pdf']; // il modello può essere caricato con o senza trattino basso
// caselle del modello (nome del campo PDF → testo sullo schermo)
const C2=[
  ['Nessuna interferenza significativa non occorre compilare i rimanenti campi','a) Nessuna interferenza significativa, non occorre compilare i rimanenti campi'],
  ['Possibile interferenza significativa con lattività del personale del sito È compresa nella valutazione',"b) Possibile interferenza significativa con l'attività del personale del sito (compilare i Campi 3 e 4)"],
  ['Possibile interferenza con altri lavoriimprese in zona In questo caso elencare tali lavoriimprese Compilare','c) Possibile interferenza con altri lavori/imprese in zona: elencare tali lavori/imprese (compilare i Campi 3 e 4)']];
const C3I=[
  ['Isolaredelimitaresegnalare larea lavori',"Isolare/delimitare/segnalare l'area lavori"],
  ['Protezioni da adottare in caso di lavori in quota','Protezioni da adottare in caso di lavori in quota','Descrizioneprescrizionilavoriinquota'],
  ['Informare il proprio personale di operazioni sullarea di lavoro da parte del personale del sito eo di',"Informare il proprio personale di operazioni sull'area di lavoro da parte del personale del sito e/o di altre imprese"],
  ['Sospendere i lavori durante lesecuzione di operazioni sullarea di lavoro da parte di personale del sito eo',"Sospendere i lavori durante l'esecuzione di operazioni sull'area di lavoro da parte di personale del sito e/o di altre imprese"],
  ['Altro descrivere','Altro (descrivere)','AltroDescrizione']];
const C3G=[
  ['Informare il personale dellimpresa di altri lavori in corso nellarea di lavoro',"Informare il personale dell'impresa di altri lavori in corso nell'area di lavoro"],
  ['Vietare laccesso allarea di lavoro ai non interessati',"Vietare l'accesso all'area di lavoro ai non interessati"],
  ['Mettere in attoautorizzare eventuali operazioni nellarea lavori solo previa sospensione degli stessi e messa in',"Mettere in atto/autorizzare eventuali operazioni nell'area lavori solo previa sospensione degli stessi e messa in sicurezza dell'area da parte dell'impresa n.1"],
  ['Altro descrivere_2','Altro (descrivere)','AltroDescrizione2']];
// riquadri firma (punti PDF, pagina 1): sulla riga "Firma" di ciascuna colonna Impresa n.1…n.4
const SIGBOX=[[55,95,138,62],[202,95,106,62],[316,95,106,62],[430,95,97,62],[388,175,128,52]]; // Impresa n.1–4: tutta la cella sotto "Impresa n.x" // ultimo: firma del Gestore PV (riquadro a destra di "Timbro e firma del Gestore")
const css=`
#pDuvriE .dv{padding:12px 14px 30px;overflow:auto;flex:1}
#pDuvriE .blk{background:#fff;border-radius:12px;padding:12px 14px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
#pDuvriE h3{margin:0 0 8px;font-size:15px;color:var(--navy)}
#pDuvriE h4{margin:12px 0 4px;font-size:13.5px;color:#334}
#pDuvriE .note{font-size:12px;color:#667;margin:2px 0 6px}
#pDuvriE label.f{display:block;font-size:12px;color:#556;margin:8px 0 3px}
#pDuvriE input,#pDuvriE textarea{width:100%;box-sizing:border-box;font:inherit;font-size:15px;padding:8px 10px;border:1px solid #d5dae1;border-radius:8px;background:#fff}
#pDuvriE textarea{resize:vertical;min-height:64px}
#pDuvriE input[readonly]{background:#f1f3f6;color:#334}
#pDuvriE .g2{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
#pDuvriE .ck{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-top:1px solid #eef0f3;font-size:13.5px;line-height:1.35;cursor:pointer}
#pDuvriE .ck .b{flex:none;width:26px;height:26px;border:2px solid #9aa6b5;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;margin-top:-2px}
#pDuvriE .ck.on .b{background:var(--navy);border-color:var(--navy)}
#pDuvriE .ck.on .b::after{content:"✓"}
#pDuvriE .ck .t{flex:1}
#pDuvriE .sub{margin:-2px 0 6px 36px}
#pDuvriE .imp{display:grid;grid-template-columns:1.2fr 1fr;gap:0 8px}
#pDuvriE .sug{font-size:12px;border:0;background:none;color:var(--navy);text-decoration:underline;padding:0;margin-left:6px}
#pDuvriE .sig{border:1px dashed #9aa6b5;border-radius:10px;background:#fbfcfd;touch-action:none;width:100%;height:120px;display:block}
#pDuvriE .sigh{display:flex;justify-content:space-between;align-items:center;margin:12px 0 4px;font-size:13px;font-weight:600;color:#334}
#pDuvriE .sigh button{font-size:12px;border:0;background:none;color:var(--navy);text-decoration:underline}
#pDuvriE .done{display:none}
#pDuvriE .done.on{display:block}
`;
let st=null;
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const p2=n=>String(n).padStart(2,'0');
const today=()=>{ const d=new Date(); return `${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`; };
const dIt=s=>{ const m=String(s||'').match(/^(\d{4})-(\d\d)-(\d\d)/); return m?`${m[3]}/${m[2]}/${m[1]}`:''; };
function loadLib(){ if(window.PDFLib) return Promise.resolve(); return new Promise((ok,ko)=>{ const s=document.createElement('script'); s.src=PDFLIB; s.onload=ok; s.onerror=()=>ko(new Error('Libreria PDF non disponibile: serve la rete la prima volta')); document.head.appendChild(s); }); }
// Sunto suggerito dalla descrizione della richiesta: testo ripulito e accorciato per stare nelle 2 righe del modello
function sunto(desc){
  let s=String(desc||'').replace(/\+?\d[\d .\/-]{7,}\d/g,'').replace(/\s+/g,' ').trim();
  s=s.replace(/^(guasto|segnalazione|richiesta|descrizione( problema)?)\s*[:\-–]\s*/i,'');
  s=s.replace(/\b(contattare|chiamare|tel(efono)?|cell(ulare)?|referente|rif\.?)\b.*$/i,'').replace(/[\s,;:.\-–]+$/,'').trim();
  if(s.length>160){ s=s.slice(0,160); const k=s.lastIndexOf(' '); if(k>100) s=s.slice(0,k); s=s.replace(/[\s,;:.\-–]+$/,'')+'…'; }
  return s?s.charAt(0).toUpperCase()+s.slice(1):'';
}
function ckRow(name,label,extra){ return `<div class="ck" data-ck="${esc(name)}"><span class="b"></span><span class="t">${esc(label)}</span></div>${extra?`<div class="sub"><input data-tx="${esc(extra)}" placeholder="descrizione"></div>`:''}`; }
function build(){
  if($('#pDuvriE')) return;
  const sty=document.createElement('style'); sty.textContent=css; document.head.appendChild(sty);
  const sec=document.createElement('section'); sec.className='page'; sec.id='pDuvriE'; sec.setAttribute('aria-label','DUVRI ENILIVE');
  sec.innerHTML=`<header><button class="back" id="bDeBack" aria-label="Indietro">←</button><h2>📄 DUVRI – ENILIVE</h2></header>
  <div class="dv">
    <div class="blk"><h3>CAMPO 1 – Informazioni generali</h3>
      <label class="f">Richiesta</label><input data-tx="Richiesta" readonly>
      <div class="g2"><div><label class="f">Data inizio lavoro</label><input data-tx="Data inizio lavoro" data-date type="date"></div>
        <div><label class="f">Data prevista fine lavoro</label><input data-tx="Data prevista per la fine del lavoro" data-date type="date"></div></div>
      <label class="f">Apparecchiatura o zona di lavoro</label><input data-tx="Apparecchiatura o zona di lavoro">
      <label class="f">Descrizione del lavoro <button class="sug" id="bDeSug">↻ sunto dalla richiesta</button></label><textarea data-tx="Descrizione del lavoro 1" maxlength="220"></textarea>
      <label class="f">Ragione Sociale Impresa n.1</label><input data-tx="Ragione Sociale Impresa n1">
      <label class="f">Nominativo del Responsabile/Preposto dell'Impresa</label><input data-tx="Nominativo del ResponsabilePreposto dellImpresa">
    </div>
    <div class="blk"><h3>CAMPO 2 – Tipo di interferenza</h3>
      ${C2.map(c=>ckRow(c[0],c[1])).join('')}
      <h4>Altre imprese</h4>
      ${[2,3,4].map((n,i)=>`<div class="imp"><div><label class="f">Ragione Sociale Impresa n.${n}</label><input data-tx="Ragione Sociale Impresa n${n}"></div><div><label class="f">Attività</label><input data-tx="${['Attività','Attività_2','Attività_3'][i]}"></div></div>`).join('')}
    </div>
    <div class="blk"><h3>CAMPO 3 – Rischio accettabile con prescrizioni</h3>
      <h4>Precauzioni a carico dell'impresa n.1</h4>
      ${C3I.map(c=>ckRow(c[0],c[1],c[2])).join('')}
      <h4>Precauzioni a carico del Gestore PV</h4>
      ${C3G.map(c=>ckRow(c[0],c[1],c[2])).join('')}
    </div>
    <div class="blk"><h3>CAMPO 4 – Allegati, firmatari e revisione</h3>
      <label class="f">Eventuali allegati (verbali di riunione, programmi lavori…), soggetti che hanno partecipato alla compilazione</label>
      <textarea data-tx="partecipato alla compilazione della Scheda ed eventuale stato di revisione della stessa 1" maxlength="400"></textarea>
      <div class="g2"><div><label class="f">Revisione/integrazione n°</label><input data-tx="Revisioneintegrazione n" inputmode="numeric"></div>
        <div><label class="f">del</label><input data-tx="del" data-date type="date"></div></div>
      <label class="f">Timbro e firma del Gestore del Punto Vendita</label><input data-tx="Timbro e firma del Gestore del Punto Vendita">
    </div>
    <div class="blk"><h3>Timbri e firme</h3>
      <div class="note">Il timbro di ogni impresa va sulla riga "Timbro" del modulo; la firma si fa qui col dito.</div>
      ${[1,2,3,4].map(n=>`<div class="sigh"><span>Impresa n.${n}</span><button data-clr="${n-1}">Cancella firma</button></div>
        <input data-tx="${n===1?'Firma':'Firma_'+n}" placeholder="Timbro / nome impresa n.${n}" style="margin-bottom:6px">
        <canvas class="sig" id="deSig${n-1}"></canvas>`).join('')}
      <div class="sigh"><span>Gestore del Punto Vendita</span><button data-clr="4">Cancella firma</button></div>
      <canvas class="sig" id="deSig4"></canvas>
    </div>
    <button class="btn a" id="bDeOk" style="width:100%">✅ Completo</button>
    <div class="blk done" id="deDone" style="margin-top:12px"><h3>DUVRI pronto</h3><div id="deName" style="font-size:13px;margin-bottom:8px;word-break:break-all"></div>
      <div style="display:flex;gap:8px"><button class="btn s" id="bDeDl" style="flex:1">⬇ Scarica</button><button class="btn s" id="bDeSh" style="flex:1">📤 Invia (WhatsApp…)</button></div>
      <div id="deArch" style="font-size:12px;color:#667;margin-top:8px"></div></div>
  </div>`;
  document.body.appendChild(sec);
  $('#bDeBack').onclick=()=>{ if(history.state&&history.state.duvriE) history.back(); else close(); };
  sec.addEventListener('click',e=>{
    const k=e.target.closest('.ck'); if(k){ const n=k.dataset.ck, v=!st.c[n]; st.c[n]=v;
      if(v&&n===C2[0][0]){ st.c[C2[1][0]]=false; st.c[C2[2][0]]=false; } else if(v&&(n===C2[1][0]||n===C2[2][0])) st.c[C2[0][0]]=false;
      paint(); return; }
    const c=e.target.closest('[data-clr]'); if(c) clearSig(+c.dataset.clr);
  });
  sec.addEventListener('input',e=>{ const t=e.target.closest('[data-tx]'); if(t) st.t[t.dataset.tx]=t.value; });
  $('#bDeSug').onclick=()=>{ const s=sunto(st.ctx.desc); st.t['Descrizione del lavoro 1']=s; fill(); if(!s) window.toast&&toast('La richiesta non ha una descrizione',2500); };
  [0,1,2,3,4].forEach(initSig);
  $('#bDeOk').onclick=complete;
  $('#bDeDl').onclick=()=>{ if(!st.pdf) return; const a=document.createElement('a'); a.href=URL.createObjectURL(st.pdf); a.download=st.name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},4000); };
  $('#bDeSh').onclick=async()=>{ if(!st.pdf) return; const f=new File([st.pdf],st.name,{type:'application/pdf'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){ try{ await navigator.share({files:[f],title:'DUVRI '+st.pv}); }catch(e){} } else { window.toast&&toast('Condivisione non disponibile: usa Scarica e allega il file',3500); } };
}
function paint(){ document.querySelectorAll('#pDuvriE .ck').forEach(k=>k.classList.toggle('on',!!st.c[k.dataset.ck])); }
function fill(){ document.querySelectorAll('#pDuvriE [data-tx]').forEach(i=>{ i.value=st.t[i.dataset.tx]||''; }); }
function initSig(k){
  const cv=$('#deSig'+k); let drawing=false,last=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]; };
  cv.addEventListener('pointerdown',e=>{ drawing=true; last=pos(e); cv.setPointerCapture(e.pointerId); st.sig[k]=true; e.preventDefault(); });
  cv.addEventListener('pointermove',e=>{ if(!drawing) return; const p=pos(e), g=cv.getContext('2d'); g.lineWidth=3.2; g.lineCap='round'; g.lineJoin='round'; g.strokeStyle='#0b2a5b'; g.beginPath(); g.moveTo(last[0],last[1]); g.lineTo(p[0],p[1]); g.stroke(); last=p; e.preventDefault(); });
  ['pointerup','pointercancel','pointerleave'].forEach(t=>cv.addEventListener(t,()=>{ drawing=false; }));
}
function sizeSig(){ [0,1,2,3,4].forEach(k=>{ const cv=$('#deSig'+k), r=cv.getBoundingClientRect(); const w=Math.round(r.width*2)||640; if(cv.width!==w){ cv.width=w; cv.height=Math.round(w*120/Math.max(1,r.width)); st.sig[k]=false; } }); }
function clearSig(k){ const cv=$('#deSig'+k); cv.getContext('2d').clearRect(0,0,cv.width,cv.height); st.sig[k]=false; }
function wipeSigs(){ [0,1,2,3,4].forEach(k=>{ const cv=$('#deSig'+k); if(cv) clearSig(k); }); }
window.openDuvriEni=function(r,ctx){
  build();
  const key=(ctx.pv||'')+'|'+(r.n||'');
  if(!st||st.key!==key){
    if(st) wipeSigs();
    const d=today();
    st={key,rs:r.n||'',pv:ctx.pv,c:{},sig:[false,false,false,false,false],pdf:null,name:'',ctx:{...ctx,desc:r.desc||''},
      t:{'Richiesta':r.n||'','Data inizio lavoro':d,'Data prevista per la fine del lavoro':d,'Descrizione del lavoro 1':sunto(r.desc),
         'Ragione Sociale Impresa n1':'ARGELATO SRL','Nominativo del ResponsabilePreposto dellImpresa':ctx.user||'','Firma':ctx.user||'',
         'Timbro e firma del Gestore del Punto Vendita':[ctx.pv,ctx.addr].filter(Boolean).join(' - ')}};
    $('#deDone').classList.remove('on');
  }
  st.ctx={...st.ctx,...ctx,desc:r.desc||''};
  fill(); paint();
  $('#pDuvriE').classList.add('open'); history.pushState({duvriE:1},'');
  requestAnimationFrame(sizeSig);
  $('#pDuvriE .dv').scrollTop=0;
};
function close(){ $('#pDuvriE').classList.remove('open'); }
window.duvriEniOpen=()=>!!($('#pDuvriE')&&$('#pDuvriE').classList.contains('open'));
window.closeDuvriEni=close;
function clean(s){ return String(s==null?'':s).normalize('NFC').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/…/g,'...').replace(/[^\x0A\x20-\x7E\xA0-\xFF]/g,''); }
function trimCanvas(cv){
  const g=cv.getContext('2d'), {width:w,height:h}=cv, d=g.getImageData(0,0,w,h).data; let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) if(d[(y*w+x)*4+3]>10){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
  if(x1<0) return null; const pad=6; x0=Math.max(0,x0-pad); y0=Math.max(0,y0-pad); x1=Math.min(w-1,x1+pad); y1=Math.min(h-1,y1+pad);
  const o=document.createElement('canvas'); o.width=x1-x0+1; o.height=y1-y0+1; o.getContext('2d').drawImage(cv,x0,y0,o.width,o.height,0,0,o.width,o.height); return o;
}
// testo nel campo: riduce il carattere (9 → 6 pt) finché non ci sta
function fitText(L,font,f,txt){
  const w=f.acroField.getWidgets()[0], r=w.getRectangle(), multi=f.isMultiline&&f.isMultiline(), W=r.width-4, H=r.height-2;
  const da=String((f.acroField.getDefaultAppearance&&f.acroField.getDefaultAppearance())||''), m=da.match(/([\d.]+)\s+Tf/); let size=m&&+m[1]>0?+m[1]:9;
  const lines=sz=>{ if(!multi) return 1; let n=0; for(const par of txt.split('\n')){ let line=''; n++; for(const word of par.split(' ')){ const t=line?line+' '+word:word; if(font.widthOfTextAtSize(t,sz)>W&&line){ n++; line=word; } else line=t; } } return n; };
  if(multi){ while(size>6&&lines(size)*size*1.15>H) size-=0.5; } else { while(size>6&&font.widthOfTextAtSize(txt,size)>W) size-=0.5; }
  if(txt.length>0&&f.acroField.getWidgets()[0]){ try{ f.setFontSize(size); }catch(e){} }
  f.setText(txt);
}
async function complete(){
  const btn=$('#bDeOk');
  const nsig=st.sig.filter(Boolean).length, warn=[];
  if(!st.sig[0]) warn.push('manca la firma dell\'impresa n.1');
  if(!st.sig[4]) warn.push('manca la firma del gestore');
  if(!C2.some(c=>st.c[c[0]])) warn.push('tipo di interferenza (Campo 2) non indicato');
  if(warn.length&&!confirm('Attenzione: '+warn.join(', ')+'.\nGenero comunque il PDF?')) return;
  btn.disabled=true; btn.textContent='⏳ Genero il PDF…';
  try{
    await loadLib(); const L=window.PDFLib;
    let bytes=null; for(const u of TEMPLATES){ try{ const r=await fetch(u,{cache:'no-cache'}); if(r.ok){ bytes=await r.arrayBuffer(); break; } }catch(e){} }
    if(!bytes) throw new Error('Modello DUVRI ENILIVE non trovato');
    const doc=await L.PDFDocument.load(bytes); const form=doc.getForm(); const pages=doc.getPages(), refOf=w=>doc.context.getObjectRef(w.dict);
    const font=await doc.embedFont(L.StandardFonts.Helvetica);
    // pulsanti del modulo (es. Stampa): tolti dal PDF finale
    form.getFields().forEach(f=>{ if(!(f instanceof L.PDFButton)) return;
      f.acroField.getWidgets().forEach(w=>{ const r=refOf(w); pages.forEach(p=>{ if(r) p.node.removeAnnot(r); }); });
      form.acroForm.removeField(f.acroField); });
    form.getFields().forEach(f=>{
      const n=f.getName();
      if(f instanceof L.PDFTextField){ let v=st.t[n]||''; const inp=document.querySelector(`#pDuvriE [data-tx="${CSS.escape(n)}"]`);
        if(inp&&inp.hasAttribute('data-date')) v=dIt(v);
        if(/^Firma_(\d)$/.test(n)&&!v.trim()){ const k=+n.slice(-1); v=st.t['Ragione Sociale Impresa n'+k]||''; }
        fitText(L,font,f,clean(v).trim()); }
      else if(f instanceof L.PDFCheckBox){ if(st.c[n]) f.check(); else f.uncheck(); }
    });
    form.updateFieldAppearances(font); form.flatten();
    await doc.flush();
    { // dopo flatten pdf-lib lascia riferimenti ai widget eliminati: le stampanti li vedono come file danneggiato. Li tolgo.
      const ctx=doc.context, has=r=>!!ctx.lookup(r);
      const fixArr=a=>{ for(let i=a.size()-1;i>=0;i--){ const v=a.get(i); if(v instanceof L.PDFRef&&!has(v)) a.remove(i); } };
      const fixDict=d=>{ for(const [k,v] of d.entries()){ if(v instanceof L.PDFRef&&!has(v)) d.delete(k); else if(v instanceof L.PDFArray) fixArr(v); else if(v instanceof L.PDFDict) fixDict(v); } };
      for(const [,o] of ctx.enumerateIndirectObjects()){ if(o instanceof L.PDFArray) fixArr(o); else if(o instanceof L.PDFDict) fixDict(o); else if(o instanceof L.PDFStream) fixDict(o.dict); }
      pages.forEach(p=>{ const a=p.node.lookup(L.PDFName.of('Annots')); if(a instanceof L.PDFArray&&a.size()===0) p.node.delete(L.PDFName.of('Annots')); });
      const af=doc.catalog.lookup(L.PDFName.of('AcroForm')); if(af instanceof L.PDFDict){ af.set(L.PDFName.of('Fields'),ctx.obj([])); af.delete(L.PDFName.of('CO')); af.delete(L.PDFName.of('NeedAppearances')); } }
    for(const k of [0,1,2,3,4]){ if(!st.sig[k]) continue; const t=trimCanvas($('#deSig'+k)); if(!t) continue;
      const png=await doc.embedPng(t.toDataURL('image/png')); const [bx,by,bw,bh]=SIGBOX[k]; const s=Math.min(bw/png.width,bh/png.height);
      pages[0].drawImage(png,{x:bx+(bw-png.width*s)/2,y:by+(bh-png.height*s)/2,width:png.width*s,height:png.height*s}); }
    doc.setTitle('DUVRI '+st.pv+' '+st.rs); doc.setProducer('PhotoSurvey');
    const out=await doc.save({useObjectStreams:false});
    st.pdf=new Blob([out],{type:'application/pdf'});
    st.name=`${String(st.rs||'').replace(/[\\/:*?"<>|#%]/g,'').trim()} ${st.pv} DUVRI.pdf`;
    $('#deName').textContent=st.name; $('#deDone').classList.add('on'); $('#deDone').scrollIntoView({behavior:'smooth'});
    if(st.ctx.archive){ $('#deArch').textContent='⏳ Invio all\'archivio del PV in corso…'; try{ await st.ctx.archive(st.pdf,st.name); $('#deArch').textContent='📁 Inviato all\'archivio del PV, cartella DUVRI (o in coda se manca la rete).'; }catch(e){ $('#deArch').textContent='⚠️ Archiviazione non riuscita: '+e.message; } }
  }catch(e){ alert('Errore nella generazione del PDF: '+e.message); }
  finally{ btn.disabled=false; btn.textContent='✅ Completo'; }
}
})();
