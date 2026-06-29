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

// @desc    Chat with AgriAI assistant in requested language
// @route   POST /api/ai/chat
// @access  Public/Private
const chatWithAi = async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lang = language || 'English';
    const groqKey = process.env.GROQAI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    // Try Groq API first (Fast & multilingual)
    if (groqKey && groqKey.startsWith('gsk_')) {
      try {
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: `You are AgriAI, an expert agriculture assistant for farmers. You MUST respond completely and fluently in ${lang}. Give practical, localized agricultural advice.` },
              { role: 'user', content: message }
            ]
          },
          {
            headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
            timeout: 8000
          }
        );
        if (response.data?.choices?.[0]?.message?.content) {
          return res.json({ reply: response.data.choices[0].message.content });
        }
      } catch (err) {
        console.warn('Groq API call failed, trying next:', err.message);
      }
    }

    // Try OpenAI API next
    if (openAiKey && openAiKey.startsWith('sk-') && !openAiKey.includes('dummy')) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are AgriAI, an expert agriculture assistant for farmers. You MUST respond completely and fluently in ${lang}. Give practical, localized agricultural advice.` },
              { role: 'user', content: message }
            ]
          },
          {
            headers: { 'Authorization': `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
            timeout: 8000
          }
        );
        if (response.data?.choices?.[0]?.message?.content) {
          return res.json({ reply: response.data.choices[0].message.content });
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local multilingual AI:', err.message);
      }
    }

    // Return 200 OK with null reply so frontend cleanly triggers local multilingual dictionary response
    res.json({ reply: null, fallback: true });
  } catch (error) {
    res.json({ reply: null, fallback: true });
  }
};

module.exports = { generateRecommendations, chatWithAi };
