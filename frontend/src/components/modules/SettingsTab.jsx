import React, { useState, useEffect } from 'react';
import { User, Moon, BellRing, X, Check, AlertTriangle, Globe, Ruler, Shield, HardDrive, LogOut } from 'lucide-react';

const SettingsTab = ({ profileName, setProfileName, profileEmail, setProfileEmail, handleLogout }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(profileName);
  const [editEmail, setEditEmail] = useState(profileEmail);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [language, setLanguage] = useState('English');
  const [measurement, setMeasurement] = useState('Acres');
  
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sams-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem('sams-dark-mode');
    if (saved !== null) {
      const isDark = JSON.parse(saved);
      setDarkMode(isDark);
    }
  }, []);

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim()) return;
    setProfileName(editName.trim());
    setProfileEmail(editEmail.trim());
    setIsEditingProfile(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleDownloadData = (fileName) => {
    const dummyData = JSON.stringify({ 
      status: "Success",
      type: fileName,
      message: "This is a simulated data download for " + fileName, 
      timestamp: new Date().toISOString() 
    }, null, 2);
    const blob = new Blob([dummyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h3 className="text-xl font-bold">System Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile & Preferences */}
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h5 className="font-bold flex items-center gap-2 mb-6 border-b dark:border-gray-700 pb-4">
              <User className="w-5 h-5"/> Profile Information
            </h5>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-agri-green flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {getInitials(profileName)}
              </div>
              {isEditingProfile ? (
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="label-text">Full Name</label>
                    <input type="text" className="input-field" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
                  </div>
                  <div>
                    <label className="label-text">Email Address</label>
                    <input type="email" className="input-field" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2 text-sm py-1.5"><Check className="w-4 h-4" /> Save</button>
                    <button onClick={() => setIsEditingProfile(false)} className="btn-outline flex items-center gap-2 text-sm py-1.5"><X className="w-4 h-4" /> Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{profileName}</h4>
                    <p className="text-gray-500">{profileEmail}</p>
                  </div>
                  <button onClick={() => setIsEditingProfile(true)} className="btn-outline text-sm">Edit Profile</button>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h5 className="font-bold flex items-center gap-2 mb-6 border-b dark:border-gray-700 pb-4">
              <Globe className="w-5 h-5"/> Regional & Display
            </h5>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">Language Selection</label>
                  <select className="input-field" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="label-text flex items-center gap-1"><Ruler className="w-4 h-4"/> Measurement Units</label>
                  <select className="input-field" value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
                    <option>Acres (Imperial)</option>
                    <option>Hectares (Metric)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-gray-500"/> 
                  <span className="font-medium">Dark Mode Theme</span>
                </div>
                <button
                  onClick={() => setDarkMode(prev => !prev)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-agri-green' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${darkMode ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h5 className="font-bold flex items-center gap-2 mb-6 border-b dark:border-gray-700 pb-4">
              <BellRing className="w-5 h-5"/> Notification Preferences
            </h5>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-agri-green rounded focus:ring-agri-green" defaultChecked />
                <div className="flex-1">
                  <p className="font-medium">Weather Alerts</p>
                  <p className="text-xs text-gray-500">Immediate warnings for heavy rain, storms, or frost.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-agri-green rounded focus:ring-agri-green" defaultChecked />
                <div className="flex-1">
                  <p className="font-medium">Irrigation Reminders</p>
                  <p className="text-xs text-gray-500">Notifications based on soil moisture and schedule.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-agri-green rounded focus:ring-agri-green" />
                <div className="flex-1">
                  <p className="font-medium">Market Price Updates</p>
                  <p className="text-xs text-gray-500">Weekly digest of crop pricing in local mandis.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Security & Data */}
        <div className="space-y-6">
          <div className="card">
            <h5 className="font-bold flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-500"/> Security
            </h5>
            <button className="w-full btn-outline mb-3">Change Password</button>
          </div>

          <div className="card">
            <h5 className="font-bold flex items-center gap-2 mb-4">
              <HardDrive className="w-5 h-5 text-purple-500"/> Data Management
            </h5>
            <p className="text-xs text-gray-500 mb-4">Download a copy of your farm data, soil reports, and AI analysis history.</p>
            <button 
              onClick={() => handleDownloadData('farm_backup_data.json')}
              className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg transition-colors text-sm font-medium mb-3"
            >
              Backup Data
            </button>
            <button 
              onClick={() => handleDownloadData('restore_template.json')}
              className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Restore from Backup
            </button>
          </div>

          <div className="card border-red-200 bg-red-50/30 dark:bg-red-900/10">
            <h5 className="font-bold flex items-center gap-2 mb-4 text-red-500">
              <AlertTriangle className="w-5 h-5"/> Danger Zone
            </h5>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:border-red-800 dark:hover:bg-red-900/40 text-sm font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-agri-bg-darkSurface rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200 dark:border-gray-700 animate-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="text-lg font-bold text-red-600">Delete Account</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Are you sure you want to delete your account?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action is permanent and cannot be undone. All your farm data, settings, and history will be lost forever.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn-outline text-sm">Cancel</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-md">
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
