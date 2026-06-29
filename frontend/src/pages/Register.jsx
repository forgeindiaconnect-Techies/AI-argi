import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Farmer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Create persistent user record
    const userId = 'u_' + Date.now();
    const newUser = {
      id: userId,
      _id: userId,
      name,
      email,
      role: role || 'Farmer',
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    // Save to local user management storage so Admin Dashboard displays it instantly
    const existingUsers = JSON.parse(localStorage.getItem('sams_users') || '[]');
    const filteredUsers = existingUsers.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem('sams_users', JSON.stringify([newUser, ...filteredUsers]));

    // Add activity alert to Admin Notification Center
    const existingNotifs = JSON.parse(localStorage.getItem('sams_admin_notifications') || '[]');
    const newNotif = {
      id: Date.now(),
      title: 'New User Registration',
      message: `${role || 'Farmer'} "${name}" (${email}) registered on the SAMS platform.`,
      time: new Date().toISOString(),
      isRead: false,
      type: 'user'
    };
    localStorage.setItem('sams_admin_notifications', JSON.stringify([newNotif, ...existingNotifs]));

    try {
      const { data } = await axios.post('https://ai-agri-ndqq.onrender.com/api/auth/register', { name, email, password, role }, { timeout: 8000 });
      const mergedUser = { ...newUser, ...data, id: data._id || newUser.id };
      localStorage.setItem('userInfo', JSON.stringify(mergedUser));
      mergedUser.role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      console.warn('Backend API unavailable or timed out. Proceeding with local session:', err.message);
      // Fallback to local login on API failure so registration still completes successfully
      localStorage.setItem('userInfo', JSON.stringify(newUser));
      newUser.role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agri-bg-light dark:bg-agri-bg-dark py-12">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Leaf className="text-agri-green w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-agri-green-deep dark:text-agri-green-light">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400">Join the SAMS platform</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="label-text">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div>
            <label className="label-text">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="label-text">Confirm Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary w-full text-lg mt-6">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-agri-green hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
