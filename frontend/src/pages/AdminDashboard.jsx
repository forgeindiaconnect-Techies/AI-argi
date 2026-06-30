import React, { useState } from 'react';
import { 
  Shield, Users, Map, Sprout, Database, LogOut,
  Activity, Bell, Settings, PieChart, Menu, X,
  LayoutDashboard, CloudSun, Bot, FileBarChart, MessageSquare
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
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const updateNotifs = () => {
      const stored = localStorage.getItem('sams_admin_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotifs(parsed);
        setUnreadNotifications(parsed.filter(n => !n.isRead).length);
      }
    };
    updateNotifs();
    const interval = setInterval(updateNotifs, 2000); // Check for new notifs every 2s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/login', { replace: true });
  };

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5"/> },
      ]
    },
    {
      title: 'User & Farm',
      items: [
        { name: 'User Management', icon: <Users className="w-5 h-5"/> },
        { name: 'Farm & Crop Management', icon: <Sprout className="w-5 h-5"/> },
      ]
    },
    {
      title: 'Monitoring',
      items: [
        { name: 'Soil & Weather Monitoring', icon: <CloudSun className="w-5 h-5"/> },
        { name: 'AI Analytics', icon: <Activity className="w-5 h-5"/> },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Reports & Analytics', icon: <FileBarChart className="w-5 h-5"/> },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Notifications Center', icon: <Bell className="w-5 h-5"/> },
      ]
    }
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

        <nav className="flex-1 px-4 py-6 overflow-y-auto hide-scrollbar">
          {navGroups.map((group, groupIndex) => (
            <div key={group.title} className={`${groupIndex > 0 ? 'mt-6' : ''}`}>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
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
                    <span className="text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
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
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors text-gray-600 dark:text-gray-300"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-gray-800 dark:text-white">Recent Alerts</h3>
                    <span className="text-xs bg-agri-green text-white px-2 py-1 rounded-full">{unreadNotifications} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">No new notifications</div>
                    ) : (
                      notifs.slice(0, 5).map(n => (
                        <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${!n.isRead ? 'bg-agri-green/5' : ''}`}>
                          <p className={`text-sm font-semibold ${!n.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{n.title}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2">{new Date(n.time).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <button 
                    onClick={() => { setActiveTab('Notifications Center'); setIsNotifOpen(false); }}
                    className="w-full p-3 text-sm text-center text-agri-green font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-800"
                  >
                    View All in Notification Center
                  </button>
                </div>
              )}
            </div>
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
