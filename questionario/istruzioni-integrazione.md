# Istruzioni per l'integrazione del Questionario nel sito SecondLife Project

Questo documento contiene le istruzioni dettagliate per integrare la nuova pagina del questionario nel tuo sito SecondLife Project ospitato su GitHub Pages.

## File inclusi

L'archivio `secondlife-questionario.zip` contiene i seguenti file:

1. `questionario.html` - La pagina HTML del questionario
2. `questionario.css` - Gli stili specifici per il questionario
3. `questionario.js` - Le funzionalità JavaScript per la validazione, generazione PDF e invio email
4. `form-validation.css` - Stili aggiuntivi per la validazione del form

## Istruzioni per l'integrazione

### 1. Carica i file nel tuo repository GitHub

1. Accedi al tuo account GitHub
2. Vai al repository del tuo sito SecondLife Project
3. Carica i quattro file inclusi nell'archivio nella radice del repository (stesso livello di index.html)
4. Commit i cambiamenti con un messaggio come "Aggiunta pagina questionario"

### 2. Verifica che le librerie necessarie siano disponibili

La pagina del questionario utilizza le seguenti librerie esterne:
- jsPDF (per la generazione del PDF)
- html2canvas (per la cattura del contenuto HTML)

Queste librerie sono già incluse tramite CDN nel file HTML, quindi non è necessario caricarle separatamente.

### 3. Aggiorna la navigazione del sito principale

Per aggiungere un link al questionario nel menu di navigazione del tuo sito, modifica il file `index.html` aggiungendo questa riga all'interno del tag `<nav><ul>`:

```html
<li><a href="questionario.html">Questionario</a></li>
```

Puoi inserirlo prima dell'elemento "Inizia Ora" per mantenere quest'ultimo come call-to-action principale.

### 4. Configura l'invio email

Il questionario è configurato per inviare i dati e il PDF generato all'indirizzo email `riccardo.casafino@gmail.com`. Il codice utilizza Formspree per l'invio delle email.

Per configurare correttamente Formspree:

1. Vai su [Formspree.io](https://formspree.io/) e crea un account gratuito
2. Crea un nuovo form e ottieni il tuo endpoint personalizzato
3. Sostituisci l'URL nel file `questionario.js` alla riga 328:

```javascript
// Modifica questa riga
fetch('https://formspree.io/f/CODICE_FORMSPREE', {
```

Sostituisci `CODICE_FORMSPREE` con il codice del tuo form Formspree.

### 5. Test della funzionalità

Dopo aver caricato i file e configurato Formspree, verifica che tutto funzioni correttamente:

1. Visita il tuo sito (ad esempio, `https://secondlife-project.com/questionario.html`)
2. Compila il questionario con dati di test
3. Invia il form e verifica che:
   - Il PDF venga generato e scaricato automaticamente
   - Ricevi un'email con i dati del form e il PDF allegato

## Personalizzazioni aggiuntive (opzionali)

### Modifica del logo e delle immagini

Se il logo del sito è stato aggiornato o si trova in una posizione diversa, modifica i percorsi delle immagini nel file `questionario.html`:

```html
<img src="images/SECONDLIFE_colorYW.png" alt="SecondLife Project Logo" class="logo-img">
```

### Aggiunta di campi al questionario

Se desideri aggiungere nuovi campi al questionario:

1. Aggiungi il campo HTML nella sezione appropriata di `questionario.html`
2. Aggiorna la funzione `generatePDF()` in `questionario.js` per includere il nuovo campo nel PDF generato

### Modifica dello stile visivo

Se desideri modificare lo stile visivo del questionario, puoi modificare il file `questionario.css`. I colori principali utilizzati sono:

- Sfondo: `#0a0a1a`, `#0d0d23`, `#1a1a2e`
- Accenti: `#ffaa33` (arancione/giallo), `#00b7ff` (blu)
- Pulsanti: `#ff3a3a` (rosso)

## Risoluzione dei problemi

### Il PDF non viene generato

Verifica che le librerie jsPDF e html2canvas siano caricate correttamente. Puoi controllare la console del browser per eventuali errori.

### L'email non viene inviata

1. Verifica che l'endpoint Formspree sia configurato correttamente
2. Controlla che non ci siano restrizioni CORS che impediscono l'invio del form
3. Assicurati che l'account Formspree sia attivo e non abbia raggiunto i limiti di utilizzo

### Problemi di visualizzazione su dispositivi mobili

La pagina è progettata per essere responsive, ma se riscontri problemi su dispositivi mobili, puoi modificare le media query nel file `questionario.css`.

## Supporto

Per qualsiasi domanda o problema con l'integrazione del questionario, non esitare a contattarmi.

Buon lavoro con il tuo nuovo questionario per SecondLife Project!
