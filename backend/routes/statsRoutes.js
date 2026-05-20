const express = require('express');
const router = express.Router();

const {
  getStats,
  getDashboardStats,
  updateStats
} = require('../controllers/statsController');

router.get('/', getStats);
router.get('/dashboard', getDashboardStats);
router.put('/', updateStats);

module.exports = router;