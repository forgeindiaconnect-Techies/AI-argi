const express = require('express');
const router = express.Router();
const { getCultivations, createCultivation, updateCultivation } = require('../controllers/cultivationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCultivations)
  .post(protect, createCultivation);

router.route('/:id')
  .put(protect, updateCultivation);

module.exports = router;
