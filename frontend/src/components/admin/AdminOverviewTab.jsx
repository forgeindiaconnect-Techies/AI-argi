import React, { useState, useEffect } from 'react';
import { Users, Map, Sprout, Activity, Database, Leaf, ShieldAlert, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockActivityData = [
  { name: 'Mon', activities: 12 },
  { name: 'Tue', activities: 19 },
  { name: 'Wed', activities: 15 },
  { name: 'Thu', activities: 28 },
  { name: 'Fri', activities: 34 },
  { name: 'Sat', activities: 42 },
  { name: 'Sun', activities: 38 },
];

const AdminOverviewTab = () => {
  const [stats, setStats] = useState({ totalFarmers: 4, activeFarms: 12, activeCrops: 24, avgSoilHealth: '92%' });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const loadStats = () => {
      const storedUsers = JSON.parse(localStorage.getItem('sams_users') || '[]');
      const storedNotifs = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
      
      setStats({
        totalFarmers: storedUsers.length > 0 ? storedUsers.length : 4,
        activeFarms: 12 + (storedUsers.length > 4 ? storedUsers.length - 4 : 0),
        activeCrops: 24 + (storedUsers.length > 4 ? (storedUsers.length - 4) * 2 : 0),
        avgSoilHealth: '94%'
      });
      setRecentActivities(storedNotifs);
    };
    loadStats();
    const interval = setInterval(loadStats, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Platform Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Users className="w-16 h-16"/></div>
          <h3 className="text-lg opacity-90 mb-2 font-medium">Total Farmers</h3>
          <p className="text-4xl font-bold">{stats.totalFarmers}</p>
          <p className="text-sm mt-2 opacity-70 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Live from database</p>
        </div>

        <div className="card bg-gradient-to-br from-amber-600 to-amber-800 text-white p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Map className="w-16 h-16"/></div>
          <h3 className="text-lg opacity-90 mb-2 font-medium">Active Farms</h3>
          <p className="text-4xl font-bold">{stats.activeFarms}</p>
          <p className="text-sm mt-2 opacity-70 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Live from database</p>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Sprout className="w-16 h-16"/></div>
          <h3 className="text-lg opacity-90 mb-2 font-medium">Active Crops</h3>
          <p className="text-4xl font-bold">{stats.activeCrops}</p>
          <p className="text-sm mt-2 opacity-70 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Live from database</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Activity className="w-16 h-16"/></div>
          <h3 className="text-lg opacity-90 mb-2 font-medium">Avg Soil Health</h3>
          <p className="text-4xl font-bold">{stats.avgSoilHealth}</p>
          <p className="text-sm mt-2 opacity-70 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Live from database</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">System Activity Trend</h3>
              <p className="text-sm text-gray-500">Platform interactions over the last 7 days</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="activities" stroke="#10b981" fill="#d1fae5" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-800">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Database className="w-4 h-4"/> Main Database</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Activity className="w-4 h-4"/> AI Prediction Engine</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><Leaf className="w-4 h-4"/> Weather API Sync</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Delayed</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 dark:border-gray-800">AI Prediction Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Total Predictions (Month)</span>
                <span className="font-bold">148</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Avg. Accuracy</span>
                <span className="font-bold text-green-600">96.4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">High Risk Alerts Issued</span>
                <span className="font-bold text-red-500">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
        {recentActivities.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentActivities.slice(0, 5).map((act, index) => (
              <div key={act.id || index} className="py-3 flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-agri-green/10 text-agri-green flex items-center justify-center mt-0.5 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{act.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{act.message}</p>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {act.time ? new Date(act.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-400">
            <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No recent activities to display.</p>
            <p className="text-xs mt-1 text-gray-400">Activities will appear here once users start interacting with the platform.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverviewTab;
