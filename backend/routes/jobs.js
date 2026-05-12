const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const jobApplicationController = require('../controllers/jobApplicationController');
const multer = require('../config/multer');
const { handleMulterError } = require('../config/multer');

// ============================================
// JOBS API
// ============================================

// ============================================
// JOBS API
// ============================================

// GET ALL JOBS
router.get('/', jobController.getAllJobs);

// CREATE JOB (no file upload needed)
router.post('/', jobController.createJob);

// ============================================
// JOB APPLICATIONS API
// ============================================

// CREATE JOB APPLICATION
router.post('/apply', 
  multer.uploadResumeFile,
  handleMulterError,
  jobApplicationController.createApplication
);

// GET ALL APPLICATIONS
router.get('/applications', jobApplicationController.getAllApplications);

// GET APPLICATION BY ID
router.get('/applications/:id', jobApplicationController.getApplicationById);

// UPDATE APPLICATION STATUS
router.put('/applications/:id/status', jobApplicationController.updateApplicationStatus);

// DELETE APPLICATION
router.delete('/applications/:id', jobApplicationController.deleteApplication);

// ============================================
// DYNAMIC JOB ROUTES (must be last)
// ============================================

// GET JOB BY ID
router.get('/:id', jobController.getJobById);

// UPDATE JOB
router.put('/:id', jobController.updateJob);

// DELETE JOB
router.delete('/:id', jobController.deleteJob);

module.exports = router;
