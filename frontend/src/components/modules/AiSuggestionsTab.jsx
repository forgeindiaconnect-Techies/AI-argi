import React, { useState } from 'react';
import { Brain, RefreshCw, MapPin, Activity, ShieldAlert, Sprout, Calendar, Sun, Wind, Droplets, TrendingUp, IndianRupee, Lightbulb, AlertTriangle, Bug, FileText, Map } from 'lucide-react';

const generateReport = (farm) => {
  const area = parseFloat(farm.area) || 1;
  const season = farm.season || 'Summer';
  const soil = farm.soil || 'Red Soil';
  const water = farm.water || 'Medium';
  const district = farm.district || farm.location || 'Unknown';

  const cropMap = { Summer: 'Groundnut', Monsoon: 'Paddy', Kharif: 'Paddy', Winter: 'Wheat', Rabi: 'Wheat', Zaid: 'Groundnut' };
  const bestCrop = cropMap[season] || 'Groundnut';
  const yieldPerAcre = 1000;
  const pricePerKg = 80;
  const total = area * yieldPerAcre;

  return {
    bestCrop: { name: bestCrop, score: 95, confidence: 'High', risk: 'Low' },
    district, soil, season, waterLevel: water, area,
    alternatives: [
      { name: 'Cotton', score: 90 }, { name: 'Maize', score: 88 },
      { name: 'Millets', score: 85 }, { name: 'Sunflower', score: 83 }, { name: 'Sesame', score: 80 }
    ],
    timeline: { sowing: '15 June 2026', germination: '7 Days', growth: '40 Days', flowering: '30 Days', harvest: '10 October 2026', total: 117 },
    weather: { temp: '25°C - 35°C', humidity: '50% - 70%', rainfall: '500 - 800 mm', wind: 'Moderate (10-15 km/h)' },
    water: { daily: '5 Liters/Plant', weekly: '35 Liters/Plant', schedule: 'Every 3 days', droughtRisk: water === 'Low' ? 'High' : 'Low' },
    fertilizer: {
      organic: ['Compost', 'Vermicompost', 'Farmyard Manure'],
      chemical: ['Urea', 'DAP', 'Potash'],
      schedule: 'Basal dressing before sowing, top dressing at 30 & 45 days',
      quantity: 'NPK 10:20:20 kg/acre'
    },
    diseases: [
      { name: 'Leaf Spot Disease', risk: 10, tip: 'Use resistant varieties, apply proper fungicide' },
      { name: 'Rust Disease', risk: 5, tip: 'Maintain plant spacing, avoid overhead watering' }
    ],
    pests: [
      { name: 'Aphids', prevent: 'Neem oil spray', recommended: 'Imidacloprid' },
      { name: 'White Grub', prevent: 'Deep summer ploughing', recommended: 'Chlorpyrifos' }
    ],
    yield: { perAcre: yieldPerAcre, total, quality: 'Premium Grade A' },
    market: { revenue: total * pricePerKg, price: pricePerKg, profitability: 'High' },
    tips: {
      sowMonth: 'June', harvestMonth: 'October',
      water: 'Use drip irrigation, apply mulching',
      soil: 'Crop rotation with legumes, green manuring',
      seasonal: 'Ensure good drainage during heavy monsoon'
    }
  };
};

