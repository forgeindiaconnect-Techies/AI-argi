import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, ChevronDown, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const yieldHistoryData = [
  { year: '2022', Tomato: 12, Cotton: 0, Groundnut: 4 },
  { year: '2023', Tomato: 15, Cotton: 8, Groundnut: 5 },
  { year: '2024', Tomato: 14, Cotton: 10, Groundnut: 6 },
  { year: '2025', Tomato: 18, Cotton: 12, Groundnut: 5 },
];

const ReportsHistoryTab = ({ activeFarm }) => {
  const [dateRange, setDateRange] = useState('Last 12 Months');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <h3 className="text-xl font-bold">Reports & History</h3>
        <div className="flex gap-2">
          <button onClick={() => alert("Opening advanced filter options...")} className="btn-outline flex items-center gap-2 text-sm bg-white dark:bg-gray-800">
            <Filter className="w-4 h-4"/> Filter
          </button>
          <button onClick={() => window.print()} className="btn-primary flex items-center gap-2 text-sm">
            <Download className="w-4 h-4"/> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-agri-green">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <PieChart className="w-6 h-6"/>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 dark:text-gray-300">Total Yield</h4>
              <p className="text-sm text-gray-500">All time production</p>
            </div>
          </div>
          <p className="text-3xl font-bold">145 <span className="text-lg font-normal text-gray-500">Tons</span></p>
        </div>

        <div className="card p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Calendar className="w-6 h-6"/>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 dark:text-gray-300">Active Seasons</h4>
              <p className="text-sm text-gray-500">Farming cycles</p>
            </div>
          </div>
          <p className="text-3xl font-bold">8 <span className="text-lg font-normal text-gray-500">Seasons</span></p>
        </div>

        <div className="card p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <FileText className="w-6 h-6"/>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 dark:text-gray-300">AI Reports</h4>
              <p className="text-sm text-gray-500">Generated analyses</p>
            </div>
          </div>
          <p className="text-3xl font-bold">24 <span className="text-lg font-normal text-gray-500">Reports</span></p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold">Crop Yield History (Tons/Year)</h4>
          <div className="relative">
            <select 
              className="appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-agri-green"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Last 4 Years</option>
              <option>Last 10 Years</option>
              <option>All Time</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yieldHistoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="Tomato" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Cotton" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Groundnut" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h4 className="font-bold">Recent AI Analysis Reports</h4>
          <button onClick={() => alert("Loading complete report history...")} className="text-sm text-agri-green hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Report Type</th>
                <th className="p-4 font-medium">Crop Context</th>
                <th className="p-4 font-medium">Risk Level</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {(() => {
                const existingReports = [
                  { date: 'Oct 15, 2025', type: 'Suitability Analysis', crop: 'Cotton', risk: 'Low', riskColor: 'text-green-600 bg-green-100' },
                  { date: 'Sep 02, 2025', type: 'Pest Prediction', crop: 'Tomato', risk: 'High', riskColor: 'text-red-600 bg-red-100' },
                  { date: 'Jun 20, 2025', type: 'Soil Health Scan', crop: 'All', risk: 'Moderate', riskColor: 'text-yellow-600 bg-yellow-100' },
                  { date: 'May 10, 2025', type: 'Irrigation Strategy', crop: 'Groundnut', risk: 'Low', riskColor: 'text-green-600 bg-green-100' }
                ];
                
                if (activeFarm?.aiReport) {
                  existingReports.unshift({
                    date: new Date(activeFarm.aiReport.date).toLocaleDateString(),
                    type: 'AI Crop Planning',
                    crop: activeFarm.aiReport.bestCrop.name,
                    risk: activeFarm.aiReport.bestCrop.riskLevel,
                    riskColor: activeFarm.aiReport.bestCrop.riskLevel === 'Low' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                  });
                }
                
                return existingReports.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-gray-600 dark:text-gray-300">{row.date}</td>
                    <td className="p-4 font-medium">{row.type}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{row.crop}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${row.riskColor}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => alert(`Downloading ${row.type} report as PDF...`)} className="text-agri-green hover:text-agri-green-dark inline-flex items-center gap-1">
                        <Download className="w-4 h-4"/> PDF
                      </button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsHistoryTab;
