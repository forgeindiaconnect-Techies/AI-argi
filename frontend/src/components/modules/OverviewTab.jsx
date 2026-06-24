import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, Droplet, CloudRain, AlertTriangle, ChevronRight, Leaf, MapPin, Search, Edit3 } from 'lucide-react';

const mockData = [
  { name: 'Mon', temp: 32, humidity: 45 },
  { name: 'Tue', temp: 30, humidity: 50 },
  { name: 'Wed', temp: 28, humidity: 65 },
  { name: 'Thu', temp: 29, humidity: 55 },
  { name: 'Fri', temp: 31, humidity: 40 },
  { name: 'Sat', temp: 33, humidity: 35 },
  { name: 'Sun', temp: 34, humidity: 30 },
];

const OverviewTab = ({ activeFarm, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-agri-green to-agri-green-dark text-white p-6 rounded-2xl shadow-md border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <h3 className="text-lg opacity-90 mb-1 flex items-center gap-2"><MapPin className="w-5 h-5"/> Farm Area</h3>
          <p className="text-4xl font-bold">{activeFarm?.area || '0'} <span className="text-lg font-normal opacity-80">Acres</span></p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-2 py-1 rounded">{activeFarm?.soil || 'N/A'}</span>
            <span className="bg-white/20 px-2 py-1 rounded">{activeFarm?.name || 'No Farm'}</span>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-yellow-400">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
            <Thermometer className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Temperature</h3>
            <p className="text-2xl font-bold">32°C</p>
            <p className="text-xs text-yellow-600 font-medium mt-1">Sunny</p>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-blue-400">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Droplet className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Soil Moisture</h3>
            <p className="text-2xl font-bold">42%</p>
            <p className="text-xs text-green-500 font-medium mt-1">Optimal Level</p>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-red-400">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Alerts</h3>
            <p className="text-2xl font-bold text-red-600">2</p>
            <p className="text-xs text-red-500 font-medium mt-1">Requires Attention</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Weather Forecast</h3>
              <p className="text-sm text-gray-500">7-day temperature and humidity prediction</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Farm Health Score & Actions */}
        <div className="space-y-6">
          <div className="card p-6 flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-lg font-bold mb-4 w-full text-left">Farm Health Score</h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.85)} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-agri-green-deep">85%</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Good</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-6 px-4">
              Crop conditions are optimal. Maintain current irrigation schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveTab('Soil Analysis')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-agri-green hover:bg-agri-green/5 transition-colors group"
            >
              <Activity className="w-8 h-8 text-agri-green mb-2 group-hover:scale-110 transition-transform"/>
              <span className="font-medium text-sm">Analyze Farm</span>
            </button>
            <button 
              onClick={() => setActiveTab('Reports & History')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <CloudRain className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform"/>
              <span className="font-medium text-sm">View Reports</span>
            </button>
            <button 
              onClick={() => setActiveTab('My Farm')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-colors group"
            >
              <Edit3 className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform"/>
              <span className="font-medium text-sm">Update Data</span>
            </button>
            <button 
              onClick={() => setActiveTab('AI Recommendations')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors group"
            >
              <Search className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform"/>
              <span className="font-medium text-sm">Ask AI</span>
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { title: 'Irrigation System Activated', time: '2 hours ago', icon: <Droplet className="w-4 h-4 text-blue-500"/> },
              { title: 'AI Suitability Report Generated', time: 'Yesterday', icon: <Activity className="w-4 h-4 text-purple-500"/> },
              { title: 'Pest Alert: Low Risk Aphids', time: '3 days ago', icon: <AlertTriangle className="w-4 h-4 text-orange-500"/> },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== 2 && <div className="absolute left-4 top-8 w-0.5 h-10 bg-gray-200"></div>}
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center z-10 shrink-0">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{activity.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
