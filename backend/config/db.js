const mongoose = require('mongoose');

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
