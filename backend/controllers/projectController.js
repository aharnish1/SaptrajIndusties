const Project = require('../models/Project');
const { deleteOldImage } = require('../config/multer');

// ============================================
// GET ALL PROJECTS
// ============================================
const getProjects = async (req, res) => {
  try {

    const {
      category,
      status,
      featured,
      search,
      page = 1,
      limit = 10
    } = req.query;

    // ============================================
    // BUILD QUERY
    // ============================================
    const query = {};

    // CATEGORY
    if (
      category &&
      category !== 'all'
    ) {
      query.category = category;
    }

    // STATUS
    if (
      status &&
      status !== 'all'
    ) {
      query.status = status;
    }

    // FEATURED
    if (
      featured !== undefined
    ) {
      query.featured =
        featured === 'true';
    }

    // ============================================
    // SAFE SEARCH
    // ============================================
    if (
      search &&
      typeof search ===
        'string' &&
      search.trim() !== ''
    ) {

      const safeSearch =
        search.trim();

      query.$or = [
        {
          title: {
            $regex: safeSearch,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: safeSearch,
            $options: 'i'
          }
        },
        {
          client: {
            $regex: safeSearch,
            $options: 'i'
          }
        },
        {
          category: {
            $regex: safeSearch,
            $options: 'i'
          }
        }
      ];
    }

    // ============================================
    // PAGINATION
    // ============================================
    const pageNumber =
      parseInt(page) || 1;

    const limitNumber =
      parseInt(limit) || 10;

    // ============================================
    // FETCH PROJECTS
    // ============================================
    const projects =
      await Project.find(query)
        .sort({
          createdAt: -1
        })
        .limit(limitNumber)
        .skip(
          (pageNumber - 1) *
            limitNumber
        );

    const total =
      await Project.countDocuments(
        query
      );

    // ============================================
    // RESPONSE
    // ============================================
    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length,
      total,
      page: pageNumber,
      pages: Math.ceil(
        total / limitNumber
      )
    });

  } catch (error) {

    console.error(
      'Error fetching projects:',
      error
    );

    res.status(500).json({
      success: false,
      message:
        'Error fetching projects',
      error: error.message
    });
  }
};

// ============================================
// GET PROJECT BY ID
// ============================================
const getProjectById = async (
  req,
  res
) => {
  try {

    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Error fetching project',
      error: error.message
    });
  }
};

// ============================================
// CREATE PROJECT
// ============================================
const createProject = async (
  req,
  res
) => {
  try {

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

    let imagePath = '';

    if (req.file) {
      imagePath = `uploads/projects/${req.file.filename}`;
    }

    if (
      !title ||
      !category ||
      !client
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Title, category, and client are required'
      });
    }

    const newProject =
      new Project({
        title,
        category,
        client,
        description:
          description || '',

        technologies:
          Array.isArray(
            technologies
          )
            ? technologies
            : technologies
            ? technologies
                .split(',')
                .map((tech) =>
                  tech.trim()
                )
                .filter(
                  (tech) => tech
                )
            : [],

        location:
          location || '',

        completionDate:
          completionDate ||
          null,

        images: images || [],

        image: imagePath,

        status:
          status || 'Active',

        featured:
          featured || false
      });

    const savedProject =
      await newProject.save();

    res.status(201).json({
      success: true,
      message:
        'Project created successfully',
      data: savedProject
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Error creating project',
      error: error.message
    });
  }
};

// ============================================
// UPDATE PROJECT
// ============================================
const updateProject = async (
  req,
  res
) => {
  try {

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

    const currentProject =
      await Project.findById(
        req.params.id
      );

    if (!currentProject) {
      return res.status(404).json({
        success: false,
        message:
          'Project not found'
      });
    }

    let imagePath =
      currentProject.image;

    if (req.file) {

      if (
        currentProject.image
      ) {
        await deleteOldImage(
          currentProject.image
        );
      }

      imagePath = `uploads/projects/${req.file.filename}`;
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          title,
          category,
          client,
          description,

          technologies:
            Array.isArray(
              technologies
            )
              ? technologies
              : technologies
              ? technologies
                  .split(',')
                  .map((tech) =>
                    tech.trim()
                  )
                  .filter(
                    (tech) =>
                      tech
                  )
              : [],

          location,
          completionDate,
          images,
          image: imagePath,
          status,
          featured
        },
        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({
      success: true,
      message:
        'Project updated successfully',
      data: updatedProject
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Error updating project',
      error: error.message
    });
  }
};

// ============================================
// DELETE PROJECT
// ============================================
const deleteProject = async (
  req,
  res
) => {
  try {

    const deletedProject =
      await Project.findByIdAndDelete(
        req.params.id
      );

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message:
          'Project not found'
      });
    }

    if (
      deletedProject.image
    ) {
      await deleteOldImage(
        deletedProject.image
      );
    }

    res.status(200).json({
      success: true,
      message:
        'Project deleted successfully',
      data: deletedProject
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Error deleting project',
      error: error.message
    });
  }
};

// ============================================
// GET PROJECT CATEGORIES
// ============================================
const getProjectCategories =
  async (req, res) => {
    try {

      const categories =
        await Project.distinct(
          'category'
        );

      res.status(200).json({
        success: true,
        data: categories
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          'Error fetching categories',
        error: error.message
      });
    }
  };

// ============================================
// GET PROJECT STATS
// ============================================
const getProjectStats =
  async (req, res) => {
    try {

      const total =
        await Project.countDocuments();

      const completed =
        await Project.countDocuments(
          {
            status:
              'Completed'
          }
        );

      const inProgress =
        await Project.countDocuments(
          {
            status:
              'In Progress'
          }
        );

      const active =
        await Project.countDocuments(
          {
            status: 'Active'
          }
        );

      const onHold =
        await Project.countDocuments(
          {
            status: 'On Hold'
          }
        );

      const featured =
        await Project.countDocuments(
          {
            featured: true
          }
        );

      const categories =
        await Project.distinct(
          'category'
        );

      res.status(200).json({
        success: true,
        data: {
          total,
          completed,
          inProgress,
          active,
          onHold,
          featured,
          categories:
            categories.length
        }
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          'Error fetching project stats',
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
  getProjectCategories,
  getProjectStats
};