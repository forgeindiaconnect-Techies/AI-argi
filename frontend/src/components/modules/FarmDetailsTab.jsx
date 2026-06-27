import React, { useState, useEffect } from 'react';
import { MapPin, Edit3, Trash2, Sprout, TrendingUp, Droplets, Sun, Wind, ShieldAlert, Bug, Lightbulb, FileText, Activity, AlertTriangle, Calendar, IndianRupee, Eye, X } from 'lucide-react';

const tnDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

const soilTypes = ["Red Soil", "Black Soil", "Alluvial Soil", "Sandy Soil", "Laterite Soil", "Mountain Soil"];
const seasonTypes = ["Rabi", "Kharif", "Whole Year"];
const waterAvailabilities = ["Low", "Medium", "High"];
const irrigationMethods = ["Drip Irrigation", "Sprinkler", "Surface", "Rainfed"];

const API_BASE_URL = "https://ai-argi.onrender.com";

const generateAIReport = async (farmData) => {
  let apiData = null;
  try {
    const res = await fetch(`${API_BASE_URL}/api/crops/recommend?district=${encodeURIComponent(farmData.district)}&season=${encodeURIComponent(farmData.season)}`);
    if (res.ok) {
      apiData = await res.json();
    }
  } catch (err) {
    console.warn("Could not fetch crop API, using fallback");
  }

  const area = parseFloat(farmData.area) || 1;
  const bestCropName = apiData?.recommendedCrop || (farmData.season === "Rabi" ? "Wheat" : (farmData.season === "Kharif" ? "Paddy" : "Sugarcane"));
  const datasetArea = Number(apiData?.area) || 1;
  const datasetProduction = Number(apiData?.production) || 0;
  const yieldPerAcre = datasetArea > 0 && datasetProduction > 0 ? Math.round(datasetProduction / datasetArea) : 1000;
  const pricePerKg = 80;

  return {
    date: new Date().toISOString(),
    bestCrop: {
      name: bestCropName,
      suitabilityScore: 95,
      confidence: "High",
      riskLevel: "Low"
    },
    alternativeCrops: [
      { name: "Cotton", score: 90 },
      { name: "Maize", score: 88 },
      { name: "Millets", score: 85 },
      { name: "Sunflower", score: 83 },
      { name: "Sesame", score: 80 }
    ],
    timeline: {
      sowingDate: "15 June 2026",
      germinationPeriod: "7 Days",
      vegetativeGrowth: "40 Days",
      floweringStage: "30 Days",
      harvestDate: "10 October 2026",
      totalDuration: 117
    },
    weather: {
      temperature: "25°C - 35°C",
      humidity: "50% - 70%",
      rainfall: "500 - 800 mm",
      wind: "Moderate (10-15 km/h)"
    },
    water: {
      daily: "5 Liters/Plant",
      weekly: "35 Liters/Plant",
      schedule: "Every 3 days",
      droughtRisk: farmData.water === "Low" ? "High" : "Low"
    },
    fertilizer: {
      organic: ["Compost", "Vermicompost", "Farmyard Manure"],
      chemical: ["Urea", "DAP", "Potash"],
      schedule: "Basal dressing before sowing, top dressing at 30 & 45 days",
      quantity: "NPK 10:20:20 kg/acre"
    },
    yieldPrediction: {
      perAcre: yieldPerAcre,
      total: area * yieldPerAcre,
      quality: "Premium Grade A"
    },
    market: {
      pricePerKg: pricePerKg,
      revenue: area * yieldPerAcre * pricePerKg,
      profitability: "High"
    },
    diseaseRisk: [
      { name: "Leaf Spot Disease", risk: 10, prevention: "Use resistant varieties, apply proper fungicide" },
      { name: "Rust Disease", risk: 5, prevention: "Maintain plant spacing, avoid overhead watering" }
    ],
    pestMonitoring: [
      { name: "Aphids", prevention: "Neem oil spray", recommended: "Imidacloprid" },
      { name: "White Grub", prevention: "Deep summer ploughing", recommended: "Chlorpyrifos" }
    ],
    smartTips: {
      bestSowingMonth: "June",
      bestHarvestingMonth: "October",
      waterSaving: "Use drip irrigation, apply mulching",
      soilImprovement: "Crop rotation with legumes, green manuring",
      seasonalAdvice: "Ensure good drainage during heavy monsoon"
    }
  };
};

