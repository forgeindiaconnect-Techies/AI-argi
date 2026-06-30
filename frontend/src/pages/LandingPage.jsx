import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, CloudRain, Cpu, BarChart3, ChevronRight, Sprout, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-100 font-sans selection:bg-agri-green selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800 transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-agri-green to-emerald-500 p-2.5 rounded-xl shadow-lg shadow-agri-green/20">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-agri-green-deep to-emerald-500">SAMS</h1>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <a href="#home" className="text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">Home</a>
          <Link to="/about" className="text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">About</Link>
          <a href="#features" className="text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">Features</a>
          <a href="#guide" className="text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">Guide</a>
          <Link to="/contact" className="text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/login" className="font-semibold text-gray-600 hover:text-agri-green dark:text-gray-300 transition-colors">Login</Link>
          <Link to="/register" className="btn-primary shadow-lg shadow-agri-green/30 hover:shadow-agri-green/50 transition-all rounded-full px-6 py-2">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden flex items-center bg-agri-bg-light dark:bg-agri-bg-dark">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-agri-green/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float-delay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start animate-slide-in-left">
            <div className="section-badge mb-8">
              <SparklesIcon /> <span className="font-medium">Next-Gen Farming Intelligence</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8 text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              Grow Smarter <br/> with <span className="gradient-text">AI Agriculture</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-xl">
              Empower your farm with real-time data, predictive analytics, and automated crop recommendations. Increase yield, reduce costs, and farm sustainably.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Link to="/register" className="bg-agri-green hover:bg-agri-green-dark text-white text-lg font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-xl shadow-agri-green/25 hover:scale-105 transition-all duration-300">
                Start Farming Free <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#guide" className="glass text-gray-800 dark:text-white text-lg font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/50 transition-colors">
                <Sprout className="w-5 h-5 text-agri-green" /> Step-by-Step Guide
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Farmer" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="text-agri-green font-bold">10,000+</span> modern farmers</p>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-tr from-agri-green/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl transform rotate-3"></div>
            <img src="/images/hero_farm.png" alt="Smart Farm" className="relative z-10 w-full h-auto rounded-[2rem] shadow-2xl border border-white/20" />
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl z-20 flex items-center gap-4 animate-float-delay">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full text-agri-green">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Expected Yield</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">+34.5%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-16 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200 dark:divide-gray-800">
          {[
            { value: "98%", label: "Prediction Accuracy" },
            { value: "15M+", label: "Acres Monitored" },
            { value: "35%", label: "Avg. Yield Increase" },
            { value: "24/7", label: "AI Monitoring" }
          ].map((stat, idx) => (
            <div key={idx} className="px-4">
              <p className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mb-2">{stat.value}</p>
              <p className="text-gray-500 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-agri-bg-darkSurface relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="section-badge mb-4">Core Capabilities</div>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">Everything you need to grow</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive suite of AI tools covers every aspect of modern farming, from soil preparation to market analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FeatureCard 
              image="/images/soil_analysis.png"
              icon={<Sprout className="w-6 h-6" />}
              title="Advanced Soil Analysis"
              description="Get detailed breakdowns of soil nutrients, pH levels, and moisture content to perfectly match crops to your land's specific profile."
            />
            <FeatureCard 
              image="/images/weather_monitoring.png"
              icon={<CloudRain className="w-6 h-6" />}
              title="Hyper-Local Weather"
              description="Access precise, localized weather forecasts and microclimate tracking to optimize irrigation and protect your harvest from extreme conditions."
            />
            <FeatureCard 
              image="/images/ai_recommendations.png"
              icon={<Cpu className="w-6 h-6" />}
              title="AI Crop Recommendations"
              description="Our proprietary machine learning engine analyzes thousands of variables to suggest the most profitable and resilient crops for your specific farm."
            />
            <FeatureCard 
              image="/images/dashboard_analytics.png"
              icon={<BarChart3 className="w-6 h-6" />}
              title="Real-time Analytics Dashboard"
              description="Monitor your entire operation from a single, intuitive interface. Track growth stages, predict yields, and analyze profit margins effortlessly."
            />
          </div>
        </div>
      </section>



      {/* Benefits / Checkmarks Section */}
      <section className="py-24 bg-white dark:bg-agri-bg-light/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="/images/farm_aerial.png" alt="Farm Aerial" className="rounded-3xl shadow-xl w-full h-auto" />
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-900 dark:text-white">Why Choose SAMS?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We combine cutting-edge technology with deep agricultural expertise to provide actionable insights that actually make a difference to your bottom line.
            </p>
            <div className="space-y-4">
              {[
                "Increase crop yields by up to 35% with precision farming",
                "Reduce water consumption and fertilizer waste",
                "Mitigate risks with early disease and weather warnings",
                "Seamless integration with existing farm equipment",
                "Access to premium marketplace insights and pricing"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-agri-green flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{text}</p>
                </div>
              ))}
            </div>
            <Link to="/register" className="mt-10 inline-flex btn-primary px-8 py-4 text-lg rounded-full">
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>

      {/* Farming Guide Section */}
      <section id="guide" className="py-24 bg-white dark:bg-agri-bg-dark border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-6 border border-emerald-200 dark:border-emerald-800">
                <Sprout className="w-4 h-4" /> Expert Guidance
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Not sure what to cultivate?
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choosing the right crop is the hardest part of farming. Follow these essential tips before planting to ensure a profitable harvest.
              </p>
            </div>
            <Link to="/ai-guide" className="btn-primary rounded-full px-8 py-4 text-lg flex items-center justify-center gap-2 shadow-lg shadow-agri-green/20 hover:scale-105 transition-transform shrink-0">
              Let AI Decide For You <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tip 1 */}
            <Link to="/guide/soil-testing" className="block bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-emerald-500 mb-6 border border-gray-100 dark:border-gray-700">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Test Your Soil First</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Never guess your soil quality. Knowing your soil's pH and nutrient levels (NPK) is the foundation of choosing a crop that will actually survive and thrive.
              </p>
            </Link>

            {/* Tip 2 */}
            <Link to="/guide/season-matching" className="block bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-blue-500 mb-6 border border-gray-100 dark:border-gray-700">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Match the Season</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Crops are highly sensitive to temperature and rainfall. Always select varieties that naturally align with your upcoming local weather patterns.
              </p>
            </Link>

            {/* Tip 3 */}
            <Link to="/guide/market-demand" className="block bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors"></div>
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-orange-500 mb-6 border border-gray-100 dark:border-gray-700">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Analyze Market Demand</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Don't grow what you can't sell. Research local market prices and demand trends to ensure your harvest yields high profit margins, not just high volumes.
              </p>
            </Link>
          </div>
          
          <div className="mt-12 bg-agri-green/5 dark:bg-agri-green/10 border border-agri-green/20 rounded-2xl p-6 flex items-start gap-4">
            <div className="mt-1 bg-agri-green p-1.5 rounded-full text-white shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              <span className="font-bold text-agri-green-dark dark:text-agri-green-light">Pro Tip: </span> 
              SAMS completely automates this process. By simply entering your farm's location, our AI analyzes local soil data, 10-year weather patterns, and current market values to instantly tell you exactly what to cultivate.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer id="contact" className="bg-[#0f1713] text-gray-300 pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Col */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-agri-green p-2 rounded-lg">
                  <Leaf className="text-white w-5 h-5" />
                </div>
                <h1 className="text-2xl font-display font-bold text-white tracking-wide">SAMS</h1>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Empowering the next generation of farmers with artificial intelligence and precision agriculture tools.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com/samsagri" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-agri-green transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href="https://twitter.com/samsagri" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-agri-green transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="https://instagram.com/samsagri" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-agri-green transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://linkedin.com/company/samsagri" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-agri-green transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/features" className="hover:text-agri-green transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-agri-green transition-colors">How it Works</Link></li>
                <li><Link to="/pricing" className="hover:text-agri-green transition-colors">Pricing</Link></li>
                <li><Link to="/success-stories" className="hover:text-agri-green transition-colors">Success Stories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/help-center" className="hover:text-agri-green transition-colors">Help Center</Link></li>
                <li><Link to="/api-docs" className="hover:text-agri-green transition-colors">API Documentation</Link></li>
                <li><Link to="/community" className="hover:text-agri-green transition-colors">Community Forum</Link></li>
                <li><Link to="/system-status" className="hover:text-agri-green transition-colors">System Status</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-agri-green mt-1 flex-shrink-0" />
                  <span>123 AgriTech Valley,<br/>Coimbatore, Tamil Nadu 641001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-agri-green flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-agri-green flex-shrink-0" />
                  <span>hello@sams.agri</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SAMS (Smart Agriculture Management System). All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookie-settings" className="hover:text-white transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-green">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4M3 5h4M19 3v4M17 5h4M5 19v4M3 21h4M19 19v4M17 21h4"/>
  </svg>
);

const FeatureCard = ({ image, icon, title, description }) => (
  <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="h-64 overflow-hidden relative">
      <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg text-agri-green">
        {icon}
      </div>
    </div>
    <div className="p-8">
      <h4 className="text-2xl font-display font-bold mb-4 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{description}</p>
    </div>
  </div>
);

export default LandingPage;
