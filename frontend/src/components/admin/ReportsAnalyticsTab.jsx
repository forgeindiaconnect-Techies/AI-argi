import React, { useState, useEffect } from 'react';
import { FileText, Download, Filter, BarChart2, PieChart, Users, Map, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { API_BASE_URL } from '../../config/api';

// Remove hardcoded static arrays, will replace with state.

const ReportsAnalyticsTab = () => {
  const [activeTab, setActiveTab] = useState('Crop Performance');
  const [syncData, setSyncData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSyncData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/sync`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setSyncData(data);
    } catch (error) {
      console.error('Error fetching synced data:', error);
      // Fallback to local storage if API fails
      const localBackup = JSON.parse(localStorage.getItem('sams_cloud_sync_backup') || 'null');
      if (localBackup) setSyncData([localBackup]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncData();
  }, []);

  const tabs = ['Crop Performance', 'Yield Reports', 'Farmer Reports', 'Soil Reports', 'Weather Reports'];

  // Process data for charts and tables dynamically based on syncData
  
  // 1. Crop Performance (Yield History from syncData)
  const cropPerformanceData = [];
  syncData.forEach(userSync => {
    if (userSync.yieldHistory) {
      userSync.yieldHistory.forEach(history => {
        ['Tomato', 'Cotton', 'Groundnut', 'Wheat', 'Rice'].forEach(crop => {
          if (history[crop]) {
            const existing = cropPerformanceData.find(c => c.name === crop);
            if (existing) {
              existing.actual += history[crop];
              existing.target += history[crop] * 0.9; // Just an estimate target for demo
            } else {
              cropPerformanceData.push({ name: crop, target: history[crop] * 0.9, actual: history[crop] });
            }
          }
        });
      });
    }
  });

  // Default fallback if empty
  if (cropPerformanceData.length === 0) {
    cropPerformanceData.push(
      { name: 'Tomato', target: 120, actual: 110 },
      { name: 'Cotton', target: 200, actual: 215 },
      { name: 'Wheat', target: 300, actual: 280 },
      { name: 'Rice', target: 250, actual: 260 }
    );
  }

  // 2. Yield Reports (flattening all yield history)
  let yieldReportData = [];
  syncData.forEach(userSync => {
    if (userSync.yieldHistory) {
      userSync.yieldHistory.forEach((h, i) => {
        yieldReportData.push({
          id: `YR-${h.year}-${i}`,
          crop: 'Mixed', // Simplified
          season: 'Kharif/Rabi',
          area: 'Varies',
          totalYield: `${(h.Tomato || 0) + (h.Cotton || 0) + (h.Groundnut || 0)} Tons`,
          variance: '+5%'
        });
      });
    }
  });
  if (yieldReportData.length === 0) {
    yieldReportData = [
      { id: 'YR-2025-01', crop: 'Tomato', season: 'Kharif', area: '120 Acres', totalYield: '450 Tons', variance: '+5%' }
    ];
  }

  // 3. Farmer Reports
  let farmerReportData = [];
  syncData.forEach((userSync, index) => {
    let totalYield = 0;
    if (userSync.yieldHistory) {
      userSync.yieldHistory.forEach(h => {
        totalYield += (h.Tomato || 0) + (h.Cotton || 0) + (h.Groundnut || 0);
      });
    }
    farmerReportData.push({
      id: `FRM-10${index + 1}`,
      name: userSync.syncedBy || 'Unknown Farmer',
      region: userSync.weatherData?.district || 'Unknown Region',
      yield: `${totalYield} Tons`,
      status: totalYield > 50 ? 'Top Performer' : 'Average'
    });
  });
  if (farmerReportData.length === 0) {
    farmerReportData = [
      { id: 'FRM-101', name: 'John Doe', region: 'North', yield: '14.5 Tons', status: 'Top Performer' }
    ];
  }

  // 4. Soil Reports
  let soilReportData = [];
  syncData.forEach(userSync => {
    if (userSync.soilReports) {
      userSync.soilReports.forEach(report => {
        soilReportData.push({
          testId: report.id,
          region: report.farmName,
          ph: 6.5, // placeholder
          nitrogen: report.nutrients?.nitrogen > 100 ? 'Optimal' : 'Low',
          phosphorus: report.nutrients?.phosphorus > 80 ? 'Optimal' : 'Low',
          moisture: '34%'
        });
      });
    }
  });
  if (soilReportData.length === 0) {
    soilReportData = [
      { testId: 'SR-1092', region: 'North Acre', ph: 6.5, nitrogen: 'Optimal', phosphorus: 'Low', moisture: '34%' }
    ];
  }

  // 5. Weather Reports (flatten forecast data from weatherData)
  let weatherReportData = [];
  syncData.forEach(userSync => {
    if (userSync.weatherData?.forecast) {
      userSync.weatherData.forecast.slice(0, 4).forEach((dayData, idx) => {
        weatherReportData.push({
          month: dayData.day, // Reusing day as month/period
          avgTemp: `${dayData.tempMax}°C`,
          rainfall: `${dayData.rain}% Prob`,
          humidity: `${userSync.weatherData.current?.humidity || 50}%`
        });
      });
    }
  });
  if (weatherReportData.length === 0) {
    weatherReportData = [
      { month: 'January', avgTemp: '22°C', rainfall: '45mm', humidity: '60%' }
    ];
  }

  const handleDownload = (format) => {
    if (format === 'pdf') {
      window.print();
      return;
    }

    let reportContent = '';
    let mimeType = 'text/csv;charset=utf-8;';
    let extension = 'csv';

    if (activeTab === 'Crop Performance') {
      reportContent += 'Crop,Target Yield,Actual Yield\n';
      cropPerformanceData.forEach(r => reportContent += `${r.name},${r.target},${r.actual}\n`);
    } else if (activeTab === 'Yield Reports') {
      reportContent += 'Report ID,Crop,Season,Total Area,Total Yield,Variance\n';
      yieldReportData.forEach(r => reportContent += `${r.id},${r.crop},${r.season},${r.area},${r.totalYield},${r.variance}\n`);
    } else if (activeTab === 'Farmer Reports') {
      reportContent += 'Farmer ID,Name,Region,Yield,Status\n';
      farmerReportData.forEach(r => reportContent += `${r.id},${r.name},${r.region},${r.yield},${r.status}\n`);
    } else if (activeTab === 'Soil Reports') {
      reportContent += 'Test ID,Region,pH,Nitrogen,Phosphorus,Moisture\n';
      soilReportData.forEach(r => reportContent += `${r.testId},${r.region},${r.ph},${r.nitrogen},${r.phosphorus},${r.moisture}\n`);
    } else if (activeTab === 'Weather Reports') {
      reportContent += 'Month,Avg Temp,Rainfall,Humidity\n';
      weatherReportData.forEach(r => reportContent += `${r.month},${r.avgTemp},${r.rainfall},${r.humidity}\n`);
    }
    
    const blob = new Blob([reportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    a.download = `${activeTab.replace(/\s+/g, '_').toLowerCase()}_report.${extension}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={fetchSyncData} className="btn-outline flex items-center gap-2 text-sm bg-white dark:bg-gray-800">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
          <div className="flex gap-2 flex-1 sm:flex-none">
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
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
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
              {farmerReportData.map(farmer => (
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
