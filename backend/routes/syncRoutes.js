const express = require('express');
const router = express.Router();
const { syncDashboardData, getSyncedData } = require('../controllers/syncController');

router.route('/')
  .post(syncDashboardData)
  .get(getSyncedData);

module.exports = router;
