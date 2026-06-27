const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getWeather);

module.exports = router;
