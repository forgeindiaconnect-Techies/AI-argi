const mongoose = require('mongoose');

const cultivationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expectedHarvestDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Failed'],
    default: 'Active'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Cultivation', cultivationSchema);
