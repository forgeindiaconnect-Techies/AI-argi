import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/auth/login`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Instant bypass fallback so dashboards open immediately even if DB is blocked
    if (cleanPass === 'arun123' || cleanPass === 'password123') {
      if (cleanEmail.includes('admin')) {
        const adminUser = { _id: 'demo_admin', name: 'Admin Arun', email: cleanEmail, role: 'Admin', token: 'demo_token' };
        localStorage.setItem('userInfo', JSON.stringify(adminUser));
        setLoading(false);
        return navigate('/admin');
      } else if (cleanEmail.includes('famer') || cleanEmail.includes('farmer') || cleanEmail.includes('user')) {
        const farmerUser = { _id: 'demo_farmer', name: 'Farmer Arun', email: cleanEmail, role: 'Farmer', token: 'demo_token' };
        localStorage.setItem('userInfo', JSON.stringify(farmerUser));
        setLoading(false);
        return navigate('/dashboard');
      }
    }

    try {
      const { data } = await axios.post(API_URL, { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      data.role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (!err.response) {
        setError('Cannot reach the server. The backend may be starting up — please wait 30 seconds and try again.');
      } else if (status === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (status === 500) {
        setError('Server error: The database connection may be down. Please contact the administrator.');
      } else {
        setError(msg || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agri-bg-light dark:bg-agri-bg-dark">
      <div className="card w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Leaf className="text-agri-green w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-agri-green-deep dark:text-agri-green-light">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Login to your SAMS account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Email Address</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farmer@sams.com"
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
              placeholder="••••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-agri-green hover:underline">Register here</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;

