// Chatbot per SecondLife Project utilizzando l'API di ChatGPT
// Versione alternativa che utilizza direttamente l'API con una chiave predefinita

// Configurazione del chatbot
const chatbotConfig = {
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4', // Utilizzare gpt-4 se disponibile nell'abbonamento Plus
    apiKey: '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', // Inserisci qui la tua API key di OpenAI
    systemPrompt: `Sei un assistente virtuale per SecondLife Project, un programma di coaching online che ottimizza l'allenamento in palestra.
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
    Se non conosci la risposta a una domanda specifica, suggerisci di contattare direttamente il team di SecondLife Project.`,
    welcomeMessage: 'Ciao! Sono l\'assistente virtuale di SecondLife Project. Come posso aiutarti oggi?',
    placeholderText: 'Scrivi qui la tua domanda...',
    sendButtonText: 'Invia',
    loadingText: 'Sto pensando...',
    errorMessage: 'Mi dispiace, si è verificato un errore. Riprova più tardi o contattaci direttamente.',
    position: 'bottom-right', // Posizione del chatbot nella pagina
    primaryColor: '#ffd700', // Colore principale (giallo oro come nel logo)
    secondaryColor: '#0a0a1a', // Colore secondario (sfondo scuro come nella landing page)
    headerText: 'SecondLife Project Assistant'
};

