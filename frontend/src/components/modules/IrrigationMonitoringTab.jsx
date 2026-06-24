import React from 'react';
import { Droplet, Droplets, Clock, Zap, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const waterData = [
  { time: '00:00', level: 65, consumption: 0 },
  { time: '04:00', level: 60, consumption: 0 },
  { time: '08:00', level: 85, consumption: 25 },
  { time: '12:00', level: 75, consumption: 5 },
  { time: '16:00', level: 65, consumption: 5 },
  { time: '20:00', level: 80, consumption: 15 },
  { time: '23:59', level: 75, consumption: 0 },
];

const IrrigationMonitoringTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Irrigation Monitoring</h3>
        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300">
              <Droplets className="w-5 h-5"/>
            </div>
            <h4 className="font-bold text-gray-700 dark:text-gray-300">Water Level</h4>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">75%</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="card bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg text-emerald-600 dark:text-emerald-300">
              <Droplet className="w-5 h-5"/>
            </div>
            <h4 className="font-bold text-gray-700 dark:text-gray-300">Soil Moisture</h4>
          </div>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">42%</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        <div className="card p-6 border-l-4 border-indigo-500">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-indigo-500"/>
            <h4 className="font-bold text-gray-700 dark:text-gray-300">Next Schedule</h4>
          </div>
          <p className="text-2xl font-bold">18:00 Today</p>
          <p className="text-sm text-gray-500 mt-1">Duration: 45 mins</p>
        </div>

        <div className="card p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-orange-500"/>
            <h4 className="font-bold text-gray-700 dark:text-gray-300">Daily Usage</h4>
          </div>
          <p className="text-2xl font-bold">1,250 L</p>
          <p className="text-sm text-gray-500 mt-1">Target: 1,500 L</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h4 className="font-bold mb-6">Soil Moisture & Water Consumption Trends</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="level" name="Moisture Level %" stroke="#10b981" fill="#d1fae5" strokeWidth={3} />
                <Area type="monotone" dataKey="consumption" name="Consumption (x10 L)" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 bg-agri-bg-light dark:bg-gray-800">
            <h4 className="font-bold flex items-center gap-2 mb-4 text-agri-green-deep dark:text-agri-green-light">
              <Info className="w-5 h-5"/> AI Recommendations
            </h4>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-semibold mb-1">Best Irrigation Time</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Based on weather forecast, running irrigation between 18:00 - 20:00 minimizes evaporation loss by 15%.</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-semibold mb-1 text-blue-600 dark:text-blue-400">Estimated Need</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Your tomatoes currently require ~2.5L per plant per day at this growth stage.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow-sm border border-green-100 dark:border-green-800">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">Water Saving Tip</p>
                <p className="text-xs text-green-600 dark:text-green-300">Adding organic mulch can help retain topsoil moisture and reduce daily water requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationMonitoringTab;
