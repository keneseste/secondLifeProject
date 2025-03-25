// Script per la gestione del questionario e generazione PDF
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
        
        // Generazione del PDF
        generatePDF(formDataObj);
        
        // Invio email con i dati del form
        sendFormData(formDataObj);
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
        
        // Salva il PDF e lo allega all'email
        const pdfBlob = doc.output('blob');
        return pdfBlob;
    }
    
    // Funzione per inviare i dati del form via email
    function sendFormData(data) {
        // Genera il PDF
        const pdfBlob = generatePDF(data);
        
        // Crea un oggetto FormData per l'invio
        const emailFormData = new FormData();
        
        // Aggiungi i dati del form
        emailFormData.append('_subject', 'Nuovo questionario da SecondLife Project: ' + data.nome);
        emailFormData.append('name', data.nome);
        emailFormData.append('_replyto', data.email);
        
        // Crea un messaggio di riepilogo
        let message = `Nuovo questionario compilato da ${data.nome}\n\n`;
        message += `Email: ${data.email}\n`;
        message += `Età: ${data.eta} anni\n`;
        message += `Altezza: ${data.altezza} cm\n`;
        message += `Peso: ${data.peso} kg\n\n`;
        message += `Obiettivo principale: ${data.obiettivo}\n`;
        message += `Livello di impegno: ${data.impegno}\n\n`;
        message += `Il PDF completo è allegato a questa email.`;
        
        emailFormData.append('message', message);
        
        // Aggiungi il PDF come allegato
        emailFormData.append('attachment', pdfBlob, 'SecondLife_Questionario_' + data.nome.replace(/\s+/g, '_') + '.pdf');
        
        // Mostra messaggio di caricamento
        showMessage('Invio in corso...', 'loading');
        
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
            showMessage('Questionario inviato con successo! Riceverai presto una risposta.', 'success');
            
            // Resetta il form
            form.reset();
            
            // Scarica automaticamente il PDF
            downloadPDF();
        })
        .catch(error => {
            console.error('Errore:', error);
            
            // Fallback: se l'invio diretto fallisce, mostra istruzioni per l'invio manuale
            showMessage('Si è verificato un problema con l\'invio automatico. Il PDF è stato generato, puoi scaricarlo e inviarlo manualmente a riccardo.casafino@gmail.com', 'warning');
            
            // Scarica il PDF
            downloadPDF();
        });
    }
    
    // Funzione per scaricare il PDF
    function downloadPDF() {
        // Raccolta dati dal form
        const formData = new FormData(form);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Genera il PDF
        const pdfBlob = generatePDF(formDataObj);
        
        // Crea un URL per il blob
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Crea un link per il download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'SecondLife_Questionario_' + formDataObj.nome.replace(/\s+/g, '_') + '.pdf';
        
        // Aggiungi il link al documento e simula il click
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Rimuovi il link
        document.body.removeChild(downloadLink);
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
        messageElement.textContent = message;
        
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
    
    // Aggiungi stili CSS per i messaggi
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            font-weight: 500;
        }
        
        .form-message.success {
            background-color: rgba(39, 174, 96, 0.2);
            color: #27ae60;
            border: 1px solid #27ae60;
        }
        
        .form-message.warning {
            background-color: rgba(241, 196, 15, 0.2);
            color: #f1c40f;
            border: 1px solid #f1c40f;
        }
        
        .form-message.error {
            background-color: rgba(231, 76, 60, 0.2);
            color: #e74c3c;
            border: 1px solid #e74c3c;
        }
        
        .form-message.loading {
            background-color: rgba(52, 152, 219, 0.2);
            color: #3498db;
            border: 1px solid #3498db;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #e74c3c;
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
