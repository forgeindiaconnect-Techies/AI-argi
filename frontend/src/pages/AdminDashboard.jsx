import React, { useState } from 'react';
import { 
  Shield, Users, Map, Sprout, Database, LogOut,
  Activity, Bell, Settings, PieChart, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Tabs
import AdminOverviewTab from '../components/admin/AdminOverviewTab';
import UserManagementTab from '../components/admin/UserManagementTab';
import FarmCropManagementTab from '../components/admin/FarmCropManagementTab';
import SoilWeatherTab from '../components/admin/SoilWeatherTab';
import AiAnalyticsTab from '../components/admin/AiAnalyticsTab';
import ReportsAnalyticsTab from '../components/admin/ReportsAnalyticsTab';
import NotificationsTab from '../components/admin/NotificationsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <PieChart className="w-5 h-5"/> },
    { name: 'User Management', icon: <Users className="w-5 h-5"/> },
    { name: 'Farm & Crop Management', icon: <Sprout className="w-5 h-5"/> },
    { name: 'Soil & Weather Monitoring', icon: <Map className="w-5 h-5"/> },
    { name: 'AI Analytics', icon: <Activity className="w-5 h-5"/> },
    { name: 'Reports & Analytics', icon: <Database className="w-5 h-5"/> },
    { name: 'Notifications Center', icon: <Bell className="w-5 h-5"/> },
  ];

  const renderTab = () => {
    switch(activeTab) {
      case 'Dashboard': return <AdminOverviewTab />;
      case 'User Management': return <UserManagementTab />;
      case 'Farm & Crop Management': return <FarmCropManagementTab />;
      case 'Soil & Weather Monitoring': return <SoilWeatherTab />;
      case 'AI Analytics': return <AiAnalyticsTab />;
      case 'Reports & Analytics': return <ReportsAnalyticsTab />;
      case 'Notifications Center': return <NotificationsTab />;
      default: return <AdminOverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] dark:bg-[#121212] text-gray-800 dark:text-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Dark Professional (Earth Tones) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1A1C19] text-gray-300 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-800 bg-[#141513]">
          <div className="flex items-center gap-3">
            <div className="bg-[#2E7D32] p-2 rounded-lg">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">SAMS Portal</h1>
              <p className="text-xs text-[#2E7D32] font-semibold uppercase tracking-wider">Admin Workspace</p>
            </div>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Core Modules</p>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.name 
                ? 'bg-[#2E7D32]/20 text-[#4CAF50] shadow-sm font-medium' 
                : 'hover:bg-white/5 hover:text-white text-gray-400 font-medium'
              }`}
            >
              <div className={`${activeTab === item.name ? 'text-[#4CAF50]' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div className="p-4 border-t border-gray-800 bg-[#141513]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-500/10 text-gray-400 hover:text-red-400 font-medium group"
          >
            <div className="text-gray-500 group-hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative w-full">
        {/* Top Header */}
        <header className="h-[72px] bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors text-gray-600 dark:text-gray-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block mx-1"></div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-800 dark:text-white leading-none mb-1">System Admin</p>
                <p className="text-xs text-gray-500 leading-none">admin@sams.com</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#8D6E63] flex items-center justify-center text-white font-bold shadow-sm">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            {renderTab()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
