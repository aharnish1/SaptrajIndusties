const express = require('express');
const router = express.Router();
const { 
  getSettings, 
  updateSettings, 
  getLegalEmail, 
  updateLegalEmail 
} = require('../controllers/settingsController');

router.get('/', getSettings);

router.put('/', updateSettings);

router.get('/legal-email', getLegalEmail);

router.put('/legal-email', updateLegalEmail);

router.patch('/legal-email', updateLegalEmail);

module.exports = router;