import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, Search, HelpCircle, AlertCircle, Sparkles, Bot } from 'lucide-react';

const faqData = [
  { category: "Getting Started", q: "How do I add my farm location?", a: "Go to your Dashboard, click on 'Farm Settings', and use the interactive map to drop a pin on your property's exact location." },
  { category: "AI Analytics", q: "How accurate is the AI recommendation?", a: "Our AI models are trained on millions of historical data points and maintain an 85-90% accuracy rate for yield predictions and crop viability." },
  { category: "Hardware & IoT", q: "Can I connect third-party IoT sensors?", a: "Yes, SAMS Professional and Enterprise plans support API integration for most major soil moisture and temperature sensors." },
  { category: "Account & Billing", q: "How do I upgrade my plan?", a: "Navigate to 'Billing' in your account settings. You can upgrade to Professional at any time, and the charges will be prorated." },
  { category: "Soil Health", q: "How often should I test my soil NPK levels?", a: "We recommend testing your soil at least twice a year—once before the pre-monsoon sowing season and once post-harvest to measure nutrient depletion." },
  { category: "Crop Advisory", q: "What should I do if my crop shows signs of pest infestation?", a: "Use the SAMS AI Chatbot or Crop Advisor module to input symptoms. Our AI will identify the pest and recommend organic or chemical control treatments." },
  { category: "Weather & Irrigation", q: "How does microclimate tracking work?", a: "SAMS integrates regional weather radar with local humidity and wind data to predict rain probabilities within a 5km radius of your farm." },
  { category: "Market Value", q: "Where does SAMS get current market prices?", a: "We sync real-time government mandi prices and commodity exchange indices daily to ensure your market revenue estimates are up to date." }
];

