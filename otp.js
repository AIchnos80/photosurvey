// PhotoSurvey – conferma del DUVRI da parte del gestore con "OTP via WhatsApp" (firma elettronica semplice).
// Flusso: il PDF (con in coda la pagina "Registro di sottoscrizione") viene generato e chiuso; l'app calcola l'impronta
// SHA-256 del file e mostra un QR. Il gestore lo inquadra col SUO telefono: si apre WhatsApp con un messaggio già scritto
// (RS, PV, codice, impronta) verso il numero aziendale e preme Invia. La prova è il messaggio ricevuto dal numero del
// gestore sul telefono aziendale: chi verifica ricalcola l'impronta del PDF archiviato e la confronta con quella del messaggio.
(function(){
const WA_DEF='';                       // numero WhatsApp aziendale che riceve le conferme, es. '393331234567'
const QRLIB='https://unpkg.com/qrcode-generator@1.4.4/qrcode.js';
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clean=s=>String(s==null?'':s).normalize('NFC').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/[^\x20-\x7E\xA0-\xFF]/g,'');
const ascii=s=>clean(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\x20-\x7E]/g,'');
const p2=n=>String(n).padStart(2,'0');
const fmtDT=d=>`${p2(d.getDate())}/${p2(d.getMonth()+1)}/${d.getFullYear()} ${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
const tz=d=>{ const o=-d.getTimezoneOffset(); return 'UTC'+(o>=0?'+':'-')+p2(Math.floor(Math.abs(o)/60))+':'+p2(Math.abs(o)%60); };
const waNum=()=>String(localStorage.getItem('ps_wa')||WA_DEF).replace(/\D/g,'');
const fmtTel=n=>{ const d=String(n||'').replace(/\D/g,''); return d.length>4?'+'+d.slice(0,2)+' '+d.slice(2,5)+' '+d.slice(5):d; };
function loadQR(){ if(window.qrcode) return Promise.resolve(); return new Promise((ok,ko)=>{ const s=document.createElement('script'); s.src=QRLIB; s.onload=ok; s.onerror=()=>ko(new Error('Generatore QR non disponibile: serve la rete')); document.head.appendChild(s); }); }

const css=`
.otpb .otpon{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:#334}
.otpb .otpon input{width:22px;height:22px;flex:none}
.otpb .otpf{display:none}.otpb.on .otpf{display:block}
.otpb .otpn{font-size:12px;color:#667;margin-top:6px;line-height:1.4}
.otpq{text-align:center;margin:8px 0 4px}
.otpq svg{width:min(78vw,300px);height:auto;background:#fff;border-radius:10px;padding:6px;box-shadow:0 1px 4px rgba(0,0,0,.15)}
.otpm{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;background:#f4f6f9;border-radius:8px;padding:8px;white-space:pre-wrap;word-break:break-all;margin:6px 0}
.otps{font-size:13px;line-height:1.45;color:#334}
`;
let styled=false;
function style(){ if(styled) return; styled=true; const s=document.createElement('style'); s.textContent=css; document.head.appendChild(s); }

// Blocco da inserire nel modulo (prefisso p = 'dv' per Q8, 'de' per ENILIVE)
function block(p){ style(); return `<div class="blk otpb" id="${p}OtpB"><h3>🔐 Conferma del gestore con WhatsApp</h3>
  <label class="otpon"><input type="checkbox" id="${p}OtpOn"> Il gestore conferma il DUVRI dal suo telefono (codice OTP)</label>
  <div class="otpf">
    <label class="f">Nome del gestore (firmatario)</label><input id="${p}OtpNm" autocomplete="off">
    <label class="f">Cellulare del gestore</label><input id="${p}OtpTel" inputmode="tel" autocomplete="off">
    <div class="otpn">Dopo ✅ Completo compare un QR: il gestore lo inquadra con la fotocamera del <b>suo</b> telefono e invia il messaggio WhatsApp già scritto. Il PDF va in archivio dopo l'invio.</div>
  </div></div>`; }
function init(p,ctx){ const on=$('#'+p+'OtpOn'); if(!on) return;
  on.checked=true; $('#'+p+'OtpB').classList.add('on');
  on.onchange=()=>$('#'+p+'OtpB').classList.toggle('on',on.checked);
  $('#'+p+'OtpNm').value=ctx.ref||''; $('#'+p+'OtpTel').value=ctx.tel||''; }
function opts(p){ const on=$('#'+p+'OtpOn'); return {on:!!(on&&on.checked), name:($('#'+p+'OtpNm')||{}).value||'', tel:($('#'+p+'OtpTel')||{}).value||''}; }

function gps(){ return new Promise(ok=>{ if(!navigator.geolocation) return ok(null);
  const t=setTimeout(()=>ok(null),7000);
  navigator.geolocation.getCurrentPosition(p=>{ clearTimeout(t); ok({lat:p.coords.latitude,lon:p.coords.longitude,acc:Math.round(p.coords.accuracy)}); },()=>{ clearTimeout(t); ok(null); },{enableHighAccuracy:true,timeout:6500,maximumAge:60000}); }); }

// Prima della generazione: numero aziendale, codice, ora, posizione. Ritorna null se l'operatore annulla.
async function prepare(o,info){
  let wa=waNum();
  if(!wa){ const v=prompt('Numero WhatsApp aziendale che riceve le conferme dei gestori (es. 39 333 1234567):',''); if(v===null) return null;
    wa=v.replace(/\D/g,''); if(wa.length===10&&wa[0]==='3') wa='39'+wa; if(wa.length<11){ alert('Numero non valido'); return null; } localStorage.setItem('ps_wa',wa); }
  if(!o.name.trim()&&!confirm('Il nome del gestore è vuoto. Procedo comunque?')) return null;
  const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0');
  const d=new Date();
  return {...info, wa, code, name:o.name.trim(), tel:o.tel.trim(), when:d, gps:await gps()};
}

// Pagina "Registro di sottoscrizione" in coda al PDF (prima del salvataggio)
async function page(doc,L,od){
  const font=await doc.embedFont(L.StandardFonts.Helvetica), bold=await doc.embedFont(L.StandardFonts.HelveticaBold);
  const W=595.28,H=841.89,M=48, navy=L.rgb(0.05,0.17,0.36), grey=L.rgb(0.3,0.3,0.35);
  const pg=doc.addPage([W,H]); let y=H-M-18;
  pg.drawText('Registro di sottoscrizione elettronica',{x:M,y,size:17,font:bold,color:navy}); y-=18;
  pg.drawText(clean('Conferma del gestore con codice monouso (OTP) inviato via WhatsApp - firma elettronica semplice'),{x:M,y,size:9.5,font,color:grey}); y-=26;
  const rows=[
    ['Documento', `DUVRI - Richiesta ${od.rs} - PV ${od.pv}`],
    ['Indirizzo PV', od.addr||'-'],
    ['Firmatario (gestore)', od.name||'-'],
    ['Cellulare dichiarato', od.tel||'-'],
    ['Compilato da', `${od.user||'-'} (ARGELATO SRL) con app PhotoSurvey`],
    ['Generato il', `${fmtDT(od.when)} (${tz(od.when)})`],
    ['Posizione del telefono', od.gps?`${od.gps.lat.toFixed(6)}, ${od.gps.lon.toFixed(6)} (precisione ${od.gps.acc} m)`:'non disponibile'],
    ['Codice di conferma (OTP)', od.code],
    ['Numero WhatsApp ricevente', fmtTel(od.wa)+' (ARGELATO SRL)'],
  ];
  for(const [k,v] of rows){ pg.drawText(clean(k),{x:M,y,size:10,font:bold,color:L.rgb(0.2,0.22,0.27)}); y=wrap(pg,clean(v),M+165,y,W-M-(M+165),10,font,L.rgb(0,0,0)); y-=8; }
  y-=10; pg.drawText('Procedura e verifica',{x:M,y,size:12,font:bold,color:navy}); y-=16;
  const txt=[
    `1. Al termine della compilazione l'app ha chiuso il presente documento, comprese questa pagina e le eventuali pagine fotografiche, e ne ha calcolato l'impronta digitale SHA-256: qualsiasi modifica successiva del file cambia l'impronta.`,
    `2. L'app ha mostrato al gestore un codice QR. Inquadrandolo con il proprio telefono, il gestore ha inviato al numero WhatsApp aziendale sopra indicato un messaggio contenente il numero di richiesta, il PV, il codice di conferma ${od.code} e le prime 32 cifre dell'impronta del file, dichiarando di aver letto e sottoscritto il DUVRI.`,
    `3. Il messaggio ricevuto sul telefono aziendale (numero del mittente, data e ora di WhatsApp) costituisce la registrazione della conferma.`,
    `4. Per verificare: calcolare l'impronta SHA-256 del file PDF archiviato (Windows: certutil -hashfile "nome file.pdf" SHA256) e confrontarne le prime 32 cifre con quelle del messaggio WhatsApp; verificare che il mittente corrisponda al cellulare del gestore.`,
    `Valore legale: firma elettronica semplice ai sensi del Reg. UE 910/2014 (eIDAS); il valore probatorio è liberamente valutabile in giudizio (art. 20, c. 1-bis, D.Lgs. 82/2005 - CAD).`];
  for(const t of txt){ y=wrap(pg,clean(t),M,y,W-2*M,9.5,font,L.rgb(0.1,0.1,0.12)); y-=7; }
}
function wrap(pg,t,x,y,w,size,font,color){ const words=t.split(/\s+/); let line='';
  for(const wd of words){ const tst=line?line+' '+wd:wd; if(font.widthOfTextAtSize(tst,size)>w&&line){ pg.drawText(line,{x,y,size,font,color}); y-=size*1.35; line=wd; } else line=tst; }
  if(line){ pg.drawText(line,{x,y,size,font,color}); y-=size*1.35; } return y; }

async function sha256hex(bytes){ return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join(''); }

// Dopo il salvataggio: QR + messaggio; risolve true quando l'operatore conferma che il gestore ha inviato, false se annulla.
async function confirmBox(box,od,bytes){
  style(); const h=await sha256hex(bytes); od.hash=h;
  const msg=[`DUVRI ${od.rs} - PV ${od.pv}`,'Confermo di aver letto e sottoscritto il DUVRI.',`Firmatario: ${od.name||'-'}`,`Codice: ${od.code}`,`Impronta: ${h.slice(0,32)}`].map(ascii).join('\n');
  const url=`https://wa.me/${od.wa}?text=${encodeURIComponent(msg)}`;
  let svg='';
  try{ await loadQR(); const q=qrcode(0,'L'); q.addData(url); q.make(); svg=q.createSvgTag({cellSize:4,margin:2,scalable:true}); }
  catch(e){ svg=`<div class="otpn">⚠️ ${esc(e.message)}</div>`; }
  box.innerHTML=`<div class="blk" style="border:2px solid #25D366"><h3>🔐 Conferma del gestore</h3>
    <div class="otps">Il gestore inquadra il QR con la fotocamera del <b>suo</b> telefono${od.tel?` (<b>${esc(od.tel)}</b>)`:''}: si apre WhatsApp con il messaggio già scritto verso il numero aziendale; deve solo premere <b>Invia</b>.</div>
    <div class="otpq">${svg}</div>
    <div class="otpm">${esc(msg)}</div>
    <div style="display:flex;gap:8px;margin-top:8px"><button class="btn s" id="otpNo" style="flex:1">✖ Annulla</button><button class="btn a" id="otpOk" style="flex:2">✅ Il gestore ha inviato il messaggio</button></div></div>`;
  box.scrollIntoView({behavior:'smooth'});
  return new Promise(ok=>{ box.querySelector('#otpOk').onclick=()=>{ box.innerHTML=`<div class="otpn" style="margin:6px 0">🔐 Conferma WhatsApp del gestore: codice ${esc(od.code)}, impronta ${h.slice(0,32)}</div>`; ok(true); };
    box.querySelector('#otpNo').onclick=()=>{ box.innerHTML=`<div class="otpn" style="margin:6px 0">Conferma del gestore annullata: il PDF non è stato archiviato. Puoi ripetere ✅ Completo (anche togliendo la conferma WhatsApp).</div>`; ok(false); }; });
}
window.DuvriOTP={block,init,opts,prepare,page,confirm:confirmBox};
})();
