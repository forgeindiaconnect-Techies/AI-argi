import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AIGuide from './pages/AIGuide';
import SoilTestingGuide from './pages/SoilTestingGuide';
import SeasonGuide from './pages/SeasonGuide';
import MarketGuide from './pages/MarketGuide';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import SuccessStories from './pages/SuccessStories';
import HelpCenter from './pages/HelpCenter';
import ApiDocs from './pages/ApiDocs';
import Community from './pages/Community';
import SystemStatus from './pages/SystemStatus';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieSettings from './pages/CookieSettings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/ai-guide" element={<AIGuide />} />
          <Route path="/guide/soil-testing" element={<SoilTestingGuide />} />
          <Route path="/guide/season-matching" element={<SeasonGuide />} />
          <Route path="/guide/market-demand" element={<MarketGuide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
