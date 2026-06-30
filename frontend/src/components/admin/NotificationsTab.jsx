import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Monitor, CheckCircle, User, Bot, Trash2, Mail } from 'lucide-react';

const NotificationsTab = () => {
  const [adminNotifs, setAdminNotifs] = useState([]);

  // Poll localStorage every 2 seconds for new notifications
  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem('sams_admin_notifications');
      if (stored) setAdminNotifs(JSON.parse(stored));
    };
    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = () => {
    const updated = adminNotifs.map(n => ({ ...n, isRead: true }));
    setAdminNotifs(updated);
    localStorage.setItem('sams_admin_notifications', JSON.stringify(updated));
  };

  const handleMarkRead = (id) => {
    const updated = adminNotifs.map(n => n.id === id ? { ...n, isRead: true } : n);
    setAdminNotifs(updated);
    localStorage.setItem('sams_admin_notifications', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setAdminNotifs([]);
    localStorage.setItem('sams_admin_notifications', JSON.stringify([]));
  };

  const unreadCount = adminNotifs.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Center</h2>
          {unreadCount > 0 && (
            <span className="bg-agri-green text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={handleMarkAllRead} className="text-sm text-agri-green font-medium hover:underline flex items-center gap-1 px-3 py-2 rounded-lg border border-agri-green/30 hover:bg-agri-green/5">
            <CheckCircle className="w-4 h-4"/> Mark all read
          </button>
          <button onClick={handleClearAll} className="text-sm text-red-500 font-medium hover:underline flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 hover:bg-red-50">
            <Trash2 className="w-4 h-4"/> Clear all
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {adminNotifs.length === 0 ? (
          <div className="card p-12 text-center text-gray-500">
            <Monitor className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No notifications yet</p>
            <p className="text-sm mt-1 text-gray-400">
              Chat messages from the User Dashboard will appear here automatically.
            </p>
          </div>
        ) : (
          adminNotifs.map((notif) => {
            const isChatNotif = notif.type === 'chat';
            return (
              <div
                key={notif.id}
                className={`card p-5 border-l-4 transition-all ${
                  !notif.isRead
                    ? 'border-agri-green bg-agri-green/5 dark:bg-agri-green/10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* Top row */}
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full shrink-0 ${
                    isChatNotif
                      ? (!notif.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400')
                      : notif.type === 'contact_inquiry'
                        ? (!notif.isRead ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400')
                        : (!notif.isRead ? 'bg-agri-green/20 text-agri-green' : 'bg-gray-100 text-gray-400')
                  }`}>
                    {isChatNotif ? <MessageSquare className="w-5 h-5"/> : notif.type === 'contact_inquiry' ? <Mail className="w-5 h-5"/> : <Bell className="w-5 h-5"/>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${!notif.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                          {isChatNotif ? `🧑‍🌾 ${notif.farmerName} asked a question` : (notif.title || 'System Alert')}
                        </span>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-agri-green shrink-0"/>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isChatNotif ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isChatNotif ? 'AgriAI Chat' : (notif.type || 'System')}
                        </span>
                        <span className="text-xs text-gray-400">{notif.date} · {notif.time}</span>
                      </div>
                    </div>

                    {/* Chat-specific: show Q&A */}
                    {isChatNotif ? (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                          <User className="w-4 h-4 text-gray-500 shrink-0 mt-0.5"/>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-gray-900 dark:text-white">Question: </span>
                            {notif.question}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 bg-agri-green/5 dark:bg-agri-green/10 p-3 rounded-lg border border-agri-green/20">
                          <Bot className="w-4 h-4 text-agri-green shrink-0 mt-0.5"/>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-agri-green">AI Reply: </span>
                            {notif.aiReply}...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1 whitespace-pre-wrap">{notif.message}</p>
                    )}

                    {/* Actions */}
                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkRead(notif.id)}
                        className="text-xs text-agri-green hover:underline mt-3 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3"/> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
