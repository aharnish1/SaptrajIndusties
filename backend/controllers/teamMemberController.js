const TeamMember = require('../models/TeamMember');
const { deleteOldImage } = require('../config/multer');

// Get all team members
const getTeamMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10, activeOnly = false } = req.query;
    
    // Build query
    const query = {};
    
    if (activeOnly === 'true') {
      query.isActive = true;
    }
    
    // Execute query with pagination and sorting
    const teamMembers = await TeamMember.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await TeamMember.countDocuments(query);
    
    res.json({
      success: true,
      data: teamMembers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message
    });
  }
};

// Get team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message
    });
  }
};

// Create new team member
const createTeamMember = async (req, res) => {
  try {
    console.log('🔍 TeamMemberController - Creating team member:', req.body);
    console.log('🔍 TeamMemberController - Uploaded file:', req.file);
    
    const teamMemberData = {
      name: req.body.name,
      designation: req.body.designation,
      bio: req.body.bio,
      experience: req.body.experience || null,
      order: req.body.order ? parseInt(req.body.order) : 0,
      isActive: req.body.isActive !== 'false',
      image: req.file ? `/uploads/team-members/${req.file.filename}` : null
    };
    
    const teamMember = new TeamMember(teamMemberData);
    const savedTeamMember = await teamMember.save();
    
    console.log('🔍 TeamMemberController - Team member saved:', savedTeamMember._id);
    
    res.status(201).json({
      success: true,
      data: savedTeamMember,
      message: 'Team member created successfully'
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message
    });
  }
};

// Update team member
const updateTeamMember = async (req, res) => {
  try {
    console.log('🔍 TeamMemberController - Updating team member:', req.params.id, req.body);
    console.log('🔍 TeamMemberController - Uploaded file:', req.file);
    
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (teamMember.image) {
        deleteOldImage(teamMember.image);
      }
      teamMember.image = `/uploads/team-members/${req.file.filename}`;
    }
    
    // Update other fields
    teamMember.name = req.body.name;
    teamMember.designation = req.body.designation;
    teamMember.bio = req.body.bio;
    teamMember.experience = req.body.experience || null;
    teamMember.order = req.body.order ? parseInt(req.body.order) : teamMember.order;
    teamMember.isActive = req.body.isActive !== 'false';
    
    const updatedTeamMember = await teamMember.save();
    
    console.log('🔍 TeamMemberController - Team member updated:', updatedTeamMember._id);
    
    res.json({
      success: true,
      data: updatedTeamMember,
      message: 'Team member updated successfully'
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message
    });
  }
};

// Delete team member
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Delete image if exists
    if (teamMember.image) {
      deleteOldImage(teamMember.image);
    }
    
    await TeamMember.findByIdAndDelete(req.params.id);
    
    console.log('🔍 TeamMemberController - Team member deleted:', req.params.id);
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message
    });
  }
};

// Toggle team member active status
const toggleTeamMemberStatus = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    teamMember.isActive = !teamMember.isActive;
    await teamMember.save();
    
    res.json({
      success: true,
      data: teamMember,
      message: `Team member ${teamMember.isActive ? 'deactivated' : 'activated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling team member status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling team member status',
      error: error.message
    });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberStatus
};
