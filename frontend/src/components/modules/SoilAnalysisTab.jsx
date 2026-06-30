import React, { useState } from 'react';
import { Beaker, BarChart2, CheckCircle, AlertTriangle, ChevronRight, Download, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const soilNutrients = [
  { subject: 'Nitrogen (N)', A: 120, fullMark: 150 },
  { subject: 'Phosphorus (P)', A: 98, fullMark: 150 },
  { subject: 'Potassium (K)', A: 86, fullMark: 150 },
  { subject: 'Organic Carbon', A: 99, fullMark: 150 },
  { subject: 'pH Level', A: 85, fullMark: 150 },
  { subject: 'Moisture', A: 65, fullMark: 150 },
];

const historicalData = [
  { month: 'Jan', ph: 6.2, nitrogen: 110, phosphorus: 85 },
  { month: 'Feb', ph: 6.3, nitrogen: 115, phosphorus: 90 },
  { month: 'Mar', ph: 6.5, nitrogen: 120, phosphorus: 98 },
];

const cropDetails = {
  'Cotton': { yield: 'High', water: 'Medium', duration: '120-150 days', profit: 'High', description: 'Cotton thrives well in Red Soil due to good drainage. Ensure adequate potassium levels.' },
  'Groundnut': { yield: 'Medium', water: 'Low', duration: '90-120 days', profit: 'Medium', description: 'Groundnuts are highly suitable for Red Soil. They require less water and improve soil nitrogen.' },
  'Millets': { yield: 'Medium', water: 'Very Low', duration: '60-90 days', profit: 'Medium', description: 'Highly resilient and requires minimal water. Perfect for dry spells.' },
  'Pulses': { yield: 'Medium', water: 'Low', duration: '70-100 days', profit: 'High', description: 'Improves soil health by fixing nitrogen. Excellent choice for crop rotation.' }
};

const SoilAnalysisTab = ({ activeFarm }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isSynced, setIsSynced] = useState(false);

  const handleSaveToAdmin = () => {
    setIsSynced(true);
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const newReport = {
      id: `#ST-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      farmName: activeFarm?.name || 'North Acre',
      owner: userInfo.name || 'Farmer',
      date: new Date().toISOString().split('T')[0],
      score: 85,
      nutrients: { nitrogen: 120, phosphorus: 98, potassium: 86 },
      soilType: activeFarm?.soil || 'Red Soil',
      district: activeFarm?.district || '',
    };

    const stored = localStorage.getItem('sams_soil_reports');
    const existing = stored ? JSON.parse(stored) : [];
    // Avoid duplicate entries for same farm on same date
    const filtered = existing.filter(r => !(r.farmName === newReport.farmName && r.date === newReport.date));
    localStorage.setItem('sams_soil_reports', JSON.stringify([newReport, ...filtered]));

    setTimeout(() => { setIsSynced(false); }, 1500);
  };

  const handleExport = () => {
    const reportText = `Soil Health Report\nDate: ${new Date().toLocaleDateString()}\nOverall Health: 85/100 (Excellent)\nPrimary Soil: Red Soil\npH Level: 6.5\nWarning: Low Potassium (K)\n\nNutrient Profile:\nNitrogen: 120/150\nPhosphorus: 98/150\nPotassium: 86/150\nOrganic Carbon: 99/150\nMoisture: 65/150`;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Soil_Health_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Soil Health & Analysis</h3>
        <div className="flex gap-3">
          <button onClick={handleSaveToAdmin} className={`btn-primary flex items-center gap-2 text-sm ${isSynced ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}>
            {isSynced ? <><CheckCircle className="w-4 h-4"/> Synced!</> : 'Sync to Admin'}
          </button>
          <button onClick={handleExport} className="btn-outline flex items-center gap-2 text-sm">
            <Download className="w-4 h-4"/> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 flex flex-col items-center justify-center text-center">
          <h4 className="text-gray-500 font-medium text-sm mb-2">Overall Soil Health</h4>
          <div className="text-4xl font-bold text-agri-green-deep dark:text-agri-green-light">85/100</div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">Excellent</span>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-gray-500 font-medium text-sm">Primary Soil Type</h4>
            <Beaker className="w-5 h-5 text-orange-500"/>
          </div>
          <p className="text-xl font-bold">Red Soil</p>
          <p className="text-xs text-gray-500 mt-1">High iron content, good drainage.</p>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-gray-500 font-medium text-sm">pH Level</h4>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <p className="text-xl font-bold">6.5</p>
          <p className="text-xs text-green-600 font-medium mt-1">Optimal for most crops</p>
        </div>

        <div className="card p-6 border-l-4 border-yellow-400">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-gray-500 font-medium text-sm">Warning</h4>
            <AlertTriangle className="w-5 h-5 text-yellow-500"/>
          </div>
          <p className="text-sm font-bold text-yellow-700">Low Potassium (K)</p>
          <p className="text-xs text-gray-500 mt-1">Action required soon.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-bold mb-4">Nutrient Profile (NPK & Others)</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilNutrients}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Current Soil" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-bold mb-4">Historical Trends</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="nitrogen" name="Nitrogen" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="phosphorus" name="Phosphorus" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-agri-green"/> Recommended Fertilizers
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="font-semibold text-sm">Muriate of Potash (MOP)</p>
                <p className="text-xs text-gray-500 mt-1">To address the slight potassium deficiency detected in the latest scan. Apply 50kg/acre.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="font-semibold text-sm">Organic Compost</p>
                <p className="text-xs text-gray-500 mt-1">Maintain healthy organic carbon levels. Apply before next sowing season.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-500"/> Recommended Crops for this Soil
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(cropDetails).map(crop => (
              <div 
                key={crop} 
                onClick={() => setSelectedCrop(crop)}
                className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-agri-green transition-colors cursor-pointer group"
              >
                <span className="font-medium text-sm">{crop}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-agri-green transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Details Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-agri-green/5">
              <h3 className="text-xl font-bold text-agri-green-deep dark:text-agri-green-light">
                {selectedCrop} Recommendation
              </h3>
              <button onClick={() => setSelectedCrop(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{cropDetails[selectedCrop].description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Est. Yield</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-1">{cropDetails[selectedCrop].yield}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Water Needs</p>
                  <p className="font-bold text-blue-600 mt-1">{cropDetails[selectedCrop].water}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Duration</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200 mt-1">{cropDetails[selectedCrop].duration}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Profitability</p>
                  <p className="font-bold text-agri-green mt-1">{cropDetails[selectedCrop].profit}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCrop(null)} 
                className="w-full btn-primary mt-6 bg-agri-green hover:bg-agri-green-dark"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilAnalysisTab;
