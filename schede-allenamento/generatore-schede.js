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
    
    // Inizializzazione: aggiungi la prima giornata
    addGiornata();
    
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
        
        // Inserisci l'esercizio nel container
        eserciziContainer.appendChild(esercizioClone);
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
        let isValid = true;
        
        // Valida i campi generali
        const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
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
