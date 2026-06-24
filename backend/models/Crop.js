const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  waterRequirement: String,
  fertilizerSuggestions: String,
  harvestDurationMonths: Number,
  riskFactors: String,
  suitableSoilTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Soil'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
