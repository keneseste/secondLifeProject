// Script per la gestione del questionario con invio dati testuali via Formspree
document.addEventListener('DOMContentLoaded', function() {
    // Riferimento al form
    const form = document.getElementById('questionario-form');
    
    // Aggiungi il link al CSS del questionario
    const head = document.querySelector('head');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'questionario.css';
    head.appendChild(link);
    
    // Gestione dell'invio del form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validazione del form
        if (!validateForm()) {
            return;
        }
        
        // Raccolta dati dal form
        const formData = new FormData(form);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Mostra messaggio di caricamento
        showMessage('Elaborazione in corso...', 'loading');
        
        // Generazione del PDF
        generatePDF(formDataObj);
        
        // Crea un oggetto FormData per l'invio
        const emailFormData = new FormData();
        
        // Aggiungi i dati del form
        emailFormData.append('_subject', 'Nuovo questionario da SecondLife Project: ' + formDataObj.nome);
        emailFormData.append('name', formDataObj.nome);
        emailFormData.append('_replyto', formDataObj.email);
        
        // Crea un messaggio di riepilogo ben formattato
        let message = `SECOND LIFE PROJECT - QUESTIONARIO INIZIALE\n\n`;
        message += `DATI ANAGRAFICI\n`;
        message += `Nome e Cognome: ${formDataObj.nome}\n`;
        message += `Email: ${formDataObj.email}\n`;
        message += `Età: ${formDataObj.eta} anni\n`;
        message += `Altezza: ${formDataObj.altezza} cm\n`;
        message += `Peso attuale: ${formDataObj.peso} kg\n\n`;
        
        message += `ESPERIENZA E ALLENAMENTO\n`;
        message += `Esperienza: ${formDataObj.esperienza}\n`;
        message += `Frequenza: ${formDataObj.frequenza} a settimana\n`;
        message += `Durata sessioni: ${formDataObj.durata}\n\n`;
        
        message += `OBIETTIVI\n`;
        message += `Obiettivo principale: ${formDataObj.obiettivo}\n`;
        message += `Aspettative: ${formDataObj.aspettative}\n\n`;
        
        message += `STILE DI VITA\n`;
        message += `Lavoro: ${formDataObj.lavoro}\n`;
        message += `Ore di sonno: ${formDataObj.sonno}\n`;
        message += `Livello di stress: ${formDataObj.stress}\n\n`;
        
        message += `ALIMENTAZIONE\n`;
        message += `Vuoi essere seguito/a con macros e dieta flessibile? ${formDataObj.dieta}\n\n`;
        
        message += `ALLENAMENTO & PREFERENZE\n`;
        message += `Luogo di allenamento: ${formDataObj.luogo}\n`;
        message += `Limitazioni/Infortuni: ${formDataObj.infortuni || "Nessuno"}\n`;
        message += `Altri sport: ${formDataObj.altri_sport || "Nessuno"}\n\n`;
        
        message += `LIVELLO DI IMPEGNO\n`;
        message += `Impegno: ${formDataObj.impegno}\n`;
        if (formDataObj.impegno === 'Moderato') {
            message += `"Voglio migliorare, ma senza stravolgere la mia vita"\n\n`;
        } else {
            message += `"Sono pronto/a a fare il massimo per trasformarmi"\n\n`;
        }
        
        message += `NOTA: Il PDF del questionario è stato generato e scaricato sul dispositivo dell'utente.\n`;
        message += `Ti ricordiamo di inviare le foto (frontale, laterale e posteriore) a riccardo.casafino@gmail.com\n`;
        
        emailFormData.append('message', message);
        
        // Invia i dati a Formspree
        fetch('https://formspree.io/f/mqaplppn', {
            method: 'POST',
            body: emailFormData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Errore nell\'invio del form');
        })
        .then(data => {
            // Mostra messaggio di successo
            showMessage('Questionario inviato con successo! Il PDF è stato scaricato sul tuo dispositivo. Riceverai presto una risposta.', 'success');
            
            // Resetta il form
            form.reset();
        })
        .catch(error => {
            console.error('Errore:', error);
            
            // Mostra messaggio di errore ma conferma che il PDF è stato generato
            showMessage('Si è verificato un problema con l\'invio del form, ma il PDF è stato generato e scaricato correttamente. Per completare l\'iscrizione, ti preghiamo di inviare il PDF a riccardo.casafino@gmail.com insieme alle tue foto.', 'warning');
        });
    });
    
    // Funzione di validazione del form
    function validateForm() {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Trova il parent form-group
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    if (!formGroup.querySelector('.error-message')) {
                        const errorMsg = document.createElement('p');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Questo campo è obbligatorio';
                        formGroup.appendChild(errorMsg);
                    }
                }
            } else {
                input.classList.remove('error');
                
                // Rimuovi eventuali messaggi di errore
                const formGroup = input.closest('.form-group');
                if (formGroup) {
                    const errorMsg = formGroup.querySelector('.error-message');
                    if (errorMsg) {
                        formGroup.removeChild(errorMsg);
                    }
                }
            }
        });
        
        // Verifica radio buttons
        const radioGroups = ['stress', 'dieta', 'luogo', 'impegno'];
        radioGroups.forEach(name => {
            const radioButtons = form.querySelectorAll(`input[name="${name}"]`);
            let radioSelected = false;
            
            radioButtons.forEach(radio => {
                if (radio.checked) {
                    radioSelected = true;
                }
            });
            
            if (!radioSelected) {
                isValid = false;
                
                // Trova il parent radio-group
                const radioGroup = radioButtons[0].closest('.radio-group') || 
                                  radioButtons[0].closest('.commitment-options');
                
                if (radioGroup && !radioGroup.querySelector('.error-message')) {
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Seleziona un\'opzione';
                    radioGroup.appendChild(errorMsg);
                }
            } else {
                // Rimuovi eventuali messaggi di errore
                const radioGroup = radioButtons[0].closest('.radio-group') || 
                                  radioButtons[0].closest('.commitment-options');
                
                if (radioGroup) {
                    const errorMsg = radioGroup.querySelector('.error-message');
                    if (errorMsg) {
                        radioGroup.removeChild(errorMsg);
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Funzione per generare il PDF
    function generatePDF(data) {
        // Utilizzo delle librerie jsPDF e html2canvas
        const { jsPDF } = window.jspdf;
        
        // Crea un nuovo documento PDF
        const doc = new jsPDF();
        
        // Imposta il titolo e le informazioni del documento
        doc.setProperties({
            title: 'SecondLife Project - Questionario Iniziale',
            subject: 'Questionario compilato da ' + data.nome,
            author: 'SecondLife Project',
            creator: 'SecondLife Project'
        });
        
        // Funzione per aggiungere testo al PDF
        function addText(text, x, y, options = {}) {
            const defaultOptions = {
                fontSize: 12,
                fontStyle: 'normal',
                align: 'left'
            };
            
            const opts = {...defaultOptions, ...options};
            
            doc.setFontSize(opts.fontSize);
            doc.setFont('helvetica', opts.fontStyle);
            doc.text(text, x, y, {align: opts.align});
        }
        
        // Aggiungi intestazione
        addText('SECOND LIFE PROJECT - QUESTIONARIO INIZIALE', 105, 20, {fontSize: 16, fontStyle: 'bold', align: 'center'});
        addText('Data: ' + new Date().toLocaleDateString('it-IT'), 105, 30, {fontSize: 10, align: 'center'});
        
        // Aggiungi linea separatrice
        doc.setDrawColor(0, 183, 255);
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        let yPos = 45;
        
        // Dati Anagrafici
        addText('DATI ANAGRAFICI', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Nome e Cognome: ' + data.nome, 20, yPos);
        yPos += 8;
        addText('Email: ' + data.email, 20, yPos);
        yPos += 8;
        addText('Età: ' + data.eta + ' anni', 20, yPos);
        yPos += 8;
        addText('Altezza: ' + data.altezza + ' cm', 20, yPos);
        yPos += 8;
        addText('Peso attuale: ' + data.peso + ' kg', 20, yPos);
        yPos += 15;
        
        // Esperienza e Allenamento
        addText('ESPERIENZA E ALLENAMENTO', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Esperienza: ' + data.esperienza, 20, yPos);
        yPos += 8;
        addText('Frequenza: ' + data.frequenza + ' a settimana', 20, yPos);
        yPos += 8;
        addText('Durata sessioni: ' + data.durata, 20, yPos);
        yPos += 15;
        
        // Obiettivi
        addText('OBIETTIVI', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Obiettivo principale: ' + data.obiettivo, 20, yPos);
        yPos += 8;
        
        // Gestione testo lungo per aspettative
        const aspettativeLines = doc.splitTextToSize(data.aspettative, 150);
        addText('Aspettative:', 20, yPos);
        yPos += 8;
        
        for (let i = 0; i < aspettativeLines.length; i++) {
            addText(aspettativeLines[i], 30, yPos);
            yPos += 6;
        }
        yPos += 7;
        
        // Nuova pagina se necessario
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Stile di Vita
        addText('STILE DI VITA', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Lavoro: ' + data.lavoro, 20, yPos);
        yPos += 8;
        addText('Ore di sonno: ' + data.sonno, 20, yPos);
        yPos += 8;
        addText('Livello di stress: ' + data.stress, 20, yPos);
        yPos += 15;
        
        // Alimentazione
        addText('ALIMENTAZIONE', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Vuoi essere seguito/a con macros e dieta flessibile? ' + data.dieta, 20, yPos);
        yPos += 15;
        
        // Allenamento & Preferenze
        addText('ALLENAMENTO & PREFERENZE', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Luogo di allenamento: ' + data.luogo, 20, yPos);
        yPos += 8;
        
        // Gestione testo lungo per infortuni
        if (data.infortuni) {
            const infortuniLines = doc.splitTextToSize('Limitazioni/Infortuni: ' + data.infortuni, 150);
            for (let i = 0; i < infortuniLines.length; i++) {
                addText(infortuniLines[i], 20, yPos);
                yPos += 6;
            }
        } else {
            addText('Limitazioni/Infortuni: Nessuno', 20, yPos);
            yPos += 6;
        }
        yPos += 2;
        
        // Altri sport
        if (data.altri_sport) {
            addText('Altri sport: ' + data.altri_sport, 20, yPos);
        } else {
            addText('Altri sport: Nessuno', 20, yPos);
        }
        yPos += 15;
        
        // Nuova pagina se necessario
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Impegno
        addText('LIVELLO DI IMPEGNO', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Impegno: ' + data.impegno, 20, yPos);
        yPos += 8;
        
        if (data.impegno === 'Moderato') {
            addText('Voglio migliorare, ma senza stravolgere la mia vita', 20, yPos);
        } else {
            addText('Sono pronto/a a fare il massimo per trasformarmi', 20, yPos);
        }
        yPos += 20;
        
        // Nota finale
        addText('NOTA SULLE FOTO', 20, yPos, {fontSize: 14, fontStyle: 'bold'});
        yPos += 10;
        addText('Ti ricordiamo di inviare le foto (frontale, laterale e posteriore) a:', 20, yPos);
        yPos += 8;
        addText('riccardo.casafino@gmail.com', 20, yPos, {fontStyle: 'bold'});
        yPos += 8;
        addText('Le foto sono fondamentali per monitorare i progressi e personalizzare il tuo programma.', 20, yPos);
        
        // Piè di pagina
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('SecondLife Project - Questionario Iniziale - Pagina ' + i + ' di ' + pageCount, 105, 285, {align: 'center'});
        }
        
        // Salva il PDF con il nome dell'utente
        const fileName = 'SecondLife_Questionario_' + data.nome.replace(/\s+/g, '_') + '.pdf';
        doc.save(fileName);
    }
    
    // Funzione per mostrare messaggi all'utente
    function showMessage(message, type) {
        // Rimuovi eventuali messaggi esistenti
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crea il nuovo messaggio
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        
        // Aggiungi icona di caricamento se necessario
        if (type === 'loading') {
            const spinner = document.createElement('span');
            spinner.className = 'loading-spinner';
            messageElement.appendChild(spinner);
        }
        
        // Aggiungi il testo del messaggio
        const textNode = document.createTextNode(message);
        messageElement.appendChild(textNode);
        
        // Aggiungi il messaggio prima del pulsante di invio
        const submitButton = document.getElementById('submit-button');
        submitButton.parentNode.insertBefore(messageElement, submitButton);
        
        // Se è un messaggio di successo, scorri fino ad esso
        if (type === 'success') {
            messageElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Se non è un messaggio di caricamento, imposta un timer per rimuoverlo
        if (type !== 'loading') {
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 500);
            }, 10000);
        }
    }
});
