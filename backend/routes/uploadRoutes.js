const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple, deleteFile } = require('../controllers/uploadController');

// Upload single file
router.post('/single', uploadSingle);

// Upload multiple files
router.post('/multiple', uploadMultiple);

// Delete file
router.delete('/:filename', deleteFile);

module.exports = router;
