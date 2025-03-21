exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Metodo non consentito" })
        };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // La chiave è nascosta nelle variabili di ambiente
    
    if (!OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Chiave API non trovata" })
        };
    }

    try {
        const requestBody = JSON.parse(event.body);
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Sei un coach esperto, empatico, motivazionale e tecnico. Rispondi come Rick, fondatore di Second Life Project, con risposte pratiche e mirate." },
                    { role: "user", content: requestBody.message }
                ]
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Errore interno del server" })
        };
    }
};
