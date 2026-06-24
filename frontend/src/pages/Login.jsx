import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ── Demo credentials (works without backend) ──────────────────
    const DEMO_USERS = [
      { email: 'admin@sams.com',  password: 'password123', role: 'Admin',  name: 'System Admin' },
      { email: 'farmer@sams.com', password: 'password123', role: 'Farmer', name: 'John Farmer'  },
    ];
    const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (demo) {
      localStorage.setItem('userInfo', JSON.stringify(demo));
      demo.role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
      return;
    }
    // ─────────────────────────────────────────────────────────────

    // Try real backend if demo didn't match
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      data.role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
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
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="btn-primary w-full text-lg mt-6">
            Login
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
