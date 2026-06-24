import React, { useState } from 'react';
import { Map, Sprout, Leaf, MapPin, Target, Calendar, CheckCircle, Clock, X } from 'lucide-react';

const FarmCropManagementTab = () => {
  const [activeTab, setActiveTab] = useState('Farm Records');

  const farms = [
    { id: 1, name: 'North Acre', owner: 'John Doe', area: '10 Acres', location: 'Coimbatore', status: 'Active' },
    { id: 2, name: 'East Valley', owner: 'Alice Smith', area: '5 Acres', location: 'Pollachi', status: 'Active' },
  ];

  const crops = [
    { id: 1, farm: 'North Acre', crop: 'Tomato', planted: '2025-05-10', stage: 'Flowering', harvestEst: '2025-08-10' },
    { id: 2, farm: 'East Valley', crop: 'Cotton', planted: '2025-06-01', stage: 'Seedling', harvestEst: '2025-11-01' },
  ];

  const fields = [
    { id: 'F1-A', farm: 'North Acre', area: '4 Acres', soil: 'Red Soil', status: 'Planted' },
    { id: 'F1-B', farm: 'North Acre', area: '6 Acres', soil: 'Red Soil', status: 'Fallow' },
    { id: 'F2-A', farm: 'East Valley', area: '5 Acres', soil: 'Black Soil', status: 'Planted' },
  ];

  const lifecycles = [
    { id: 1, crop: 'Tomato', farm: 'North Acre', currentStage: 'Flowering', progress: 60, health: 'Good' },
    { id: 2, crop: 'Cotton', farm: 'East Valley', currentStage: 'Seedling', progress: 15, health: 'Excellent' },
  ];

  const initialHarvests = [
    { id: 1, crop: 'Tomato', farm: 'North Acre', estDate: '2025-08-10', estYield: '12 Tons', status: 'Approaching' },
    { id: 2, crop: 'Cotton', farm: 'East Valley', estDate: '2025-11-01', estYield: '8 Tons', status: 'Growing' },
  ];

  const [harvestsData, setHarvestsData] = useState(initialHarvests);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedHarvest, setSelectedHarvest] = useState(null);
  const [logData, setLogData] = useState({ actualYield: '', harvestDate: '', quality: 'A Grade' });

  const handleOpenLogModal = (harvest) => {
    setSelectedHarvest(harvest);
    setLogData({ actualYield: '', harvestDate: new Date().toISOString().split('T')[0], quality: 'A Grade' });
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logData.actualYield) return;
    
    setHarvestsData(harvestsData.map(h => {
      if (h.id === selectedHarvest.id) {
        return { ...h, status: 'Completed', actualYield: logData.actualYield + ' Tons' };
      }
      return h;
    }));
    setIsLogModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Farm & Crop Management</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {['Farm Records', 'Field Management', 'Crop Records', 'Lifecycle Tracking', 'Harvest Monitoring'].map(tab => (
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

      {activeTab === 'Farm Records' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map(farm => (
            <div key={farm.id} className="card border-t-4 border-agri-green hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold">{farm.name}</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">{farm.status}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4"/> {farm.location}</p>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2"><Map className="w-4 h-4"/> {farm.area}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="text-sm font-medium">Owner: {farm.owner}</span>
                <button className="text-agri-green text-sm font-medium hover:underline">View Fields</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Crop Records' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Farm Name</th>
                <th className="p-4 font-medium">Crop</th>
                <th className="p-4 font-medium">Planted On</th>
                <th className="p-4 font-medium">Growth Stage</th>
                <th className="p-4 font-medium">Est. Harvest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {crops.map(crop => (
                <tr key={crop.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium">{crop.farm}</td>
                  <td className="p-4 flex items-center gap-2"><Sprout className="w-4 h-4 text-agri-green"/> {crop.crop}</td>
                  <td className="p-4 text-gray-500"><Calendar className="w-4 h-4 inline mr-1"/> {crop.planted}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{crop.stage}</span>
                  </td>
                  <td className="p-4 text-gray-500"><Target className="w-4 h-4 inline mr-1"/> {crop.harvestEst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Field Management' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Field ID</th>
                <th className="p-4 font-medium">Farm Name</th>
                <th className="p-4 font-medium">Area</th>
                <th className="p-4 font-medium">Soil Type</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {fields.map(field => (
                <tr key={field.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4 font-medium">{field.id}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{field.farm}</td>
                  <td className="p-4 text-gray-500">{field.area}</td>
                  <td className="p-4 text-gray-500">{field.soil}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${field.status === 'Planted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {field.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Lifecycle Tracking' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold">Crop Lifecycles</h3>
          {lifecycles.map(cycle => (
            <div key={cycle.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/20">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold flex items-center gap-2"><Sprout className="w-4 h-4 text-agri-green"/> {cycle.crop}</h4>
                  <p className="text-xs text-gray-500">{cycle.farm}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">{cycle.health} Health</span>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                  <span>Seedling</span>
                  <span>Vegetative</span>
                  <span>Flowering</span>
                  <span>Harvest</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-agri-green h-2 rounded-full" style={{ width: `${cycle.progress}%` }}></div>
                </div>
                <p className="text-xs text-center mt-2 font-medium text-gray-600 dark:text-gray-300">Currently in: <span className="text-agri-green">{cycle.currentStage}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Harvest Monitoring' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Crop & Farm</th>
                <th className="p-4 font-medium">Est. Harvest Date</th>
                <th className="p-4 font-medium">Est. Yield</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {harvestsData.map(harvest => (
                <tr key={harvest.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-4">
                    <p className="font-bold">{harvest.crop}</p>
                    <p className="text-xs text-gray-500">{harvest.farm}</p>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{harvest.estDate}</td>
                  <td className="p-4">
                    <span className="font-bold text-gray-500">{harvest.estYield}</span>
                    {harvest.actualYield && <span className="ml-2 font-bold text-agri-green">({harvest.actualYield})</span>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      harvest.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      harvest.status === 'Approaching' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {harvest.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {harvest.status === 'Completed' ? (
                      <span className="text-green-600 font-bold text-xs flex items-center justify-end gap-1"><CheckCircle className="w-3 h-3"/> Done</span>
                    ) : (
                      <button onClick={() => handleOpenLogModal(harvest)} className="btn-outline py-1 px-3 text-xs">Log Harvest</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Log Harvest Modal */}
      {isLogModalOpen && selectedHarvest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-agri-green/5">
              <h3 className="text-xl font-bold text-agri-green-deep dark:text-agri-green-light">
                Log Harvest: {selectedHarvest.crop}
              </h3>
              <button onClick={() => setIsLogModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-blue-800 dark:text-blue-300 mb-4">
                <p><strong>Farm:</strong> {selectedHarvest.farm}</p>
                <p><strong>Estimated Yield:</strong> {selectedHarvest.estYield}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Actual Yield (Tons)</label>
                <input 
                  type="number" 
                  required 
                  step="0.1"
                  value={logData.actualYield} 
                  onChange={(e) => setLogData({...logData, actualYield: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green" 
                  placeholder="e.g. 11.5" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Harvest Date</label>
                  <input 
                    type="date" 
                    required 
                    value={logData.harvestDate} 
                    onChange={(e) => setLogData({...logData, harvestDate: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Crop Quality</label>
                  <select 
                    value={logData.quality} 
                    onChange={(e) => setLogData({...logData, quality: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green"
                  >
                    <option value="A Grade">A Grade (Premium)</option>
                    <option value="B Grade">B Grade (Standard)</option>
                    <option value="C Grade">C Grade (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsLogModalOpen(false)} className="btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1 bg-agri-green hover:bg-agri-green-dark">Complete Harvest</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmCropManagementTab;
