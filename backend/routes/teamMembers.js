const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');
const { uploadTeamMemberImage, handleMulterError } = require('../config/multer');

// ============================================
// TEAM MEMBERS API
// ============================================

// GET ALL TEAM MEMBERS
router.get('/', teamMemberController.getTeamMembers);

// GET TEAM MEMBER BY ID
router.get('/:id', teamMemberController.getTeamMemberById);

// CREATE TEAM MEMBER
router.post('/', uploadTeamMemberImage, handleMulterError, teamMemberController.createTeamMember);

// UPDATE TEAM MEMBER
router.put('/:id', uploadTeamMemberImage, handleMulterError, teamMemberController.updateTeamMember);

// DELETE TEAM MEMBER
router.delete('/:id', teamMemberController.deleteTeamMember);

// TOGGLE TEAM MEMBER STATUS
router.patch('/:id/toggle-status', teamMemberController.toggleTeamMemberStatus);

module.exports = router;
