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

  return {
    date: new Date().toISOString(),
    bestCrop: {
      name: bestCropName,
      suitabilityScore: 95,
      confidence: "High",
      riskLevel: "Low"
    },
    alternativeCrops: (apiData?.topCrops || [])
      .filter((c) => c.crop !== bestCropName)
      .slice(0, 5)
      .map((c, index) => ({
        name: c.crop,
        score: Math.max(90 - index * 3, 70),
        area: c.area,
        production: c.production,
        year: c.year,
      })),
    yieldPrediction: {
      perAcre: yieldPerAcre,
      total: area * yieldPerAcre,
      datasetArea,
      datasetProduction
    }
  };
};

const FarmDetailsTab = ({ farms, setFarms, activeFarm, setActiveFarm }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [viewingFarm, setViewingFarm] = useState(null);
  
  const [formData, setFormData] = useState(activeFarm || {
    name: '', district: 'Coimbatore', area: '', soil: 'Red Soil', season: 'Rabi', water: 'Medium', irrigation: 'Drip Irrigation'
  });

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
    setShowOutput(false);
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
    setShowOutput(true);
    setFormData(farmWithReport);
  };

  const handleEditClick = (e, farm) => {
    e.stopPropagation();
    handleSelectFarm(farm);
    setIsEditing(true);
    setShowOutput(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updated = farms.filter(f => f.id !== id);
    setFarms(updated);
    if (activeFarm?.id === id) {
      setActiveFarm(updated[0] || null);
      setIsEditing(false);
      setShowOutput(true);
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
    setShowOutput(true);
    
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

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowOutput(true);
    }, 1500);
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
              <p className="text-lg">Please select a farm or click "Add New Farm" to view or edit farm details.</p>
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

