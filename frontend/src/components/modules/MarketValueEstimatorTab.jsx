import React, { useState, useEffect } from 'react';
import { IndianRupee, Calculator, TrendingUp, Sprout, Tag, Truck, Save, ArrowRight, Activity, TrendingDown, Minus, Eye, X, Clock } from 'lucide-react';

const ESTIMATOR_KEY = 'sams_market_estimates';

const cropsList = [
  "Groundnut", "Paddy", "Rice", "Sugarcane", "Cotton", "Tomato", "Potato", 
  "Onion", "Carrot", "Brinjal", "Chilli", "Maize", "Millets", "Banana", 
  "Coconut", "Mango", "Other Crops"
];

// Mock Database for Market Intelligence
const marketData = {
  "Groundnut": { price: 65, unit: "Kilogram (Kg)", demand: "High", trend: "Rising", yieldPerAcre: 1200, discount: 2, gst: 5 },
  "Paddy": { price: 25, unit: "Kilogram (Kg)", demand: "Very High", trend: "Stable", yieldPerAcre: 2500, discount: 0, gst: 0 },
  "Rice": { price: 45, unit: "Kilogram (Kg)", demand: "Very High", trend: "Stable", yieldPerAcre: 1500, discount: 0, gst: 5 },
  "Sugarcane": { price: 3, unit: "Kilogram (Kg)", demand: "High", trend: "Stable", yieldPerAcre: 40000, discount: 0, gst: 0 },
  "Cotton": { price: 70, unit: "Kilogram (Kg)", demand: "High", trend: "Rising", yieldPerAcre: 800, discount: 5, gst: 5 },
  "Tomato": { price: 30, unit: "Kilogram (Kg)", demand: "Very High", trend: "Volatile", yieldPerAcre: 10000, discount: 5, gst: 5 },
  "Potato": { price: 20, unit: "Kilogram (Kg)", demand: "High", trend: "Stable", yieldPerAcre: 8000, discount: 0, gst: 5 },
  "Onion": { price: 40, unit: "Kilogram (Kg)", demand: "High", trend: "Volatile", yieldPerAcre: 6000, discount: 5, gst: 5 },
  "Carrot": { price: 35, unit: "Kilogram (Kg)", demand: "Medium", trend: "Stable", yieldPerAcre: 5000, discount: 5, gst: 5 },
  "Brinjal": { price: 25, unit: "Kilogram (Kg)", demand: "Medium", trend: "Falling", yieldPerAcre: 7000, discount: 10, gst: 5 },
  "Chilli": { price: 120, unit: "Kilogram (Kg)", demand: "High", trend: "Rising", yieldPerAcre: 1000, discount: 0, gst: 5 },
  "Maize": { price: 22, unit: "Kilogram (Kg)", demand: "High", trend: "Stable", yieldPerAcre: 2500, discount: 2, gst: 5 },
  "Millets": { price: 40, unit: "Kilogram (Kg)", demand: "Rising", trend: "Rising", yieldPerAcre: 1200, discount: 0, gst: 0 },
  "Banana": { price: 15, unit: "Kilogram (Kg)", demand: "Very High", trend: "Stable", yieldPerAcre: 15000, discount: 0, gst: 0 },
  "Coconut": { price: 25, unit: "Pieces", demand: "High", trend: "Stable", yieldPerAcre: 4000, discount: 0, gst: 0 },
  "Mango": { price: 60, unit: "Kilogram (Kg)", demand: "Seasonal", trend: "Volatile", yieldPerAcre: 4000, discount: 5, gst: 5 },
  "Other Crops": { price: 50, unit: "Kilogram (Kg)", demand: "Medium", trend: "Stable", yieldPerAcre: 2000, discount: 0, gst: 5 }
};

