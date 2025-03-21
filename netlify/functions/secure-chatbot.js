exports.handler = async function(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Metodo non consentito" })
        };
    }

const apiUrl = "https://secondlifeproject.netlify.app/.netlify/functions/secure-chatbot";
    
    if (!OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Chiave API non trovata" })
        };
    }

    try {
        const requestBody = JSON.parse(event.body);

        const response = await fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage })
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
