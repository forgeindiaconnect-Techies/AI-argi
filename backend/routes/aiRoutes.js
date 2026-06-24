const express = require('express');
const router = express.Router();
const { generateRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.route('/recommend')
  .post(protect, generateRecommendations);

module.exports = router;
