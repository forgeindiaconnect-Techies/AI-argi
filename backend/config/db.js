const mongoose = require('mongoose');

const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Please check your MONGODB_URI environment variable in the Render dashboard.');
    // Don't exit - let the server stay alive so health checks pass
    // Requests will fail gracefully with 500 errors instead of crashing
  }
};

module.exports = connectDB;
