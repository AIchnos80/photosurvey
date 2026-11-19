# PhotoSurvey PV Sardegna – web app

È una web app per Android e iPhone che serve a fotografare i punti vendita e a inviare le foto alla casella di archiviazione. Da lì il flusso Power Automate "PHOTOSURVEY - Archiviazione foto PV Sardegna" le salva in SharePoint.

## Come si usa
1. Al primo avvio si inserisce **Nome Cognome**, per esempio *Raffaello Sanna*. Il codice autore viene calcolato da solo: **RaS** (prime 2 lettere del nome + iniziale del cognome).
2. Si sceglie il PV in uno di tre modi: dalla mappa, cercando il SiteId o il comune, oppure con il pulsante ◎, che trova il PV più vicino in base al GPS.
3. Con **Scatta foto** o **Galleria** si aggiungono le foto. L'app le riduce a 2560 px, circa 1 MB ciascuna, così una mail ne contiene molte.
4. **Invia foto all'archivio**: non c'è nient'altro da fare. L'app manda le foto al servizio di inoltro (Google Apps Script "PhotoSurvey - inoltro foto", account rsanna.argelato@gmail.com). Il servizio scrive la mail a `r.sanna@argelato.onmicrosoft.com` con oggetto `PHOTOSURVEY <SiteId> <Nome Cognome>`, e il flusso Power Automate archivia le foto in SharePoint.
   - Senza rete le foto restano **in coda sul telefono** (indicatore ⏳ in alto) e partono da sole quando la rete torna o quando si riapre l'app.
   - Le foto vengono inviate in blocchi da al massimo 12 MB o 20 foto, cioè una mail per blocco.

### Servizio di inoltro (Google Apps Script)
- Il codice è in `relay/Code.gs`. È pubblicato come App web, con esecuzione "Me" e accesso "Chiunque". Accetta solo richieste che contengono il codice segreto `RELAY_TOKEN`.
- Limite: circa 100 mail al giorno, perché l'account Google è personale.
- Se si modifica lo script: *Esegui il deployment → Gestisci deployment → Modifica → Nuova versione*. In questo modo l'URL resta lo stesso.

Il flusso accetta anche mail scritte a mano: con `PHOTOSURVEY <SiteId> <Nome Cognome>` nell'oggetto o nella prima riga del testo.

## Installazione sul telefono
- **iPhone (Safari):** apri il link, tocca *Condividi* e poi *Aggiungi alla schermata Home*.
- **Android (Chrome):** apri il link, tocca il menu ⋮ e poi *Installa app* (oppure *Aggiungi a schermata Home*).

## File
| File | Contenuto |
|---|---|
| `index.html` | l'app (mappa Leaflet + OpenStreetMap, nessuna chiave API) |
| `pv.json` | i 219 PV della lista SharePoint "Punti Vendita Sardegna" (SiteId, indirizzo, coordinate, se ha SiteRootDir) |
| `contacts.enc.json` | referente e telefono dei PV, **cifrati** (AES-GCM, chiave da password con PBKDF2-SHA256, 600.000 iterazioni). La password è comunicata a parte agli utenti. |
| `manifest.webmanifest`, `sw.js`, `icon*` | installazione come app e funzionamento con poca rete |

## Pubblicazione su GitHub Pages
1. Crea un repository **pubblico** chiamato `photosurvey` e carica tutti i file di questa cartella.
2. Vai in *Settings → Pages*, scegli *Deploy from a branch*, branch `main` e cartella `/ (root)`, poi salva.
3. Dopo circa un minuto l'app è raggiungibile all'indirizzo `https://<utente-github>.github.io/photosurvey/`.

> Il repository è pubblico: sono visibili l'elenco dei PV (indirizzi di impianti già pubblici) e l'indirizzo della casella. Nomi e telefoni dei referenti sono presenti solo in forma cifrata. Non contiene password né accessi.

## Aggiornare l'elenco dei PV
Quando la lista SharePoint cambia, bisogna rigenerare `pv.json`, con i campi Title, field_1, field_5, field_8, field_9 e field_12, e ricaricarlo nel repository. Vanno rigenerati anche i contatti cifrati (`contacts.enc.json`) dai campi field_6 e field_7.