// Funzione per creare lo stile CSS del chatbot
function createChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #sl-chatbot-container {
            position: fixed;
            ${chatbotConfig.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            ${chatbotConfig.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            z-index: 1000;
            font-family: 'Montserrat', sans-serif;
        }
        
        #sl-chatbot-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: ${chatbotConfig.primaryColor};
            color: ${chatbotConfig.secondaryColor};
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        #sl-chatbot-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        
        #sl-chatbot-icon {
            font-size: 24px;
        }
        
        #sl-chatbot-window {
            display: none;
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 350px;
            height: 500px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            flex-direction: column;
        }
        
        #sl-chatbot-header {
            background-color: ${chatbotConfig.primaryColor};
            color: ${chatbotConfig.secondaryColor};
            padding: 15px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #sl-chatbot-close {
            cursor: pointer;
            font-size: 18px;
        }
        
        #sl-chatbot-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .sl-message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            margin-bottom: 5px;
            word-wrap: break-word;
        }
        
        .sl-user-message {
            background-color: ${chatbotConfig.primaryColor};
            color: ${chatbotConfig.secondaryColor};
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }
        
        .sl-bot-message {
            background-color: #e0e0e0;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }
        
        #sl-chatbot-input-area {
            padding: 15px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 10px;
        }
        
        #sl-chatbot-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-family: 'Montserrat', sans-serif;
        }
        
        #sl-chatbot-input:focus {
            border-color: ${chatbotConfig.primaryColor};
        }
        
        #sl-chatbot-send {
            background-color: ${chatbotConfig.primaryColor};
            color: ${chatbotConfig.secondaryColor};
            border: none;
            border-radius: 20px;
            padding: 10px 15px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        #sl-chatbot-send:hover {
            background-color: #e6c200;
        }
        
        #sl-chatbot-send:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        .sl-typing-indicator {
            display: flex;
            gap: 5px;
            padding: 10px 15px;
            background-color: #e0e0e0;
            border-radius: 15px;
            align-self: flex-start;
            width: fit-content;
        }
        
        .sl-typing-dot {
            width: 8px;
            height: 8px;
            background-color: #666;
            border-radius: 50%;
            animation: sl-typing-animation 1.4s infinite ease-in-out;
        }
        
        .sl-typing-dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .sl-typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .sl-typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes sl-typing-animation {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Funzione per creare l'HTML del chatbot
function createChatbotHTML() {
    const container = document.createElement('div');
    container.id = 'sl-chatbot-container';
    
    // Pulsante per aprire il chatbot
    const button = document.createElement('div');
    button.id = 'sl-chatbot-button';
    button.innerHTML = '<div id="sl-chatbot-icon"><i class="fas fa-comment"></i></div>';
    
    // Finestra del chatbot
    const window = document.createElement('div');
    window.id = 'sl-chatbot-window';
    
    // Header del chatbot
    const header = document.createElement('div');
    header.id = 'sl-chatbot-header';
    header.innerHTML = `
        <div>${chatbotConfig.headerText}</div>
        <div id="sl-chatbot-close">×</div>
    `;
    
    // Area messaggi
    const messages = document.createElement('div');
    messages.id = 'sl-chatbot-messages';
    
    // Area input
    const inputArea = document.createElement('div');
    inputArea.id = 'sl-chatbot-input-area';
    inputArea.innerHTML = `
        <input type="text" id="sl-chatbot-input" placeholder="${chatbotConfig.placeholderText}">
        <button id="sl-chatbot-send">${chatbotConfig.sendButtonText}</button>
    `;
    
    // Assemblaggio componenti
    window.appendChild(header);
    window.appendChild(messages);
    window.appendChild(inputArea);
    
    container.appendChild(button);
    container.appendChild(window);
    
    document.body.appendChild(container);
}

// Funzione per inizializzare il chatbot
function initChatbot() {
    // Creare stili e HTML
    createChatbotStyles();
    createChatbotHTML();
    
    // Elementi DOM
    const chatbotButton = document.getElementById('sl-chatbot-button');
    const chatbotWindow = document.getElementById('sl-chatbot-window');
    const chatbotClose = document.getElementById('sl-chatbot-close');
    const chatbotMessages = document.getElementById('sl-chatbot-messages');
    const chatbotInput = document.getElementById('sl-chatbot-input');
    const chatbotSend = document.getElementById('sl-chatbot-send');
    
    // Event listeners
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
        chatbotButton.style.display = 'none';
        
        // Se è la prima apertura, mostrare il messaggio di benvenuto
        if (chatbotMessages.children.length === 0) {
            addBotMessage(chatbotConfig.welcomeMessage);
        }
    });
    
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
        chatbotButton.style.display = 'flex';
    });
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !chatbotSend.disabled) {
            sendMessage();
        }
    });
    
    chatbotSend.addEventListener('click', () => {
        if (!chatbotSend.disabled) {
            sendMessage();
        }
    });
    
    // Funzione per aggiungere un messaggio dell'utente
    function addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'sl-message sl-user-message';
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Funzione per aggiungere un messaggio del bot
    function addBotMessage(text) {
        const message = document.createElement('div');
        message.className = 'sl-message sl-bot-message';
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Funzione per mostrare l'indicatore di digitazione
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'sl-typing-indicator';
        indicator.id = 'sl-typing-indicator';
        indicator.innerHTML = `
            <div class="sl-typing-dot"></div>
            <div class="sl-typing-dot"></div>
            <div class="sl-typing-dot"></div>
        `;
        chatbotMessages.appendChild(indicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Funzione per rimuovere l'indicatore di digitazione
    function removeTypingIndicator() {
        const indicator = document.getElementById('sl-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Funzione per inviare un messaggio all'API di ChatGPT
    async function sendToChatGPT(message) {
        try {
            const response = await fetch(chatbotConfig.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatbotConfig.apiKey}`
                },
                body: JSON.stringify({
                    model: chatbotConfig.model,
                    messages: [
                        {
                            role: 'system',
                            content: chatbotConfig.systemPrompt
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || 'Errore nella richiesta API');
            }
            
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
            throw error;
        }
    }
    
    // Funzione per inviare un messaggio
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Disabilitare l'input e il pulsante durante l'elaborazione
        chatbotInput.value = '';
        chatbotInput.disabled = true;
        chatbotSend.disabled = true;
        
        // Aggiungere il messaggio dell'utente
        addUserMessage(message);
        
        // Mostrare l'indicatore di digitazione
        showTypingIndicator();
        
        try {
            // Inviare il messaggio all'API di ChatGPT
            const response = await sendToChatGPT(message);
            
            // Rimuovere l'indicatore di digitazione
            removeTypingIndicator();
            
            // Aggiungere la risposta del bot
            addBotMessage(response);
        } catch (error) {
            // Rimuovere l'indicatore di digitazione
            removeTypingIndicator();
            
            // Mostrare un messaggio di errore
            addBotMessage(chatbotConfig.errorMessage);
            console.error('Errore:', error);
        } finally {
            // Riabilitare l'input e il pulsante
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            chatbotInput.focus();
        }
    }
}

// Inizializzare il chatbot quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', initChatbot);
