const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
      maxlength: [100, 'Team member name cannot exceed 100 characters']
    },

    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
      maxlength: [150, 'Designation cannot exceed 150 characters']
    },

    bio: {
      type: String,
      required: [true, 'Bio is required'],
      trim: true,
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },

    image: {
      type: String,
      required: false,
      default: null
    },

    experience: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, 'Experience cannot exceed 500 characters']
    },

    order: {
      type: Number,
      required: false,
      default: 0
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for sorting
teamMemberSchema.index({ order: 1 });
teamMemberSchema.index({ isActive: 1 });
teamMemberSchema.index({ createdAt: -1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
