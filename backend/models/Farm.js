const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  landArea: {
    type: Number,
    required: true
  },
  waterAvailability: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  irrigationMethod: {
    type: String,
    required: true
  },
  soilType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Soil',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);
