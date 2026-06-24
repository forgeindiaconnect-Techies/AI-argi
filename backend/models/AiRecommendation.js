const mongoose = require('mongoose');

const aiRecommendationSchema = new mongoose.Schema({
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
  weatherDataSnapshot: {
    temperature: Number,
    humidity: Number,
    rainfall: Number,
    condition: String
  },
  recommendedCrops: [{
    cropName: String,
    suitabilityScore: Number,
    reasoning: String,
    waterRequirement: String,
    fertilizerSuggestions: String,
    estimatedYield: String,
    harvestDurationMonths: Number,
    bestSowingPeriod: String,
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('AiRecommendation', aiRecommendationSchema);
