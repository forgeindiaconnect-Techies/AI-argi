import React, { useState } from 'react';
import { Bell, CloudRain, ShieldAlert, Droplet, Monitor, Send, Search, CheckCircle } from 'lucide-react';

const NotificationsTab = () => {
  const [activeTab, setActiveTab] = useState('System Notifications');

  const tabs = [
    'System Notifications', 'Weather Alerts', 'Disease Alerts', 
    'Irrigation Alerts', 'Broadcast Messages'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Center</h2>
        <button className="btn-primary flex items-center gap-2 text-sm bg-agri-earth hover:bg-agri-earth-dark">
          <Send className="w-4 h-4" /> New Broadcast
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green"
          />
        </div>
        <button className="text-sm text-agri-green font-medium hover:underline flex items-center gap-1">
          <CheckCircle className="w-4 h-4"/> Mark all as handled
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'System Notifications' && (
          <>
            <div className="card p-4 flex gap-4 items-start border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Monitor className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-blue-800 dark:text-blue-400">Database Backup Completed</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Daily system backup completed successfully at 02:00 AM.</p>
                <span className="text-xs text-gray-500 mt-2 block">Today, 02:00 AM</span>
              </div>
            </div>
            <div className="card p-4 flex gap-4 items-start border-l-4 border-gray-500">
              <div className="p-2 bg-gray-100 text-gray-600 rounded-full"><Monitor className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">Maintenance Window Scheduled</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">System will be down for maintenance on Sunday 00:00 - 04:00 AM.</p>
                <span className="text-xs text-gray-500 mt-2 block">Yesterday</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Weather Alerts' && (
          <div className="card p-4 flex gap-4 items-start border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10">
            <div className="p-2 bg-red-100 text-red-600 rounded-full"><CloudRain className="w-5 h-5"/></div>
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-400">Heavy Rain Alert - Northern Region</h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Automated alert sent to 450 farmers regarding predicted heavy rainfall.</p>
              <span className="text-xs text-gray-500 mt-2 block">2 hours ago</span>
            </div>
          </div>
        )}

        {activeTab === 'Disease Alerts' && (
          <div className="card p-4 flex gap-4 items-start border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-full"><ShieldAlert className="w-5 h-5"/></div>
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-400">Leaf Blight Risk Detected</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">AI detected high risk of Leaf Blight in Sector 4. Prevention guidelines dispatched.</p>
              <span className="text-xs text-gray-500 mt-2 block">5 hours ago</span>
            </div>
          </div>
        )}

        {activeTab === 'Irrigation Alerts' && (
          <div className="card p-4 flex gap-4 items-start border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/10">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Droplet className="w-5 h-5"/></div>
            <div>
              <h4 className="font-bold text-blue-800 dark:text-blue-400">Low Soil Moisture Trigger</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">5 farms reported critically low soil moisture. Automated irrigation suggestions sent.</p>
              <span className="text-xs text-gray-500 mt-2 block">1 day ago</span>
            </div>
          </div>
        )}

        {activeTab === 'Broadcast Messages' && (
          <div className="card p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500">
            <Send className="w-12 h-12 mb-3 opacity-20" />
            <p>No active broadcasts. Click "New Broadcast" to send a message to all users.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
