const axios = require('axios');

// @desc    Get weather for a specific location
// @route   GET /api/weather
// @access  Private
const getWeather = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfallProbability: data.clouds.all, // Approximation if probability not available
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getWeather };
