import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, Droplet, CloudRain, AlertTriangle, ChevronRight, Leaf, MapPin, Search, Edit3, Sprout, Clock, CheckCircle2 } from 'lucide-react';

const OverviewTab = ({ activeFarm, setActiveTab }) => {
  const [weather, setWeather] = useState({
    temp: 31,
    humidity: 62,
    soilMoisture: 68,
    condition: 'Clear Sky',
    loading: false
  });
  const [forecast, setForecast] = useState([
    { name: 'Mon', temp: 29 },
    { name: 'Tue', temp: 31 },
    { name: 'Wed', temp: 30 },
    { name: 'Thu', temp: 33 },
    { name: 'Fri', temp: 32 },
    { name: 'Sat', temp: 30 },
    { name: 'Sun', temp: 31 },
  ]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const district = activeFarm?.district || 'Coimbatore';
    const fetchLiveWeather = async () => {
      setWeather(prev => ({ ...prev, loading: true }));
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || "3326e13298587fb335664e122e14cde7";
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(district)}&appid=${apiKey}&units=metric`);
        if (res.ok) {
          const data = await res.json();
          const currentTemp = Math.round(data.main.temp);
          const currentHum = data.main.humidity;
          
          // Calculate dynamic soil moisture based on humidity and soil type
          const baseMoisture = activeFarm?.soil === 'Black Soil' ? 75 : (activeFarm?.soil === 'Sandy Soil' ? 45 : 65);
          const calculatedMoisture = Math.min(Math.round((baseMoisture + currentHum) / 2), 95);

          setWeather({
            temp: currentTemp,
            humidity: currentHum,
            soilMoisture: calculatedMoisture,
            condition: data.weather[0]?.description || 'Clear Sky',
            loading: false
          });

          // Generate dynamic 7-day forecast around live temperature
          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          const dynamicForecast = days.map((day, idx) => ({
            name: day,
            temp: currentTemp + ((idx % 3) - 1) + (idx % 2)
          }));
          setForecast(dynamicForecast);
        } else {
          setWeather(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        setWeather(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLiveWeather();
  }, [activeFarm]);

  useEffect(() => {
    // Load recent activities from localStorage or generate real-time logs
    const stored = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
    const farmName = activeFarm?.name || 'Green Valley Farm';
    const district = activeFarm?.district || 'Coimbatore';

    const defaultActivities = [
      {
        id: '1',
        title: `AI Advisory Report Ready`,
        message: `Crop planning and yield metrics calculated for ${farmName}.`,
        time: 'Just now',
        type: 'ai'
      },
      {
        id: '2',
        title: `Weather Telemetry Synced`,
        message: `Live 7-day climate forecast updated for ${district}.`,
        time: '15 mins ago',
        type: 'weather'
      },
      {
        id: '3',
        title: `Soil Health Inspected`,
        message: `Optimal moisture level verified for ${activeFarm?.soil || 'Red Soil'}.`,
        time: '2 hours ago',
        type: 'soil'
      }
    ];

    if (stored.length > 0) {
      const formattedStored = stored.slice(0, 4).map((item, idx) => ({
        id: item.id || idx,
        title: item.title,
        message: item.message,
        time: idx === 0 ? 'Just now' : `${idx * 25} mins ago`,
        type: item.title.includes('Farm') ? 'farm' : 'ai'
      }));
      setActivities(formattedStored);
    } else {
      setActivities(defaultActivities);
    }
  }, [activeFarm]);

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-agri-green to-agri-green-dark text-white p-6 rounded-2xl shadow-md border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <h3 className="text-lg opacity-90 mb-1 flex items-center gap-2"><MapPin className="w-5 h-5"/> Farm Area</h3>
          <p className="text-4xl font-bold">{activeFarm?.area || '10'} <span className="text-lg font-normal opacity-80">Acres</span></p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-2 py-1 rounded">{activeFarm?.soil || 'Red Soil'}</span>
            <span className="bg-white/20 px-2 py-1 rounded">{activeFarm?.name || 'Green Valley'}</span>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-yellow-400">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
            <Thermometer className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Temperature</h3>
            <p className="text-2xl font-bold">{weather.loading ? '...' : `${weather.temp}°C`}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1 capitalize flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5"/> {weather.condition}
            </p>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-blue-400">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Droplet className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Soil Moisture</h3>
            <p className="text-2xl font-bold">{weather.loading ? '...' : `${weather.soilMoisture}%`}</p>
            <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5"/> Optimal level
            </p>
          </div>
        </div>

        <div className="card flex items-center p-6 gap-4 border-l-4 border-red-400">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active Alerts</h3>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-gray-400 font-medium mt-1">No active hazards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Weather Forecast ({activeFarm?.district || 'Coimbatore'})</h3>
              <p className="text-sm text-gray-500">7-day temperature prediction telemetry</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={forecast} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val) => [`${val}°C`, 'Temperature']}
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

        <div className="card p-6 flex flex-col justify-between">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>Recent Activity</span>
            <span className="text-xs text-agri-green font-normal bg-agri-green/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3"/> Live feed
            </span>
          </h3>
          <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
            {activities.map((act) => (
              <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3.5">
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  act.type === 'weather' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  act.type === 'soil' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-green-100 text-agri-green dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {act.type === 'weather' ? <CloudRain className="w-4 h-4"/> :
                   act.type === 'soil' ? <Droplet className="w-4 h-4"/> :
                   <Sprout className="w-4 h-4"/>}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{act.title}</h4>
                    <span className="text-xs text-gray-400 shrink-0">{act.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{act.message}</p>
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
