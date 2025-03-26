// Script migliorato per precompilare il questionario con dati di test
document.addEventListener('DOMContentLoaded', function() {
    // Dati di test completi per tutti i campi del questionario
    const testData = {
        // Dati Anagrafici
        nome: "Mario Rossi",
        email: "mario.rossi@example.com",
        eta: "35",
        altezza: "178",
        peso: "82",
        
        // Esperienza e Allenamento
        esperienza: "2 anni",
        frequenza: "3 volte",
        durata: "60 minuti",
        
        // Obiettivi
        obiettivo: "Perdere peso e aumentare la massa muscolare",
        aspettative: "Vorrei migliorare la mia forma fisica generale, perdere circa 5kg di grasso e aumentare la massa muscolare, soprattutto nella parte superiore del corpo.",
        
        // Stile di Vita
        lavoro: "Impiegato d'ufficio",
        sonno: "7 ore",
        stress: "Medio", // Valore per radio button: Basso, Medio, Alto
        
        // Alimentazione
        dieta: "Sì", // Valore per radio button: Sì, No
        
        // Allenamento & Preferenze
        luogo: "Palestra", // Valore per radio button: Palestra, Casa
        infortuni: "Leggero dolore alla spalla destra",
        altri_sport: "Nuoto occasionale",
        
        // Impegno
        impegno: "Alto" // Valore per radio button: Moderato, Alto
    };
    
    // Funzione per precompilare il form
    function precompileForm() {
        // Compila tutti i campi di testo usando selettori più robusti
        // Cerca per name, id, o placeholder che contiene il testo
        
        // Funzione helper per trovare e compilare un campo
        function fillField(fieldIdentifier, value) {
            // Cerca per name
            let field = document.querySelector(`[name="${fieldIdentifier}"]`);
            
            // Se non trovato, cerca per id
            if (!field) {
                field = document.getElementById(fieldIdentifier);
            }
            
            // Se non trovato, cerca per placeholder contenente il testo
            if (!field) {
                field = document.querySelector(`[placeholder*="${fieldIdentifier}"]`);
            }
            
            // Se non trovato, cerca per label contenente il testo
            if (!field) {
                const labels = document.querySelectorAll('label');
                for (const label of labels) {
                    if (label.textContent.toLowerCase().includes(fieldIdentifier.toLowerCase())) {
                        // Trova il campo associato alla label
                        const id = label.getAttribute('for');
                        if (id) {
                            field = document.getElementById(id);
                            break;
                        }
                    }
                }
            }
            
            // Se trovato, compila il campo
            if (field) {
                if (field.tagName === 'TEXTAREA') {
                    field.value = value;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                } else if (field.type === 'radio') {
                    // Per i radio button, trova quello con il valore corretto
                    const radioGroup = document.querySelectorAll(`[name="${field.name}"]`);
                    for (const radio of radioGroup) {
                        if (radio.value === value || radio.value.toLowerCase() === value.toLowerCase()) {
                            radio.checked = true;
                            radio.dispatchEvent(new Event('change', { bubbles: true }));
                            break;
                        }
                    }
                } else {
                    field.value = value;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } else {
                console.warn(`Campo non trovato: ${fieldIdentifier}`);
            }
        }
        
        // Compila tutti i campi usando la funzione helper
        for (const [key, value] of Object.entries(testData)) {
            fillField(key, value);
        }
        
        // Gestione specifica per i radio button
        // Stress
        const stressRadios = document.querySelectorAll('input[name="stress"]');
        for (const radio of stressRadios) {
            if (radio.value === testData.stress || radio.value.toLowerCase() === testData.stress.toLowerCase()) {
                radio.checked = true;
                break;
            }
        }
        
        // Dieta
        const dietaRadios = document.querySelectorAll('input[name="dieta"]');
        for (const radio of dietaRadios) {
            if (radio.value === testData.dieta || radio.value.toLowerCase() === testData.dieta.toLowerCase()) {
                radio.checked = true;
                break;
            }
        }
        
        // Luogo
        const luogoRadios = document.querySelectorAll('input[name="luogo"]');
        for (const radio of luogoRadios) {
            if (radio.value === testData.luogo || radio.value.toLowerCase() === testData.luogo.toLowerCase()) {
                radio.checked = true;
                break;
            }
        }
        
        // Impegno
        const impegnoRadios = document.querySelectorAll('input[name="impegno"]');
        for (const radio of impegnoRadios) {
            if (radio.value === testData.impegno || radio.value.toLowerCase() === testData.impegno.toLowerCase()) {
                radio.checked = true;
                break;
            }
        }
        
        console.log('Form precompilato con dati di test completi');
    }
    
    // Aggiungi un pulsante per precompilare il form
    const form = document.getElementById('questionario-form');
    const submitButton = document.getElementById('submit-button');
    
    if (form && submitButton) {
        const precompileButton = document.createElement('button');
        precompileButton.type = 'button';
        precompileButton.className = 'precompile-button';
        precompileButton.textContent = 'Precompila con dati di test';
        precompileButton.style.marginRight = '10px';
        precompileButton.style.backgroundColor = '#4CAF50';
        precompileButton.style.color = 'white';
        precompileButton.style.border = 'none';
        precompileButton.style.padding = '10px 15px';
        precompileButton.style.borderRadius = '4px';
        precompileButton.style.cursor = 'pointer';
        
        // Inserisci il pulsante prima del pulsante di invio
        submitButton.parentNode.insertBefore(precompileButton, submitButton);
        
        // Aggiungi l'evento click al pulsante
        precompileButton.addEventListener('click', precompileForm);
        
        console.log('Pulsante di precompilazione aggiunto');
    } else {
        console.warn('Form o pulsante di invio non trovato');
    }
});
