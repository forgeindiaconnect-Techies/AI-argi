const express = require('express');
const router = express.Router();
const { getCrops, createCrop, updateCrop, deleteCrop } = require('../controllers/cropController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCrops)
  .post(protect, admin, createCrop);

router.route('/:id')
  .put(protect, admin, updateCrop)
  .delete(protect, admin, deleteCrop);

module.exports = router;
