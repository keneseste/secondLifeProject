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
        const timestamp = new Date().getTime();<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>