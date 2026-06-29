// Centralized API configuration
// Defaults to local backend server (http://localhost:5000) which connects directly to MongoDB.
// In production, set VITE_API_URL in .env to your cloud URL (e.g., https://ai-agri-ndqq.onrender.com)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
