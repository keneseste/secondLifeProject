// Script per la gestione del generatore di schede di allenamento
document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi del DOM
    const schedeForm = document.getElementById('schede-form');
    const giornateContainer = document.getElementById('giornate-container');
    const addGiornataBtn = document.getElementById('add-giornata');
    const generatePdfBtn = document.getElementById('generate-pdf');
    const giornataTemplate = document.querySelector('.giornata-template');
    const esercizioTemplate = document.querySelector('.esercizio-template');
    const schedaPreview = document.getElementById('scheda-preview');
    
    // Contatori per giornate ed esercizi
    let giornataCounter = 0;
    
    // Aggiungi pulsante per caricare il template precompilato
    const loadTemplateBtn = document.createElement('button');
    loadTemplateBtn.type = 'button';
    loadTemplateBtn.id = 'load-template';
    loadTemplateBtn.className = 'template-button';
    loadTemplateBtn.innerHTML = '<i class="fas fa-magic"></i> Carica Template di Esempio';
    loadTemplateBtn.addEventListener('click', loadTemplateData);
    
    // Inserisci il pulsante prima del form
    const formIntro = document.querySelector('.form-intro');
    formIntro.appendChild(loadTemplateBtn);
    
    // Inizializzazione: aggiungi la prima giornata
    addGiornata();
    
    // Funzione per caricare il template precompilato
    function loadTemplateData() {
        try {
            console.log("Iniziando caricamento template...");
            
            // Conferma prima di sovrascrivere i dati esistenti
            if (document.querySelectorAll('.giornata-item').length > 1 || 
                document.getElementById('nome-cliente').value || 
                document.getElementById('nome-scheda').value) {
                if (!confirm('Questa azione sovrascriverà tutti i dati inseriti. Continuare?')) {
                    return;
                }
            }
            
            // Rimuovi tutte le giornate esistenti
            document.querySelectorAll('.giornata-item').forEach(item => item.remove());
            giornataCounter = 0;
            
            // Compila i dati generali
            document.getElementById('nome-cliente').value = 'Mario Rossi';
            document.getElementById('data-inizio').value = new Date().toISOString().split('T')[0]; // Data odierna
            document.getElementById('durata-scheda').value = '8 settimane';
            document.getElementById('nome-scheda').value = 'Forza e Ipertrofia - Upper/Lower Split';
            
            console.log("Dati generali compilati, procedendo con le giornate...");
            
            // Template dati per 4 giornate
            const templateData = [
                {
                    nome: 'Giorno 1 - Upper Body Forza',
                    esercizi: [
                        {
                            nome: 'Panca Piana',
                            link: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
                            serie: 4,
                            ripetizioni: '6-8',
                            recupero: 180,
                            note: 'Controllo eccentrico, focus sulla contrazione del petto'
                        },
                        {
                            nome: 'Trazioni alla Sbarra',
                            link: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
                            serie: 4,
                            ripetizioni: '6-8',
                            recupero: 180,
                            note: 'Scapole retratte, focus sulla schiena'
                        },
                        {
                            nome: 'Military Press',
                            link: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
                            serie: 3,
                            ripetizioni: '8-10',
                            recupero: 120,
                            note: 'Core stabile, evitare inarcamento lombare'
                        },
                        {
                            nome: 'Curl con Bilanciere',
                            link: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
                            serie: 3,
                            ripetizioni: '8-10',
                            recupero: 90,
                            note: 'Gomiti fermi, focus sulla contrazione'
                        },
                        {
                            nome: 'French Press',
                            link: 'https://www.youtube.com/watch?v=_gsUck-7M74',
                            serie: 3,
                            ripetizioni: '8-10',
                            recupero: 90,
                            note: 'Gomiti fermi, estensione completa'
                        }
                    ]
                },
                {
                    nome: 'Giorno 2 - Lower Body Forza',
                    esercizi: [
                        {
                            nome: 'Squat',
                            link: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
                            serie: 4,
                            ripetizioni: '6-8',
                            recupero: 180,
                            note: 'Profondità parallela, ginocchia in linea con i piedi'
                        },
                        {
                            nome: 'Stacco Rumeno',
                            link: 'https://www.youtube.com/watch?v=jEy_czb3RKA',
                            serie: 4,
                            ripetizioni: '6-8',
                            recupero: 180,
                            note: 'Schiena neutra, focus sugli hamstring'
                        },
                        {
                            nome: 'Affondi con Manubri',
                            link: 'https://www.youtube.com/watch?v=D7KaRcUTQeE',
                            serie: 3,
                            ripetizioni: '10-12 per gamba',
                            recupero: 120,
                            note: 'Ginocchio posteriore vicino al pavimento'
                        },
                        {
                            nome: 'Leg Curl',
                            link: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
                            serie: 3,
                            ripetizioni: '10-12',
                            recupero: 90,
                            note: 'Contrazione completa, focus sugli hamstring'
                        },
                        {
                            nome: 'Standing Calf Raise',
                            link: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
                            serie: 4,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Estensione completa, contrazione in alto'
                        }
                    ]
                },
                {
                    nome: 'Giorno 3 - Upper Body Ipertrofia',
                    esercizi: [
                        {
                            nome: 'Panca Inclinata con Manubri',
                            link: 'https://www.youtube.com/watch?v=0G2_XV7slIg',
                            serie: 3,
                            ripetizioni: '10-12',
                            recupero: 90,
                            note: 'Rotazione dei polsi a fine movimento'
                        },
                        {
                            nome: 'Lat Machine Presa Larga',
                            link: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
                            serie: 3,
                            ripetizioni: '10-12',
                            recupero: 90,
                            note: 'Tirare verso lo sterno, scapole retratte'
                        },
                        {
                            nome: 'Alzate Laterali',
                            link: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Gomiti leggermente flessi, movimento controllato'
                        },
                        {
                            nome: 'Curl Alternato con Manubri',
                            link: 'https://www.youtube.com/watch?v=sAq_ocpRh_I',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Supinazione durante la salita'
                        },
                        {
                            nome: 'Push Down con Corda',
                            link: 'https://www.youtube.com/watch?v=vB5OHsJ3EME',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Aprire leggermente le mani a fine movimento'
                        }
                    ]
                },
                {
                    nome: 'Giorno 4 - Lower Body Ipertrofia',
                    esercizi: [
                        {
                            nome: 'Leg Press',
                            link: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
                            serie: 3,
                            ripetizioni: '10-12',
                            recupero: 120,
                            note: 'Piedi posizione media, estensione completa'
                        },
                        {
                            nome: 'Leg Extension',
                            link: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Contrazione in alto, discesa controllata'
                        },
                        {
                            nome: 'Glute Bridge',
                            link: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Contrazione completa dei glutei in alto'
                        },
                        {
                            nome: 'Seated Leg Curl',
                            link: 'https://www.youtube.com/watch?v=F488k67BTNo',
                            serie: 3,
                            ripetizioni: '12-15',
                            recupero: 60,
                            note: 'Contrazione completa, focus sugli hamstring'
                        },
                        {
                            nome: 'Seated Calf Raise',
                            link: 'https://www.youtube.com/watch?v=JbyjNymZOt0',
                            serie: 4,
                            ripetizioni: '15-20',
                            recupero: 45,
                            note: 'Estensione completa, contrazione in alto'
                        }
                    ]
                }
            ];
            
            // Crea le giornate con i relativi esercizi
            for (let i = 0; i < templateData.length; i++) {
                const giornataData = templateData[i];
                console.log(`Creando giornata ${i+1}: ${giornataData.nome}`);
                
                // Aggiungi una nuova giornata
                addGiornata();
                
                // Seleziona l'ultima giornata aggiunta
                const giornateItems = document.querySelectorAll('.giornata-item');
                const giornataItem = giornateItems[giornateItems.length - 1];
                const giornataBox = giornataItem.querySelector('.giornata-box');
                
                // Compila il nome della giornata
                const nomeGiornataInput = giornataBox.querySelector('.nome-giornata');
                nomeGiornataInput.value = giornataData.nome;
                console.log(`Nome giornata impostato: ${nomeGiornataInput.value}`);
                
                // Rimuovi l'esercizio iniziale vuoto
                const eserciziContainer = giornataBox.querySelector('.esercizi-container');
                const eserciziItems = eserciziContainer.querySelectorAll('.esercizio-item');
                eserciziItems.forEach(item => item.remove());
                
                // Aggiungi gli esercizi
                for (let j = 0; j < giornataData.esercizi.length; j++) {
                    const esercizioData = giornataData.esercizi[j];
                    console.log(`Aggiungendo esercizio ${j+1}: ${esercizioData.nome}`);
                    
                    // Aggiungi un nuovo esercizio
                    addEsercizio(giornataBox);
                    
                    // Seleziona l'ultimo esercizio aggiunto
                    const nuoviEserciziItems = eserciziContainer.querySelectorAll('.esercizio-item');
                    const esercizioItem = nuoviEserciziItems[nuoviEserciziItems.length - 1];
                    const esercizioBox = esercizioItem.querySelector('.esercizio-box');
                    
                    // Compila i dati dell'esercizio
                    esercizioBox.querySelector('.nome-esercizio').value = esercizioData.nome;
                    esercizioBox.querySelector('.link-video').value = esercizioData.link;
                    esercizioBox.querySelector('.serie-esercizio').value = esercizioData.serie;
                    esercizioBox.querySelector('.ripetizioni-esercizio').value = esercizioData.ripetizioni;
                    esercizioBox.querySelector('.recupero-esercizio').value = esercizioData.recupero;
                    esercizioBox.querySelector('.note-esercizio').value = esercizioData.note;
                }
            }
            
            console.log("Template caricato con successo!");
            
            // Notifica l'utente
            alert('Template di esempio caricato con successo! Ora puoi modificarlo o generare direttamente il PDF.');
        } catch (error) {
            console.error("Errore durante il caricamento del template:", error);
            alert('Si è verificato un errore durante il caricamento del template. Controlla la console per i dettagli.');
        }
    }
    
    // Event listener per aggiungere una nuova giornata
    addGiornataBtn.addEventListener('click', addGiornata);
    
    // Event listener per generare il PDF
    generatePdfBtn.addEventListener('click', function() {
        if (validateForm()) {
            generatePDF();
        } else {
            alert('Per favore, compila tutti i campi obbligatori prima di generare il PDF.');
        }
    });
    
    // Event listener per duplicare la scheda completa
    const duplicateSchedaBtn = document.getElementById('duplicate-scheda');
    duplicateSchedaBtn.addEventListener('click', function() {
        duplicateScheda();
    });
    
    // Funzione per duplicare l'intera scheda
    function duplicateScheda() {
        // Chiedi il nome del nuovo cliente
        const nuovoNomeCliente = prompt('Inserisci il nome del nuovo cliente:');
        if (!nuovoNomeCliente || nuovoNomeCliente.trim() === '') {
            alert('È necessario inserire un nome cliente valido per duplicare la scheda.');
            return;
        }
        
        // Salva i dati attuali della scheda
        const schedaAttuale = collectFormData();
        
        // Conferma prima di procedere
        if (!confirm(`Stai per creare una copia della scheda attuale per il cliente "${nuovoNomeCliente}". Continuare?`)) {
            return;
        }
        
        // Salva la scheda attuale in localStorage
        const timestamp = new Date().getTime();
        const schedaKey = `scheda_${timestamp}`;
        
        // Aggiorna il nome del cliente
        schedaAttuale.cliente = nuovoNomeCliente;
        
        // Salva la scheda in localStorage
        localStorage.setItem(schedaKey, JSON.stringify(schedaAttuale));
        
        // Notifica l'utente
        alert(`Scheda duplicata con successo per il cliente "${nuovoNomeCliente}"! La scheda è stata salvata e può essere caricata in futuro.`);
        
        // Aggiorna il nome del cliente nel form
        document.getElementById('nome-cliente').value = nuovoNomeCliente;
    }
    
    // Funzione per aggiungere una nuova giornata
    function addGiornata() {
        giornataCounter++;
        
        // Clona il template della giornata
        const giornataClone = giornataTemplate.cloneNode(true);
        giornataClone.style.display = 'block';
        giornataClone.classList.remove('giornata-template');
        giornataClone.classList.add('giornata-item');
        
        // Aggiorna il numero della giornata
        const giornataNumero = giornataClone.querySelector('.giornata-numero');
        giornataNumero.textContent = giornataCounter;
        
        // Aggiungi attributi data per identificare la giornata
        const giornataBox = giornataClone.querySelector('.giornata-box');
        giornataBox.dataset.giornataId = giornataCounter;
        
        // Event listener per rimuovere la giornata
        const removeGiornataBtn = giornataClone.querySelector('.remove-giornata');
        removeGiornataBtn.addEventListener('click', function() {
            if (document.querySelectorAll('.giornata-item').length > 1) {
                giornataBox.parentElement.remove();
                updateGiornateNumbers();
            } else {
                alert('Deve essere presente almeno una giornata di allenamento.');
            }
        });
        
        // Event listener per duplicare la giornata
        const duplicateGiornataBtn = giornataClone.querySelector('.duplicate-giornata');
        duplicateGiornataBtn.addEventListener('click', function() {
            duplicateGiornata(giornataBox);
        });
        
        // Event listener per aggiungere un nuovo esercizio
        const addEsercizioBtn = giornataClone.querySelector('.add-esercizio');
        addEsercizioBtn.addEventListener('click', function() {
            addEsercizio(giornataBox);
        });
        
        // Inserisci la giornata nel container
        giornateContainer.insertBefore(giornataClone, addGiornataBtn);
        
        // Aggiungi il primo esercizio alla giornata
        addEsercizio(giornataBox);
    }
    
    // Funzione per duplicare una giornata
    function duplicateGiornata(giornataBox) {
        try {
            console.log("Iniziando duplicazione giornata...");
            
            // Aggiungi una nuova giornata vuota
            addGiornata();
            
            // Seleziona l'ultima giornata aggiunta (quella appena creata)
            const giornateItems = document.querySelectorAll('.giornata-item');
            const nuovaGiornataItem = giornateItems[giornateItems.length - 1];
            const nuovaGiornataBox = nuovaGiornataItem.querySelector('.giornata-box');
            
            // Copia il nome della giornata
            const nomeGiornataOriginale = giornataBox.querySelector('.nome-giornata').value;
            nuovaGiornataBox.querySelector('.nome-giornata').value = nomeGiornataOriginale;
            console.log(`Nome giornata copiato: ${nomeGiornataOriginale}`);
            
            // Rimuovi l'esercizio iniziale vuoto
            const nuoviEserciziContainer = nuovaGiornataBox.querySelector('.esercizi-container');
            nuoviEserciziContainer.querySelectorAll('.esercizio-item').forEach(item => item.remove());
            
            // Copia tutti gli esercizi dalla giornata originale
            const eserciziOriginali = giornataBox.querySelectorAll('.esercizio-item');
            console.log(`Trovati ${eserciziOriginali.length} esercizi da copiare`);
            
            for (let i = 0; i < eserciziOriginali.length; i++) {
                const esercizioItem = eserciziOriginali[i];
                console.log(`Copiando esercizio ${i+1}`);
                
                // Aggiungi un nuovo esercizio vuoto
                addEsercizio(nuovaGiornataBox);
                
                // Seleziona l'ultimo esercizio aggiunto
                const nuoviEserciziItems = nuoviEserciziContainer.querySelectorAll('.esercizio-item');
                const nuovoEsercizioItem = nuoviEserciziItems[nuoviEserciziItems.length - 1];
                const nuovoEsercizioBox = nuovoEsercizioItem.querySelector('.esercizio-box');
                
                // Copia i valori dall'esercizio originale
                const esercizioBox = esercizioItem.querySelector('.esercizio-box');
                
                // Copia nome esercizio
                const nomeEsercizio = esercizioBox.querySelector('.nome-esercizio').value;
                nuovoEsercizioBox.querySelector('.nome-esercizio').value = nomeEsercizio;
                
                // Copia link video
                nuovoEsercizioBox.querySelector('.link-video').value = esercizioBox.querySelector('.link-video').value;
                
                // Copia serie
                nuovoEsercizioBox.querySelector('.serie-esercizio').value = esercizioBox.querySelector('.serie-esercizio').value;
                
                // Copia ripetizioni
                nuovoEsercizioBox.querySelector('.ripetizioni-esercizio').value = esercizioBox.querySelector('.ripetizioni-esercizio').value;
                
                // Copia recupero
                nuovoEsercizioBox.querySelector('.recupero-esercizio').value = esercizioBox.querySelector('.recupero-esercizio').value;
                
                // Copia note
                nuovoEsercizioBox.querySelector('.note-esercizio').value = esercizioBox.querySelector('.note-esercizio').value;
                
                console.log(`Esercizio copiato: ${nomeEsercizio}`);
            }
            
            console.log("Duplicazione giornata completata con successo!");
            
            // Scorri alla nuova giornata
            nuovaGiornataBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error("Errore durante la duplicazione della giornata:", error);
            alert('Si è verificato un errore durante la duplicazione della giornata. Controlla la console per i dettagli.');
        }
    }
    
    // Funzione per aggiungere un nuovo esercizio
    function addEsercizio(giornataBox) {
        const eserciziContainer = giornataBox.querySelector('.esercizi-container');
        const esercizioCounter = eserciziContainer.querySelectorAll('.esercizio-box').length + 1;
        
        // Clona il template dell'esercizio
        const esercizioClone = esercizioTemplate.cloneNode(true);
        esercizioClone.style.display = 'block';
        esercizioClone.classList.remove('esercizio-template');
        esercizioClone.classList.add('esercizio-item');
        
        // Aggiorna il numero dell'esercizio
        const esercizioNumero = esercizioClone.querySelector('.esercizio-numero');
        esercizioNumero.textContent = esercizioCounter;
        
        // Aggiungi attributi data per identificare l'esercizio
        const esercizioBox = esercizioClone.querySelector('.esercizio-box');
        esercizioBox.dataset.esercizioId = esercizioCounter;
        esercizioBox.dataset.giornataId = giornataBox.dataset.giornataId;
        
        // Event listener per rimuovere l'esercizio
        const removeEsercizioBtn = esercizioClone.querySelector('.remove-esercizio');
        removeEsercizioBtn.addEventListener('click', function() {
            if (eserciziContainer.querySelectorAll('.esercizio-item').length > 1) {
                esercizioBox.parentElement.remove();
                updateEserciziNumbers(eserciziContainer);
            } else {
                alert('Deve essere presente almeno un esercizio per giornata.');
            }
        });
        
        // Event listener per duplicare l'esercizio
        const duplicateEsercizioBtn = esercizioClone.querySelector('.duplicate-esercizio');
        duplicateEsercizioBtn.addEventListener('click', function() {
            duplicateEsercizio(esercizioBox);
        });
        
        // Inserisci l'esercizio nel container
        eserciziContainer.appendChild(esercizioClone);
    }
    
    // Funzione per duplicare un esercizio
    function duplicateEsercizio(esercizioBox) {
        const giornataBox = esercizioBox.closest('.giornata-box');
        const eserciziContainer = giornataBox.querySelector('.esercizi-container');
        
        // Aggiungi un nuovo esercizio vuoto
        addEsercizio(giornataBox);
        
        // Seleziona l'ultimo esercizio aggiunto (quello appena creato)
        const nuovoEsercizioItem = eserciziContainer.querySelector('.esercizio-item:last-child');
        const nuovoEsercizioBox = nuovoEsercizioItem.querySelector('.esercizio-box');
        
        // Copia i valori dall'esercizio originale
        nuovoEsercizioBox.querySelector('.nome-esercizio').value = esercizioBox.querySelector('.nome-esercizio').value;
        nuovoEsercizioBox.querySelector('.link-video').value = esercizioBox.querySelector('.link-video').value;
        nuovoEsercizioBox.querySelector('.serie-esercizio').value = esercizioBox.querySelector('.serie-esercizio').value;
        nuovoEsercizioBox.querySelector('.ripetizioni-esercizio').value = esercizioBox.querySelector('.ripetizioni-esercizio').value;
        nuovoEsercizioBox.querySelector('.recupero-esercizio').value = esercizioBox.querySelector('.recupero-esercizio').value;
        nuovoEsercizioBox.querySelector('.note-esercizio').value = esercizioBox.querySelector('.note-esercizio').value;
        
        // Scorri al nuovo esercizio
        nuovoEsercizioBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Funzione per aggiornare i numeri delle giornate
    function updateGiornateNumbers() {
        const giornate = document.querySelectorAll('.giornata-item');
        giornate.forEach((giornata, index) => {
            const giornataNumero = giornata.querySelector('.giornata-numero');
            giornataNumero.textContent = index + 1;
            
            const giornataBox = giornata.querySelector('.giornata-box');
            giornataBox.dataset.giornataId = index + 1;
        });
        
        giornataCounter = giornate.length;
    }
    
    // Funzione per aggiornare i numeri degli esercizi
    function updateEserciziNumbers(eserciziContainer) {
        const esercizi = eserciziContainer.querySelectorAll('.esercizio-item');
        esercizi.forEach((esercizio, index) => {
            const esercizioNumero = esercizio.querySelector('.esercizio-numero');
            esercizioNumero.textContent = index + 1;
            
            const esercizioBox = esercizio.querySelector('.esercizio-box');
            esercizioBox.dataset.esercizioId = index + 1;
        });
    }
    
    // Funzione per validare il form
    function validateForm() {
        try {
            console.log("Iniziando validazione form...");
            let isValid = true;
            let firstInvalidElement = null;
            
            // Rimuovi tutti i messaggi di errore esistenti
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Rimuovi le classi di errore da tutti gli elementi
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Valida i campi generali
            const campiGenerali = [
                { id: 'nome-cliente', nome: 'Nome del Cliente' },
                { id: 'data-inizio', nome: 'Data di Inizio' },
                { id: 'durata-scheda', nome: 'Durata della Scheda' },
                { id: 'nome-scheda', nome: 'Nome della Scheda' }
            ];
            
            console.log("Validando campi generali...");
            for (const campo of campiGenerali) {
                const input = document.getElementById(campo.id);
                if (!input || !input.value.trim()) {
                    console.log(`Campo mancante: ${campo.nome}`);
                    isValid = false;
                    input.classList.add('error');
                    
                    // Crea un messaggio di errore
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Campo obbligatorio';
                    
                    // Trova il parent form-group
                    const formGroup = input.closest('.form-group');
                    if (formGroup) {
                        formGroup.appendChild(errorMsg);
                    }
                    
                    // Salva il primo elemento non valido per lo scroll
                    if (!firstInvalidElement) {
                        firstInvalidElement = input;
                    }
                } else {
                    console.log(`Campo valido: ${campo.nome} = ${input.value}`);
                }
            }
            
            // Valida le giornate di allenamento
            const giornateItems = document.querySelectorAll('.giornata-item');
            console.log(`Trovate ${giornateItems.length} giornate da validare`);
            
            if (giornateItems.length === 0) {
                console.log("Nessuna giornata trovata, questo non dovrebbe accadere");
                isValid = false;
            }
            
            giornateItems.forEach((giornataItem, giornataIndex) => {
                const giornataBox = giornataItem.querySelector('.giornata-box');
                const nomeGiornataInput = giornataBox.querySelector('.nome-giornata');
                
                console.log(`Validando giornata ${giornataIndex + 1}: ${nomeGiornataInput.value}`);
                
                // Valida il nome della giornata
                if (!nomeGiornataInput.value.trim()) {
                    console.log(`Nome giornata mancante per giornata ${giornataIndex + 1}`);
                    isValid = false;
                    nomeGiornataInput.classList.add('error');
                    
                    // Crea un messaggio di errore
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Campo obbligatorio';
                    
                    // Trova il parent form-group
                    const formGroup = nomeGiornataInput.closest('.form-group');
                    if (formGroup) {
                        formGroup.appendChild(errorMsg);
                    }
                    
                    // Salva il primo elemento non valido per lo scroll
                    if (!firstInvalidElement) {
                        firstInvalidElement = nomeGiornataInput;
                    }
                }
                
                // Valida gli esercizi della giornata
                const eserciziItems = giornataBox.querySelectorAll('.esercizio-item');
                console.log(`Trovati ${eserciziItems.length} esercizi nella giornata ${giornataIndex + 1}`);
                
                if (eserciziItems.length === 0) {
                    console.log(`Nessun esercizio trovato nella giornata ${giornataIndex + 1}, questo non dovrebbe accadere`);
                    isValid = false;
                }
                
                eserciziItems.forEach((esercizioItem, esercizioIndex) => {
                    const esercizioBox = esercizioItem.querySelector('.esercizio-box');
                    const nomeEsercizioInput = esercizioBox.querySelector('.nome-esercizio');
                    const serieInput = esercizioBox.querySelector('.serie-esercizio');
                    const ripetizioniInput = esercizioBox.querySelector('.ripetizioni-esercizio');
                    const recuperoInput = esercizioBox.querySelector('.recupero-esercizio');
                    
                    console.log(`Validando esercizio ${esercizioIndex + 1} nella giornata ${giornataIndex + 1}: ${nomeEsercizioInput.value}`);
                    
                    // Valida i campi obbligatori dell'esercizio
                    const campiEsercizio = [
                        { input: nomeEsercizioInput, nome: 'Nome Esercizio' },
                        { input: serieInput, nome: 'Serie' },
                        { input: ripetizioniInput, nome: 'Ripetizioni' },
                        { input: recuperoInput, nome: 'Recupero' }
                    ];
                    
                    for (const campo of campiEsercizio) {
                        if (!campo.input.value.trim()) {
                            console.log(`Campo mancante: ${campo.nome} per esercizio ${esercizioIndex + 1} nella giornata ${giornataIndex + 1}`);
                            isValid = false;
                            campo.input.classList.add('error');
                            
                            // Crea un messaggio di errore
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Campo obbligatorio';
                            
                            // Trova il parent form-group
                            const formGroup = campo.input.closest('.form-group');
                            if (formGroup) {
                                formGroup.appendChild(errorMsg);
                            }
                            
                            // Salva il primo elemento non valido per lo scroll
                            if (!firstInvalidElement) {
                                firstInvalidElement = campo.input;
                            }
                        }
                    }
                });
            });
            
            // Scorri al primo elemento non valido
            if (firstInvalidElement) {
                console.log("Form non valido, scrolling al primo elemento non valido");
                firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalidElement.focus();
            } else {
                console.log("Form valido, tutti i campi sono compilati correttamente");
            }
            
            return isValid;
        } catch (error) {
            console.error("Errore durante la validazione del form:", error);
            alert('Si è verificato un errore durante la validazione del form. Controlla la console per i dettagli.');
            return false;
        }
    }
    
    // Funzione per raccogliere tutti i dati del form
    function collectFormData() {
        const formData = {
            cliente: document.getElementById('nome-cliente').value,
            dataInizio: document.getElementById('data-inizio').value,
            durataScheda: document.getElementById('durata-scheda').value,
            nomeScheda: document.getElementById('nome-scheda').value,
            giornate: []
        };
        
        // Formatta la data in formato italiano
        const dataObj = new Date(formData.dataInizio);
        formData.dataInizioFormatted = dataObj.toLocaleDateString('it-IT');
        
        // Raccogli i dati delle giornate
        const giornateItems = document.querySelectorAll('.giornata-item');
        giornateItems.forEach(giornataItem => {
            const giornataBox = giornataItem.querySelector('.giornata-box');
            const giornataId = giornataBox.dataset.giornataId;
            const nomeGiornata = giornataBox.querySelector('.nome-giornata').value;
            
            const giornata = {
                id: giornataId,
                nome: nomeGiornata,
                esercizi: []
            };
            
            // Raccogli i dati degli esercizi
            const eserciziItems = giornataBox.querySelectorAll('.esercizio-item');
            eserciziItems.forEach(esercizioItem => {
                const esercizioBox = esercizioItem.querySelector('.esercizio-box');
                const esercizioId = esercizioBox.dataset.esercizioId;
                
                const esercizio = {
                    id: esercizioId,
                    nome: esercizioBox.querySelector('.nome-esercizio').value,
                    linkVideo: esercizioBox.querySelector('.link-video').value,
                    serie: esercizioBox.querySelector('.serie-esercizio').value,
                    ripetizioni: esercizioBox.querySelector('.ripetizioni-esercizio').value,
                    recupero: esercizioBox.querySelector('.recupero-esercizio').value,
                    note: esercizioBox.querySelector('.note-esercizio').value
                };
                
                giornata.esercizi.push(esercizio);
            });
            
            formData.giornate.push(giornata);
        });
        
        return formData;
    }
    
    // Funzione per generare l'anteprima della scheda
    function generatePreview(data) {
        // Crea la struttura HTML per l'anteprima
        let previewHTML = `
            <div class="scheda-header">
                <img src="../images/SECONDLIFE_colorYW.png" alt="SecondLife Project Logo">
                <h1>${data.nomeScheda}</h1>
            </div>
            
            <div class="scheda-info">
                <p><strong>Cliente:</strong> ${data.cliente}</p>
                <p><strong>Data di inizio:</strong> ${data.dataInizioFormatted}</p>
                <p><strong>Durata:</strong> ${data.durataScheda}</p>
            </div>
        `;
        
        // Aggiungi le giornate e gli esercizi
        data.giornate.forEach(giornata => {
            previewHTML += `
                <div class="giornata-section">
                    <div class="giornata-title">
                        ${giornata.nome}
                    </div>
                    <div class="esercizi-list">
            `;
            
            giornata.esercizi.forEach(esercizio => {
                previewHTML += `
                    <div class="esercizio-item">
                        <div class="esercizio-nome">${esercizio.nome}</div>
                        <div class="esercizio-dettagli">
                            <span><strong>Serie:</strong> ${esercizio.serie}</span>
                            <span><strong>Ripetizioni:</strong> ${esercizio.ripetizioni}</span>
                            <span><strong>Recupero:</strong> ${esercizio.recupero} sec</span>
                        </div>
                `;
                
                if (esercizio.note) {
                    previewHTML += `<div class="esercizio-note"><strong>Note:</strong> ${esercizio.note}</div>`;
                }
                
                if (esercizio.linkVideo) {
                    previewHTML += `<div class="esercizio-video"><strong>Video:</strong> <a href="${esercizio.linkVideo}" target="_blank">${esercizio.linkVideo}</a></div>`;
                }
                
                previewHTML += `</div>`;
            });
            
            previewHTML += `
                    </div>
                </div>
            `;
        });
        
        // Aggiungi il footer
        previewHTML += `
            <div class="scheda-footer">
                <p>© ${new Date().getFullYear()} SecondLife Project - Scheda generata il ${new Date().toLocaleDateString('it-IT')}</p>
            </div>
        `;
        
        return previewHTML;
    }
    
    // Funzione per generare il PDF
    function generatePDF() {
        // Raccogli i dati del form
        const formData = collectFormData();
        
        // Genera l'anteprima HTML
        const previewHTML = generatePreview(formData);
        schedaPreview.innerHTML = previewHTML;
        
        // Mostra temporaneamente l'anteprima per generare il PDF
        schedaPreview.style.display = 'block';
        
        // Utilizzo delle librerie jsPDF e html2canvas
        const { jsPDF } = window.jspdf;
        
        // Crea un nuovo documento PDF
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Imposta il titolo e le informazioni del documento
        doc.setProperties({
            title: 'SecondLife Project - Scheda di Allenamento',
            subject: 'Scheda di allenamento per ' + formData.cliente,
            author: 'SecondLife Project',
            creator: 'SecondLife Project'
        });
        
        // Utilizza html2canvas per convertire l'anteprima HTML in un'immagine
        html2canvas(schedaPreview, {
            scale: 2, // Migliora la qualità
            useCORS: true,
            logging: false
        }).then(canvas => {
            // Converti il canvas in un'immagine
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            // Calcola le dimensioni per adattare l'immagine alla pagina
            const imgWidth = 210; // Larghezza A4 in mm
            const pageHeight = 297; // Altezza A4 in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Aggiungi la prima pagina
            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Aggiungi pagine aggiuntive se necessario
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Salva il PDF
            const fileName = `SecondLife_Scheda_${formData.cliente.replace(/\s+/g, '_')}.pdf`;
            doc.save(fileName);
            
            // Nascondi l'anteprima
            schedaPreview.style.display = 'none';
            
            // Mostra un messaggio di successo
            alert('PDF generato con successo! Il file è stato scaricato sul tuo dispositivo.');
        });
    }
});
