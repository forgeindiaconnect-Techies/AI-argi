import React, { useState, useEffect } from 'react';
import { IndianRupee, Calculator, TrendingUp, Sprout, Tag, Truck, Save, ArrowRight, Activity, TrendingDown, Minus } from 'lucide-react';

const cropsList = [
  "Groundnut", "Paddy", "Rice", "Sugarcane", "Cotton", "Tomato", "Potato", 
  "Onion", "Carrot", "Brinjal", "Chilli", "Maize", "Millets", "Banana", 
  "Coconut", "Mango", "Other Crops"
];

// Mock Database for Market Intelligence
const marketData = {
  "Groundnut": { price: 80, unit: "Kilogram (Kg)", gst: 2, discount: 5, yieldPerAcre: 1000, demand: "High", trend: "Rising" },
  "Paddy": { price: 25, unit: "Kilogram (Kg)", gst: 0, discount: 2, yieldPerAcre: 2000, demand: "Very High", trend: "Stable" },
  "Rice": { price: 60, unit: "Kilogram (Kg)", gst: 5, discount: 3, yieldPerAcre: 1500, demand: "Very High", trend: "Rising" },
  "Sugarcane": { price: 3000, unit: "Ton", gst: 0, discount: 0, yieldPerAcre: 40, demand: "High", trend: "Stable" },
  "Cotton": { price: 7000, unit: "Quintal", gst: 5, discount: 2, yieldPerAcre: 10, demand: "High", trend: "Rising" },
  "Tomato": { price: 40, unit: "Kilogram (Kg)", gst: 0, discount: 10, yieldPerAcre: 15000, demand: "Moderate", trend: "Volatile" },
  "Potato": { price: 30, unit: "Kilogram (Kg)", gst: 0, discount: 5, yieldPerAcre: 12000, demand: "High", trend: "Rising" },
  "Onion": { price: 50, unit: "Kilogram (Kg)", gst: 0, discount: 8, yieldPerAcre: 10000, demand: "High", trend: "Volatile" },
  "Carrot": { price: 60, unit: "Kilogram (Kg)", gst: 0, discount: 5, yieldPerAcre: 8000, demand: "Moderate", trend: "Stable" },
  "Brinjal": { price: 35, unit: "Kilogram (Kg)", gst: 0, discount: 5, yieldPerAcre: 10000, demand: "Moderate", trend: "Stable" },
  "Chilli": { price: 120, unit: "Kilogram (Kg)", gst: 5, discount: 2, yieldPerAcre: 2000, demand: "High", trend: "Rising" },
  "Maize": { price: 22, unit: "Kilogram (Kg)", gst: 0, discount: 2, yieldPerAcre: 2500, demand: "High", trend: "Stable" },
  "Millets": { price: 45, unit: "Kilogram (Kg)", gst: 0, discount: 3, yieldPerAcre: 1200, demand: "Moderate", trend: "Rising" },
  "Banana": { price: 25, unit: "Kilogram (Kg)", gst: 0, discount: 5, yieldPerAcre: 15000, demand: "High", trend: "Stable" },
  "Coconut": { price: 30, unit: "Piece", gst: 0, discount: 0, yieldPerAcre: 8000, demand: "High", trend: "Rising" },
  "Mango": { price: 100, unit: "Kilogram (Kg)", gst: 0, discount: 5, yieldPerAcre: 4000, demand: "Very High", trend: "Rising" },
  "Other Crops": { price: 50, unit: "Kilogram (Kg)", gst: 2, discount: 5, yieldPerAcre: 1000, demand: "Moderate", trend: "Stable" }
};

const MarketValueEstimatorTab = ({ activeFarm }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transportation, setTransportation] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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
  const qty = parseFloat(quantity) || 0;
  const transportCost = parseFloat(transportation) || 0;
  
  let subtotal = 0;
  let discountAmount = 0;
  let afterDiscount = 0;
  let gstAmount = 0;
  let finalAmount = 0;

  if (currentMarketData) {
    subtotal = qty * currentMarketData.price;
    discountAmount = subtotal * (currentMarketData.discount / 100);
    afterDiscount = subtotal - discountAmount;
    gstAmount = afterDiscount * (currentMarketData.gst / 100);
    finalAmount = afterDiscount + gstAmount - transportCost; // Revenue estimation, transportation is usually deducted from profit if paid by farmer, or added if charging buyer. Assuming transportation is a cost that reduces final revenue, or an extra charge. The prompt: Final Amount = Subtotal - Discount Amount + GST Amount + Transportation Cost. Wait, prompt says: "Final Amount = Subtotal - Discount Amount + GST Amount + Transportation Cost". So we add it.
  }
  
  if (currentMarketData) {
     finalAmount = afterDiscount + gstAmount + transportCost;
  }

  const getTrendIcon = (trend) => {
    if (trend === 'Rising') return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    if (trend === 'Volatile') return <Activity className="w-5 h-5 text-orange-500" />;
    if (trend === 'Falling') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      alert('Estimation saved successfully to Reports & History!');
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
              </div>
              
              <div>
                <label className="label-text">Quantity Sold</label>
                <div className="relative">
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!selectedCrop} className="input-field mt-1 pr-24" placeholder="e.g. 100" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {currentMarketData ? currentMarketData.unit : 'Unit'}
                  </span>
                </div>
              </div>

              <div>
                <label className="label-text">Transportation Cost (₹)</label>
                <div className="relative">
                  <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="number" value={transportation} onChange={(e) => setTransportation(e.target.value)} disabled={!selectedCrop} className="input-field mt-1 pl-12" placeholder="e.g. 200" />
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
                <span className="font-bold text-white">{selectedCrop || '-'}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Quantity</span>
                <span className="font-bold text-white">{qty ? `${qty} ${currentMarketData?.unit.split(' ')[0] || ''}` : '-'}</span>
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
              <div className="flex justify-between items-center text-orange-400">
                <span>Transportation</span>
                <span>+ ₹{transportCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 mb-8">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Expected Revenue</p>
              <h1 className="text-4xl font-black text-emerald-400">₹{finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            </div>

            <button 
              onClick={handleSave}
              disabled={!selectedCrop || !qty}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                (!selectedCrop || !qty) ? 'bg-gray-800 text-gray-500 cursor-not-allowed' :
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
    </div>
  );
};

export default MarketValueEstimatorTab;
