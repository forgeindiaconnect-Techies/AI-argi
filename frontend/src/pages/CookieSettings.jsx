import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, Cookie, CheckCircle, XCircle } from 'lucide-react';

const defaultPrefs = {
  essential: true,     // Always on
  analytics: true,
  marketing: false,
  preferences: true,
};

const CookieSettings = () => {
  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('sams_cookie_prefs');
      return saved ? JSON.parse(saved) : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    if (key === 'essential') return; // Cannot disable essential
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('sams_cookie_prefs', JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true, preferences: true };
    setPrefs(all);
    localStorage.setItem('sams_cookie_prefs', JSON.stringify(all));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false, preferences: false };
    setPrefs(minimal);
    localStorage.setItem('sams_cookie_prefs', JSON.stringify(minimal));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookies = [
    {
      key: 'essential',
      label: 'Essential Cookies',
      icon: '🔒',
      description: 'These cookies are required for the platform to function. They enable core features like user authentication, session management, and security. They cannot be disabled.',
      alwaysOn: true,
    },
    {
      key: 'analytics',
      label: 'Analytics Cookies',
      icon: '📊',
      description: 'Help us understand how you use SAMS by collecting anonymous usage data. This allows us to improve our AI models and platform performance over time.',
      alwaysOn: false,
    },
    {
      key: 'preferences',
      label: 'Preference Cookies',
      icon: '⚙️',
      description: 'Remember your settings like dark mode, language, and dashboard layout so you don\'t have to reconfigure them every visit.',
      alwaysOn: false,
    },
    {
      key: 'marketing',
      label: 'Marketing Cookies',
      icon: '📣',
      description: 'Used to deliver relevant agricultural tips, product updates, and promotional content that may be of interest to you based on your usage patterns.',
      alwaysOn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-200">
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-agri-green to-emerald-500 p-2.5 rounded-xl shadow-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-agri-green-deep to-emerald-500">SAMS</h1>
          </Link>
        </div>
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-agri-green font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Home
        </Link>
      </nav>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-agri-green/10 text-agri-green mb-6">
              <Cookie className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">Cookie Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              We use cookies to enhance your experience on SAMS. Control which cookies you allow below. Your choices are saved to your browser.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 justify-center mb-8">
            <button onClick={handleAcceptAll} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Accept All
            </button>
            <button onClick={handleRejectAll} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
              <XCircle className="w-4 h-4" /> Reject Non-Essential
            </button>
          </div>

          {/* Cookie cards */}
          <div className="space-y-4 mb-8">
            {cookies.map(({ key, label, icon, description, alwaysOn }) => (
              <div key={key} className="bg-white dark:bg-agri-bg-darkSurface rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{label}</h3>
                        {alwaysOn && (
                          <span className="text-xs px-2 py-0.5 bg-agri-green/10 text-agri-green rounded-full font-semibold">Always On</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
                    </div>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => toggle(key)}
                    disabled={alwaysOn}
                    className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                      prefs[key] ? 'bg-agri-green' : 'bg-gray-300 dark:bg-gray-600'
                    } ${alwaysOn ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-label={`Toggle ${label}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${prefs[key] ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleSave}
              className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                saved ? 'bg-green-500 text-white' : 'btn-primary'
              }`}
            >
              {saved ? <><CheckCircle className="w-5 h-5" /> Preferences Saved!</> : 'Save My Preferences'}
            </button>
            <p className="text-xs text-gray-400">
              Your preferences are stored in your browser and will apply on your next visit. 
              See our <Link to="/privacy-policy" className="text-agri-green hover:underline">Privacy Policy</Link> for more information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookieSettings;
