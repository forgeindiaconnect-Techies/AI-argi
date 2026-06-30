import React, { useState, useEffect } from 'react';
import {
  Beaker, CloudRain, Sun, Wind, Thermometer, AlertTriangle, Download,
  X, Plus, RefreshCw, CheckCircle, Droplets, CloudLightning, Activity
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const WEATHER_KEY = 'sams_weather_data';
const SOIL_KEY = 'sams_soil_reports';

// Default fallback data so admin page never looks empty
const DEFAULT_WEATHER = {
  farmName: 'Default Farm',
  district: 'Coimbatore',
  dateSynced: new Date().toISOString(),
  forecast: [
    { day: 'Mon', tempMax: 35, tempMin: 27, rain: 10 },
    { day: 'Tue', tempMax: 36, tempMin: 28, rain: 0 },
    { day: 'Wed', tempMax: 34, tempMin: 26, rain: 30 },
    { day: 'Thu', tempMax: 33, tempMin: 26, rain: 60 },
    { day: 'Fri', tempMax: 35, tempMin: 27, rain: 0 },
    { day: 'Sat', tempMax: 37, tempMin: 29, rain: 15 },
    { day: 'Sun', tempMax: 36, tempMin: 28, rain: 5 },
  ],
  current: {
    temperature: 35, humidity: 62, windSpeed: 18,
    rainProb: 30, condition: 'Clouds', description: 'scattered clouds'
  }
};

const DEFAULT_SOIL_REPORTS = [
  { id: '#ST-2026-101', farmName: 'Green Valley Farm', owner: 'Rajesh Kumar', date: '2026-06-15', score: 85, nutrients: { nitrogen: 120, phosphorus: 98, potassium: 86 } },
  { id: '#ST-2026-102', farmName: 'Sunrise Fields',    owner: 'Anita Patel',  date: '2026-06-18', score: 78, nutrients: { nitrogen: 105, phosphorus: 88, potassium: 74 } },
  { id: '#ST-2026-103', farmName: 'North Acres',       owner: 'Vikram Singh', date: '2026-06-22', score: 91, nutrients: { nitrogen: 135, phosphorus: 112, potassium: 95 } },
];

const DEFAULT_RAINFALL = [
  { month: 'Jan', mm: 35 }, { month: 'Feb', mm: 20 }, { month: 'Mar', mm: 45 },
  { month: 'Apr', mm: 60 }, { month: 'May', mm: 80 }, { month: 'Jun', mm: 110 },
  { month: 'Jul', mm: 95 },
];

const SoilWeatherTab = () => {
  const [activeTab, setActiveTab] = useState('Weather Monitoring');
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER);
  const [soilReports, setSoilReports] = useState(DEFAULT_SOIL_REPORTS);
  const [isSynced, setIsSynced] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const loadData = () => {
    const wd = localStorage.getItem(WEATHER_KEY);
    if (wd) { try { setWeatherData(JSON.parse(wd)); setIsSynced(true); } catch (e) {} }

    const sr = localStorage.getItem(SOIL_KEY);
    if (sr) { try { setSoilReports(JSON.parse(sr)); } catch (e) {} }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, []);

  // Build auto alerts from live weather
  useEffect(() => {
    if (!weatherData?.current) return;
    const w = weatherData.current;
    const newAlerts = [];
    if (w.rainProb > 65 || w.condition === 'Rain' || w.condition === 'Thunderstorm') {
      newAlerts.push({ id: 1, type: 'danger', title: 'Heavy Precipitation / Thunderstorm Warning', message: `High cloud density (${w.rainProb}%) detected in ${weatherData.district}. Halt irrigation and delay fertilizer application.`, time: new Date(weatherData.dateSynced).toLocaleString() });
    }
    if (w.temperature > 38) {
      newAlerts.push({ id: 2, type: 'warning', title: 'Extreme Heat Advisory', message: `Temperature of ${w.temperature}°C in ${weatherData.district}. Ensure adequate irrigation for sensitive crops.`, time: new Date(weatherData.dateSynced).toLocaleString() });
    }
    if (w.windSpeed > 40) {
      newAlerts.push({ id: 3, type: 'warning', title: 'High Wind Speed Alert', message: `Wind speed at ${w.windSpeed} km/h in ${weatherData.district}. Secure equipment and delay spray operations.`, time: new Date(weatherData.dateSynced).toLocaleString() });
    }
    setAlerts(newAlerts);
  }, [weatherData]);

  const dismissAlert = (id) => setAlerts(alerts.filter(a => a.id !== id));

  const w = weatherData?.current;

  // NPK chart data
  const nutrientChartData = soilReports.map(r => ({
    region: r.farmName,
    N: r.nutrients?.nitrogen ?? 100,
    P: r.nutrients?.phosphorus ?? 80,
    K: r.nutrients?.potassium ?? 70,
  }));

  // Rainfall chart: use synced forecast converted to mm or fallback
  const rainfallData = isSynced && weatherData?.forecast?.length
    ? ['Jan','Feb','Mar','Apr','May','Jun','Jul'].map((month, i) => ({
        month, mm: Math.round((weatherData.forecast[i % 7]?.rain ?? 20) * 2.5)
      }))
    : DEFAULT_RAINFALL;

  const avgN = Math.round(nutrientChartData.reduce((a, b) => a + b.N, 0) / nutrientChartData.length);
  const avgP = Math.round(nutrientChartData.reduce((a, b) => a + b.P, 0) / nutrientChartData.length);
  const avgK = Math.round(nutrientChartData.reduce((a, b) => a + b.K, 0) / nutrientChartData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Soil & Weather Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isSynced
              ? <span>Live data from <span className="font-semibold text-agri-green">{weatherData.district}</span> — synced at {new Date(weatherData.dateSynced).toLocaleTimeString()}</span>
              : <span className="text-amber-600 font-medium">Showing sample data. User dashboard will auto-sync when visited.</span>}
          </p>
        </div>
        <button onClick={loadData} className="btn-outline flex items-center gap-2 text-sm">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {['Weather Monitoring', 'Rainfall Analytics', 'Soil Test Reports', 'Soil Nutrient Analysis', 'Climate Alerts'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
            {tab === 'Climate Alerts' && alerts.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{alerts.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ─────────────────── WEATHER MONITORING ─────────────────── */}
      {activeTab === 'Weather Monitoring' && (
        <div className="space-y-6">
          {/* Sync banner */}
          <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${isSynced ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'}`}>
            {isSynced ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
            <span>
              {isSynced
                ? <><strong>Live Sync Active.</strong> Data from <strong>{weatherData.farmName}</strong> ({weatherData.district}) synced at {new Date(weatherData.dateSynced).toLocaleString()}.</>
                : <><strong>Sample Data.</strong> This data updates automatically when user visits their Weather & Climate tab.</>}
            </span>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center p-6 border-t-4 border-yellow-400">
              <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">{w?.temperature}°C</p>
              <p className="text-gray-500 text-sm mt-1">Temperature</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-blue-400">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">{w?.humidity}%</p>
              <p className="text-gray-500 text-sm mt-1">Humidity</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-gray-400">
              <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">{w?.windSpeed} km/h</p>
              <p className="text-gray-500 text-sm mt-1">Wind Speed</p>
            </div>
            <div className="card text-center p-6 border-t-4 border-indigo-400">
              <CloudRain className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">{w?.rainProb}%</p>
              <p className="text-gray-500 text-sm mt-1">Cloud / Rain Index</p>
            </div>
          </div>

          {/* Condition + Heat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-6 flex items-center gap-4">
              <CloudLightning className="w-10 h-10 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sky Condition</p>
                <p className="text-2xl font-bold capitalize">{w?.condition}</p>
                <p className="text-sm text-gray-400 capitalize">{w?.description}</p>
              </div>
            </div>
            <div className="card p-6 flex items-center gap-4">
              <Thermometer className="w-10 h-10 text-red-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Heat Index</p>
                <p className="text-2xl font-bold">
                  {w?.temperature > 38 ? '🔴 Extreme' : w?.temperature > 33 ? '🟠 High' : '🟢 Normal'}
                </p>
                <p className="text-sm text-gray-400">District: {weatherData.district}</p>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="card p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              7-Day Temperature Forecast ({weatherData.district})
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <LineChart data={weatherData.forecast}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="tempMax" name="High °C" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="tempMin" name="Low °C" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Precipitation */}
          <div className="card p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-indigo-500" />
              Precipitation & Cloud Density Forecast
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={weatherData.forecast}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} cursor={{ fill: '#f3f4f6' }} />
                  <Bar dataKey="rain" name="Precipitation Index (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── RAINFALL ANALYTICS ─────────────────── */}
      {activeTab === 'Rainfall Analytics' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold mb-6">Monthly Rainfall — {weatherData.district} (mm)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Bar dataKey="mm" name="Rainfall (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="text-xs text-blue-600 font-semibold uppercase">Avg Rain</p>
                <p className="text-xl font-bold text-blue-700">{Math.round(rainfallData.reduce((a, b) => a + b.mm, 0) / rainfallData.length)} mm</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                <p className="text-xs text-indigo-600 font-semibold uppercase">Peak Month</p>
                <p className="text-xl font-bold text-indigo-700">{rainfallData.reduce((a, b) => a.mm > b.mm ? a : b).month}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-semibold uppercase">District</p>
                <p className="text-xl font-bold">{weatherData.district}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <p className="text-xs text-green-600 font-semibold uppercase">Condition</p>
                <p className="text-xl font-bold text-green-700 capitalize">{w?.condition}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── SOIL TEST REPORTS ─────────────────── */}
      {activeTab === 'Soil Test Reports' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Test ID</th>
                <th className="p-4 font-medium">Farm Name</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Score</th>
                <th className="p-4 font-medium text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {soilReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium text-gray-600 dark:text-gray-300">{report.id}</td>
                  <td className="p-4 font-semibold">{report.farmName}</td>
                  <td className="p-4 text-gray-500">{report.owner}</td>
                  <td className="p-4 text-gray-500">{report.date}</td>
                  <td className="p-4">
                    <span className={`font-bold ${report.score >= 80 ? 'text-green-600' : report.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {report.score}/100
                    </span>
                    <span className="ml-1 text-xs text-gray-400">({report.score >= 80 ? 'Excellent' : report.score >= 60 ? 'Good' : 'Needs Attention'})</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        const win = window.open('', '_blank');
                        win.document.write(`<html><head><title>Soil Report</title><style>body{font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto}h1{color:#059669;border-bottom:2px solid #059669;padding-bottom:10px}table{width:100%;border-collapse:collapse;margin-top:20px}td,th{border:1px solid #e5e7eb;padding:10px}th{background:#f9fafb}</style></head><body><h1>SAMS Soil Health Report</h1><p><strong>Farm:</strong> ${report.farmName}</p><p><strong>Owner:</strong> ${report.owner}</p><p><strong>Report ID:</strong> ${report.id}</p><p><strong>Date:</strong> ${report.date}</p><p><strong>Score:</strong> ${report.score}/100</p><table><tr><th>Parameter</th><th>Value</th></tr><tr><td>Soil Type</td><td>Red Soil</td></tr><tr><td>pH Level</td><td>6.5</td></tr><tr><td>Nitrogen</td><td>${report.nutrients?.nitrogen ?? 120} mg/kg</td></tr><tr><td>Phosphorus</td><td>${report.nutrients?.phosphorus ?? 98} mg/kg</td></tr><tr><td>Potassium</td><td>${report.nutrients?.potassium ?? 86} mg/kg</td></tr></table><p style="color:#6b7280;font-size:12px;text-align:center;margin-top:40px">Generated by SAMS AI Engine</p></body></html>`);
                        win.document.close();
                        setTimeout(() => { win.print(); win.close(); }, 250);
                      }}
                      className="text-agri-green flex items-center gap-1 justify-end w-full hover:underline"
                    >
                      <Download className="w-4 h-4" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─────────────────── SOIL NUTRIENT ANALYSIS ─────────────────── */}
      {activeTab === 'Soil Nutrient Analysis' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold mb-6">NPK Nutrient Profile by Farm</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={nutrientChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
              <p className="text-3xl font-bold text-green-600 mb-2">{avgN} <span className="text-sm font-normal">mg/kg</span></p>
              <p className="text-sm text-gray-500">Good nitrogen retention. Supports leafy growth across registered farms.</p>
            </div>
            <div className="card p-6 border-t-4 border-blue-500">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Phosphorus Health</h4>
              <p className="text-3xl font-bold text-blue-600 mb-2">{avgP} <span className="text-sm font-normal">mg/kg</span></p>
              <p className="text-sm text-gray-500">Optimal phosphorus levels. Highly beneficial for root development.</p>
            </div>
            <div className="card p-6 border-t-4 border-yellow-500">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Potassium Health</h4>
              <p className="text-3xl font-bold text-yellow-600 mb-2">{avgK} <span className="text-sm font-normal">mg/kg</span></p>
              <p className="text-sm text-gray-500">Slightly low. Recommend MOP supplement at 50 kg/acre.</p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── CLIMATE ALERTS ─────────────────── */}
      {activeTab === 'Climate Alerts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Active Warnings ({alerts.length})</h3>
            <button className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Broadcast Alert</button>
          </div>
          {alerts.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <p className="font-medium">No active climate alerts.</p>
              <p className="text-sm mt-1 text-gray-400">Alerts auto-generate from synced weather data.</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-r-lg flex items-start gap-4 border-l-4 ${alert.type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'}`}>
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${alert.type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div className="flex-1">
                  <h4 className={`font-bold ${alert.type === 'danger' ? 'text-red-800 dark:text-red-400' : 'text-yellow-800 dark:text-yellow-400'}`}>{alert.title}</h4>
                  <p className={`text-sm mt-1 ${alert.type === 'danger' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'}`}>{alert.message}</p>
                  <span className={`text-xs mt-2 block ${alert.type === 'danger' ? 'text-red-500' : 'text-yellow-500'}`}>Issued: {alert.time}</span>
                </div>
                <button onClick={() => dismissAlert(alert.id)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SoilWeatherTab;
