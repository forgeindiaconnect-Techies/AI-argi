import React, { useState } from 'react';
import { Leaf, Sun, Sprout, ClipboardList, TrendingUp, Settings, LogOut, Bell, Droplets, User, FileText, BellRing, Beaker, Brain, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Tabs
import OverviewTab from '../components/modules/OverviewTab';
import FarmDetailsTab from '../components/modules/FarmDetailsTab';
import AdvancedAiSuggestions from '../components/modules/AiSuggestionsTab';
import WeatherAnalysisTab from '../components/modules/WeatherAnalysisTab';
import IrrigationMonitoringTab from '../components/modules/IrrigationMonitoringTab';
import SoilAnalysisTab from '../components/modules/SoilAnalysisTab';
import AiCropAdvisorTab from '../components/modules/AiCropAdvisorTab';
import AlertsNotificationsTab from '../components/modules/AlertsNotificationsTab';
import ReportsHistoryTab from '../components/modules/ReportsHistoryTab';
import MarketValueEstimatorTab from '../components/modules/MarketValueEstimatorTab';
import SettingsTab from '../components/modules/SettingsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [profileName, setProfileName] = useState('John Farmer');
  const [profileEmail, setProfileEmail] = useState('farmer@sams.com');
  const [farms, setFarms] = useState([
    { id: 1, name: 'North Acre', district: 'Coimbatore', area: 10, soil: 'Red Soil', season: 'Summer', water: 'Medium', irrigation: 'Drip Irrigation', cropName: 'Tomato', plantingDate: '2025-06-01' }
  ]);
  const [activeFarm, setActiveFarm] = useState(farms[0]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <TrendingUp className="w-5 h-5"/> },
    { name: 'My Farm', icon: <ClipboardList className="w-5 h-5"/> },
    { name: 'Weather & Climate', icon: <Sun className="w-5 h-5"/> },
    { name: 'Soil Analysis', icon: <Beaker className="w-5 h-5"/> },
    { name: 'AI Crop Advisor', icon: <Brain className="w-5 h-5"/> },
    { name: 'Irrigation', icon: <Droplets className="w-5 h-5"/> },
    { name: 'AI Recommendations', icon: <Sprout className="w-5 h-5"/> },
    { name: 'Reports & History', icon: <FileText className="w-5 h-5"/> },
    { name: 'Market Value Estimator', icon: <DollarSign className="w-5 h-5"/> },
    { name: 'Notifications', icon: <BellRing className="w-5 h-5"/> },
    { name: 'Settings', icon: <Settings className="w-5 h-5"/> },
  ];

  return (
    <div className="flex h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-agri-bg-darkSurface border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <Leaf className="text-agri-green w-8 h-8" />
          <h1 className="text-xl font-bold text-agri-green-deep dark:text-agri-green-light">SAMS</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.name 
                ? 'bg-agri-green text-white shadow-md' 
                : 'hover:bg-agri-green-light hover:text-agri-green-deep dark:hover:bg-gray-800 dark:hover:text-agri-green-light'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </button>
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
            <button 
              onClick={() => setActiveTab('Notifications')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white dark:border-gray-800"></span>
            </button>
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
            {activeTab === 'Reports & History' && <ReportsHistoryTab activeFarm={activeFarm} />}
            {activeTab === 'Market Value Estimator' && <MarketValueEstimatorTab activeFarm={activeFarm} />}
            {activeTab === 'Notifications' && <AlertsNotificationsTab activeFarm={activeFarm} />}
            {activeTab === 'Settings' && <SettingsTab profileName={profileName} setProfileName={setProfileName} profileEmail={profileEmail} setProfileEmail={setProfileEmail} handleLogout={handleLogout} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
