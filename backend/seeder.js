const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Soil = require('./models/Soil');
const connectDB = require('./config/db');

const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Soil.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('arun123', salt);

    // 1. Create Default Users
    const users = await User.insertMany([
      {
        name: 'Admin Arun',
        email: 'admin@sams.com',
        password: hashedPassword,
        role: 'Admin',
      },
      {
        name: 'Farmer Arun',
        email: 'farmer@sams.com',
        password: hashedPassword,
        role: 'Farmer',
      }
    ]);

    console.log('Users seeded successfully!');

    // 2. Create 6 Predefined Soil Types
    const soils = await Soil.insertMany([
      {
        name: 'Red Soil',
        description: 'Rich in iron oxide, good for dry farming.',
        phRange: { min: 5.5, max: 7.5 },
        waterRetentionCapacity: 'Low',
        nutrientInfo: 'Poor in nitrogen, phosphorous and humus.',
        suitableTempRange: { min: 20, max: 35 },
        suitableHumidityRange: { min: 40, max: 60 },
        suitableCrops: ['Cotton', 'Wheat', 'Rice', 'Pulses', 'Millets', 'Tobacco', 'Oilseeds'],
        averageHarvestDuration: '3-5 months'
      },
      {
        name: 'Black Soil',
        description: 'High clay content, highly retentive of moisture.',
        phRange: { min: 7.2, max: 8.5 },
        waterRetentionCapacity: 'High',
        nutrientInfo: 'Rich in calcium, potassium, and magnesium but poor in nitrogen.',
        suitableTempRange: { min: 15, max: 30 },
        suitableHumidityRange: { min: 50, max: 70 },
        suitableCrops: ['Cotton', 'Sugarcane', 'Tobacco', 'Wheat', 'Millets'],
        averageHarvestDuration: '4-6 months'
      },
      {
        name: 'Alluvial Soil',
        description: 'Highly fertile, formed by deposited silt from rivers.',
        phRange: { min: 6.5, max: 8.4 },
        waterRetentionCapacity: 'Medium',
        nutrientInfo: 'Adequate proportion of potash, phosphoric acid and lime.',
        suitableTempRange: { min: 10, max: 35 },
        suitableHumidityRange: { min: 50, max: 80 },
        suitableCrops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute'],
        averageHarvestDuration: '3-6 months'
      },
      {
        name: 'Laterite Soil',
        description: 'Found in areas with high temperature and heavy rainfall.',
        phRange: { min: 4.5, max: 6.5 },
        waterRetentionCapacity: 'Low',
        nutrientInfo: 'Poor in organic matter, nitrogen, phosphate and calcium.',
        suitableTempRange: { min: 25, max: 35 },
        suitableHumidityRange: { min: 60, max: 90 },
        suitableCrops: ['Tea', 'Coffee', 'Rubber', 'Coconut', 'Cashew'],
        averageHarvestDuration: 'Multi-year (Plantation)'
      },
      {
        name: 'Sandy Soil',
        description: 'Loose, well-aerated but poor water retention.',
        phRange: { min: 7.0, max: 8.5 },
        waterRetentionCapacity: 'Low',
        nutrientInfo: 'Low in organic matter and nutrients.',
        suitableTempRange: { min: 20, max: 40 },
        suitableHumidityRange: { min: 30, max: 50 },
        suitableCrops: ['Melons', 'Coconut', 'Cactus', 'Groundnut'],
        averageHarvestDuration: '2-4 months'
      },
      {
        name: 'Clay Soil',
        description: 'Heavy, high water retention, slow to warm up.',
        phRange: { min: 5.5, max: 7.0 },
        waterRetentionCapacity: 'High',
        nutrientInfo: 'Rich in nutrients but poor aeration.',
        suitableTempRange: { min: 15, max: 25 },
        suitableHumidityRange: { min: 50, max: 80 },
        suitableCrops: ['Rice', 'Broccoli', 'Cabbage', 'Peas'],
        averageHarvestDuration: '3-5 months'
      }
    ]);

    console.log('Soils seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
