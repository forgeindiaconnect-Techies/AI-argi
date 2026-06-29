const mongoose = require('mongoose');

const connectDB = async () => {
  // In production (Render/cloud), use MONGODB_ATLAS_URI.
  // In local development, fall back to MONGODB_URI (127.0.0.1).
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
  const uri = isProduction
    ? (process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI)
    : (process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI);

  if (!uri || uri === 'YOUR_ATLAS_URI_HERE') {
    console.error('❌ MONGODB_URI is not set or is a placeholder. Please configure your database URI.');
    console.error('   Local dev: set MONGODB_URI=mongodb://127.0.0.1:27017/ai_agri');
    console.error('   Production: set MONGODB_ATLAS_URI=mongodb+srv://... in your Render dashboard');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    const env = isProduction ? 'PRODUCTION (Atlas)' : 'LOCAL';
    console.log(`✅ MongoDB Connected [${env}]: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.error('   Check your MONGODB_URI / MONGODB_ATLAS_URI and ensure the IP is whitelisted in Atlas.');
    // Don't exit — server stays alive so health checks pass
  }
};

module.exports = connectDB;
