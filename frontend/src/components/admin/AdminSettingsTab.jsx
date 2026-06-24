import React, { useState } from 'react';
import { Settings, Database, Cpu, Bell, Shield, Save } from 'lucide-react';

const AdminSettingsTab = () => {
  const [activeTab, setActiveTab] = useState('System Configuration');

  const tabs = [
    'System Configuration', 'Crop Master Data', 'AI Configuration', 
    'Notification Settings', 'User Permissions'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Settings</h2>
        <button className="btn-primary flex items-center gap-2 text-sm bg-agri-green hover:bg-agri-green-dark">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab ? 'border-agri-green text-agri-green' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button onClick={() => setActiveTab('System Configuration')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'System Configuration' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <Settings className="w-4 h-4" /> System Config
          </button>
          <button onClick={() => setActiveTab('Crop Master Data')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'Crop Master Data' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <Database className="w-4 h-4" /> Crop Master Data
          </button>
          <button onClick={() => setActiveTab('AI Configuration')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'AI Configuration' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <Cpu className="w-4 h-4" /> AI Engine Config
          </button>
          <button onClick={() => setActiveTab('Notification Settings')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'Notification Settings' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button onClick={() => setActiveTab('User Permissions')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'User Permissions' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
            <Shield className="w-4 h-4" /> User Permissions
          </button>
        </div>

        <div className="md:col-span-3">
          {activeTab === 'System Configuration' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-bold border-b pb-4 dark:border-gray-800">General System Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform Name</label>
                  <input type="text" defaultValue="SAMS Admin Portal" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
                  <input type="email" defaultValue="support@sams-agri.com" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Measurement Unit</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <option>Metric (Hectares, mm)</option>
                    <option>Imperial (Acres, inches)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maintenance Mode</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <option>Off</option>
                    <option>On (Users cannot login)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'AI Configuration' && (
            <div className="card space-y-6">
              <h3 className="text-lg font-bold border-b pb-4 dark:border-gray-800">AI Model Parameters</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="font-bold">Yield Prediction Engine</h4>
                    <p className="text-sm text-gray-500">Enable predictive models for crop yield forecasting.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-agri-green"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="font-bold">Disease Risk Threshold</h4>
                    <p className="text-sm text-gray-500">Minimum probability required to trigger an alert.</p>
                  </div>
                  <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm">
                    <option>High (80%+)</option>
                    <option>Medium (60%+)</option>
                    <option>Low (40%+)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="font-bold">Auto-Generate Recommendations</h4>
                    <p className="text-sm text-gray-500">Allow AI to directly send fertilizer suggestions to farmers.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-agri-green"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'Crop Master Data' || activeTab === 'Notification Settings' || activeTab === 'User Permissions') && (
            <div className="card p-12 text-center text-gray-500 flex flex-col items-center">
              <Settings className="w-12 h-12 mb-4 opacity-20" />
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">{activeTab}</h3>
              <p className="max-w-md mx-auto mt-2">Configuration options for {activeTab.toLowerCase()} will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsTab;
