// Gestione del form di contatto con Formspree
window.addEventListener("DOMContentLoaded", function() {
    // Ottieni il form
    var form = document.getElementById("contact-form");
    
    // Aggiungi l'event listener per l'invio del form
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Invia il form tramite AJAX
            var formData = new FormData(form);
            
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Successo
                    alert("Grazie per il tuo messaggio! Ti contatteremo presto.");
                    form.reset();
                } else {
                    // Errore
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! Si è verificato un problema nell'invio del form. Riprova più tardi.");
                        }
                    });
                }
            })
            .catch(error => {
                alert("Oops! Si è verificato un problema nell'invio del form. Riprova più tardi.");
                console.error(error);
            });
        });
    }
});
