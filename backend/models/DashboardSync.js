const mongoose = require('mongoose');

const dashboardSyncSchema = new mongoose.Schema({
  syncedBy: {
    type: String,
    required: true,
    default: 'System Admin'
  },
  userId: {
    type: String,
    required: true
  },
  farms: {
    type: Array,
    default: []
  },
  soilReports: {
    type: Array,
    default: []
  },
  weatherData: {
    type: Object,
    default: {}
  },
  yieldHistory: {
    type: Array,
    default: []
  },
  aiReports: {
    type: Array,
    default: []
  },
  lastSync: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('DashboardSync', dashboardSyncSchema);
