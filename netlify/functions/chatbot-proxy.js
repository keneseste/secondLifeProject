// Netlify Function per il proxy dell'API di ChatGPT
// Questo file deve essere salvato in: netlify/functions/chatbot-proxy.js

const axios = require('axios');

// Configurazione del sistema prompt per il chatbot
const SYSTEM_PROMPT = `Sei un assistente virtuale per SecondLife Project, un programma di coaching online che ottimizza l'allenamento in palestra.
Rispondi in modo conciso e amichevole alle domande sul programma. Ecco alcune informazioni sul progetto:
- SecondLife Project offre allenamenti brevi (1 ora), intensi e mirati per chi ha una vita impegnata
- Il programma prevede solo 3 allenamenti a settimana
- Si basa su sessioni ad alta intensità con recuperi lunghi (2-3 minuti)
- Utilizza solo 5-6 esercizi per sessione, scelti strategicamente
- Massimo 10 serie allenanti per sessione, con focus sull'intensità e sulla tecnica
- Range di 4-8 ripetizioni con carichi elevati
- Il programma è pensato per chi ha una vita impegnata ma vuole risultati concreti
- Aiuta a conciliare famiglia, lavoro e allenamento
- Preserva l'energia per la vita quotidiana
Se non conosci la risposta a una domanda specifica, suggerisci di contattare direttamente il team di SecondLife Project.`;

exports.handler = async function(event, context) {
  // Verifica che la richiesta sia di tipo POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Metodo non consentito' })
    };
  }

  try {
    // Estrai il messaggio dal corpo della richiesta
    const requestBody = JSON.parse(event.body);
    const userMessage = requestBody.message;

    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Messaggio mancante' })
      };
    }

    // Ottieni l'API key dalle variabili d'ambiente di Netlify
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key non configurata' })
      };
    }

    // Prepara la richiesta per l'API di OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Estrai la risposta
    const botMessage = response.data.choices[0].message.content;

    // Restituisci la risposta
    return {
      statusCode: 200,
      body: JSON.stringify({ message: botMessage })
    };
  } catch (error) {
    console.error('Errore nella chiamata all\'API di OpenAI:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Errore nella comunicazione con l\'API di OpenAI',
        details: error.message
      })
    };
  }
};
