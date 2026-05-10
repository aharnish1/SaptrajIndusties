// Settings Routes - Express router for settings endpoints
const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');

// GET /settings - Retrieve current settings
router.get('/', getSettings);

// PUT /settings - Update settings
router.put('/', updateSettings);

module.exports = router;
