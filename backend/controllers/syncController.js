const DashboardSync = require('../models/DashboardSync');

// @desc    Sync user dashboard data to MongoDB
// @route   POST /api/sync
// @access  Public (for now)
const syncDashboardData = async (req, res) => {
  try {
    const { userId, syncedBy, farms, soilReports, weatherData, yieldHistory } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required for syncing' });
    }

    // Check if sync already exists for this user
    let syncData = await DashboardSync.findOne({ userId });

    if (syncData) {
      // Update existing record
      syncData.syncedBy = syncedBy || syncData.syncedBy;
      syncData.farms = farms || syncData.farms;
      syncData.soilReports = soilReports || syncData.soilReports;
      syncData.weatherData = weatherData || syncData.weatherData;
      syncData.yieldHistory = yieldHistory || syncData.yieldHistory;
      syncData.lastSync = Date.now();
      
      const updatedSync = await syncData.save();
      return res.status(200).json(updatedSync);
    } else {
      // Create new record
      syncData = new DashboardSync({
        userId,
        syncedBy,
        farms,
        soilReports,
        weatherData,
        yieldHistory,
        lastSync: Date.now()
      });
      
      const savedSync = await syncData.save();
      return res.status(201).json(savedSync);
    }
  } catch (error) {
    console.error('Error syncing dashboard data:', error);
    res.status(500).json({ message: 'Server error during sync', error: error.message });
  }
};

// @desc    Get all synced dashboard data (For Admin)
// @route   GET /api/sync
// @access  Public
const getSyncedData = async (req, res) => {
  try {
    // Return all syncs, sorted by most recent
    const allSyncs = await DashboardSync.find().sort({ lastSync: -1 });
    res.status(200).json(allSyncs);
  } catch (error) {
    console.error('Error fetching synced data:', error);
    res.status(500).json({ message: 'Server error fetching synced data', error: error.message });
  }
};

module.exports = {
  syncDashboardData,
  getSyncedData
};
