import React, { useState, useEffect } from 'react';
import { Leaf, Sun, Sprout, ClipboardList, TrendingUp, Settings, LogOut, Droplets, User, FileText, Beaker, Brain, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Tabs
import OverviewTab from '../components/modules/OverviewTab';
import FarmDetailsTab from '../components/modules/FarmDetailsTab';
import AdvancedAiSuggestions from '../components/modules/AiSuggestionsTab';
import WeatherAnalysisTab from '../components/modules/WeatherAnalysisTab';
import IrrigationMonitoringTab from '../components/modules/IrrigationMonitoringTab';
import SoilAnalysisTab from '../components/modules/SoilAnalysisTab';
import AiCropAdvisorTab from '../components/modules/AiCropAdvisorTab';

import ReportsHistoryTab from '../components/modules/ReportsHistoryTab';
import MarketValueEstimatorTab from '../components/modules/MarketValueEstimatorTab';
import ChatbotTab from '../components/modules/ChatbotTab';
import SettingsTab from '../components/modules/SettingsTab';
import { Bot } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileName, setProfileName] = useState(() => {
    const info = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return info.name || 'Farmer';
  });
  const [profileEmail, setProfileEmail] = useState(() => {
    const info = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return info.email || '';
  });
  const [farms, setFarms] = useState(() => {
    const saved = localStorage.getItem('sams_farms');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeFarm, setActiveFarm] = useState(() => {
    const saved = localStorage.getItem('sams_active_farm');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('sams_farms', JSON.stringify(farms));
  }, [farms]);

  useEffect(() => {
    if (activeFarm) {
      localStorage.setItem('sams_active_farm', JSON.stringify(activeFarm));
    } else {
      localStorage.removeItem('sams_active_farm');
    }
  }, [activeFarm]);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  const navGroups = [
    {
      title: 'Core Modules',
      items: [
        { name: 'Dashboard', icon: <TrendingUp className="w-5 h-5"/> },
        { name: 'My Farm', icon: <ClipboardList className="w-5 h-5"/> },
      ]
    },
    {
      title: 'Monitoring & Analysis',
      items: [
        { name: 'Weather & Climate', icon: <Sun className="w-5 h-5"/> },
        { name: 'Soil Analysis', icon: <Beaker className="w-5 h-5"/> },
        { name: 'Irrigation', icon: <Droplets className="w-5 h-5"/> },
      ]
    },
    {
      title: 'AI & Intelligence',
      items: [
        { name: 'AI Crop Advisor', icon: <Brain className="w-5 h-5"/> },
        { name: 'AI Recommendations', icon: <Sprout className="w-5 h-5"/> },
        { name: 'Market Value Estimator', icon: <DollarSign className="w-5 h-5"/> },
      ]
    },
    {
      title: 'Support & Reports',
      items: [
        { name: 'AgriAI Chat', icon: <Bot className="w-5 h-5"/> },
        { name: 'Reports & History', icon: <FileText className="w-5 h-5"/> },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Settings', icon: <Settings className="w-5 h-5"/> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-agri-bg-darkSurface border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <Leaf className="text-agri-green w-8 h-8" />
          <h1 className="text-xl font-bold text-agri-green-deep dark:text-agri-green-light">SAMS</h1>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          {navGroups.map((group, groupIndex) => (
            <div key={group.title} className={`${groupIndex > 0 ? 'mt-6' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === item.name 
                      ? 'bg-agri-green text-white shadow-md font-medium' 
                      : 'hover:bg-agri-green-light hover:text-agri-green-deep dark:hover:bg-gray-800 dark:hover:text-agri-green-light text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-agri-bg-darkSurface/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setActiveTab('Settings')}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-agri-green to-agri-green-dark flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
              title="Account Settings"
            >
              {profileName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
            {activeTab === 'Dashboard' && <OverviewTab activeFarm={activeFarm} setActiveTab={setActiveTab} />}
            {activeTab === 'My Farm' && <FarmDetailsTab farms={farms} setFarms={setFarms} activeFarm={activeFarm} setActiveFarm={setActiveFarm} />}
            {activeTab === 'Weather & Climate' && <WeatherAnalysisTab activeFarm={activeFarm} />}
            {activeTab === 'Soil Analysis' && <SoilAnalysisTab activeFarm={activeFarm} />}
            {activeTab === 'AI Crop Advisor' && <AiCropAdvisorTab activeFarm={activeFarm} />}
            {activeTab === 'Irrigation' && <IrrigationMonitoringTab activeFarm={activeFarm} />}
            {activeTab === 'AI Recommendations' && <AdvancedAiSuggestions activeFarm={activeFarm} />}
            {activeTab === 'AgriAI Chat' && <ChatbotTab activeFarm={activeFarm} />}
            {activeTab === 'Reports & History' && <ReportsHistoryTab activeFarm={activeFarm} />}
            {activeTab === 'Market Value Estimator' && <MarketValueEstimatorTab activeFarm={activeFarm} />}

            {activeTab === 'Settings' && <SettingsTab profileName={profileName} setProfileName={setProfileName} profileEmail={profileEmail} setProfileEmail={setProfileEmail} handleLogout={handleLogout} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
