const Project = require('../models/Project');
const { deleteOldImage } = require('../config/multer');

// Get all projects
const getProjects = async (req, res) => {
  try {
    const { category, status, featured, search, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (search) {
      query.$text = search;
    }
    
    // Execute query with pagination
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Project.countDocuments(query);
    
    res.json({
      success: true,
      data: projects,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    console.log('=== CREATE PROJECT DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const { 
      title, 
      category, 
      client, 
      description, 
      technologies, 
      location, 
      completionDate, 
      images, 
      status, 
      featured 
    } = req.body;
    
    // Handle image upload
    let imagePath = '';
    if (req.file) {
      imagePath = `uploads/projects/${req.file.filename}`;
    }

    if (!title || !category || !client) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and client are required'
      });
    }

    const newProject = new Project({
      title,
      category,
      client,
      description: description || '',
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : []),
      location: location || '',
      completionDate: completionDate || null,
      images: images || [],
      image: imagePath,
      status: status || 'Active',
      featured: featured || false
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    console.log('=== UPDATE PROJECT DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const { 
      title, 
      category, 
      client, 
      description, 
      technologies, 
      location, 
      completionDate, 
      images, 
      status, 
      featured 
    } = req.body;
    
    // Find the current project to get old image path
    const currentProject = await Project.findById(req.params.id);
    if (!currentProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Handle image upload
    let imagePath = currentProject.image; // Keep existing image by default
    if (req.file) {
      // Delete old image if it exists
      if (currentProject.image) {
        await deleteOldImage(currentProject.image);
      }
      imagePath = `uploads/projects/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        client,
        description,
        technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : []),
        location,
        completionDate,
        images,
        image: imagePath,
        status,
        featured
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete associated image if it exists
    if (deletedProject.image) {
      await deleteOldImage(deletedProject.image);
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// Get project categories
const getProjectCategories = async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get project statistics
const getProjectStats = async (req, res) => {
  try {
    console.log('🔍 Project Stats Debug - Function called');
    
    // Safe count queries with fallbacks
    const total = await Project.countDocuments().catch(() => 0);
    const completed = await Project.countDocuments({ status: 'Completed' }).catch(() => 0);
    const inProgress = await Project.countDocuments({ status: 'In Progress' }).catch(() => 0);
    const active = await Project.countDocuments({ status: 'Active' }).catch(() => 0);
    const onHold = await Project.countDocuments({ status: 'On Hold' }).catch(() => 0);
    const featured = await Project.countDocuments({ featured: true }).catch(() => 0);
    
    const categories = await Project.distinct('category').catch(() => []);
    
    const result = {
      total,
      completed,
      inProgress,
      active,
      onHold,
      featured,
      categories: categories.length
    };
    
    console.log('🔍 Project Stats Debug - Final result:', result);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('🔍 Project Stats Debug - Error occurred:', error);
    console.error('🔍 Project Stats Debug - Error stack:', error.stack);
    
    // Return fallback data instead of crashing
    const fallbackResult = {
      total: 0,
      completed: 0,
      inProgress: 0,
      active: 0,
      onHold: 0,
      featured: 0,
      categories: 0
    };
    
    res.status(200).json({
      success: true,
      data: fallbackResult,
      warning: 'Using fallback data due to error'
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectCategories,
  getProjectStats
};
