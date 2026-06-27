import React, { useState, useEffect } from 'react';
import { Brain, MapPin, Droplets, Sun, Wind, Sprout, Activity, ShieldAlert, Calendar, IndianRupee, Lightbulb, TrendingUp, Eye, X, Clock } from 'lucide-react';

const ADVISOR_KEY = 'sams_advisor_reports';

const tnDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

const soilTypes = ["Red Soil", "Black Soil", "Alluvial Soil", "Sandy Soil", "Laterite Soil", "Mountain Soil"];
const seasonTypes = ["Rabi", "Kharif", "Whole Year"];
const waterAvailabilities = ["Low", "Medium", "High"];

const AiCropAdvisorTab = ({ activeFarm }) => {
  const [formData, setFormData] = useState({
    district: '',
    soil: '',
    season: '',
    area: '',
    water: ''
  });

  const [weather, setWeather] = useState({
    temperature: 'Fetching...',
    humidity: 'Fetching...',
    rainfall: 'Fetching...',
    windSpeed: 'Fetching...'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);
  const [savedReports, setSavedReports] = useState([]);
  const [viewingReport, setViewingReport] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(ADVISOR_KEY);
    if (stored) setSavedReports(JSON.parse(stored));
  }, []);

  useEffect(() => {
    // Pre-fill if activeFarm has data
    if (activeFarm) {
      setFormData({
        district: activeFarm.district || '',
        soil: activeFarm.soil || '',
        season: ['Rabi', 'Kharif', 'Whole Year'].includes(activeFarm.season) ? activeFarm.season : 'Rabi',
        area: activeFarm.area || '',
        water: activeFarm.water || ''
      });
    }

    // Simulate auto-fetching weather data based on location
    setTimeout(() => {
      setWeather({
        temperature: '32°C',
        humidity: '65%',
        rainfall: '120 mm',
        windSpeed: '14 km/h'
      });
    }, 1500);
  }, [activeFarm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = () => {
    if (!formData.district || !formData.soil || !formData.season || !formData.area) {
      alert("Please fill in all required fields (District, Soil, Season, Area).");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const areaVal = parseFloat(formData.area) || 1;
      const yieldPerAcre = 1000;
      const pricePerKg = 80;
      
      const newReport = {
        recommendations: [
          { rank: 1, badge: "🥇 First Preference", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", name: formData.season === 'Kharif' ? 'Paddy' : (formData.season === 'Rabi' ? 'Wheat' : 'Sugarcane'), suitabilityScore: 95, yieldPerAcre: 1000, revenue: 800000, profit: 480000, confidence: 'Very High', risk: 'Low' },
          { rank: 2, badge: "🥈 Second Preference", color: "text-gray-300", bg: "bg-gray-300/10", border: "border-gray-300/30", name: formData.season === 'Kharif' ? 'Groundnut' : (formData.season === 'Rabi' ? 'Mustard' : 'Banana'), suitabilityScore: 90, yieldPerAcre: 850, revenue: 700000, profit: 410000, confidence: 'High', risk: 'Medium' },
          { rank: 3, badge: "🥉 Third Preference", color: "text-amber-600", bg: "bg-amber-600/10", border: "border-amber-600/30", name: formData.season === 'Kharif' ? 'Maize' : (formData.season === 'Rabi' ? 'Barley' : 'Tapioca'), suitabilityScore: 85, yieldPerAcre: 700, revenue: 550000, profit: 350000, confidence: 'Medium', risk: 'Low' }
        ],
        bestCrop: { name: formData.season === 'Kharif' ? 'Paddy' : (formData.season === 'Rabi' ? 'Wheat' : 'Sugarcane'), suitabilityScore: 95, confidence: 'Very High', riskLevel: 'Low' },
        cultivation: { soil: formData.soil, season: formData.season, temperature: '25°C - 35°C', humidity: '50% - 70%', rainfall: '500 - 800 mm', water: 'Moderate', sunlight: 'Full Sun (6-8 hours/day)', sowingMethod: 'Direct Seeding / Transplanting', harvestingMethod: 'Manual / Mechanical Harvester' },
        growth: { duration: 110, germination: '7-10 Days', stages: 'Seedling -> Vegetative -> Flowering -> Maturity', harvestTime: 'Late October' },
        fertilizer: { organic: 'Organic Compost, Farmyard Manure', chemical: 'Urea, DAP, MOP', schedule: 'Basal dose at sowing, top dressing at 30 and 45 days', quantity: 'NPK 10:20:20 kg/acre' },
        irrigation: { weekly: '30,000 Liters / Acre', schedule: 'Every 5-7 days depending on soil moisture', droughtWarning: formData.water === 'Low' ? 'High Risk' : 'Low Risk' },
        yieldData: { perAcre: yieldPerAcre, total: yieldPerAcre * areaVal, quality: 'Export Quality (Grade A)' },
        market: { price: pricePerKg, revenue: yieldPerAcre * areaVal * pricePerKg, profit: (yieldPerAcre * areaVal * pricePerKg) * 0.6, rating: 'Highly Profitable' },
        savedAt: new Date().toISOString(),
        district: formData.district,
        season: formData.season,
        soil: formData.soil,
        area: formData.area
      };
      setReport(newReport);
      setIsAnalyzing(false);
      // Persist to localStorage
      const stored = localStorage.getItem(ADVISOR_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      const updated = [newReport, ...existing].slice(0, 20);
      localStorage.setItem(ADVISOR_KEY, JSON.stringify(updated));
      setSavedReports(updated);
    }, 2500);
  };

  return (
    <>
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-agri-green text-white rounded-xl shadow-lg">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Crop Advisor</h2>
          <p className="text-gray-500 dark:text-gray-400">Intelligent crop selection and cultivation planning based on your farm's unique parameters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Input Form */}
        <div className="xl:col-span-1 space-y-6">
          <div className="card shadow-md border-t-4 border-agri-green">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <MapPin className="text-agri-green w-5 h-5" /> Farm Parameters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="label-text">District <span className="text-red-500">*</span></label>
                <select name="district" value={formData.district} onChange={handleChange} className="input-field mt-1">
                  <option value="">Select District</option>
                  {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Soil Type <span className="text-red-500">*</span></label>
                <select name="soil" value={formData.soil} onChange={handleChange} className="input-field mt-1">
                  <option value="">Select Soil</option>
                  {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Season <span className="text-red-500">*</span></label>
                <select name="season" value={formData.season} onChange={handleChange} className="input-field mt-1">
                  <option value="">Select Season</option>
                  {seasonTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Land Area (Acres) <span className="text-red-500">*</span></label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="input-field mt-1" placeholder="e.g., 5" />
              </div>
              <div>
                <label className="label-text">Water Availability</label>
                <select name="water" value={formData.water} onChange={handleChange} className="input-field mt-1">
                  <option value="">Select Level</option>
                  {waterAvailabilities.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Sun className="w-4 h-4" /> Live Weather Data (Auto-Fetched)
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm flex flex-col">
                  <span className="text-gray-500 text-xs">Temp</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{weather.temperature}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm flex flex-col">
                  <span className="text-gray-500 text-xs">Humidity</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{weather.humidity}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm flex flex-col">
                  <span className="text-gray-500 text-xs">Rainfall</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{weather.rainfall}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm flex flex-col">
                  <span className="text-gray-500 text-xs">Wind</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{weather.windSpeed}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing} 
              className="btn-primary w-full mt-6 py-3 flex justify-center items-center gap-2 bg-gradient-to-r from-agri-green to-emerald-600 shadow-lg hover:shadow-xl transition-all"
            >
              {isAnalyzing ? <><Activity className="w-5 h-5 animate-spin"/> Generating Insights...</> : <><Brain className="w-5 h-5"/> Run AI Crop Analysis</>}
            </button>
          </div>
        </div>

        {/* Right Side: Output Dashboard */}
        <div className="xl:col-span-2">
          {!report && !isAnalyzing && (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 min-h-[400px] border-dashed border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/20">
              <div className="w-20 h-20 bg-agri-green/10 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-10 h-10 text-agri-green opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Analysis Run Yet</h3>
              <p className="text-gray-500 max-w-md">Fill out the farm parameters on the left and click "Run AI Crop Analysis" to get a comprehensive cultivation guide.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-agri-green/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-agri-green rounded-full border-t-transparent animate-spin"></div>
                <Brain className="absolute inset-0 m-auto w-10 h-10 text-agri-green animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">AI is analyzing billions of data points...</h3>
              <p className="text-gray-500">Evaluating soil, weather patterns, and historical yield data.</p>
            </div>
          )}

          {report && !isAnalyzing && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              {/* Top Banner: Best Crop */}
              <div className="card bg-gradient-to-br from-agri-green-deep to-agri-green text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <Sprout className="w-64 h-64" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <h4 className="text-agri-green-light font-bold tracking-widest uppercase text-sm mb-2">AI Recommended Crop</h4>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{report.bestCrop.name}</h1>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-200" />
                        <span>Confidence: <strong>{report.bestCrop.confidence}</strong></span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-green-200" />
                        <span>Risk Level: <strong>{report.bestCrop.riskLevel}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center bg-white text-agri-green-deep rounded-2xl p-6 shadow-2xl">
                    <p className="text-sm font-bold uppercase tracking-wider mb-1 text-gray-500">Suitability Score</p>
                    <p className="text-5xl font-black">{report.bestCrop.suitabilityScore}%</p>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cultivation Guide */}
                <div className="card border-t-4 border-blue-500">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-500"/> Cultivation Guide</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Soil & Season</span> <span className="font-semibold text-right">{report.cultivation.soil} • {report.cultivation.season}</span></li>
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Temperature</span> <span className="font-semibold text-right">{report.cultivation.temperature}</span></li>
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Humidity & Rain</span> <span className="font-semibold text-right">{report.cultivation.humidity} • {report.cultivation.rainfall}</span></li>
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Sunlight</span> <span className="font-semibold text-right">{report.cultivation.sunlight}</span></li>
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Sowing Method</span> <span className="font-semibold text-right">{report.cultivation.sowingMethod}</span></li>
                    <li className="flex justify-between"><span className="text-gray-500">Harvesting Method</span> <span className="font-semibold text-right">{report.cultivation.harvestingMethod}</span></li>
                  </ul>
                </div>

                {/* Growth Info */}
                <div className="card border-t-4 border-purple-500">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500"/> Growth Information</h3>
                  <div className="flex items-center gap-4 mb-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-center flex-1 border-r border-purple-200 dark:border-purple-800">
                      <p className="text-xs text-purple-600 font-bold uppercase">Duration</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">{report.growth.duration} <span className="text-sm">Days</span></p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-purple-600 font-bold uppercase">Harvest</p>
                      <p className="text-lg font-bold text-purple-900 dark:text-purple-300">{report.growth.harvestTime}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm mt-4">
                    <li className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="text-gray-500">Germination Period</span>
                      <span className="font-semibold">{report.growth.germination}</span>
                    </li>
                    <li className="flex flex-col gap-1 pt-1">
                      <span className="text-gray-500">Growth Stages</span>
                      <span className="font-semibold">{report.growth.stages}</span>
                    </li>
                  </ul>
                </div>

                {/* Fertilizer & Irrigation */}
                <div className="card border-t-4 border-orange-500">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Droplets className="w-5 h-5 text-orange-500"/> Nutrients & Irrigation</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">Fertilizer (Organic & Chem)</span>
                      <p className="font-semibold mt-1">{report.fertilizer.organic}</p>
                      <p className="font-semibold">{report.fertilizer.chemical}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 italic">{report.fertilizer.schedule}</p>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                      <span className="text-xs font-bold text-gray-500 uppercase">Irrigation Needs</span>
                      <p className="font-semibold mt-1">{report.irrigation.weekly}</p>
                      <p className="text-gray-600 dark:text-gray-400">{report.irrigation.schedule}</p>
                      <p className="mt-2 inline-block px-2 py-1 rounded text-xs font-bold bg-orange-100 text-orange-800">Drought Risk: {report.irrigation.droughtWarning}</p>
                    </div>
                  </div>
                </div>

                {/* Yield & Market */}
                <div className="card border-t-4 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><IndianRupee className="w-5 h-5 text-emerald-600"/> Yield & Revenue Prediction</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900">
                      <p className="text-xs text-gray-500 uppercase mb-1">Expected Yield</p>
                      <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{report.yieldData.total.toLocaleString()} <span className="text-sm text-gray-600">Kg</span></p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900">
                      <p className="text-xs text-gray-500 uppercase mb-1">Est. Revenue</p>
                      <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">₹{report.market.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-emerald-200 dark:border-emerald-800 pt-3">
                    <span className="text-gray-600 dark:text-gray-400">Profitability Rating</span>
                    <span className="font-bold px-3 py-1 bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 rounded-full text-xs">
                      {report.market.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top 3 Recommendations Summary Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                  <Lightbulb className="w-6 h-6 text-yellow-500"/> AI Recommendation Summary
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {report.recommendations.map((rec, i) => (
                    <div key={i} className={`card border ${rec.border} ${rec.bg} relative overflow-hidden transition-transform hover:-translate-y-1`}>
                      <h4 className={`text-sm font-bold ${rec.color} uppercase tracking-wider mb-3`}>{rec.badge}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Crop</p>
                          <p className="font-bold text-lg dark:text-white">{rec.name}</p>
                        </div>
                        <div className="flex justify-between items-baseline border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Suitability Score</p>
                          <p className="font-bold text-lg text-agri-green">{rec.suitabilityScore}%</p>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Expected Yield</p>
                          <p className="font-semibold text-sm dark:text-gray-200">{rec.yieldPerAcre} Kg/Acre</p>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Est. Revenue</p>
                          <p className="font-semibold text-sm dark:text-gray-200">₹{rec.revenue.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-baseline border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Est. Profit</p>
                          <p className="font-bold text-sm text-agri-green">₹{rec.profit.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Confidence</p>
                          <p className="font-semibold text-sm dark:text-gray-200">{rec.confidence}</p>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Risk</p>
                          <p className={`font-semibold text-sm px-2 rounded ${rec.risk === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'}`}>
                            {rec.risk}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card bg-gray-900 text-white shadow-xl mt-6 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10"><Brain className="w-32 h-32 transform translate-x-1/4 translate-y-1/4" /></div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-agri-green-light">
                    <Activity className="w-5 h-5"/> Final AI Verdict
                  </h4>
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    Based on the selected district ({formData.district || 'your district'}), season ({formData.season}), soil type ({formData.soil}), water availability, temperature, humidity and rainfall conditions, <strong>{report.recommendations[0].name}</strong> is the most suitable crop. <strong>{report.recommendations[1].name}</strong> and <strong>{report.recommendations[2].name}</strong> are recommended as excellent alternative cultivation options.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>

    {/* Saved Reports History */}
    {savedReports.length > 0 && (
      <div className="card p-0 overflow-hidden mt-4">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-agri-green"/>
          <h3 className="font-bold text-lg">Saved Analysis Reports</h3>
          <span className="ml-auto bg-agri-green/10 text-agri-green text-xs font-bold px-2 py-1 rounded-full">{savedReports.length} saved</span>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {savedReports.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {r.district} • {r.season} • <span className="text-agri-green">{r.bestCrop?.name}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{new Date(r.savedAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">{r.bestCrop?.suitabilityScore}%</span>
                <button onClick={() => setViewingReport(r)} className="btn-outline py-1 px-3 text-xs flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5"/> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* View Details Modal */}
    {viewingReport && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingReport(null)}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-5 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h3 className="text-xl font-bold">AI Crop Analysis — {viewingReport.district}</h3>
              <p className="text-xs text-gray-500">{new Date(viewingReport.savedAt).toLocaleString()} • {viewingReport.season} Season • {viewingReport.soil}</p>
            </div>
            <button onClick={() => setViewingReport(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5"/></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-gradient-to-br from-agri-green-deep to-agri-green text-white rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-green-200 mb-1">Best Recommended Crop</p>
              <h2 className="text-4xl font-extrabold">{viewingReport.bestCrop?.name}</h2>
              <div className="flex gap-4 mt-2 text-sm">
                <span>Confidence: <strong>{viewingReport.bestCrop?.confidence}</strong></span>
                <span>Risk: <strong>{viewingReport.bestCrop?.riskLevel}</strong></span>
                <span>Score: <strong>{viewingReport.bestCrop?.suitabilityScore}%</strong></span>
              </div>
            </div>
            <div>
              <p className="font-bold mb-3">Top 3 Recommendations</p>
              <div className="space-y-2">
                {viewingReport.recommendations?.map((rec, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${rec.border} ${rec.bg}`}>
                    <div>
                      <p className={`text-xs font-bold ${rec.color}`}>{rec.badge}</p>
                      <p className="font-bold text-gray-800 dark:text-white">{rec.name}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-bold text-agri-green">{rec.suitabilityScore}%</p>
                      <p className="text-gray-500">₹{rec.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[['Soil', viewingReport.cultivation?.soil], ['Season', viewingReport.cultivation?.season], ['Yield/Acre', `${viewingReport.yieldData?.perAcre} Kg`], ['Revenue', `₹${viewingReport.market?.revenue?.toLocaleString()}`], ['Drought Risk', viewingReport.irrigation?.droughtWarning], ['Profitability', viewingReport.market?.rating]].map(([k, v]) => (
                <div key={k} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-0.5">{k}</p>
                  <p className="font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default AiCropAdvisorTab;
