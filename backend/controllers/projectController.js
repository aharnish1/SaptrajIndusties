const db = require('../data/mockData');

// Get all projects
const getProjects = (req, res) => {
  try {
    const { industry, status, search } = req.query;
    let filteredProjects = [...db.projects];

    if (industry && industry !== 'all') {
      filteredProjects = filteredProjects.filter(project => 
        project.industry.toLowerCase() === industry.toLowerCase()
      );
    }

    if (status && status !== 'all') {
      filteredProjects = filteredProjects.filter(project => 
        project.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredProjects,
      count: filteredProjects.length
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
const getProjectById = (req, res) => {
  try {
    const project = db.projects.find(p => p.id === parseInt(req.params.id));
    
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
const createProject = (req, res) => {
  try {
    const { title, client, industry, description, technologies, duration, value, images } = req.body;

    if (!title || !client || !industry) {
      return res.status(400).json({
        success: false,
        message: 'Title, client, and industry are required'
      });
    }

    const newProject = {
      id: Date.now(),
      title,
      client,
      industry,
      description: description || '',
      technologies: technologies || [],
      duration: duration || '',
      value: value || '',
      images: images || [],
      status: 'in-progress',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.projects.push(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
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
const updateProject = (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = db.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updatedProject = {
      ...db.projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    db.projects[projectIndex] = updatedProject;

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
const deleteProject = (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = db.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    db.projects.splice(projectIndex, 1);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// Get project industries
const getProjectIndustries = (req, res) => {
  try {
    const industries = [...new Set(db.projects.map(project => project.industry))];
    
    res.json({
      success: true,
      data: industries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching industries',
      error: error.message
    });
  }
};

// Get project statistics
const getProjectStats = (req, res) => {
  try {
    const stats = {
      total: db.projects.length,
      completed: db.projects.filter(p => p.status === 'completed').length,
      inProgress: db.projects.filter(p => p.status === 'in-progress').length,
      industries: [...new Set(db.projects.map(p => p.industry))].length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project statistics',
      error: error.message
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectIndustries,
  getProjectStats
};
