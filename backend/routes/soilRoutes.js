const express = require('express');
const router = express.Router();
const { getSoils, createSoil, updateSoil, deleteSoil } = require('../controllers/soilController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSoils)
  .post(protect, admin, createSoil);

router.route('/:id')
  .put(protect, admin, updateSoil)
  .delete(protect, admin, deleteSoil);

module.exports = router;
