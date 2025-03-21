exports.handler = async function(event, context) {
    console.log("🟢 Funzione avviata!");
    console.log("🟢 Evento ricevuto:", event);

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({ message: "OK" })
        };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
        console.error("🔴 Errore: Chiave API non trovata!");
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: "Chiave API non trovata" })
        };
    }

    try {
        const requestBody = JSON.parse(event.body);
        console.log("🟢 Richiesta ricevuta:", requestBody);

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
        console.log("🟢 Risposta OpenAI:", data);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reply: data.choices[0].message.content })
        };
    } catch (error) {
        console.error("🔴 Errore interno:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: "Errore interno del server" })
        };
    }
};
