import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sprout, Wind, Droplets, MapPin, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

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

  // ─── Push a notification to the admin panel ───
  const sendAdminNotification = (question, reply) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const farmerName = userInfo.name || activeFarm?.name || 'A Farmer';
    const existing = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
    const newNotif = {
      id: Date.now(),
      type: 'chat',
      isRead: false,
      farmerName,
      question: question.slice(0, 120),
      aiReply: reply.replace(/\*\*/g, '').slice(0, 200),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };
    localStorage.setItem('sams_admin_notifications', JSON.stringify([newNotif, ...existing].slice(0, 50)));
  };

  const handleSend = async (e) => {
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

    const getLocalAIResponse = (query, currentLang) => {
      const q = query.toLowerCase();
      
      const langMap = {
        'Tamil (தமிழ்)': {
          paddy: "🌱 **நெல் ஆலோசனை:** சிறந்த மகசூலுக்கு 2-5 செ.மீ நீர் நிறுத்துங்கள். தழை, மணி, சாம்பல் சத்துக்களை (NPK) பிரித்து இடுங்கள். தண்டு துளைப்பான் மற்றும் புகையான் தாக்குதலை கண்காணிக்கவும்.",
          sugarcane: "🎋 **கரும்பு பாதுகாப்பு:** நட்ட 3 நாட்களில் அட்ரசின் களைக்கொல்லியைத் தெளிக்கவும். குருத்துப்புழுவைக் கட்டுப்படுத்த கார்டாப் ஹைட்ரோகுளோரைடு குருணையை இடவும்.",
          pest: "🐛 **பூச்சி மேலாண்மை:** சாறு உறிஞ்சும் பூச்சிகளைக் கட்டுப்படுத்த மஞ்சள் ஒட்டுப் பொறிகளை (ஏக்கருக்கு 15) வைக்கவும். வேப்ப எண்ணெய் (2மி.லி/லிட்டர்) தெளிக்கவும்.",
          fertilizer: "🧪 **உர வழிகாட்டி:** மண் பரிசோதனை செய்த பின்பே உரம் இடவும். தழைச்சத்தை (யூரியா) 3 முறையாகப் பிரித்து இடுவதால் வேர்ப்பகுதிகளுக்கு முழுமையாகக் கிடைக்கும்.",
          weather: "⛅ **வானிலை ஆலோசனை:** மருந்து அல்லது உரம் இடுவதற்கு முன் 5 நாள் வானிலை முன்னறிவிப்பைப் பார்க்கவும். மழை வரும் வாய்ப்பு இருந்தால் தெளிப்பதைத் தவிர்க்கவும்.",
          default: `🤖 **AgriAI ஆலோசனை:** "${query}" குறித்த உங்கள் கேள்விக்கு, வாரந்தோறும் பயிர் ஆரோக்கியம் மற்றும் மண் ஈரப்பதத்தைக் கண்காணிக்க பரிந்துரைக்கிறோம். அருகிலுள்ள வேளாண் உதவி அலுவலரைத் தொடர்பு கொள்ளவும்.`
        },
        'Telugu (తెలుగు)': {
          paddy: "🌱 **వరి సలహా:** మంచి దిగుబడి కోసం పొలంలో 2-5 సెం.మీ నీరు ఉంచండి. NPK ఎరువులను విడతలవారీగా వేయండి. కాండం తొలుచు పురుగు మరియు సుడిదోమ నివారణకు జాగ్రత్తలు తీసుకోండి.",
          sugarcane: "🎋 **చెరకు రక్షణ:** నాటిన 3 రోజుల్లోపు అట్రాజిన్ కలుపు మందు పిచికారీ చేయండి. మొవ్వ కుళ్ళు పురుగు నివారణకు కార్టాప్ హైడ్రోక్లోరైడ్ వాడండి.",
          pest: "🐛 **పురుగుల యాజమాన్యం:** రసం పీల్చే పురుగుల కోసం పసుపు రంగు జిగురు అట్టలను అమర్చండి. వేప నూనె (2ml/L) పిచికారీ చేయండి.",
          fertilizer: "🧪 **ఎరువుల యాజమాన్యం:** నేల పరీక్ష ఆధారంగానే ఎరువులు వాడండి. నత్రజని (యూరియా) ని 3 సార్లుగా విభజించి వేయడం వలన పంటకు బాగా అందుతుంది.",
          weather: "⛅ **వాతావరణ సలహా:** మందులు పిచికారీ చేసే ముందు 5 రోజుల వాతావరణ సమాచారం గమనించండి. వర్షం వచ్చే అవకాశం ఉంటే పిచికారీ వాయిదా వేయండి.",
          default: `🤖 **AgriAI సలహా:** "${query}" కి సంబంధించి, క్రమం తప్పకుండా నేల తేమ మరియు ఆకుల ఆరోగ్యాన్ని పరిశీలించండి. ఖచ్చితమైన మోతాదుల కోసం మీ స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.`
        },
        'Hindi (हिन्दी)': {
          paddy: "🌱 **धान सलाह:** अच्छी उपज के लिए खेत में 2-5 सेमी पानी बनाए रखें। NPK उर्वरकों को अलग-अलग चरणों में डालें। तना छेदक और भूरा माहो (BPH) की निगरानी करें।",
          sugarcane: "🎋 **गन्ना सुरक्षा:** बुवाई के 3 दिनों के भीतर एट्राजिन (Atrazine) खरपतवार नाशक का छिड़काव करें। अगोला बेधक के लिए कार्टाप हाइड्रोक्लोराइड का उपयोग करें।",
          pest: "🐛 **कीट प्रबंधन:** रस चूसने वाले कीटों के लिए पीले चिपचिपे जाल (15/एकड़) लगाएं। जैविक उपाय के रूप में नीम का तेल (2 मिली/लीटर) छिड़कें।",
          fertilizer: "🧪 **उर्वरक मार्गदर्शन:** हमेशा मिट्टी की जाँच के बाद उर्वरक डालें। नाइट्रोजन (यूरिया) को 3 भागों में बांटकर देने से पौधे को पूरा लाभ मिलता है।",
          weather: "⛅ **मौसम सलाह:** कीटनाशक या उर्वरक डालने से पहले 5 दिनों के मौसम का पूर्वानुमान देखें। यदि बारिश की संभावना हो तो छिड़काव न करें।",
          default: `🤖 **AgriAI सलाह:** "${query}" के संबंध में, हम मिट्टी की नमी और पत्तियों के स्वास्थ्य की नियमित जांच की सलाह देते हैं। सटीक मात्रा के लिए अपने नजदीकी कृषि विज्ञान केंद्र (KVK) से संपर्क करें।`
        },
        'Malayalam (മലയാളം)': {
          paddy: "🌱 **നെൽകൃഷി നിർദ്ദേശം:** മികച്ച വിളവിനായി പാടത്ത് 2-5 സെ.മീ വെള്ളം നിലനിർത്തുക. NPK വളങ്ങൾ ഗഡുക്കളായി നൽകുക. തണ്ടുതുരപ്പൻ, മുഞ്ഞ എന്നിവയെ നിരീക്ഷിക്കുക.",
          sugarcane: "🎋 **കരിമ്പ് സംരക്ഷണം:** നട്ട് 3 ദിവസത്തിനുള്ളിൽ അട്റാസിൻ തളിക്കുക. തണ്ടുതുരപ്പനെ തടയാൻ കാർട്ടാപ്പ് ഹൈഡ്രോക്ലോറൈഡ് ഉപയോഗിക്കുക.",
          pest: "🐛 **കീടനിയന്ത്രണം:** നീരൂറ്റിക്കുടിക്കുന്ന കീടങ്ങളെ അകറ്റാൻ മഞ്ഞക്കെണികൾ സ്ഥാപിക്കുക. ജൈവകീടനാശിനിയായി വേപ്പെണ്ണ സ്പ്രേ ചെയ്യുക.",
          fertilizer: "🧪 **വളപ്രയോഗം:** മണ്ണ് പരിശോധനയ്ക്ക് ശേഷം മാത്രം വളം നൽകുക. യൂറിയ 3 തവണകളായി നൽകുന്നത് കൂടുതൽ ഫലപ്രദമാണ്.",
          weather: "⛅ **കാലാവസ്ഥാ നിർദ്ദേശം:** കീടനാശിനികൾ തളിക്കുന്നതിന് മുമ്പ് കാലാവസ്ഥാ പ്രവചനം ശ്രദ്ധിക്കുക. മഴയ്ക്ക് സാധ്യതയുണ്ടെങ്കിൽ സ്പ്രേ ചെയ്യുന്നത് ഒഴിവാക്കുക.",
          default: `🤖 **AgriAI നിർദ്ദേശം:** "${query}" സംബന്ധിച്ച്, ആഴ്ചതോറും വിളകളുടെ ആരോഗ്യം പരിശോധിക്കാൻ ശുപാർശ ചെയ്യുന്നു. കൃത്യമായ അളവുകൾക്കായി അടുത്തുള്ള കൃഷിഭവനുമായി ബന്ധപ്പെടുക.`
        },
        'Kannada (ಕನ್ನಡ)': {
          paddy: "🌱 **ಭತ್ತದ ಸಲಹೆ:** ಉತ್ತಮ ಇಳುವರಿಗಾಗಿ ಗದ್ದೆಯಲ್ಲಿ 2-5 ಸೆಂ.ಮೀ ನೀರು ನಿಲ್ಲಿಸಿ. NPK ರಸಗೊಬ್ಬರಗಳನ್ನು ಹಂತ ಹಂತವಾಗಿ ನೀಡಿ. ಕಾಂಡ ಕೊರಕ ಮತ್ತು ಕಂದು ಜಿಗಿಹುಳದ ಬಗ್ಗೆ ಗಮನವಿರಲಿ.",
          sugarcane: "🎋 **ಕಬ್ಬು ರಕ್ಷಣೆ:** ನಾಟಿ ಮಾಡಿದ 3 ದಿನಗಳಲ್ಲಿ ಅಟ್ರಾಜಿನ್ ಕಳೆನಾಶಕ ಸಿಂಪಡಿಸಿ. ಸುಳಿ ಕೊರಕದ ನಿಯಂತ್ರಣಕ್ಕೆ ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ ಬಳಸಿ.",
          pest: "🐛 **ಕೀಟ ನಿರ್ವಹಣೆ:** ರಸ ಹೀರುವ ಕೀಟಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಹಳದಿ ಅಂಟಿನ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ. ಸಾವಯವ ರಕ್ಷಣೆಯಾಗಿ ಬೇವಿನ ಎಣ್ಣೆ (2ml/L) ಸಿಂಪಡಿಸಿ.",
          fertilizer: "🧪 **ರಸಗೊಬ್ಬರ ಮಾಹಿತಿ:** ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ನಂತರವೇ ಗೊಬ್ಬರ ನೀಡಿ. ಸಾರಜನಕವನ್ನು (ಯೂರಿಯಾ) 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡುವುದರಿಂದ ಸಸ್ಯಗಳಿಗೆ ಉತ್ತಮ ಪೋಷಣೆ ಸಿಗುತ್ತದೆ.",
          weather: "⛅ **ಹವಾಮಾನ ಸಲಹೆ:** ಔಷಧಿ ಅಥವಾ ಗೊಬ್ಬರ ಸಿಂಪಡಿಸುವ ಮೊದಲು 5 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಗಮನಿಸಿ. ಮಳೆಯ ಸಾಧ್ಯತೆಯಿದ್ದರೆ ಸಿಂಪರಣೆ ಮುಂದೂಡಿ.",
          default: `🤖 **AgriAI ಸಲಹೆ:** "${query}" ಕುರಿತು, ವಾರಕ್ಕೊಮ್ಮೆ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ಎಲೆಗಳ ಆರೋಗ್ಯವನ್ನು ಪರೀಕ್ಷಿಸಿ. ನಿಖರವಾದ ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.`
        },
        'English': {
          paddy: "🌱 **Paddy Advisory:** For optimal yield, maintain 2-5 cm standing water. Apply NPK in split doses (Basal: 50% N, full P&K; Tillering: 25% N; Panicle initiation: 25% N). Monitor for Stem Borer and Brown Plant Hopper.",
          sugarcane: "🎋 **Sugarcane Protection:** Pre-emergence spray of Atrazine @ 2 kg/ha within 3 days of planting. For early shoot borer, apply Cartap Hydrochloride 4G @ 25 kg/ha at 30 & 45 days.",
          pest: "🐛 **Pest Management:** Install Yellow Sticky Traps (15/acre) for sucking pests. Spray Neem Oil 10000 ppm @ 2ml/L as an organic deterrent.",
          fertilizer: "🧪 **Fertilizer Guide:** Always test soil NPK first. Split Nitrogen into 3 doses to avoid leaching. Apply Phosphorus 100% basal as it moves slowly.",
          weather: "⛅ **Weather Advisory:** Check the 5-day weather forecast before spraying pesticides or fertilizers. Do not spray if rain is expected within 24 hours.",
          default: `🤖 **AgriAI Advisory:** Regarding your query about "${query}", we recommend monitoring soil moisture and inspecting leaf health weekly. Contact your local KVK or agriculture officer for exact dosages.`
        }
      };

      const replies = langMap[currentLang] || langMap['English'];

      if (q.includes('paddy') || q.includes('rice') || q.includes('நெல்') || q.includes('వరి') || q.includes('धान') || q.includes('നെൽ') || q.includes('ಭತ್ತ')) {
        return replies.paddy;
      }
      if (q.includes('sugarcane') || q.includes('கரும்பு') || q.includes('చెరకు') || q.includes('गन्ना') || q.includes('കരിമ്പ്') || q.includes('ಕಬ್ಬು')) {
        return replies.sugarcane;
      }
      if (q.includes('pest') || q.includes('insect') || q.includes('worm') || q.includes('borer') || q.includes('disease') || q.includes('பூச்சி') || q.includes('పురుగు') || q.includes('कीट') || q.includes('കീട') || q.includes('ಕೀಟ')) {
        return replies.pest;
      }
      if (q.includes('fertilizer') || q.includes('npk') || q.includes('nutrient') || q.includes('urea') || q.includes('dap') || q.includes('உரம்') || q.includes('ఎరువు') || q.includes('उर्वरक') || q.includes('വളം') || q.includes('ಗೊಬ್ಬರ')) {
        return replies.fertilizer;
      }
      if (q.includes('weather') || q.includes('rain') || q.includes('climate') || q.includes('storm') || q.includes('வானிலை') || q.includes('వాతావరణ') || q.includes('मौसम') || q.includes('കാലാവസ്ഥ') || q.includes('ಹವಾಮಾನ')) {
        return replies.weather;
      }

      return replies.default;
    };

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: `Farm context: District=${activeFarm?.district || 'Unknown'}, Soil=${activeFarm?.soil || 'Unknown'}. User asked: ${input}`,
          language: language
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      const aiResponse = {
        sender: 'ai',
        text: data.answer || getLocalAIResponse(input, language),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      sendAdminNotification(userMsg.text, aiResponse.text);
    } catch (error) {
      const fallbackText = getLocalAIResponse(input, language);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      sendAdminNotification(userMsg.text, fallbackText);
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
// Trigger Vercel rebuild
