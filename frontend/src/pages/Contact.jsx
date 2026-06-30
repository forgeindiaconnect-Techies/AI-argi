import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Leaf, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      // Send notification to admin dashboard
      const existingNotifs = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
      const newNotif = {
        id: Date.now(),
        type: 'contact_inquiry',
        title: `New Inquiry from ${formData.firstName} ${formData.lastName}`,
        message: `Email: ${formData.email}\nMessage: ${formData.message}`,
        isRead: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      };
      
      localStorage.setItem('sams_admin_notifications', JSON.stringify([newNotif, ...existingNotifs].slice(0, 50)));

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-agri-bg-light dark:bg-agri-bg-dark text-gray-800 dark:text-gray-200">
      {/* Navigation */}
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

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions about SAMS? Want to schedule a personalized demo for your farm? Our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-agri-bg-darkSurface p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-start gap-6">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:support@sams.agri" className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg hover:underline">support@sams.agri</a>
                </div>
              </div>

              <div className="bg-white dark:bg-agri-bg-darkSurface p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-start gap-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600 dark:text-blue-400 shrink-0">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+18005550199" className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline">+1 (800) 555-0199</a>
                </div>
              </div>

              <div className="bg-white dark:bg-agri-bg-darkSurface p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-start gap-6">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full text-orange-600 dark:text-orange-400 shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Headquarters</h3>
                  <p className="text-gray-600 dark:text-gray-400">123 Innovation Drive<br />AgriTech Valley, CA 90210</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-agri-bg-darkSurface p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-agri-green outline-none transition-all text-gray-900 dark:text-white" 
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-agri-green outline-none transition-all text-gray-900 dark:text-white" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-agri-green outline-none transition-all text-gray-900 dark:text-white" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-agri-green outline-none transition-all text-gray-900 dark:text-white resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'btn-primary hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : isSuccess ? (
                    <>Message Sent! <CheckCircle className="w-5 h-5" /></>
                  ) : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
/ /   F o r c e   V e r c e l   r e b u i l d   f o r   C o n t a c t   f o r m  
 