const getInstantAIAnswer = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Check exact or partial matches against FAQ database first
  const exactMatch = faqData.find(item => item.q.toLowerCase().includes(q) || q.includes(item.q.toLowerCase().replace('?', '')));
  if (exactMatch) {
    return {
      title: exactMatch.q,
      answer: exactMatch.a,
      confidence: "Direct Match (Official FAQ)"
    };
  }

  // Smart keyword detection for agricultural and platform queries
  if (q.includes('accurat') || q.includes('ai') || q.includes('recommend') || q.includes('predict')) {
    return {
      title: "AI Recommendation Accuracy & Methodology",
      answer: "Our AI models are trained on millions of historical data points and maintain an 85-90% accuracy rate for yield predictions and crop viability. It cross-references hyper-local soil maps, 10-year historical weather patterns, and real-time mandi prices.",
      confidence: "AI Generated Reply"
    };
  }
  if (q.includes('locat') || q.includes('add') || q.includes('farm') || q.includes('map') || q.includes('pin')) {
    return {
      title: "Adding or Updating Your Farm Location",
      answer: "To set up your farm location, navigate to your Farmer Dashboard, click on 'Farm Settings' or 'Add Farm', and use our interactive map pin tool or select your State and District directly.",
      confidence: "AI Generated Reply"
    };
  }
  if (q.includes('sensor') || q.includes('iot') || q.includes('connect') || q.includes('device') || q.includes('hardware')) {
    return {
      title: "Connecting IoT & Hardware Sensors",
      answer: "SAMS supports API integration for major soil moisture, pH, and temperature IoT sensors on Professional and Enterprise plans. You can generate an API key in your Account Settings to connect external hardware.",
      confidence: "AI Generated Reply"
    };
  }
  if (q.includes('cost') || q.includes('price') || q.includes('plan') || q.includes('bill') || q.includes('free') || q.includes('upgrade')) {
    return {
      title: "Pricing & Plan Upgrades",
      answer: "SAMS offers a Free starter plan for basic crop recommendations. For advanced real-time IoT monitoring and multi-farm management, you can upgrade to Professional or Enterprise via the 'Billing' tab.",
      confidence: "AI Generated Reply"
    };
  }
  if (q.includes('fertilizer') || q.includes('npk') || q.includes('soil') || q.includes('test') || q.includes('nutrient') || q.includes('urea')) {
    return {
      title: "Soil Testing & Nutrient Management",
      answer: "Always conduct a certified NPK soil test before sowing. SAMS recommends splitting nitrogen dosages across tillering and panicle stages while applying phosphorus 100% basal.",
      confidence: "AI Generated Reply"
    };
  }
  if (q.includes('pest') || q.includes('disease') || q.includes('spray') || q.includes('insect') || q.includes('borer') || q.includes('worm')) {
    return {
      title: "Pest & Disease Management",
      answer: "Use the SAMS AI Chatbot to input pest symptoms or upload photos. We recommend Integrated Pest Management (IPM) techniques such as sticky traps and neem-based organic foliar sprays.",
      confidence: "AI Generated Reply"
    };
  }

  // Fallback intelligent answer
  return {
    title: `Instant Reply for "${query}"`,
    answer: `Regarding your query about "${query}", SAMS provides automated data analysis across soil health, hyper-local weather forecasting, and market demand. If you need step-by-step assistance, try exploring our AI Crop Advisor module or contact support directly at hello@sams.agri.`,
    confidence: "AI Assistant Reply"
  };
};

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const instantAnswer = getInstantAIAnswer(searchQuery);

  return (
    <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-200 selection:bg-agri-green selection:text-white">
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-agri-green to-emerald-500 p-2.5 rounded-xl shadow-lg"><Leaf className="text-white w-6 h-6" /></div>
          <h1 className="text-2xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-agri-green-deep to-emerald-500">SAMS</h1>
        </Link>
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-agri-green font-medium transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> Back to Home</Link>
      </nav>

      <div className="bg-agri-green-deep text-white py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-agri-green/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-display font-bold mb-6">How can we help?</h1>
          <p className="text-emerald-100 text-lg mb-8">Search through our comprehensive database of guides, tutorials, and FAQs.</p>
          <div className="relative text-left">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, and FAQs (e.g. soil, AI, sensors)..." 
              className="w-full px-6 py-4 rounded-full bg-white text-gray-900 text-lg outline-none pr-14 shadow-2xl focus:ring-4 focus:ring-agri-green/50 transition-all" 
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
          </div>
          {searchQuery && (
            <p className="text-sm text-emerald-200 mt-3 text-left pl-6">
              Showing results matching "<span className="font-semibold text-white">{searchQuery}</span>"
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Instant AI Reply Card */}
        {searchQuery && instantAnswer && (
          <div className="mb-12 bg-gradient-to-br from-[#0a2417] via-agri-green-deep to-[#0f3824] text-white p-8 md:p-10 rounded-3xl shadow-2xl border border-emerald-500/40 animate-in fade-in slide-in-from-top-4 duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="bg-gradient-to-tr from-agri-green to-emerald-400 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-300 font-extrabold flex items-center gap-1.5 mb-1">
                    <Bot className="w-3.5 h-3.5" /> Instant AI Answer
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">{instantAnswer.title}</h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-200 px-4 py-1.5 rounded-full border border-emerald-500/30 self-start sm:self-auto shrink-0 shadow-sm">
                {instantAnswer.confidence}
              </span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5 relative z-10">
              <p className="text-emerald-50 text-lg md:text-xl leading-relaxed font-medium">
                {instantAnswer.answer}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {searchQuery ? `Related FAQ Matches (${filteredFaqs.length})` : 'Frequently Asked Questions'}
          </h2>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm font-semibold text-agri-green hover:underline px-4 py-2 bg-agri-green/10 rounded-full"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-agri-bg-darkSurface p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {faq.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex gap-3 items-start mt-2">
                  <HelpCircle className="w-6 h-6 text-agri-green shrink-0 mt-0.5"/> {faq.q}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 pl-9 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-agri-bg-darkSurface rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check the Instant Answer Above!</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              While we didn't find an exact matching FAQ box for "{searchQuery}", our AI assistant generated a direct reply for you at the top of the page.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
