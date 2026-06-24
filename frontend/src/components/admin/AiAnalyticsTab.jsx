import React, { useState } from 'react';
import { Activity, Bug, Activity as Heartbeat, Target, Lightbulb, AlertTriangle, TrendingUp, Camera, Map } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import AdvancedAiSuggestions from '../modules/AiSuggestionsTab';

const yieldPredictionData = [
  { region: 'North', actual: 45, predicted: 48 },
  { region: 'South', actual: 60, predicted: 58 },
  { region: 'East', actual: 35, predicted: 39 },
  { region: 'West', actual: 50, predicted: 52 },
];

const AiAnalyticsTab = () => {
  const [activeTab, setActiveTab] = useState('Yield Prediction');

  const subTabs = [
    'Yield Prediction', 'Disease Prediction', 'Pest Risk Analysis', 
    'Crop Health Monitoring', 'AI Recommendations'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Analytics Center</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {subTabs.map(tab => (
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

      {activeTab === 'Yield Prediction' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h4 className="font-bold mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-blue-500"/> Regional Yield Prediction (Tons)</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="region" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="actual" name="Historical Actual" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" name="AI Predicted" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6 border-l-4 border-agri-green">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Overall Accuracy</h4>
              <p className="text-4xl font-bold text-agri-green">94.2%</p>
              <p className="text-sm text-gray-500 mt-2">Based on last season's variance.</p>
            </div>
            <div className="card p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Insights</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2 items-start"><span className="w-1.5 h-1.5 rounded-full bg-agri-green mt-1.5 shrink-0"></span> Cotton yield in Northern region expected to increase by 8% due to optimal rainfall.</li>
                <li className="flex gap-2 items-start"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span> Tomato yield in Eastern region might drop 5% due to recent pest activity.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Disease Prediction' && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-red-500"/> Disease Outbreak Risk</h4>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">High Alert</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h5 className="font-bold text-red-800 dark:text-red-400">Leaf Blight Outbreak Likely</h5>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">High humidity and recent temperature drops have created a 85% probability of Leaf Blight in Tomato crops within the next 5 days.</p>
            </div>
            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h5 className="font-bold text-yellow-800 dark:text-yellow-400">Rust Disease Moderate Risk</h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">40% probability of Rust on Wheat crops in the Eastern zone.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Pest Risk Analysis' && (
        <div className="card p-6">
          <h4 className="font-bold mb-6 flex items-center gap-2"><Bug className="w-5 h-5 text-amber-500"/> Pest Risk Map Summary</h4>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-sm">
                <th className="p-4 font-medium">Pest Type</th>
                <th className="p-4 font-medium">Target Crop</th>
                <th className="p-4 font-medium">Risk Level</th>
                <th className="p-4 font-medium">AI Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-4 font-medium">Aphids</td>
                <td className="p-4 text-gray-600">Cotton</td>
                <td className="p-4"><span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">High</span></td>
                <td className="p-4">89%</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-4 font-medium">Locusts</td>
                <td className="p-4 text-gray-600">Wheat</td>
                <td className="p-4"><span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Low</span></td>
                <td className="p-4">95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Crop Health Monitoring' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold flex items-center gap-2 mb-4"><Camera className="w-5 h-5 text-purple-500"/> Satellite NDVI Imagery Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-yellow-400/20 to-red-400/20 mix-blend-overlay"></div>
                <div className="text-center z-10">
                  <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">Live Satellite Feed</p>
                  <p className="text-xs text-gray-400 mt-1">Resolution: 10m/px • Updated 2 hours ago</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">Vegetation Index (NDVI)</h5>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-agri-green">0.72</span>
                    <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Healthy</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full mt-3"></div>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-bold text-sm mb-2 text-gray-700 dark:text-gray-300">Chlorophyll Levels</h5>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-blue-500">Normal</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h5 className="font-bold text-sm mb-2 text-yellow-700 dark:text-yellow-500 flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> Stress Detected</h5>
                  <p className="text-xs text-gray-500">Mild water stress detected in the North-East quadrant of Field A. Recommend targeted irrigation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'AI Recommendations' && (
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900/50 p-2 sm:p-6">
          <AdvancedAiSuggestions activeFarm={{ name: 'Admin Demo Farm', location: 'Coimbatore, Tamil Nadu', soil: 'Black Soil', area: '15' }} />
        </div>
      )}
    </div>
  );
};

export default AiAnalyticsTab;
