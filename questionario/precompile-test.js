// Script per precompilare il questionario con dati di test
document.addEventListener('DOMContentLoaded', function() {
    // Dati di test
    const testData = {
        nome: "Mario Rossi",
        email: "mario.rossi@example.com",
        eta: "35",
        altezza: "178",
        peso: "82",
        esperienza: "2 anni",
        frequenza: "3 volte",
        durata: "60 minuti",
        obiettivo: "Perdere peso e aumentare la massa muscolare",
        aspettative: "Vorrei migliorare la mia forma fisica generale, perdere circa 5kg di grasso e aumentare la massa muscolare, soprattutto nella parte superiore del corpo.",
        lavoro: "Impiegato d'ufficio",
        sonno: "7 ore",
        stress: "Medio",
        dieta: "Sì",
        luogo: "Palestra",
        infortuni: "Leggero dolore alla spalla destra",
        altri_sport: "Nuoto occasionale",
        impegno: "Alto"
    };
    
    // Funzione per precompilare il form
    function precompileForm() {
        // Compila i campi di testo
        document.querySelector('input[name="nome"]').value = testData.nome;
        document.querySelector('input[name="email"]').value = testData.email;
        document.querySelector('input[name="eta"]').value = testData.eta;
        document.querySelector('input[name="altezza"]').value = testData.altezza;
        document.querySelector('input[name="peso"]').value = testData.peso;
        document.querySelector('input[name="esperienza"]').value = testData.esperienza;
        document.querySelector('input[name="frequenza"]').value = testData.frequenza;
        document.querySelector('input[name="durata"]').value = testData.durata;
        document.querySelector('input[name="obiettivo"]').value = testData.obiettivo;
        document.querySelector('textarea[name="aspettative"]').value = testData.aspettative;
        document.querySelector('input[name="lavoro"]').value = testData.lavoro;
        document.querySelector('input[name="sonno"]').value = testData.sonno;
        document.querySelector('input[name="infortuni"]').value = testData.infortuni;
        document.querySelector('input[name="altri_sport"]').value = testData.altri_sport;
        
        // Seleziona i radio buttons
        document.querySelector(`input[name="stress"][value="${testData.stress}"]`).checked = true;
        document.querySelector(`input[name="dieta"][value="${testData.dieta}"]`).checked = true;
        document.querySelector(`input[name="luogo"][value="${testData.luogo}"]`).checked = true;
        document.querySelector(`input[name="impegno"][value="${testData.impegno}"]`).checked = true;
        
        console.log('Form precompilato con dati di test');
    }
    
    // Aggiungi un pulsante per precompilare il form
    const form = document.getElementById('questionario-form');
    const submitButton = document.getElementById('submit-button');
    
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
});
