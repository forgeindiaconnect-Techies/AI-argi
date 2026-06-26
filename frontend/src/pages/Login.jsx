import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://ai-agri-ndqq.onrender.com/api/auth/login';

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

        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs text-gray-500 text-center">
          <p className="font-semibold mb-1">Demo Credentials</p>
          <p>Admin: <span className="font-mono">admin@sams.com</span> / <span className="font-mono">password123</span></p>
          <p>Farmer: <span className="font-mono">farmer@sams.com</span> / <span className="font-mono">password123</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

