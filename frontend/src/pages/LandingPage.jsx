import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, CloudRain, Cpu, BarChart3, ChevronRight, Sprout, MapPin, Mail, Phone, Sparkles, Play } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-100 font-sans selection:bg-agri-green selection:text-white">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-agri-green to-emerald-600 p-2 rounded-xl shadow-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-agri-green-deep to-emerald-500">SAMS</h1>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <a href="#home" className="text-gray-600 hover:text-agri-green dark:text-gray-300 dark:hover:text-agri-green-light transition-colors">Home</a>
          <a href="#about" className="text-gray-600 hover:text-agri-green dark:text-gray-300 dark:hover:text-agri-green-light transition-colors">About Us</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-agri-green dark:text-gray-300 dark:hover:text-agri-green-light transition-colors">How It Works</a>
          <a href="#contact" className="text-gray-600 hover:text-agri-green dark:text-gray-300 dark:hover:text-agri-green-light transition-colors">Contact Us</a>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/login" className="font-semibold text-gray-600 hover:text-agri-green dark:text-gray-300 dark:hover:text-agri-green-light transition-colors">Login</Link>
          <Link to="/register" className="btn-primary shadow-lg shadow-agri-green/30 hover:shadow-agri-green/50 transition-all rounded-full px-6 py-2">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-6 py-24 md:py-32 overflow-hidden flex items-center bg-[#F4FBED] dark:bg-agri-bg-dark">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-agri-green/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium text-sm mb-8 border border-green-200 dark:border-green-800">
              <Sparkles className="w-4 h-4" /> <span>Next Generation Farming AI</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-gray-900 dark:text-white leading-tight tracking-tight">
              Smart Agriculture <br className="hidden lg:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-green to-emerald-500">
                Management System
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              AI-powered crop recommendations for better farming decisions. Increase productivity, reduce water usage, and ensure optimal crop selection based on real-time data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-xl shadow-agri-green/20 hover:scale-105 transition-transform">
                Sign Up <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#video-demo" className="btn-outline text-lg px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Play className="w-5 h-5" /> Watch Video
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-agri-green/20 to-emerald-500/20 rounded-3xl blur-3xl transform -rotate-6"></div>
            <img src="/images/hero_dashboard.png" alt="SAMS Dashboard Preview" className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-1000" />
          </div>
        </div>
      </section>

      {/* Stats Section (New) */}
      <section id="about" className="py-12 border-y border-agri-green/20 dark:border-gray-800 bg-[#E8F5E9] dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="text-4xl font-black text-gray-900 dark:text-white mb-2">98%</p><p className="text-gray-500 font-medium text-sm">Prediction Accuracy</p></div>
          <div><p className="text-4xl font-black text-gray-900 dark:text-white mb-2">10k+</p><p className="text-gray-500 font-medium text-sm">Active Farmers</p></div>
          <div><p className="text-4xl font-black text-gray-900 dark:text-white mb-2">35%</p><p className="text-gray-500 font-medium text-sm">Yield Increase</p></div>
          <div><p className="text-4xl font-black text-gray-900 dark:text-white mb-2">24/7</p><p className="text-gray-500 font-medium text-sm">AI Monitoring</p></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-[#F8FDF7] dark:bg-agri-bg-darkSurface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to manage your farm efficiently and profitably with the power of artificial intelligence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/register" className="group block h-full">
              <FeatureCard 
                icon={<Leaf className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />}
                title="Soil Analysis"
                description="Detailed breakdown of soil properties, nutrients, and suitable crops to maximize your yield."
              />
            </Link>
            <Link to="/register" className="group block h-full">
              <FeatureCard 
                icon={<CloudRain className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform duration-500" />}
                title="Weather Monitoring"
                description="Real-time weather tracking utilizing OpenWeather API to plan your irrigation and harvesting."
              />
            </Link>
            <Link to="/register" className="group block h-full">
              <FeatureCard 
                icon={<Cpu className="w-10 h-10 text-purple-500 group-hover:scale-110 transition-transform duration-500" />}
                title="AI Recommendations"
                description="Intelligent crop suggestions based on your unique environment, market trends, and historical data."
              />
            </Link>
            <Link to="/register" className="group block h-full">
              <FeatureCard 
                icon={<BarChart3 className="w-10 h-10 text-orange-500 group-hover:scale-110 transition-transform duration-500" />}
                title="Dashboard Analytics"
                description="Track your cultivations, monitor harvest timelines effortlessly, and analyze profit margins."
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Demo Section (New) */}
      <section id="video-demo" className="px-6 py-24 bg-gradient-to-br from-[#0A2F1E] to-agri-green-deep text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white">See SAMS in Action</h3>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-12">Watch how our AI drone integration scans crop health and connects with your dashboard in real-time.</p>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-green-800 group cursor-pointer" onClick={() => alert('Video playback will begin shortly!')}>
            <img src="/images/ai_drone.png" alt="SAMS AI Drone Scanning" className="w-full h-auto object-cover aspect-video group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full bg-agri-green flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <Play className="w-10 h-10 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section (New) */}
      <section id="how-it-works" className="px-6 py-24 bg-[#FFFDF7] dark:bg-agri-bg-dark border-t border-orange-50 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How SAMS Works</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Three simple steps to transform your farming approach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>

            {[
              { icon: <MapPin />, title: "1. Add Your Farm", desc: "Enter your location, soil type, and land area to set up your profile." },
              { icon: <Cpu />, title: "2. Run AI Analysis", desc: "Our engine processes weather, soil data, and crop databases." },
              { icon: <Sprout />, title: "3. Grow Smart", desc: "Follow customized cultivation guides and track your progress to harvest." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 border-4 border-green-100 dark:border-gray-900 shadow-xl flex items-center justify-center text-agri-green mb-6">
                  {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (New) */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-agri-green-deep to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10"><Leaf className="w-64 h-64" /></div>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Modernize Your Farm?</h3>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">Join thousands of farmers making data-driven decisions. Start your journey towards sustainable and profitable agriculture today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-agri-green font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all relative z-10">
            Sign Up Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Modern Footer */}
      <footer id="contact" className="bg-[#1A1C19] text-gray-300 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-br from-agri-green to-emerald-600 p-2 rounded-xl shadow-lg">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-white">SAMS</h1>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Empowering farmers with Artificial Intelligence to make smarter, more sustainable agricultural decisions.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/register" className="text-gray-400 hover:text-agri-green transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-agri-green transition-colors">Login</Link></li>
              <li><a href="#features" className="text-gray-400 hover:text-agri-green transition-colors">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@sams.ai</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Coimbatore, TN</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-gray-800 text-center md:flex justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Smart Agriculture Management System. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="card h-full text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-agri-bg-darkSurface border border-gray-100 dark:border-gray-800 rounded-2xl p-8">
    <div className="flex justify-center mb-6">{icon}</div>
    <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