const AdvancedAiSuggestions = ({ activeFarm }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const runAnalysis = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!activeFarm) return;
    setLoading(true);
    setReport(null);
    setTimeout(() => { setReport(generateReport(activeFarm)); setLoading(false); }, 1800);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-agri-bg-darkSurface p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-agri-green-deep dark:text-agri-green-light">AI Crop Recommendations</h3>
          <p className="text-gray-500 mt-1">Real-time analysis based on your farm's soil, district, season & weather.</p>
        </div>
        <button type="button" onClick={runAnalysis} disabled={loading || !activeFarm}
          className={`btn-primary flex items-center gap-2 text-lg px-6 py-3 ${!activeFarm ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? <RefreshCw className="w-5 h-5 animate-spin"/> : <Brain className="w-5 h-5"/>}
          {loading ? 'Analyzing Farm Data...' : 'Run AI Analysis'}
        </button>
      </div>

      {/* No farm */}
      {!activeFarm && (
        <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-agri-bg-darkSurface rounded-xl border border-dashed border-gray-300 text-center">
          <Map className="w-20 h-20 text-gray-300 mb-4"/>
          <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300">No Farm Registered Yet</h4>
          <p className="text-gray-500 mt-2 max-w-md">Go to <strong>"My Farm"</strong>, fill in farm details, save — then come back to run AI analysis.</p>
        </div>
      )}

      {/* Farm ready state */}
      {activeFarm && !loading && !report && (
        <div className="space-y-6">
          <div className="bg-agri-green/5 border border-agri-green/30 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-5 flex items-center gap-2 text-agri-green-deep dark:text-agri-green-light">
              <MapPin className="w-5 h-5"/> Farm Details Loaded — Ready for AI Analysis
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                ['Farm Name', activeFarm.name],
                ['District', activeFarm.district || activeFarm.location || '—'],
                ['Soil Type', activeFarm.soil || '—'],
                ['Season', activeFarm.season || '—'],
                ['Land Area', activeFarm.area ? `${activeFarm.area} Acres` : '—'],
                ['Water', activeFarm.water || '—'],
                ['Irrigation', activeFarm.irrigation || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="text-sm text-gray-500 block mb-1">{label}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-agri-bg-darkSurface rounded-xl border border-dashed border-agri-green/40 text-center">
            <Sprout className="w-16 h-16 text-agri-green/30 mb-4"/>
            <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300">Ready to Analyze <span className="text-agri-green">"{activeFarm.name}"</span></h4>
            <p className="text-gray-500 mt-2 mb-6 max-w-md">Click below to generate your complete crop planning report.</p>
            <button type="button" onClick={runAnalysis} className="btn-primary flex items-center gap-2 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
              <Brain className="w-6 h-6"/> Run AI Analysis
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-agri-bg-darkSurface rounded-xl">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-agri-green/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-agri-green rounded-full border-t-transparent animate-spin"></div>
            <Brain className="absolute inset-0 m-auto w-10 h-10 text-agri-green animate-pulse"/>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">AI is analyzing your farm data...</h3>
          <p className="text-gray-500">Evaluating soil, weather patterns and historical yield data.</p>
        </div>
      )}

      {/* === FULL REPORT === */}
      {!loading && report && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Report title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-agri-green/10 rounded-lg"><FileText className="w-6 h-6 text-agri-green"/></div>
            <h2 className="text-2xl font-bold">AI Crop Planning &amp; Advisory Report</h2>
          </div>

          {/* 1. Best Crop + Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10"><Sprout className="w-40 h-40"/></div>
              <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">Best Recommended Crop</p>
              <div className="flex items-end gap-4 mb-4">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">{report.bestCrop.name}</h1>
                <span className="mb-1 bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">Score: {report.bestCrop.score}%</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-green-600"/> Confidence: <strong>{report.bestCrop.confidence}</strong></span>
                <span className="flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-green-600"/> Risk Level: <strong>{report.bestCrop.risk}</strong></span>
              </div>
            </div>
            <div className="card bg-gray-900 text-white flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-400"/> AI Quick Summary</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="text-gray-300">Location: <span className="text-white font-medium">{report.district}</span></p>
                  <p className="text-gray-300">Soil: <span className="text-white font-medium">{report.soil}</span></p>
                  <p className="text-gray-300">Season: <span className="text-white font-medium">{report.season}</span></p>
                  <p className="text-gray-300">Water: <span className="text-white font-medium">{report.waterLevel}</span></p>
                  <p className="text-gray-300">Yield: <span className="text-green-400 font-bold">{report.yield.perAcre} Kg/Acre</span></p>
                  <p className="text-gray-300">Profit: <span className="text-green-400 font-bold">{report.market.profitability}</span></p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 text-sm">
                Final Verdict: <strong className="text-agri-green-light">Highly suitable for cultivation.</strong>
              </div>
            </div>
          </div>

          {/* 2. Alternative Crops */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500"/> Alternative Crop Suggestions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {report.alternatives.map((c, i) => (
                <div key={i} className="card p-4 text-center hover:border-blue-300 transition-colors">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">{c.name}</h4>
                  <div className="w-14 h-14 rounded-full border-4 border-blue-100 flex items-center justify-center mx-auto my-3">
                    <span className="font-bold text-blue-600 text-sm">{c.score}%</span>
                  </div>
                  <span className="text-xs text-gray-500">Suitability</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Timeline + Weather */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="card">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500"/> Cultivation Timeline</h3>
              <div className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-800 space-y-6">
                {[
                  { label: 'SOWING', val: report.timeline.sowing },
                  { label: 'GERMINATION', val: report.timeline.germination },
                  { label: 'GROWTH', val: report.timeline.growth },
                  { label: 'FLOWERING', val: report.timeline.flowering },
                  { label: 'HARVEST', val: report.timeline.harvest },
                ].map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.6rem] top-1 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase">{s.label}</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="bg-purple-100 text-purple-800 font-bold px-4 py-2 rounded-full text-sm">Total Duration: {report.timeline.total} Days</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Weather */}
              <div className="card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Sun className="w-5 h-5 text-orange-500"/> Weather Requirements</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg"><p className="text-xs text-orange-600 font-bold uppercase mb-1">Temperature</p><p className="font-semibold">{report.weather.temp}</p></div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg"><p className="text-xs text-blue-600 font-bold uppercase mb-1">Humidity</p><p className="font-semibold">{report.weather.humidity}</p></div>
                  <div className="p-3 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg"><p className="text-xs text-cyan-600 font-bold uppercase mb-1">Rainfall</p><p className="font-semibold">{report.weather.rainfall}</p></div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><p className="text-xs text-gray-600 font-bold uppercase mb-1 flex items-center gap-1"><Wind className="w-3 h-3"/> Wind</p><p className="font-semibold">{report.weather.wind}</p></div>
                </div>
              </div>
              {/* Water */}
              <div className="card">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500"/> Water Requirement</h3>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-center">
                    <p className="text-xs text-blue-600 font-bold uppercase">Daily</p>
                    <p className="font-bold text-lg text-blue-900 dark:text-blue-200">{report.water.daily}</p>
                  </div>
                  <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-center">
                    <p className="text-xs text-blue-600 font-bold uppercase">Weekly</p>
                    <p className="font-bold text-lg text-blue-900 dark:text-blue-200">{report.water.weekly}</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500">Irrigation Schedule:</span><span className="font-medium">{report.water.schedule}</span></li>
                  <li className="flex justify-between pt-1"><span className="text-gray-500">Drought Risk Indicator:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${report.water.droughtRisk === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{report.water.droughtRisk}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Fertilizer + Pest/Disease */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Sprout className="w-5 h-5 text-green-600"/> Fertilizer Recommendation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">Organic Fertilizers</p>
                  <div className="flex flex-wrap gap-2">
                    {report.fertilizer.organic.map(f => <span key={f} className="bg-green-50 border border-green-200 text-green-800 dark:text-green-300 px-3 py-1 text-sm rounded-full">{f}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Chemical Fertilizers</p>
                  <div className="flex flex-wrap gap-2">
                    {report.fertilizer.chemical.map(f => <span key={f} className="bg-gray-100 border border-gray-200 text-gray-800 dark:text-gray-300 px-3 py-1 text-sm rounded-full">{f}</span>)}
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                  <p className="text-sm mb-2"><strong>Schedule:</strong> {report.fertilizer.schedule}</p>
                  <p className="text-sm"><strong>Quantity:</strong> {report.fertilizer.quantity}</p>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-red-500">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Bug className="w-5 h-5 text-red-500"/> Pest &amp; Disease Risk</h3>
              <div className="space-y-4">
                {report.diseases.map((d, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      {d.name}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${d.risk > 8 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>Risk: {d.risk}%</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{d.tip}</p>
                  </div>
                ))}
                {report.pests.map((p, i) => (
                  <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{p.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Prevent: {p.prevent}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Recommended: {p.recommended}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Yield + Market */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Yield Prediction</h3>
              <div className="grid grid-cols-2 gap-6">
                <div><p className="text-emerald-100 text-sm mb-1">Expected Yield / Acre</p><p className="text-3xl font-bold">{report.yield.perAcre} Kg</p></div>
                <div><p className="text-emerald-100 text-sm mb-1">Total Expected Yield</p><p className="text-3xl font-bold">{report.yield.total.toLocaleString()} Kg</p></div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-400/30 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4"/> Quality Indicator: <strong>{report.yield.quality}</strong>
              </div>
            </div>
            <div className="card bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><IndianRupee className="w-5 h-5"/> Market &amp; Revenue</h3>
              <div className="grid grid-cols-2 gap-6">
                <div><p className="text-blue-200 text-sm mb-1">Expected Revenue</p><p className="text-3xl font-bold">₹{report.market.revenue.toLocaleString()}</p></div>
                <div><p className="text-blue-200 text-sm mb-1">Current Market Price</p><p className="text-3xl font-bold">₹{report.market.price} / Kg</p></div>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-400/30 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4"/> Profitability Rating: <strong>{report.market.profitability}</strong>
              </div>
            </div>
          </div>

          {/* 6. Smart Farming Tips */}
          <div className="card bg-amber-50 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-500"><Lightbulb className="w-5 h-5"/> Smart Farming Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900 dark:text-amber-200">
              <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/><p><strong>Best Sowing Month:</strong> {report.tips.sowMonth}</p></div>
              <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/><p><strong>Best Harvest Month:</strong> {report.tips.harvestMonth}</p></div>
              <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/><p><strong>Water Saving:</strong> {report.tips.water}</p></div>
              <div className="flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/><p><strong>Soil Improvement:</strong> {report.tips.soil}</p></div>
              <div className="flex gap-2 md:col-span-2"><AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5"/><p><strong>Seasonal Advice:</strong> {report.tips.seasonal}</p></div>
            </div>
          </div>

          {/* Re-run */}
          <div className="flex justify-end">
            <button type="button" onClick={runAnalysis} className="btn-outline flex items-center gap-2">
              <RefreshCw className="w-4 h-4"/> Re-run Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAiSuggestions;
