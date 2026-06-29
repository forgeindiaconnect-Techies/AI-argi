import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, Search, HelpCircle, AlertCircle } from 'lucide-react';

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

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Showing results matching "<span className="font-semibold text-white">{searchQuery}</span>" ({filteredFaqs.length} found)
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            {searchQuery ? 'Search Results' : 'Frequently Asked Questions'}
          </h2>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm font-semibold text-agri-green hover:underline"
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
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              We couldn't find any articles or FAQs matching "{searchQuery}". Try searching for different keywords or check out our general documentation.
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
