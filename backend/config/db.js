const mongoose = require('mongoose');

const connectDB = async () => {
  // In production (Render/cloud), use MONGODB_ATLAS_URI.
  // In local development, prefer MONGODB_ATLAS_URI for unified data, fallback to local.
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;

  const atlasUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;
  const localUri = 'mongodb://127.0.0.1:27017/ai_agri';

  const primaryUri = atlasUri && atlasUri !== 'YOUR_ATLAS_URI_HERE' ? atlasUri : localUri;
  const fallbackUri = isProduction ? null : localUri; // No local fallback in production

  const tryConnect = async (uri, label) => {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
      });
      console.log(`✅ MongoDB Connected [${label}]: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.error(`❌ MongoDB [${label}] failed: ${error.message}`);
      return false;
    }
  };

  // Try primary (Atlas) first
  const primaryLabel = primaryUri === localUri ? 'LOCAL' : 'ATLAS';
  const connected = await tryConnect(primaryUri, primaryLabel);

  // Fallback to local only in dev when Atlas fails
  if (!connected && fallbackUri && primaryUri !== fallbackUri) {
    console.warn('⚠️  Falling back to local MongoDB...');
    const fallbackOk = await tryConnect(fallbackUri, 'LOCAL FALLBACK');
    if (!fallbackOk) {
      console.error('❌ All database connections failed. API endpoints will return 500 errors.');
      console.error('   Fix: Whitelist your IP in MongoDB Atlas → Network Access → Add 0.0.0.0/0');
    }
  } else if (!connected) {
    console.error('❌ MongoDB Atlas connection failed. Check MONGODB_ATLAS_URI and Atlas IP whitelist.');
  }
};

module.exports = connectDB;
