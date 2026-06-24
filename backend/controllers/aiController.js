const axios = require('axios');
const AiRecommendation = require('../models/AiRecommendation');
const Farm = require('../models/Farm');
const Soil = require('../models/Soil');

// @desc    Generate AI crop recommendations
// @route   POST /api/ai/recommend
// @access  Private
const generateRecommendations = async (req, res) => {
  try {
    const { farmId, weatherDataSnapshot } = req.body;

    const farm = await Farm.findById(farmId).populate('soilType');
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    if (farm.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'AI API key not configured' });
    }

    const prompt = `
      You are an expert agricultural AI. Based on the following farm details, recommend 3 highly or moderately suitable crops, and 1 unsuitable crop as a learning example.
      
      Farm Details:
      Location: ${farm.location}
      Soil Type: ${farm.soilType.name}
      Soil pH Range: ${farm.soilType.phRange?.min} - ${farm.soilType.phRange?.max}
      Water Availability: ${farm.waterAvailability}
      Irrigation Method: ${farm.irrigationMethod}
      Current Temperature: ${weatherDataSnapshot.temperature}°C
      Current Humidity: ${weatherDataSnapshot.humidity}%
      Weather Condition: ${weatherDataSnapshot.condition}

      Return ONLY a valid JSON array of objects. Each object MUST have the following keys:
      "cropName" (string),
      "suitabilityScore" (number 0-100),
      "riskLevel" (string: "Low", "Medium", "High"),
      "currentTemperature" (number),
      "humidity" (number),
      "rainfallPrediction" (number),
      "weatherCondition" (string),
      "soilPhLevel" (number),
      "waterRequirement" (string),
      "recommendedFertilizer" (string),
      "recommendedIrrigation" (string),
      "expectedYield" (string),
      "sowingPeriod" (string),
      "harvestDurationDays" (number),
      "estimatedCompletionDate" (string, ISO date format based on current date + duration),
      "pestAndDiseaseAlerts" (array of strings),
      "aiConfidenceScore" (number 0-100),
      "aiInsights": {
        "suitabilityReasoning": (string),
        "weatherImpact": (string),
        "soilCompatibility": (string),
        "waterAvailabilityImpact": (string),
        "riskFactorsAndMitigation": (string)
      }
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }
    );

    const textOutput = response.data.candidates[0].content.parts[0].text;
    const recommendations = JSON.parse(textOutput);

    // Save to DB
    const aiRecommendation = new AiRecommendation({
      user: req.user._id,
      farm: farmId,
      weatherDataSnapshot,
      recommendedCrops: recommendations
    });

    const savedRecommendation = await aiRecommendation.save();

    res.json(savedRecommendation);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error generating AI recommendations' });
  }
};

module.exports = { generateRecommendations };