const MarketValueEstimatorTab = ({ activeFarm }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Kg');
  const [manualCropName, setManualCropName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedEstimates, setSavedEstimates] = useState([]);
  const [viewingEstimate, setViewingEstimate] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(ESTIMATOR_KEY);
    if (stored) setSavedEstimates(JSON.parse(stored));
  }, []);

  // Auto-fill from AI Recommendation if available
  useEffect(() => {
    if (activeFarm?.aiReport?.bestCrop?.name) {
      const suggestedCrop = activeFarm.aiReport.bestCrop.name;
      const matchedCrop = cropsList.includes(suggestedCrop) ? suggestedCrop : "Other Crops";
      
      if (!selectedCrop) {
        setSelectedCrop(matchedCrop);
        // Pre-fill quantity with expected yield
        setQuantity(activeFarm.aiReport.yieldPrediction.total.toString());
      }
    }
  }, [activeFarm, selectedCrop]);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
    setIsSaved(false);
  };

  const currentMarketData = selectedCrop ? (marketData[selectedCrop] || marketData["Other Crops"]) : null;

  // Calculations
  const inputQty = parseFloat(quantity) || 0;
  let calcQty = inputQty;

  // Convert quantity to base unit (Kg or Piece) for calculation if necessary
  if (currentMarketData) {
    if (unit === 'Gram' && currentMarketData.unit === 'Kilogram (Kg)') {
      calcQty = inputQty / 1000;
    } else if (unit === 'Kg' && currentMarketData.unit === 'Quintal') {
      calcQty = inputQty / 100;
    } else if (unit === 'Kg' && currentMarketData.unit === 'Ton') {
      calcQty = inputQty / 1000;
    }
  }
  
  let subtotal = 0;
  let discountAmount = 0;
  let afterDiscount = 0;
  let gstAmount = 0;
  let finalAmount = 0;

  if (currentMarketData) {
    subtotal = calcQty * currentMarketData.price;
    discountAmount = subtotal * (currentMarketData.discount / 100);
    afterDiscount = subtotal - discountAmount;
    gstAmount = afterDiscount * (currentMarketData.gst / 100);
    finalAmount = afterDiscount + gstAmount;
  }

  const getTrendIcon = (trend) => {
    if (trend === 'Rising') return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    if (trend === 'Volatile') return <Activity className="w-5 h-5 text-orange-500" />;
    if (trend === 'Falling') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const handleSave = () => {
    setIsSaved(true);
    
    const cropName = selectedCrop === 'Other Crops' && manualCropName ? manualCropName : selectedCrop;
    
    const newEstimate = {
      id: Date.now(),
      cropName,
      quantity: inputQty,
      unit,
      calcQty,
      marketData: currentMarketData,
      subtotal,
      discountAmount,
      gstAmount,
      finalAmount,
      savedAt: new Date().toISOString()
    };
    
    const stored = localStorage.getItem(ESTIMATOR_KEY);
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [newEstimate, ...existing].slice(0, 20);
    localStorage.setItem(ESTIMATOR_KEY, JSON.stringify(updated));
    setSavedEstimates(updated);

    setTimeout(() => {
      setIsSaved(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
          <Calculator className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Market Value Estimator</h2>
          <p className="text-gray-500 dark:text-gray-400">AI-powered market intelligence for accurate revenue forecasting.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Input Form & Market Intelligence */}
        <div className="xl:col-span-2 space-y-6">
          <div className="card shadow-md border-t-4 border-blue-600">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
              <Tag className="text-blue-600 w-5 h-5" /> Crop Selection & Sales Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label-text">Select Crop</label>
                <select value={selectedCrop} onChange={handleCropChange} className="input-field mt-1 w-full bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select Crop to Auto-fill Market Data</option>
                  {cropsList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {activeFarm?.aiReport?.bestCrop?.name && !selectedCrop && (
                  <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                    <Sprout className="w-3 h-3"/> AI suggests selecting {activeFarm.aiReport.bestCrop.name}
                  </p>
                )}
                {selectedCrop === 'Other Crops' && (
                  <div className="mt-4">
                    <label className="label-text">Manual Crop Name</label>
                    <input 
                      type="text" 
                      value={manualCropName} 
                      onChange={(e) => setManualCropName(e.target.value)} 
                      className="input-field mt-1" 
                      placeholder="Enter crop name manually" 
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="label-text">Quantity Sold</label>
                <div className="relative flex gap-2 mt-1">
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    disabled={!selectedCrop} 
                    className="input-field flex-1" 
                    placeholder="e.g. 100" 
                  />
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
                    disabled={!selectedCrop}
                    className="input-field w-32 bg-gray-50 dark:bg-gray-800 font-semibold"
                  >
                    <option value="Pieces">Pieces</option>
                    <option value="Kg">Kg</option>
                    <option value="Gram">Gram</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Market Intelligence Card */}
          {currentMarketData && (
            <div className="card bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-800 dark:text-emerald-400 border-b border-emerald-200/50 dark:border-emerald-800/50 pb-3">
                <Activity className="w-5 h-5" /> Market Intelligence: {selectedCrop}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                  <p className="text-emerald-700 dark:text-emerald-500 font-semibold mb-1 uppercase text-xs tracking-wider">Current Price</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl">₹{currentMarketData.price}</p>
                  <p className="text-xs text-gray-500 mt-1">per {currentMarketData.unit.split(' ')[0]}</p>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                  <p className="text-emerald-700 dark:text-emerald-500 font-semibold mb-1 uppercase text-xs tracking-wider">Demand Level</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg mt-1">{currentMarketData.demand}</p>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                  <p className="text-emerald-700 dark:text-emerald-500 font-semibold mb-1 uppercase text-xs tracking-wider">Price Trend</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getTrendIcon(currentMarketData.trend)}
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{currentMarketData.trend}</p>
                  </div>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50 flex flex-col justify-center">
                  <p className="text-emerald-700 dark:text-emerald-500 font-semibold mb-1 uppercase text-xs tracking-wider">Average Yield</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{currentMarketData.yieldPerAcre} Kg/Ac</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1">
                  Tax (GST): {currentMarketData.gst}%
                </span>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1.5 rounded-full flex items-center gap-1">
                  Suggested Discount: {currentMarketData.discount}%
                </span>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1.5 rounded-full flex items-center gap-1">
                  Profitability: {currentMarketData.trend === 'Rising' || currentMarketData.demand === 'Very High' ? 'Excellent' : 'Good'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Real-Time Calculation Card */}
        <div className="xl:col-span-1">
          <div className="card bg-gray-900 text-white shadow-2xl sticky top-8">
            <h3 className="text-lg font-bold mb-6 pb-4 border-b border-gray-700 flex items-center justify-between">
              <span>Calculation Summary</span>
              <IndianRupee className="w-5 h-5 text-gray-400" />
            </h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center text-gray-300">
                <span>Selected Crop</span>
                <span className="font-bold text-white">{selectedCrop === 'Other Crops' && manualCropName ? manualCropName : (selectedCrop || '-')}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Quantity</span>
                <span className="font-bold text-white">{inputQty ? `${inputQty} ${unit}` : '-'}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Market Unit Price</span>
                <span className="font-bold text-white">₹{currentMarketData?.price || '0'}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-700 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold text-lg">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-red-400">
                <span>Discount ({currentMarketData?.discount || 0}%)</span>
                <span>- ₹{discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-yellow-400">
                <span>GST ({currentMarketData?.gst || 0}%)</span>
                <span>+ ₹{gstAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 mb-8">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Expected Revenue</p>
              <h1 className="text-4xl font-black text-emerald-400">₹{finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            </div>

            <button 
              onClick={handleSave}
              disabled={!selectedCrop || !inputQty}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                (!selectedCrop || !inputQty) ? 'bg-gray-800 text-gray-500 cursor-not-allowed' :
                isSaved 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/50' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
              }`}
            >
              {isSaved ? (
                <>Saved Successfully! <Save className="w-5 h-5"/></>
              ) : (
                <>Save Estimate <ArrowRight className="w-5 h-5"/></>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Saved Estimates History */}
      {savedEstimates.length > 0 && (
        <div className="card p-0 overflow-hidden mt-6">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600"/>
            <h3 className="font-bold text-lg">Saved Market Estimates</h3>
            <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{savedEstimates.length} saved</span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {savedEstimates.map((est) => (
              <div key={est.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {est.cropName} • {est.quantity} {est.unit}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(est.savedAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-emerald-600">₹{est.finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <button onClick={() => setViewingEstimate(est)} className="btn-outline py-1 px-3 text-xs flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5"/> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingEstimate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingEstimate(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold">Market Estimate Details</h3>
                <p className="text-xs text-gray-500">{new Date(viewingEstimate.savedAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setViewingEstimate(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Crop</p>
                  <p className="font-bold text-lg">{viewingEstimate.cropName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase">Quantity</p>
                  <p className="font-bold text-lg">{viewingEstimate.quantity} {viewingEstimate.unit}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Market Price ({viewingEstimate.marketData?.unit})</span>
                  <span className="font-semibold">₹{viewingEstimate.marketData?.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">₹{viewingEstimate.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-red-500">
                  <span>Discount ({viewingEstimate.marketData?.discount}%)</span>
                  <span>- ₹{viewingEstimate.discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-yellow-600 dark:text-yellow-500">
                  <span>GST ({viewingEstimate.marketData?.gst}%)</span>
                  <span>+ ₹{viewingEstimate.gstAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 text-xs uppercase mb-1">Final Estimated Revenue</p>
                <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  ₹{viewingEstimate.finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketValueEstimatorTab;
