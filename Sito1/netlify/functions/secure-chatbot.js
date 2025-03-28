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
                model: "GPT‑4o mini",
                messages: [
                    { role: "system", content: "Sei un coach esperto, empatico, motivazionale e tecnico. Rispondi come Rick, fondatore di Second Life Project, con risposte pratiche e mirate." },
                    { role: "user", content: requestBody.message }
                ]
            })
        });

        const responseText = await response.text(); // Leggiamo la risposta grezza
        console.log("🟢 Risposta grezza OpenAI:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            console.error("🔴 Errore nel parsing JSON:", error);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ error: "Risposta OpenAI non valida" })
            };
        }

        if (!data || !data.choices || data.choices.length === 0) {
            console.error("🔴 Errore: Risposta OpenAI vuota o non valida:", data);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ error: "Risposta OpenAI vuota o non valida" })
            };
        }

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
        console.error("🔴 Errore interno:", error.message, error.stack);
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
