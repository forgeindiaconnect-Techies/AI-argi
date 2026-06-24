import React from 'react';
import { Sun, CloudRain, Wind, Droplets, AlertTriangle, CloudLightning } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const forecastData = [
  { day: 'Mon', tempMax: 32, tempMin: 22, rain: 0 },
  { day: 'Tue', tempMax: 33, tempMin: 23, rain: 5 },
  { day: 'Wed', tempMax: 30, tempMin: 21, rain: 45 },
  { day: 'Thu', tempMax: 28, tempMin: 20, rain: 80 },
  { day: 'Fri', tempMax: 29, tempMin: 21, rain: 20 },
  { day: 'Sat', tempMax: 31, tempMin: 22, rain: 0 },
  { day: 'Sun', tempMax: 34, tempMin: 23, rain: 0 },
];

const WeatherAnalysisTab = ({ activeFarm }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Weather Analysis ({activeFarm?.location || 'Coimbatore'})</h3>
        <span className="text-sm text-gray-500">Last updated: Just now</span>
      </div>

      {/* Weather Alerts */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
        <div>
          <h4 className="text-red-800 font-bold">Heavy Rainfall Alert</h4>
          <p className="text-red-700 text-sm mt-1">High probability of thunderstorms on Thursday. Secure equipment and delay fertilizer application.</p>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card text-center flex flex-col items-center justify-center p-6 border-t-4 border-yellow-400">
          <Sun className="w-10 h-10 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold">32°C</p>
          <p className="text-gray-500 text-sm">Temperature</p>
        </div>
        <div className="card text-center flex flex-col items-center justify-center p-6 border-t-4 border-blue-400">
          <Droplets className="w-10 h-10 text-blue-500 mb-2" />
          <p className="text-2xl font-bold">45%</p>
          <p className="text-gray-500 text-sm">Humidity</p>
        </div>
        <div className="card text-center flex flex-col items-center justify-center p-6 border-t-4 border-gray-400">
          <Wind className="w-10 h-10 text-gray-500 mb-2" />
          <p className="text-2xl font-bold">12 km/h</p>
          <p className="text-gray-500 text-sm">Wind Speed</p>
        </div>
        <div className="card text-center flex flex-col items-center justify-center p-6 border-t-4 border-indigo-400">
          <CloudRain className="w-10 h-10 text-indigo-500 mb-2" />
          <p className="text-2xl font-bold">10%</p>
          <p className="text-gray-500 text-sm">Rain Prob.</p>
        </div>
        <div className="card text-center flex flex-col items-center justify-center p-6 border-t-4 border-purple-400">
          <Sun className="w-10 h-10 text-purple-500 mb-2" />
          <p className="text-2xl font-bold">8</p>
          <p className="text-gray-500 text-sm">UV Index</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="card p-6">
          <h4 className="font-bold mb-6">Temperature Trends (7 Days)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="tempMax" name="High °C" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="tempMin" name="Low °C" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rainfall Chart */}
        <div className="card p-6">
          <h4 className="font-bold mb-6">Precipitation Forecast</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f3f4f6'}} />
                <Legend />
                <Bar dataKey="rain" name="Rainfall (mm)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 7-Day Quick View */}
      <div className="card">
        <h4 className="font-bold mb-4">7-Day Forecast Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
          {forecastData.map((data, idx) => (
            <div key={data.day} className="flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 transition-transform hover:scale-105">
              <span className="font-medium mb-2">{data.day}</span>
              {data.rain > 30 ? <CloudLightning className="w-8 h-8 text-indigo-500 mb-2" /> : 
               data.rain > 0 ? <CloudRain className="w-8 h-8 text-blue-500 mb-2" /> : 
               <Sun className="w-8 h-8 text-yellow-500 mb-2" />}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">{data.tempMax}°</span>
                <span className="text-sm text-gray-500">{data.tempMin}°</span>
              </div>
              {data.rain > 0 && <span className="text-xs text-blue-500 mt-1 font-medium">{data.rain}mm</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherAnalysisTab;
