import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle, User, Activity, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [farmers, setFarmers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState({ name: '', email: '', status: 'Active' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const defaultFarmers = [
    { id: 'f_1', _id: 'f_1', name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', role: 'Farmer', status: 'Active', joinDate: '2026-06-15' },
    { id: 'f_2', _id: 'f_2', name: 'Suresh Reddy', email: 'suresh.r@agri.com', role: 'Farmer', status: 'Active', joinDate: '2026-06-18' },
    { id: 'f_3', _id: 'f_3', name: 'Anita Patel', email: 'anita.p@farms.in', role: 'Farmer', status: 'Pending', joinDate: '2026-06-20' },
    { id: 'f_4', _id: 'f_4', name: 'Vikram Singh', email: 'vikram.s@kisan.org', role: 'Farmer', status: 'Active', joinDate: '2026-06-22' }
  ];

  const fetchUsers = async () => {
    let localUsers = [];
    const stored = localStorage.getItem('sams_users');
    if (stored) {
      try { localUsers = JSON.parse(stored); } catch (e) { localUsers = defaultFarmers; }
    } else {
      localUsers = defaultFarmers;
      localStorage.setItem('sams_users', JSON.stringify(defaultFarmers));
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/users`, { timeout: 1500 });
      const formattedApi = data.map(u => ({
        ...u,
        id: u._id || u.id,
        joinDate: u.joinDate || new Date(u.createdAt || Date.now()).toISOString().split('T')[0],
        status: u.status || 'Active'
      }));

      // Merge local storage users (e.g. recent signups) with API users
      const userMap = new Map();
      formattedApi.forEach(u => userMap.set(u.email.toLowerCase(), u));
      localUsers.forEach(u => userMap.set(u.email.toLowerCase(), { ...userMap.get(u.email.toLowerCase()), ...u }));
      
      const combined = Array.from(userMap.values());
      setFarmers(combined);
      localStorage.setItem('sams_users', JSON.stringify(combined));
    } catch (error) {
      // Fallback silently to local management store
      setFarmers(localUsers);
    }
  };

  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentFarmer.name || !currentFarmer.email) return;

    let updatedList = [...farmers];
    let targetUser = { ...currentFarmer };

    if (currentFarmer.id && !currentFarmer.id.toString().startsWith('temp_')) {
      // Edit existing
      try {
        const { data } = await axios.put(`${API_BASE_URL}/api/users/${currentFarmer.id}`, currentFarmer, { timeout: 1500 });
        targetUser = { ...targetUser, ...data, id: data._id || currentFarmer.id };
      } catch (error) {
        // Fallback silently
      }
      updatedList = farmers.map(f => f.id === currentFarmer.id ? targetUser : f);
    } else {
      // Add new
      const newId = 'u_' + Date.now();
      targetUser = {
        ...currentFarmer,
        id: newId,
        _id: newId,
        role: 'Farmer',
        status: currentFarmer.status || 'Active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      try {
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, {
          ...currentFarmer,
          password: 'password123',
          role: 'Farmer'
        }, { timeout: 1500 });
        targetUser = { ...targetUser, ...data, id: data._id || targetUser.id };
      } catch (error) {
        // Fallback silently
      }
      updatedList = [targetUser, ...farmers];

      // Add admin notification
      const existingNotifs = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
      const newNotif = {
        id: Date.now(),
        title: 'New Farmer Added',
        message: `Admin added farmer "${targetUser.name}" (${targetUser.email}).`,
        time: new Date().toISOString(),
        isRead: false,
        type: 'user'
      };
      localStorage.setItem('sams_admin_notifications', JSON.stringify([newNotif, ...existingNotifs]));
    }

    setFarmers(updatedList);
    localStorage.setItem('sams_users', JSON.stringify(updatedList));
    setIsModalOpen(false);
  };

  const deleteFarmer = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/${id}`, { timeout: 1500 });
    } catch (error) {
      // Fallback silently
    }
    const updatedList = farmers.filter(f => f.id !== id);
    setFarmers(updatedList);
    localStorage.setItem('sams_users', JSON.stringify(updatedList));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Farmer Management</h2>
          <p className="text-sm text-gray-500">Manage all registered farmers on the SAMS platform.</p>
        </div>
        <button 
          onClick={() => { setCurrentFarmer({ name: '', email: '', status: 'Active' }); setIsModalOpen(true); }}
          className="btn-primary flex items-center gap-2 text-sm bg-agri-green hover:bg-agri-green-dark"
        >
          <Plus className="w-4 h-4" /> Add Farmer
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search farmers by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green"
            />
          </div>
          <span className="text-sm font-medium text-gray-500 hidden sm:block">
            Total Farmers: {farmers.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                <th className="p-4 font-medium">Farmer Profile</th>
                <th className="p-4 font-medium">Account Status</th>
                <th className="p-4 font-medium">Join Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
              {filteredFarmers.length > 0 ? (
                filteredFarmers.map(farmer => (
                  <tr key={farmer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-agri-green">
                          <User className="w-4 h-4"/>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200">{farmer.name}</p>
                          <p className="text-xs text-gray-500">{farmer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center w-max gap-1.5
                        ${farmer.status === 'Active' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 
                          farmer.status === 'Suspended' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                          'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                        {farmer.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                        {farmer.status === 'Suspended' && <XCircle className="w-3 h-3" />}
                        {farmer.status === 'Pending' && <Activity className="w-3 h-3" />}
                        {farmer.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{farmer.joinDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => { setCurrentFarmer(farmer); setIsModalOpen(true); }}
                          className="text-gray-400 hover:text-blue-500 transition-colors" 
                          title="Edit Farmer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteFarmer(farmer.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors" 
                          title="Delete Farmer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No farmers found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">{currentFarmer.id ? 'Edit Farmer' : 'Add New Farmer'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={currentFarmer.name} 
                  onChange={(e) => setCurrentFarmer({...currentFarmer, name: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green" 
                  placeholder="Jane Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={currentFarmer.email} 
                  onChange={(e) => setCurrentFarmer({...currentFarmer, email: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green" 
                  placeholder="jane@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  value={currentFarmer.status} 
                  onChange={(e) => setCurrentFarmer({...currentFarmer, status: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-agri-green"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1 bg-agri-green hover:bg-agri-green-dark">Save Farmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;
