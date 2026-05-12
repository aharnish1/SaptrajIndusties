const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  resume: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: false,
    trim: true
  },
  linkedin: {
    type: String,
    required: false,
    trim: true
  },
  portfolio: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