const FarmDetailsTab = ({ farms, setFarms, activeFarm, setActiveFarm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewingFarm, setViewingFarm] = useState(null);
  
  const [formData, setFormData] = useState(activeFarm || {
    name: '', district: 'Coimbatore', area: '', soil: 'Red Soil', season: 'Rabi', water: 'Medium', irrigation: 'Drip Irrigation'
  });
  const [liveReport, setLiveReport] = useState(null);

  useEffect(() => {
    let active = true;
    generateAIReport(formData).then(report => {
      if (active) setLiveReport(report);
    });
    return () => { active = false; };
  }, [formData.district, formData.season, formData.area, formData.water, formData.soil]);

  useEffect(() => {
    if (activeFarm && !isEditing) {
      if (!activeFarm.aiReport) {
        generateAIReport(activeFarm).then(report => {
          const farmWithReport = { ...activeFarm, aiReport: report };
          setActiveFarm(farmWithReport);
          setFormData(farmWithReport);
        });
      } else {
        setFormData(activeFarm);
      }
    }
  }, [activeFarm, isEditing]);

  const handleAddNew = () => {
    setActiveFarm(null);
    setIsEditing(true);
    setFormData({ name: '', district: 'Coimbatore', area: '', soil: 'Red Soil', season: 'Rabi', water: 'Medium', irrigation: 'Drip Irrigation' });
  };

  const handleSelectFarm = async (farm) => {
    let farmWithReport = farm;
    if (!farm.aiReport) {
      const report = await generateAIReport(farm);
      farmWithReport = { ...farm, aiReport: report };
    }
    setActiveFarm(farmWithReport);
    setIsEditing(false);
    setFormData(farmWithReport);
  };

  const handleEditClick = (e, farm) => {
    e.stopPropagation();
    handleSelectFarm(farm);
    setIsEditing(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updated = farms.filter(f => f.id !== id);
    setFarms(updated);
    if (activeFarm?.id === id) {
      setActiveFarm(updated[0] || null);
      setIsEditing(false);
      setFormData(updated[0] || { name: '', district: 'Coimbatore', area: '', soil: 'Red Soil', season: 'Rabi', water: 'Medium', irrigation: 'Drip Irrigation' });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (activeFarm) {
      setFormData(activeFarm);
    } else if (farms.length > 0) {
      setActiveFarm(farms[0]);
      setFormData(farms[0]);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.district || !formData.area) return alert('Farm Name, District, and Area are required');

    const aiReport = await generateAIReport(formData);
    let updatedFarm;
    const isNew = !activeFarm;
    
    if (activeFarm) {
      updatedFarm = { ...formData, id: activeFarm.id, aiReport };
      const updated = farms.map(f => f.id === activeFarm.id ? updatedFarm : f);
      setFarms(updated);
    } else {
      updatedFarm = { ...formData, id: Date.now(), aiReport };
      setFarms(prev => [...prev, updatedFarm]);
    }
    setActiveFarm(updatedFarm);
    setIsEditing(false);
    
    // Push notification to Admin Dashboard
    const adminNotifs = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
    adminNotifs.unshift({
      id: Date.now(),
      type: 'Farm Activity',
      title: isNew ? `New Farm Registered: ${formData.name}` : `Farm Details Updated: ${formData.name}`,
      message: `A user has ${isNew ? 'registered a new' : 'updated a'} farm in ${formData.district} spanning ${formData.area} acres.`,
      time: new Date().toISOString(),
      isRead: false
    });
    localStorage.setItem('sams_admin_notifications', JSON.stringify(adminNotifs));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Left Sidebar - Farm List */}
      <div className="xl:col-span-1 space-y-4">
        <h3 className="text-xl font-bold mb-4">Your Farms</h3>
        
        {farms.map(farm => (
          <div 
            key={farm.id} 
            onClick={() => handleSelectFarm(farm)}
            className={`card border-l-4 relative group cursor-pointer transition-all hover:-translate-y-1 ${activeFarm?.id === farm.id && !isEditing ? 'border-agri-green bg-agri-green/5 dark:bg-agri-green/10 shadow-md' : 'border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <h4 className="font-bold text-lg">{farm.name}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {farm.district}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">{farm.soil}</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{farm.area} Ac</span>
              {farm.aiReport?.bestCrop?.name && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                  <Sprout className="w-3 h-3" /> {farm.aiReport.bestCrop.name}
                </span>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <button onClick={(e) => { e.stopPropagation(); setViewingFarm(farm); }} className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline">
                <Eye className="w-3.5 h-3.5"/> View Details
              </button>
              <div className="flex gap-3">
                <button onClick={(e) => handleEditClick(e, farm)} className="text-gray-400 hover:text-agri-green"><Edit3 className="w-4 h-4" /></button>
                <button onClick={(e) => handleDelete(e, farm.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAddNew} className="btn-outline w-full py-3 border-dashed border-2 hover:bg-agri-green/5 hover:border-agri-green hover:text-agri-green transition-all">
          + Add New Farm
        </button>
      </div>

      {/* Main Content Area */}
      <div className="xl:col-span-3 space-y-6">
        
        {/* Registration/Edit Form */}
        <div className="card shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="text-agri-green" />
              {isEditing ? (activeFarm ? `Edit Farm (${activeFarm.name})` : 'Farm Registration & Analysis') : `Farm Details: ${activeFarm?.name || 'None'}`}
            </h3>
            {!isEditing && activeFarm && (
              <button onClick={(e) => handleEditClick(e, activeFarm)} className="btn-outline py-1 px-3 text-sm flex items-center gap-2">
                <Edit3 className="w-4 h-4"/> Edit Details
              </button>
            )}
          </div>
          
          {(!activeFarm && !isEditing) ? (
            <div className="text-center p-12 text-gray-500 flex flex-col items-center">
              <Sprout className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-lg">Please select a farm or click "Add New Farm" to get started with AI Crop Planning.</p>
            </div>
          ) : (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Farm Name <span className="text-red-500">*</span></label>
                  <input type="text" className="input-field mt-1" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={!isEditing} placeholder="e.g. Green Valley Farm" />
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">District <span className="text-red-500">*</span></label>
                  <select className="input-field mt-1" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} disabled={!isEditing}>
                    <option value="">Select District</option>
                    {tnDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Land Area (Acres) <span className="text-red-500">*</span></label>
                  <input type="number" className="input-field mt-1" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} disabled={!isEditing} placeholder="e.g. 5" />
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Soil Type</label>
                  <select className="input-field mt-1" value={formData.soil} onChange={(e) => setFormData({...formData, soil: e.target.value})} disabled={!isEditing}>
                    {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Season Type</label>
                  <select className="input-field mt-1" value={formData.season} onChange={(e) => setFormData({...formData, season: e.target.value})} disabled={!isEditing}>
                    {seasonTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Water Availability</label>
                  <select className="input-field mt-1" value={formData.water} onChange={(e) => setFormData({...formData, water: e.target.value})} disabled={!isEditing}>
                    {waterAvailabilities.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-text font-medium text-gray-700 dark:text-gray-300">Irrigation Method</label>
                  <select className="input-field mt-1" value={formData.irrigation} onChange={(e) => setFormData({...formData, irrigation: e.target.value})} disabled={!isEditing}>
                    {irrigationMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button type="button" onClick={handleCancel} className="btn-outline px-6">Cancel</button>
                  <button type="button" onClick={handleSave} className="btn-primary px-8 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                    Save
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* AI Analysis Report Section */}
        {(() => {
          const reportToShow = (isEditing ? liveReport : activeFarm?.aiReport) || liveReport || activeFarm?.aiReport;
          if (!reportToShow) return null;
          const activeFarmData = { ...(activeFarm || {}), ...formData, aiReport: reportToShow };
          return ((activeFarm) => (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-agri-green/10 rounded-lg">
                <FileText className="w-6 h-6 text-agri-green" />
              </div>
              <h2 className="text-2xl font-bold">AI Crop Planning & Advisory Report</h2>
            </div>

            {/* 1. Best Recommended Crop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-10"><Sprout className="w-40 h-40" /></div>
                <h3 className="text-sm font-semibold text-green-800 dark:text-green-400 uppercase tracking-wider mb-2">Best Recommended Crop</h3>
                <div className="flex items-end gap-4">
                  <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">{activeFarm.aiReport.bestCrop.name}</h1>
                  <div className="pb-1">
                    <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">Score: {activeFarm.aiReport.bestCrop.suitabilityScore}%</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-600"/> <span className="text-sm text-gray-600 dark:text-gray-300">Confidence: <strong className="text-gray-900 dark:text-white">{activeFarm.aiReport.bestCrop.confidence}</strong></span></div>
                  <div className="flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-green-600"/> <span className="text-sm text-gray-600 dark:text-gray-300">Risk Level: <strong className="text-gray-900 dark:text-white">{activeFarm.aiReport.bestCrop.riskLevel}</strong></span></div>
                </div>
              </div>

              {/* 12. AI Summary Card Snippet */}
              <div className="card bg-gray-900 text-white shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-400"/> AI Quick Summary</h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    <p className="text-gray-300">Location: <span className="text-white font-medium">{activeFarm.district}</span></p>
                    <p className="text-gray-300">Soil: <span className="text-white font-medium">{activeFarm.soil}</span></p>
                    <p className="text-gray-300">Season: <span className="text-white font-medium">{activeFarm.season}</span></p>
                    <p className="text-gray-300">Water: <span className="text-white font-medium">{activeFarm.water}</span></p>
                    <p className="text-gray-300">Yield: <span className="text-green-400 font-bold">{activeFarm.aiReport.yieldPrediction.perAcre} Kg/Acre</span></p>
                    <p className="text-gray-300">Profit: <span className="text-green-400 font-bold">{activeFarm.aiReport.market.profitability}</span></p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm">Final Verdict: <strong className="text-agri-green-light">Highly suitable for cultivation.</strong></p>
                </div>
              </div>
            </div>

            {/* 2. Alternative Crop Suggestions */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500"/> Alternative Crop Suggestions</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {activeFarm.aiReport.alternativeCrops.map((crop, idx) => (
                  <div key={idx} className="card p-4 text-center hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">{crop.name}</h4>
                    <div className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center mx-auto mt-3 mb-2">
                      <span className="font-bold text-blue-600">{crop.score}%</span>
                    </div>
                    <span className="text-xs text-gray-500">Suitability</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3. Cultivation Timeline */}
              <div className="card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500"/> Cultivation Timeline</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  {[
                    { label: "Sowing", val: activeFarm.aiReport.timeline.sowingDate },
                    { label: "Germination", val: activeFarm.aiReport.timeline.germinationPeriod },
                    { label: "Growth", val: activeFarm.aiReport.timeline.vegetativeGrowth },
                    { label: "Flowering", val: activeFarm.aiReport.timeline.floweringStage },
                    { label: "Harvest", val: activeFarm.aiReport.timeline.harvestDate }
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 border border-purple-500 z-10 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase font-semibold">{step.label}</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{step.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                  <span className="inline-block bg-purple-100 text-purple-800 font-bold px-4 py-2 rounded-full text-sm">
                    Total Duration: {activeFarm.aiReport.timeline.totalDuration} Days
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* 4. Weather Requirements */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Sun className="w-5 h-5 text-orange-500"/> Weather Requirements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                      <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase mb-1">Temperature</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{activeFarm.aiReport.weather.temperature}</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Humidity</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{activeFarm.aiReport.weather.humidity}</p>
                    </div>
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg">
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase mb-1">Rainfall</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{activeFarm.aiReport.weather.rainfall}</p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><Wind className="w-3 h-3"/> Wind</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{activeFarm.aiReport.weather.wind}</p>
                    </div>
                  </div>
                </div>

                {/* 5. Water Requirement */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500"/> Water Requirement</h3>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-center">
                      <p className="text-xs text-blue-600 font-bold uppercase">Daily</p>
                      <p className="font-bold text-lg text-blue-900 dark:text-blue-200">{activeFarm.aiReport.water.daily}</p>
                    </div>
                    <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-center">
                      <p className="text-xs text-blue-600 font-bold uppercase">Weekly</p>
                      <p className="font-bold text-lg text-blue-900 dark:text-blue-200">{activeFarm.aiReport.water.weekly}</p>
                    </div>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="text-gray-500">Irrigation Schedule:</span>
                      <span className="font-medium">{activeFarm.aiReport.water.schedule}</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <span className="text-gray-500">Drought Risk Indicator:</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-xs ${activeFarm.aiReport.water.droughtRisk === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{activeFarm.aiReport.water.droughtRisk}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 6. Fertilizer Recommendation */}
              <div className="card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Sprout className="w-5 h-5 text-green-600"/> Fertilizer Recommendation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">Organic Fertilizers</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeFarm.aiReport.fertilizer.organic.map(f => <span key={f} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full">{f}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Chemical Fertilizers</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeFarm.aiReport.fertilizer.chemical.map(f => <span key={f} className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 text-sm rounded-full">{f}</span>)}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mt-4 border border-blue-100 dark:border-blue-900">
                    <p className="text-sm mb-2"><strong className="text-gray-900 dark:text-gray-100">Schedule:</strong> {activeFarm.aiReport.fertilizer.schedule}</p>
                    <p className="text-sm"><strong className="text-gray-900 dark:text-gray-100">Quantity:</strong> {activeFarm.aiReport.fertilizer.quantity}</p>
                  </div>
                </div>
              </div>

              {/* 9. Disease & 10. Pest Analysis */}
              <div className="space-y-6">
                <div className="card border-l-4 border-l-red-500">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Bug className="w-5 h-5 text-red-500"/> Pest & Disease Risk</h3>
                  
                  <div className="space-y-4">
                    {activeFarm.aiReport.diseaseRisk.map((d, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            {d.name} 
                            <span className={`text-xs px-2 py-0.5 rounded-full ${d.risk > 8 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>Risk: {d.risk}%</span>
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">{d.prevention}</p>
                        </div>
                      </div>
                    ))}
                    {activeFarm.aiReport.pestMonitoring.map((p, i) => (
                      <div key={`p-${i}`} className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">{p.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Prevent: {p.prevention}</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">Recommended: {p.recommended}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Yield Prediction & 8. Market & Revenue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Yield Prediction</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">Expected Yield / Acre</p>
                    <p className="text-3xl font-bold">{activeFarm.aiReport.yieldPrediction.perAcre} Kg</p>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">Total Expected Yield</p>
                    <p className="text-3xl font-bold">{activeFarm.aiReport.yieldPrediction.total.toLocaleString()} Kg</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-emerald-400/30">
                  <p className="text-sm flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Quality Indicator: <strong>{activeFarm.aiReport.yieldPrediction.quality}</strong></p>
                </div>
              </div>

              <div className="card bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><IndianRupee className="w-5 h-5"/> Market & Revenue</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Expected Revenue</p>
                    <p className="text-3xl font-bold">₹{activeFarm.aiReport.market.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Current Market Price</p>
                    <p className="text-3xl font-bold">₹{activeFarm.aiReport.market.pricePerKg} / Kg</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-400/30">
                  <p className="text-sm flex items-center gap-2"><Activity className="w-4 h-4"/> Profitability Rating: <strong>{activeFarm.aiReport.market.profitability}</strong></p>
                </div>
              </div>
            </div>

            {/* 11. Smart Farming Tips */}
            <div className="card bg-amber-50 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-500"><Lightbulb className="w-5 h-5"/> Smart Farming Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900 dark:text-amber-200">
                <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/> <p><strong>Best Sowing Month:</strong> {activeFarm.aiReport.smartTips.bestSowingMonth}</p></div>
                <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/> <p><strong>Best Harvest Month:</strong> {activeFarm.aiReport.smartTips.bestHarvestingMonth}</p></div>
                <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/> <p><strong>Water Saving:</strong> {activeFarm.aiReport.smartTips.waterSaving}</p></div>
                <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/> <p><strong>Soil Improvement:</strong> {activeFarm.aiReport.smartTips.soilImprovement}</p></div>
                <div className="flex gap-2 md:col-span-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/> <p><strong>Seasonal Advice:</strong> {activeFarm.aiReport.smartTips.seasonalAdvice}</p></div>
              </div>
            </div>

            </div>
          ))(activeFarmData);
        })()}

      </div>

      {/* View Details Modal */}
      {viewingFarm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingFarm(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2"><Sprout className="w-5 h-5 text-agri-green"/> Farm Details</h3>
              </div>
              <button onClick={() => setViewingFarm(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-agri-green/10 border border-agri-green/20 rounded-xl p-5 mb-2">
                <h2 className="text-2xl font-bold text-agri-green-deep dark:text-agri-green-light">{viewingFarm.name}</h2>
                <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-1"><MapPin className="w-4 h-4"/> {viewingFarm.district}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Land Area</p>
                  <p className="font-bold text-lg">{viewingFarm.area} Acres</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Soil Type</p>
                  <p className="font-bold text-lg">{viewingFarm.soil}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Season</p>
                  <p className="font-bold text-lg">{viewingFarm.season}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">Water Avail.</p>
                  <p className="font-bold text-lg">{viewingFarm.water}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg col-span-2">
                  <p className="text-xs text-gray-500 uppercase mb-1">Irrigation Method</p>
                  <p className="font-bold text-lg">{viewingFarm.irrigation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmDetailsTab;

