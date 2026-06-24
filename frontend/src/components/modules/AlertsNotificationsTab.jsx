import React, { useState } from 'react';
import { Bell, CloudRain, Sun, Droplet, Bug, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';

const mockAlerts = [
  { id: 1, type: 'weather', title: 'Heavy Rainfall Warning', desc: 'Expected 45mm rain over next 24h. Delay fertilization.', time: '2 hours ago', icon: <CloudRain/>, color: 'text-blue-500', bg: 'bg-blue-100', isRead: false },
  { id: 2, type: 'soil', title: 'Low Soil Moisture', desc: 'Moisture in Sector B dropped below 30%. Triggering irrigation recommended.', time: '5 hours ago', icon: <Droplet/>, color: 'text-orange-500', bg: 'bg-orange-100', isRead: false },
  { id: 3, type: 'pest', title: 'Pest Outbreak Risk', desc: 'Conditions favorable for Aphids based on recent humidity spike.', time: '1 day ago', icon: <Bug/>, color: 'text-red-500', bg: 'bg-red-100', isRead: true },
  { id: 4, type: 'system', title: 'Fertilizer Application Reminder', desc: 'Scheduled NPK application for Cotton crop is due tomorrow.', time: '2 days ago', icon: <AlertTriangle/>, color: 'text-yellow-500', bg: 'bg-yellow-100', isRead: true },
  { id: 5, type: 'weather', title: 'Drought Warning Lifted', desc: 'Recent rainfall has stabilized water tables in your district.', time: '1 week ago', icon: <Sun/>, color: 'text-green-500', bg: 'bg-green-100', isRead: true },
];

const AlertsNotificationsTab = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const handleMarkAsRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            Alerts & Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h3>
        </div>
        
        <div className="flex gap-2">
          <button onClick={handleMarkAllRead} className="btn-outline text-sm py-1.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4"/> Mark all read
          </button>
        </div>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          {['all', 'weather', 'soil', 'pest', 'system'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === f 
                ? 'bg-agri-green text-white shadow-sm' 
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-agri-green text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center p-12 card text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No alerts found for this category.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`card p-4 transition-all duration-300 flex flex-col sm:flex-row gap-4 relative overflow-hidden group ${
                !alert.isRead ? 'border-l-4 border-agri-green shadow-md bg-white dark:bg-agri-bg-darkSurface' : 'opacity-70 bg-gray-50 dark:bg-gray-900/50 border-transparent hover:opacity-100'
              }`}
            >
              {!alert.isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              )}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${alert.bg} ${alert.color}`}>
                {React.cloneElement(alert.icon, { className: 'w-6 h-6' })}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1 pr-6 sm:pr-0">
                  <h4 className={`font-bold ${!alert.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                    {alert.title}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">{alert.time}</span>
                </div>
                <p className={`text-sm mb-2 ${!alert.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}`}>
                  {alert.desc}
                </p>
                <span className="text-xs text-gray-500 sm:hidden block mb-3">{alert.time}</span>
                
                {!alert.isRead && (
                  <button 
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="text-sm text-agri-green font-medium hover:text-agri-green-dark"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsNotificationsTab;
