import React, { useState } from 'react';
import { Beaker, CloudRain, Sun, Wind, Thermometer, AlertTriangle, FileText, Download, X, Plus } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const rainfallData = [
  { month: 'Jan', mm: 45 }, { month: 'Feb', mm: 30 }, { month: 'Mar', mm: 60 },
  { month: 'Apr', mm: 120 }, { month: 'May', mm: 150 }, { month: 'Jun', mm: 200 },
];

const forecastData = [
  { day: 'Mon', temp: 32 }, { day: 'Tue', temp: 33 }, { day: 'Wed', temp: 30 },
  { day: 'Thu', temp: 29 }, { day: 'Fri', temp: 31 }, { day: 'Sat', temp: 34 }, { day: 'Sun', temp: 35 },
];

const nutrientData = [
  { region: 'North', N: 120, P: 80, K: 90 },
  { region: 'South', N: 90, P: 110, K: 85 },
  { region: 'East', N: 105, P: 95, K: 100 },
  { region: 'West', N: 115, P: 85, K: 95 },
];

const SoilWeatherTab = () => {
  const [activeTab, setActiveTab] = useState('Soil Nutrient Analysis');
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'danger', title: 'Severe Heatwave Warning', message: 'Temperatures expected to exceed 40°C in the Southern District. Advise farmers to increase irrigation frequency.', time: '2 hours ago' },
    { id: 2, type: 'warning', title: 'Unseasonal Rainfall Prediction', message: 'Light to moderate showers expected in Northern regions over the weekend. May impact harvest activities.', time: '1 day ago' },
  ]);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Soil & Weather Analytics</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {['Soil Test Reports', 'Soil Nutrient Analysis', 'Weather Monitoring', 'Rainfall Analytics', 'Climate Alerts'].map(tab => (
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

      {activeTab === 'Weather Monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center p-6 border-t-4 border-yellow-400">
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">32°C</p>
              <p className="text-gray-500 text-sm">Avg Temperature</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-blue-400">
              <CloudRain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">65%</p>
              <p className="text-gray-500 text-sm">Avg Humidity</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-gray-400">
              <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">14 km/h</p>
              <p className="text-gray-500 text-sm">Wind Speed</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-red-400">
              <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">High</p>
              <p className="text-gray-500 text-sm">Heat Index</p>
            </div>
          </div>
          <div className="card p-6">
            <h4 className="font-bold mb-4">Regional Weather Trends</h4>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="temp" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Rainfall Analytics' && (
        <div className="card p-6">
          <h4 className="font-bold mb-6">Monthly Rainfall vs Historical Average (mm)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="mm" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Climate Alerts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Active Warnings</h3>
            <button className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4"/> Broadcast Alert</button>
          </div>
          {alerts.length === 0 ? (
            <div className="text-center p-8 text-gray-500 card">No active climate alerts.</div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-r-lg flex items-start gap-4 border-l-4 ${alert.type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'}`}>
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${alert.type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div className="flex-1">
                  <h4 className={`font-bold ${alert.type === 'danger' ? 'text-red-800 dark:text-red-400' : 'text-yellow-800 dark:text-yellow-400'}`}>{alert.title}</h4>
                  <p className={`text-sm mt-1 ${alert.type === 'danger' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'}`}>{alert.message}</p>
                  <span className={`text-xs mt-2 block ${alert.type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`}>Issued: {alert.time}</span>
                </div>
                <button onClick={() => dismissAlert(alert.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'Soil Test Reports' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Test ID</th>
                <th className="p-4 font-medium">Farm / Owner</th>
                <th className="p-4 font-medium">Date Conducted</th>
                <th className="p-4 font-medium">Overall Score</th>
                <th className="p-4 font-medium text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {[1, 2, 3].map(i => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium">#ST-2025-{100+i}</td>
                  <td className="p-4">North Acre / John Doe</td>
                  <td className="p-4 text-gray-500">2025-06-1{i}</td>
                  <td className="p-4"><span className="text-green-600 font-bold">8{i}/100</span></td>
                  <td className="p-4 text-right">
                    <button className="text-agri-green flex items-center gap-1 justify-end w-full"><Download className="w-4 h-4"/> PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Soil Nutrient Analysis' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold mb-6">NPK Nutrient Averages by Region</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutrientData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="region" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="N" name="Nitrogen (N)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="P" name="Phosphorus (P)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="K" name="Potassium (K)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 border-t-4 border-green-500">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Nitrogen Health</h4>
              <p className="text-sm text-gray-500">The North region shows excellent Nitrogen retention, whereas the South is slightly deficient.</p>
            </div>
            <div className="card p-6 border-t-4 border-blue-500">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Phosphorus Health</h4>
              <p className="text-sm text-gray-500">Optimal Phosphorus levels maintained across most regions, highly beneficial for root development.</p>
            </div>
            <div className="card p-6 border-t-4 border-yellow-500">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Potassium Health</h4>
              <p className="text-sm text-gray-500">Consistent Potassium levels. East region records the highest values, ideal for fruiting crops.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilWeatherTab;
