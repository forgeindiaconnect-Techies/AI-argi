const express = require('express');
const router = express.Router();
const { generateRecommendations, chatWithAi } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.route('/recommend')
  .post(protect, generateRecommendations);

router.post('/chat', chatWithAi);
router.post('/', chatWithAi);

module.exports = router;
