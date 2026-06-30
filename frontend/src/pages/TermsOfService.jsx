import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, FileText } from 'lucide-react';

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

const TermsOfService = () => (
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
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: June 30, 2025</p>
        </div>

        <div className="bg-white dark:bg-agri-bg-darkSurface rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-10 md:p-14">
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
            Please read these Terms of Service carefully before using the SAMS platform. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part, you may not access the service.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>By creating an account and using SAMS, you confirm that you are at least 18 years of age, that you have read and understood these Terms, and that you agree to comply with and be legally bound by them.</p>
          </Section>

          <Section title="2. Use of the Platform">
            <p>SAMS grants you a limited, non-exclusive, non-transferable license to access and use the platform for your personal agricultural management needs. You agree not to copy, modify, or distribute any part of the service, use the platform for any unlawful purpose, attempt to gain unauthorized access to any part of the service, or interfere with or disrupt the integrity of the platform.</p>
          </Section>

          <Section title="3. User Accounts & Aadhaar Verification">
            <p>You are responsible for maintaining the confidentiality of your account credentials. Aadhaar-based verification is used to ensure that each account represents a real, unique farmer. Providing false Aadhaar information is a violation of both these Terms and Indian law (Aadhaar Act, 2016). SAMS reserves the right to suspend or terminate accounts found to be fraudulent.</p>
          </Section>

          <Section title="4. Farm Data & AI Recommendations">
            <p>The AI-generated crop recommendations, soil analyses, and yield predictions provided by SAMS are advisory in nature only. Farming decisions involve many variables beyond our platform's control. SAMS is not liable for crop losses, financial losses, or other damages arising from following or not following our recommendations. Always consult with a qualified agricultural expert for major decisions.</p>
          </Section>

          <Section title="5. Subscription & Payments">
            <p>Certain features of SAMS may require a paid subscription. All fees are stated in Indian Rupees (INR) and are inclusive of applicable GST. Subscriptions auto-renew unless cancelled 24 hours before the renewal date. Refund requests must be made within 7 days of purchase and are subject to our discretion.</p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content on the SAMS platform, including but not limited to the AI models, recommendation algorithms, user interface design, logos, and text, is the exclusive intellectual property of SAMS and its licensors. You may not reproduce, distribute, or create derivative works without explicit written permission.</p>
          </Section>

          <Section title="7. Data Ownership">
            <p>You retain full ownership of your farm data. By using SAMS, you grant us a non-exclusive license to process and analyze your data to provide and improve the service. We may use anonymized, aggregated data for agricultural research purposes. See our <Link to="/privacy-policy" className="text-agri-green hover:underline">Privacy Policy</Link> for details.</p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>To the fullest extent permitted by applicable law, SAMS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, or goodwill, resulting from your access to or use of (or inability to access or use) the service.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu, India.</p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. We will notify you of material changes via email or in-app notification at least 15 days in advance. Your continued use of the platform after changes take effect constitutes your acceptance of the revised Terms.</p>
          </Section>

          <Section title="11. Contact">
            <p>For questions about these Terms, contact us at <a href="mailto:legal@sams.agri" className="text-agri-green hover:underline">legal@sams.agri</a>.</p>
          </Section>
        </div>
      </div>
    </section>
  </div>
);

export default TermsOfService;
