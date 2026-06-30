import React, { useState, useEffect } from 'react';
import { Bell, CloudRain, ShieldAlert, Droplet, Monitor, Send, Search, CheckCircle } from 'lucide-react';

const NotificationsTab = () => {
  const [adminNotifs, setAdminNotifs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('sams_admin_notifications');
    if (stored) {
      setAdminNotifs(JSON.parse(stored));
    }
  }, []);

  const handleMarkAllRead = () => {
    const updated = adminNotifs.map(n => ({ ...n, isRead: true }));
    setAdminNotifs(updated);
    localStorage.setItem('sams_admin_notifications', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Center</h2>
      </div>

      <div className="card p-4 flex justify-end items-center bg-gray-50 dark:bg-gray-800/50">
        <button onClick={handleMarkAllRead} className="text-sm text-agri-green font-medium hover:underline flex items-center gap-1">
          <CheckCircle className="w-4 h-4"/> Mark all as handled
        </button>
      </div>

      <div className="space-y-4">
        {adminNotifs.length === 0 ? (
          <div className="card p-8 text-center text-gray-500">
            <Monitor className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p>No new system notifications from the User Dashboard.</p>
          </div>
        ) : (
          adminNotifs.map((notif) => (
            <div key={notif.id} className={`card p-4 flex gap-4 items-start border-l-4 ${!notif.isRead ? 'border-agri-green bg-agri-green/5' : 'border-gray-300'}`}>
              <div className={`p-2 rounded-full shrink-0 ${!notif.isRead ? 'bg-agri-green/20 text-agri-green' : 'bg-gray-100 text-gray-500'}`}>
                <Bell className="w-5 h-5"/>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold ${!notif.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{notif.title}</h4>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">{notif.type}</span>
                </div>
                <p className={`text-sm mt-1 ${!notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}`}>{notif.message}</p>
                <span className="text-xs text-gray-500 mt-2 block">{new Date(notif.time).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
