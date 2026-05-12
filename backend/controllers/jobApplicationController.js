const JobApplication = require('../models/JobApplication');
const Job = require('../models/Job');

// Create new job application
const createApplication = async (req, res) => {
  try {
    console.log('🔍 JobApplicationController - Creating application:', req.body);
    console.log('🔍 JobApplicationController - Resume file:', req.file);
    console.log('🔍 JobApplicationController - Resume file path:', req.file?.path);
    console.log('🔍 JobApplicationController - Resume filename:', req.file?.filename);
    console.log('🔍 JobApplicationController - Resume file size:', req.file?.size);
    console.log('🔍 JobApplicationController - Resume file mimetype:', req.file?.mimetype);
    console.log('🔍 JobApplicationController - Resume file buffer length:', req.file?.buffer?.length);
    console.log('🔍 JobApplicationController - Resume stored path:', req.file ? `/uploads/resumes/${req.file.filename}` : null);
    console.log('🔍 JobApplicationController - Application data fields:', {
      jobId: req.body.jobId,
      jobTitle: req.body.jobTitle,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      linkedin: req.body.linkedin,
      portfolio: req.body.portfolio,
      coverLetter: req.body.coverLetter
    });
    
    // Find the job to get title
    const job = await Job.findById(req.body.jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    const applicationData = {
      jobId: req.body.jobId,
      jobTitle: job.title,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      resume: req.file ? `/uploads/resumes/${req.file.filename}` : null,
      coverLetter: req.body.coverLetter || null,
      linkedin: req.body.linkedin || null,
      portfolio: req.body.portfolio || null,
      status: 'Pending'
    };
    
    console.log('🔍 Backend Application Debug - Application data before save:', applicationData);
    
    const application = new JobApplication(applicationData);
    const savedApplication = await application.save();
    
    console.log('🔍 Backend Application Debug - Saved application:', {
      id: savedApplication._id,
      resume: savedApplication.resume,
      fullName: savedApplication.fullName,
      email: savedApplication.email
    });
    
    // Verify the uploaded file exists and has content
    if (req.file) {
      const fs = require('fs');
      const filePath = req.file.path;
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error('❌ File verification failed:', filePath, err);
        } else {
          fs.stat(filePath, (statErr, stats) => {
            if (statErr) {
              console.error('❌ File stat failed:', filePath, statErr);
            } else {
              console.log('✅ File verification success:', {
                path: filePath,
                size: stats.size,
                isReadable: stats.size > 0
              });
            }
          });
        }
      });
    }
    
    // Emit Socket.IO event for real-time notification
    const io = req.app.get('io');
    if (io) {
      console.log('📢 Emitting new job application notification to admin room');
      io.to('admin').emit('newJobApplication', {
        application: savedApplication,
        jobTitle: job.title,
        applicantName: req.body.fullName,
        timestamp: new Date(),
        message: `New application received for ${job.title}`
      });
    }
    
    console.log('🔍 JobApplicationController - Application created successfully:', savedApplication._id);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: savedApplication
    });
  } catch (error) {
    console.error('🔍 JobApplicationController - Error creating application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    console.log('🔍 JobApplicationController - Fetching all applications...');
    
    const { status, jobId, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (jobId) {
      filter.jobId = jobId;
    }
    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
        { currentCompany: { $regex: search, $options: 'i' } }
      ];
    }
    
    const applications = await JobApplication.find(filter)
      .populate('jobId', 'title department location')
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('🔍 JobApplicationController - Applications found:', applications.length);
    
    // Debug first few applications to check sorting and resume field
    console.log('🔍 JobApplicationController - First 3 applications:', applications.slice(0, 3).map(app => ({
      id: app._id,
      fullName: app.fullName,
      resume: app.resume,
      createdAt: app.createdAt,
      jobTitle: app.jobTitle
    })));
    
    res.json({
      success: true,
      data: applications,
      count: applications.length
    });
  } catch (error) {
    console.error('🔍 JobApplicationController - Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    console.log('🔍 JobApplicationController - Fetching application:', req.params.id);
    
    const application = await JobApplication.findById(req.params.id)
      .populate('jobId', 'title department location')
      .lean();
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('🔍 JobApplicationController - Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message
    });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    console.log('🔍 JobApplicationController - Updating application status:', req.params.id, req.body.status);
    console.log('🔍 JobApplicationController - Allowed enum values:', ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Hired']);
    console.log('🔍 JobApplicationController - Status validation:', {
      incoming: req.body.status,
      isValid: ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'].includes(req.body.status)
    });
    
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        notes: req.body.notes || application.notes
      },
      { new: true, runValidators: true }
    );
    
    console.log('🔍 JobApplicationController - Application status updated successfully:', updatedApplication._id);
    
    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    console.error('🔍 JobApplicationController - Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: error.message
    });
  }
};

// Delete application
const deleteApplication = async (req, res) => {
  try {
    console.log('🔍 JobApplicationController - Deleting application:', req.params.id);
    
    const application = await JobApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    await JobApplication.findByIdAndDelete(req.params.id);
    
    console.log('🔍 JobApplicationController - Application deleted successfully:', req.params.id);
    
    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('🔍 JobApplicationController - Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting application',
      error: error.message
    });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
};
