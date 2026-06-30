import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, Shield } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="w-1.5 h-7 bg-agri-green rounded-full inline-block"></span>
      {title}
    </h2>
    <div className="text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed pl-4">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-200">
    <nav className="glass sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-agri-green to-emerald-500 p-2.5 rounded-xl shadow-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-agri-green-deep to-emerald-500">SAMS</h1>
        </Link>
      </div>
      <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-agri-green font-medium transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Home
      </Link>
    </nav>

    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-agri-green/10 text-agri-green mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: June 30, 2025</p>
        </div>

        <div className="bg-white dark:bg-agri-bg-darkSurface rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-10 md:p-14">
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
            Welcome to SAMS (Smart Agriculture Management System). We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you use our platform.
          </p>

          <Section title="1. Information We Collect">
            <p><strong>Account Information:</strong> When you register, we collect your name, email address, phone number, and Aadhaar number for identity verification purposes.</p>
            <p><strong>Farm Data:</strong> To provide agricultural recommendations, we collect data about your farm location, soil composition, crop history, and yield records.</p>
            <p><strong>Usage Data:</strong> We automatically collect information about how you interact with the platform, including pages visited, features used, and time spent.</p>
            <p><strong>Device Information:</strong> We may collect device type, browser version, and IP address for security and analytics.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your data to provide and improve our AI-powered farming recommendations, personalize your dashboard experience, process your account registrations and manage your profile, send you important service notifications and updates, conduct analytics to improve our prediction models, and comply with legal obligations under Indian data protection laws.</p>
          </Section>

          <Section title="3. Aadhaar Data & Biometric Information">
            <p>SAMS collects Aadhaar numbers strictly for identity verification. We do not store biometric data. Your Aadhaar number is encrypted at rest using AES-256 encryption and is never shared with third parties except as required by law or UIDAI regulations.</p>
          </Section>

          <Section title="4. Data Sharing">
            <p>We do not sell your personal data. We may share anonymized, aggregate farm data with agricultural research institutions to improve crop science. We engage trusted third-party services (cloud hosting, analytics) who are contractually bound to handle your data securely.</p>
          </Section>

          <Section title="5. Data Security">
            <p>We implement industry-standard security measures including SSL/TLS encryption for all data in transit, AES-256 encryption for data at rest, role-based access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your account data for as long as your account is active or as needed to provide services. Farm and yield history data is retained for 7 years for agricultural analysis purposes. You may request deletion of your account and associated data at any time.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to access, correct, or delete your personal data. You may export your farm data at any time from the dashboard. To exercise any of these rights, contact us at <a href="mailto:privacy@sams.agri" className="text-agri-green hover:underline">privacy@sams.agri</a>.</p>
          </Section>

          <Section title="8. Cookies">
            <p>We use essential cookies to keep you logged in and remember your preferences. Analytics cookies help us understand usage patterns. You can manage cookie preferences at any time via our <Link to="/cookie-settings" className="text-agri-green hover:underline">Cookie Settings</Link> page.</p>
          </Section>

          <Section title="9. Contact Us">
            <p>If you have questions about this Privacy Policy, please contact our Data Protection Officer at <a href="mailto:privacy@sams.agri" className="text-agri-green hover:underline">privacy@sams.agri</a> or write to us at 123 AgriTech Valley, Coimbatore, Tamil Nadu 641001, India.</p>
          </Section>
        </div>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
