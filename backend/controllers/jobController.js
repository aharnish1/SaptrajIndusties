const Job = require('../models/Job');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    console.log('🔍 JobController - Fetching all jobs...');
    
    const { status, department, employmentType, location, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (department) {
      filter.department = { $regex: department, $options: 'i' };
    }
    
    if (employmentType) {
      filter.employmentType = employmentType;
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }
    
    const jobs = await Job.find(filter)
      .sort({ postedDate: -1 })
      .lean();
    
    console.log('🔍 JobController - Jobs found:', jobs.length);
    
    res.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (error) {
    console.error('🔍 JobController - Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    console.log('🔍 JobController - Fetching job:', req.params.id);
    
    const job = await Job.findById(req.params.id).lean();
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('🔍 JobController - Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

// Create new job
const createJob = async (req, res) => {
  try {
    console.log('=== BACKEND DEBUG ===');
    console.log('Received body:', req.body);
    console.log('Body type:', typeof req.body);
    console.log('Body keys:', Object.keys(req.body || {}));
    console.log('Required fields check:', {
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      employmentType: req.body.employmentType,
      experienceRequired: req.body.experienceRequired
    });
    
    // Ensure req.body exists and is valid
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body'
      });
    }
    
    // Safely extract and validate array fields
    const responsibilities = Array.isArray(req.body.responsibilities) 
      ? req.body.responsibilities.filter(r => r && r.trim()) 
      : [];
    
    const requirements = Array.isArray(req.body.requirements) 
      ? req.body.requirements.filter(r => r && r.trim()) 
      : [];
    
    const skills = Array.isArray(req.body.skills) 
      ? req.body.skills.filter(s => s && s.trim()) 
      : [];
    
    // Validate required fields first
    console.log("VALIDATION CHECK:", {
      title: req.body.title,
      department: req.body.department,
      location: req.body.location,
      employmentType: req.body.employmentType,
      experienceRequired: req.body.experienceRequired,
      titleFalsy: !req.body.title,
      departmentFalsy: !req.body.department,
      locationFalsy: !req.body.location,
      employmentTypeFalsy: !req.body.employmentType,
      experienceRequiredFalsy: !req.body.experienceRequired
    });
    
    const missingFields = [];
    if (!req.body.title || req.body.title?.trim() === '') missingFields.push('title');
    if (!req.body.department || req.body.department?.trim() === '') missingFields.push('department');
    if (!req.body.location || req.body.location?.trim() === '') missingFields.push('location');
    if (!req.body.employmentType || req.body.employmentType?.trim() === '') missingFields.push('employmentType');
    if (!req.body.experienceRequired || req.body.experienceRequired?.trim() === '') missingFields.push('experienceRequired');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const jobData = {
      title: req.body.title?.toString().trim(),
      department: req.body.department?.toString().trim(),
      location: req.body.location?.toString().trim(),
      employmentType: req.body.employmentType?.toString().trim(),
      experienceRequired: req.body.experienceRequired?.toString().trim(),
      salaryRange: {
        min: parseInt(req.body.salaryRange?.min || req.body.salaryMin || 0),
        max: parseInt(req.body.salaryRange?.max || req.body.salaryMax || 0),
        currency: req.body.salaryRange?.currency || req.body.salaryCurrency || 'USD'
      },
      description: req.body.description?.toString().trim() || '',
      responsibilities: responsibilities.length > 0 ? responsibilities : ['General responsibilities'],
      requirements: requirements.length > 0 ? requirements : ['Basic requirements'],
      skills: skills.length > 0 ? skills : ['Relevant skills'],
      status: req.body.status || 'Active',
      applicationDeadline: req.body.applicationDeadline 
        ? new Date(req.body.applicationDeadline) 
        : null
    };
    
    console.log('🔍 JobController - Processed job data:', jobData);
    
    const job = new Job(jobData);
    const savedJob = await job.save();
    
    console.log('🔍 JobController - Job created successfully:', savedJob._id);
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: savedJob
    });
  } catch (error) {
    console.error('🔍 JobController - Error creating job:', error);
    console.error('🔍 JobController - Error details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating job',
      error: error.message
    });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    console.log('🔍 JobController - Updating job:', req.params.id);
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Safely extract and validate array fields
    const responsibilities = Array.isArray(req.body.responsibilities) 
      ? req.body.responsibilities.filter(r => r && r.trim()) 
      : job.responsibilities;
    
    const requirements = Array.isArray(req.body.requirements) 
      ? req.body.requirements.filter(r => r && r.trim()) 
      : job.requirements;
    
    const skills = Array.isArray(req.body.skills) 
      ? req.body.skills.filter(s => s && s.trim()) 
      : job.skills;
    
    const updateData = {
      title: req.body.title?.toString().trim() || job.title,
      department: req.body.department?.toString().trim() || job.department,
      location: req.body.location?.toString().trim() || job.location,
      employmentType: req.body.employmentType?.toString().trim() || job.employmentType,
      experienceRequired: req.body.experienceRequired?.toString().trim() || job.experienceRequired,
      salaryRange: {
        min: req.body.salaryRange?.min || req.body.salaryMin || job.salaryRange.min,
        max: req.body.salaryRange?.max || req.body.salaryMax || job.salaryRange.max,
        currency: req.body.salaryRange?.currency || req.body.salaryCurrency || job.salaryRange.currency
      },
      description: req.body.description?.toString().trim() || job.description,
      responsibilities: responsibilities,
      requirements: requirements,
      skills: skills,
      status: req.body.status || job.status,
      applicationDeadline: req.body.applicationDeadline 
        ? new Date(req.body.applicationDeadline) 
        : job.applicationDeadline
    };
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    console.log('🔍 JobController - Job updated successfully:', updatedJob._id);
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    });
  } catch (error) {
    console.error('🔍 JobController - Error updating job:', error);
    console.error('🔍 JobController - Error details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating job',
      error: error.message
    });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    console.log('🔍 JobController - Deleting job:', req.params.id);
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    await Job.findByIdAndDelete(req.params.id);
    
    console.log('🔍 JobController - Job deleted successfully:', req.params.id);
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('🔍 JobController - Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
