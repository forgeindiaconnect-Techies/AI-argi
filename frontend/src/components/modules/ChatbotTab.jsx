import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sprout, Wind, Droplets, MapPin, AlertCircle } from 'lucide-react';

const ChatbotTab = ({ activeFarm }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const languages = ['English', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Hindi (हिन्दी)', 'Malayalam (മലയാളം)', 'Kannada (ಕನ್ನಡ)'];

  const translations = {
    'English': {
      greeting: "Hello! I am AgriAI, your intelligent Smart Agriculture Assistant. How can I help you with your farm today?",
      placeholder: "Ask AgriAI anything in English...",
      assistant: "AgriAI Assistant",
      partner: "Your intelligent farming partner",
      lang: "Language:"
    },
    'Tamil (தமிழ்)': {
      greeting: "வணக்கம்! நான் AgriAI, உங்கள் அறிவார்ந்த வேளாண்மை உதவியாளர். இன்று உங்கள் பண்ணைக்கு நான் எவ்வாறு உதவ முடியும்?",
      placeholder: "AgriAI இடம் எதையும் கேளுங்கள்...",
      assistant: "AgriAI உதவியாளர்",
      partner: "உங்கள் அறிவார்ந்த விவசாய பங்குதாரர்",
      lang: "மொழி:"
    },
    'Telugu (తెలుగు)': {
      greeting: "నమస్కారం! నేను AgriAI, మీ వ్యవసాయ సహాయకుడిని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
      placeholder: "AgriAI ని ఏదైనా అడగండి...",
      assistant: "AgriAI సహాయకుడు",
      partner: "మీ వ్యవసాయ భాగస్వామి",
      lang: "భాష:"
    },
    'Hindi (हिन्दी)': {
      greeting: "नमस्ते! मैं एग्रीएआई (AgriAI) हूँ, आपका कृषि सहायक। मैं आज आपकी कैसे मदद कर सकता हूँ?",
      placeholder: "AgriAI से कुछ भी पूछें...",
      assistant: "AgriAI सहायक",
      partner: "आपका कृषि भागीदार",
      lang: "भाषा:"
    },
    'Malayalam (മലയാളം)': {
      greeting: "നമസ്കാരം! ഞാൻ AgriAI, നിങ്ങളുടെ കാർഷിക സഹായിയാണ്. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
      placeholder: "AgriAI യോട് എന്തെങ്കിലും ചോദിക്കുക...",
      assistant: "AgriAI സഹായി",
      partner: "നിങ്ങളുടെ കാർഷിക പങ്കാളി",
      lang: "ഭാഷ:"
    },
    'Kannada (ಕನ್ನಡ)': {
      greeting: "ನಮಸ್ಕಾರ! ನಾನು ಅಗ್ರಿಎಐ (AgriAI), ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      placeholder: "AgriAI ಅನ್ನು ಏನಾದರೂ ಕೇಳಿ...",
      assistant: "AgriAI ಸಹಾಯಕ",
      partner: "ನಿಮ್ಮ ಕೃಷಿ ಪಾಲುದಾರ",
      lang: "ಭಾಷೆ:"
    }
  };

  // When language changes, append a localized greeting
  useEffect(() => {
    setMessages([{
      sender: 'ai',
      text: translations[language].greeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [language]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Connect to the OpenAI backend server you just created
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `Respond in ${language}. Farm context: District=${activeFarm?.district || 'Unknown'}, Soil=${activeFarm?.soil || 'Unknown'}. User asked: ${input}` 
        })
      });

      const data = await response.json();
      
      const aiResponse = {
        sender: 'ai',
        text: data.reply || "Sorry, I couldn't understand that.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Sorry, I am currently offline or cannot connect to the server. Please ensure the backend is running.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const t = translations[language];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header & Settings */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-agri-bg-darkSurface p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-agri-green text-white rounded-lg"><Bot className="w-6 h-6" /></div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.assistant}</h3>
            <p className="text-sm text-gray-500">{t.partner}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 w-full md:w-auto">
            <span className="text-gray-500 font-medium">{t.lang}</span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent font-bold text-agri-green outline-none cursor-pointer"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Context Bar */}
      {activeFarm && (
        <div className="flex flex-wrap items-center gap-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg shrink-0 text-xs text-blue-800 dark:text-blue-300">
          <span className="font-bold flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {activeFarm.name} ({activeFarm.district || 'Unknown'})</span>
          <span className="flex items-center gap-1"><Sprout className="w-3.5 h-3.5"/> {activeFarm.soil || 'N/A Soil'}</span>
          <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5"/> {activeFarm.season || 'N/A Season'}</span>
          <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5"/> {activeFarm.water || 'N/A Water'}</span>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-agri-bg-darkSurface rounded-xl border border-gray-100 dark:border-gray-800 shadow-inner p-4 overflow-y-auto flex flex-col gap-4 relative">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-gray-200 dark:bg-gray-700 ml-3' : 'bg-agri-green text-white mr-3'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4 text-gray-600 dark:text-gray-300"/> : <Bot className="w-5 h-5"/>}
            </div>
            <div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tr-sm' 
                  : 'bg-agri-green/10 text-gray-800 dark:text-gray-200 border border-agri-green/20 rounded-tl-sm'
              }`}>
                {msg.text.split('\\n').map((line, i) => {
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={i} className="mb-2 last:mb-0">
                        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-gray-900 dark:text-white">{part}</strong> : part)}
                      </p>
                    )
                  }
                  return <p key={i} className="mb-2 last:mb-0">{line}</p>
                })}
              </div>
              <p className={`text-xs text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex max-w-[85%] mr-auto">
            <div className="shrink-0 w-8 h-8 rounded-full bg-agri-green text-white mr-3 flex items-center justify-center">
              <Bot className="w-5 h-5"/>
            </div>
            <div className="p-4 rounded-2xl bg-agri-green/10 border border-agri-green/20 rounded-tl-sm flex gap-1 items-center">
              <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="shrink-0 bg-white dark:bg-agri-bg-darkSurface p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 bg-gray-50 dark:bg-gray-900 border-none outline-none px-4 py-3 rounded-lg text-sm dark:text-white"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          className="bg-agri-green hover:bg-agri-green-deep text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatbotTab;
