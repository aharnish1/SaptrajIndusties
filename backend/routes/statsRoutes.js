// Stats Routes - Express router for stats endpoints
const express = require('express');
const router = express.Router();

const {
  getStats,
  updateStats
} = require('../controllers/statsController');

// GET /stats - Retrieve current stats
router.get('/', getStats);

// PUT /stats - Update stats
router.put('/', updateStats);

module.exports = router;
