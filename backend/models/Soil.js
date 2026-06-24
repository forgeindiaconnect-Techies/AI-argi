const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Red Soil', 'Black Soil', 'Alluvial Soil', 'Laterite Soil', 'Sandy Soil', 'Clay Soil'],
    unique: true
  },
  description: String,
  phRange: {
    min: Number,
    max: Number
  },
  waterRetentionCapacity: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  nutrientInfo: String,
  suitableTempRange: {
    min: Number,
    max: Number
  },
  suitableHumidityRange: {
    min: Number,
    max: Number
  },
  suitableCrops: [String],
  averageHarvestDuration: String
}, { timestamps: true });

module.exports = mongoose.model('Soil', soilSchema);
