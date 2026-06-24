import React, { useState } from 'react';
import { FileText, Download, Filter, BarChart2, PieChart, Users, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const cropPerformanceData = [
  { name: 'Tomato', target: 120, actual: 110 },
  { name: 'Cotton', target: 200, actual: 215 },
  { name: 'Wheat', target: 300, actual: 280 },
  { name: 'Rice', target: 250, actual: 260 },
];

const yieldReportData = [
  { id: 'YR-2025-01', crop: 'Tomato', season: 'Kharif', area: '120 Acres', totalYield: '450 Tons', variance: '+5%' },
  { id: 'YR-2025-02', crop: 'Cotton', season: 'Kharif', area: '300 Acres', totalYield: '850 Tons', variance: '+12%' },
  { id: 'YR-2025-03', crop: 'Wheat', season: 'Rabi', area: '250 Acres', totalYield: '600 Tons', variance: '-2%' },
];

const soilReportData = [
  { testId: 'SR-1092', region: 'North Acre', ph: 6.5, nitrogen: 'Optimal', phosphorus: 'Low', moisture: '34%' },
  { testId: 'SR-1093', region: 'East Valley', ph: 7.1, nitrogen: 'High', phosphorus: 'Optimal', moisture: '28%' },
  { testId: 'SR-1094', region: 'South Plains', ph: 5.8, nitrogen: 'Low', phosphorus: 'Low', moisture: '45%' },
];

const weatherReportData = [
  { month: 'January', avgTemp: '22°C', rainfall: '45mm', humidity: '60%' },
  { month: 'February', avgTemp: '25°C', rainfall: '30mm', humidity: '55%' },
  { month: 'March', avgTemp: '30°C', rainfall: '60mm', humidity: '50%' },
  { month: 'April', avgTemp: '34°C', rainfall: '15mm', humidity: '45%' },
];

const ReportsAnalyticsTab = () => {
  const [activeTab, setActiveTab] = useState('Crop Performance');

  const tabs = ['Crop Performance', 'Yield Reports', 'Farmer Reports', 'Soil Reports', 'Weather Reports'];

  const handleDownload = (format) => {
    const reportContent = `--- ${activeTab} Report ---\n\nFormat: ${format.toUpperCase()}\nGenerated on: ${new Date().toLocaleString()}\n\nThis is an automatically generated ${format} export for ${activeTab}.`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab.replace(/\s+/g, '_').toLowerCase()}_report.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none btn-outline flex items-center justify-center gap-2 text-sm bg-white dark:bg-gray-800">
            <Filter className="w-4 h-4"/> Filter
          </button>
          <div className="flex gap-1 flex-1 sm:flex-none">
            <button onClick={() => handleDownload('pdf')} className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4"/> PDF
            </button>
            <button onClick={() => handleDownload('xlsx')} className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Download className="w-4 h-4"/> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
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

      {activeTab === 'Crop Performance' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-bold mb-6">Crop Performance: Target vs Actual Yield (Tons)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Legend />
                  <Bar dataKey="target" name="Target Yield" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual Yield" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Farmer Reports' && (
        <div className="card p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-bold">Active Farmer Summaries</h4>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Farmer ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Region</th>
                <th className="p-4 font-medium">Total Yield Contribution</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {[
                { id: 'FRM-101', name: 'John Doe', region: 'North', yield: '14.5 Tons', status: 'Top Performer' },
                { id: 'FRM-102', name: 'Alice Smith', region: 'South', yield: '12.0 Tons', status: 'Average' },
                { id: 'FRM-103', name: 'Bob Johnson', region: 'East', yield: '8.2 Tons', status: 'Needs Support' },
              ].map(farmer => (
                <tr key={farmer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-gray-500">{farmer.id}</td>
                  <td className="p-4 font-medium">{farmer.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{farmer.region}</td>
                  <td className="p-4 font-bold">{farmer.yield}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      farmer.status === 'Top Performer' ? 'bg-green-100 text-green-700' :
                      farmer.status === 'Average' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {farmer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Yield Reports' && (
        <div className="card p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-bold">Seasonal Yield Aggregates</h4>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Report ID</th>
                <th className="p-4 font-medium">Crop</th>
                <th className="p-4 font-medium">Season</th>
                <th className="p-4 font-medium">Total Area</th>
                <th className="p-4 font-medium">Total Yield</th>
                <th className="p-4 font-medium">Variance (YoY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {yieldReportData.map(report => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-gray-500">{report.id}</td>
                  <td className="p-4 font-medium">{report.crop}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{report.season}</td>
                  <td className="p-4 text-gray-600">{report.area}</td>
                  <td className="p-4 font-bold text-agri-green">{report.totalYield}</td>
                  <td className={`p-4 font-bold ${report.variance.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{report.variance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Soil Reports' && (
        <div className="card p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-bold">Soil Health Summary Records</h4>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Test ID</th>
                <th className="p-4 font-medium">Region/Farm</th>
                <th className="p-4 font-medium">pH Level</th>
                <th className="p-4 font-medium">Nitrogen (N)</th>
                <th className="p-4 font-medium">Phosphorus (P)</th>
                <th className="p-4 font-medium">Avg Moisture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {soilReportData.map(report => (
                <tr key={report.testId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-mono text-gray-500">{report.testId}</td>
                  <td className="p-4 font-medium">{report.region}</td>
                  <td className="p-4 font-bold">{report.ph}</td>
                  <td className={`p-4 font-medium ${report.nitrogen === 'Optimal' ? 'text-green-600' : report.nitrogen === 'Low' ? 'text-orange-500' : 'text-blue-600'}`}>{report.nitrogen}</td>
                  <td className={`p-4 font-medium ${report.phosphorus === 'Optimal' ? 'text-green-600' : report.phosphorus === 'Low' ? 'text-orange-500' : 'text-blue-600'}`}>{report.phosphorus}</td>
                  <td className="p-4 text-gray-600">{report.moisture}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Weather Reports' && (
        <div className="card p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-bold">Historical Monthly Weather Logs</h4>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Month</th>
                <th className="p-4 font-medium">Average Temperature</th>
                <th className="p-4 font-medium">Total Rainfall</th>
                <th className="p-4 font-medium">Average Humidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {weatherReportData.map(report => (
                <tr key={report.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium">{report.month}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-300 font-bold">{report.avgTemp}</td>
                  <td className="p-4 text-blue-600 font-bold">{report.rainfall}</td>
                  <td className="p-4 text-gray-600">{report.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalyticsTab;
