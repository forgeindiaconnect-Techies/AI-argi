import React, { useState, useEffect } from 'react';
import { Map, Sprout, Leaf, MapPin, Target, Calendar, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';

const FARMS_KEY = 'sams_farms';

// Derive crop stage from season / saved data
const getCropStage = (farm) => {
  if (farm.aiReport?.bestCrop?.name) {
    const stages = ['Seedling', 'Vegetative', 'Flowering', 'Maturation'];
    const idx = Math.floor(Math.random() * stages.length); // deterministic-ish per farm
    return stages[Math.abs(farm.id % stages.length) % stages.length] || 'Vegetative';
  }
  return 'Vegetative';
};

const getProgress = (farm) => {
  const stageMap = { Seedling: 15, Vegetative: 40, Flowering: 65, Maturation: 85, Harvest: 100 };
  return stageMap[getCropStage(farm)] || 40;
};

const getHarvestEst = (farm) => {
  const seasonMap = { Rabi: 'Apr 2027', Kharif: 'Nov 2026', 'Whole Year': 'Mar 2027' };
  return seasonMap[farm.season] || 'Dec 2026';
};

const getEstYield = (farm) => {
  const area = parseFloat(farm.area) || 1;
  const perAcre = farm.aiReport?.yieldPrediction?.perAcre || 1000;
  return `${((area * perAcre) / 1000).toFixed(1)} Tons`;
};

const FarmCropManagementTab = () => {
  const [activeTab, setActiveTab] = useState('Farm Records');
  const [farms, setFarms] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedHarvest, setSelectedHarvest] = useState(null);
  const [logData, setLogData] = useState({ actualYield: '', harvestDate: '', quality: 'A Grade' });
  const [harvestLogs, setHarvestLogs] = useState({});

  const loadFarms = () => {
    try {
      const stored = localStorage.getItem(FARMS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFarms(parsed);
      } else {
        setFarms([]);
      }
    } catch (e) {
      setFarms([]);
    }
  };

  useEffect(() => {
    loadFarms();
    // Poll every 5 seconds so new farms registered by users show up without page refresh
    const interval = setInterval(loadFarms, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenLogModal = (farm) => {
    setSelectedHarvest(farm);
    setLogData({ actualYield: '', harvestDate: new Date().toISOString().split('T')[0], quality: 'A Grade' });
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logData.actualYield) return;
    setHarvestLogs(prev => ({
      ...prev,
      [selectedHarvest.id]: { ...logData, completedAt: new Date().toISOString() }
    }));
    setIsLogModalOpen(false);
  };

  const userInfo = (() => {
    try { return JSON.parse(localStorage.getItem('userInfo') || '{}'); } catch { return {}; }
  })();

  const EmptyState = ({ message }) => (
    <div className="p-16 text-center flex flex-col items-center text-gray-400">
      <AlertCircle className="w-12 h-12 mb-3 text-gray-300" />
      <p className="text-lg font-medium text-gray-500">{message}</p>
      <p className="text-sm mt-1">Data appears here as users register farms in their dashboard.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Farm & Crop Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing <span className="font-semibold text-agri-green">{farms.length}</span> farm(s) registered by users.
          </p>
        </div>
      </div>

      {/* Tabs */}
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

      {/* ───────────────────────── FARM RECORDS ───────────────────────── */}
      {activeTab === 'Farm Records' && (
        farms.length === 0 ? (
          <EmptyState message="No farms registered yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map(farm => (
              <div key={farm.id} className="card border-t-4 border-agri-green hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">{farm.name}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Active</span>
                </div>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" /> {farm.district}, Tamil Nadu
                </p>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Map className="w-4 h-4 flex-shrink-0" /> {farm.area} Acres
                </p>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 flex-shrink-0" /> Soil: {farm.soil}
                </p>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" /> Season: {farm.season}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Water Availability</p>
                    <p className="text-sm font-semibold">{farm.water}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Irrigation</p>
                    <p className="text-sm font-semibold">{farm.irrigation}</p>
                  </div>
                </div>
                {farm.aiReport?.bestCrop?.name && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold flex items-center gap-1 w-max">
                      <Sprout className="w-3 h-3" /> Recommended: {farm.aiReport.bestCrop.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}

      {/* ───────────────────────── FIELD MANAGEMENT ───────────────────────── */}
      {activeTab === 'Field Management' && (
        <div className="card p-0 overflow-hidden">
          {farms.length === 0 ? (
            <EmptyState message="No fields to display." />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Field ID</th>
                  <th className="p-4 font-medium">Farm Name</th>
                  <th className="p-4 font-medium">Area (Acres)</th>
                  <th className="p-4 font-medium">District</th>
                  <th className="p-4 font-medium">Soil Type</th>
                  <th className="p-4 font-medium">Water</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {farms.map((farm, i) => (
                  <tr key={farm.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-medium text-gray-600 dark:text-gray-300">FLD-{String(i + 1).padStart(3, '0')}</td>
                    <td className="p-4 font-semibold">{farm.name}</td>
                    <td className="p-4 text-gray-500">{farm.area} Ac</td>
                    <td className="p-4 text-gray-500">{farm.district}</td>
                    <td className="p-4 text-gray-500">{farm.soil}</td>
                    <td className="p-4 text-gray-500">{farm.water}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ───────────────────────── CROP RECORDS ───────────────────────── */}
      {activeTab === 'Crop Records' && (
        <div className="card p-0 overflow-hidden">
          {farms.length === 0 ? (
            <EmptyState message="No crop records yet." />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Farm Name</th>
                  <th className="p-4 font-medium">Recommended Crop</th>
                  <th className="p-4 font-medium">Season</th>
                  <th className="p-4 font-medium">District</th>
                  <th className="p-4 font-medium">Growth Stage</th>
                  <th className="p-4 font-medium">Est. Harvest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {farms.map(farm => (
                  <tr key={farm.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-semibold">{farm.name}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-agri-green flex-shrink-0" />
                      {farm.aiReport?.bestCrop?.name || 'Pending Analysis'}
                    </td>
                    <td className="p-4 text-gray-500">
                      <Calendar className="w-4 h-4 inline mr-1" />{farm.season}
                    </td>
                    <td className="p-4 text-gray-500">{farm.district}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        {getCropStage(farm)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      <Target className="w-4 h-4 inline mr-1" />{getHarvestEst(farm)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ───────────────────────── LIFECYCLE TRACKING ───────────────────────── */}
      {activeTab === 'Lifecycle Tracking' && (
        <div className="card p-6 space-y-6">
          <h3 className="text-lg font-bold">Crop Lifecycles</h3>
          {farms.length === 0 ? (
            <EmptyState message="No lifecycle data yet." />
          ) : (
            farms.map(farm => {
              const stage = getCropStage(farm);
              const progress = getProgress(farm);
              return (
                <div key={farm.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/20">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold flex items-center gap-2">
                        <Sprout className="w-4 h-4 text-agri-green" />
                        {farm.aiReport?.bestCrop?.name || 'TBD'} 
                        <span className="text-xs text-gray-400 font-normal">({farm.season})</span>
                      </h4>
                      <p className="text-xs text-gray-500">{farm.name} • {farm.district}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">Good Health</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                      <span>Seedling</span>
                      <span>Vegetative</span>
                      <span>Flowering</span>
                      <span>Harvest</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-agri-green h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-xs text-center mt-2 font-medium text-gray-600 dark:text-gray-300">
                      Currently in: <span className="text-agri-green">{stage}</span> • {progress}% complete
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ───────────────────────── HARVEST MONITORING ───────────────────────── */}
      {activeTab === 'Harvest Monitoring' && (
        <div className="card p-0 overflow-hidden">
          {farms.length === 0 ? (
            <EmptyState message="No harvest data yet." />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                  <th className="p-4 font-medium">Crop & Farm</th>
                  <th className="p-4 font-medium">District</th>
                  <th className="p-4 font-medium">Est. Harvest Date</th>
                  <th className="p-4 font-medium">Est. Yield</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {farms.map(farm => {
                  const log = harvestLogs[farm.id];
                  return (
                    <tr key={farm.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-4">
                        <p className="font-bold">{farm.aiReport?.bestCrop?.name || 'TBD'}</p>
                        <p className="text-xs text-gray-500">{farm.name}</p>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{farm.district}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{getHarvestEst(farm)}</td>
                      <td className="p-4">
                        <span className="font-bold text-gray-500">{getEstYield(farm)}</span>
                        {log?.actualYield && (
                          <span className="ml-2 font-bold text-agri-green">({log.actualYield} Tons actual)</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          log ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log ? 'Completed' : 'Scheduled'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {log ? (
                          <span className="text-green-600 font-bold text-xs flex items-center justify-end gap-1">
                            <CheckCircle className="w-3 h-3" /> Done
                          </span>
                        ) : (
                          <button onClick={() => handleOpenLogModal(farm)} className="btn-outline py-1 px-3 text-xs">
                            Log Harvest
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Log Harvest Modal */}
      {isLogModalOpen && selectedHarvest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-agri-green/5">
              <h3 className="text-xl font-bold text-agri-green-deep dark:text-agri-green-light">
                Log Harvest: {selectedHarvest.name}
              </h3>
              <button onClick={() => setIsLogModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogSubmit} className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-blue-800 dark:text-blue-300 mb-4">
                <p><strong>Farm:</strong> {selectedHarvest.name}</p>
                <p><strong>Crop:</strong> {selectedHarvest.aiReport?.bestCrop?.name || 'N/A'}</p>
                <p><strong>Estimated Yield:</strong> {getEstYield(selectedHarvest)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Actual Yield (Tons)</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  value={logData.actualYield}
                  onChange={(e) => setLogData({ ...logData, actualYield: e.target.value })}
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
                    onChange={(e) => setLogData({ ...logData, harvestDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Crop Quality</label>
                  <select
                    value={logData.quality}
                    onChange={(e) => setLogData({ ...logData, quality: e.target.value })}
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
