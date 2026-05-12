const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  experienceRequired: {
    type: String,
    required: true,
    trim: true
  },
  salaryRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String,
    required: true
  }],
  requirements: [{
    type: String,
    required: true
  }],
  skills: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['Active', 'Closed'],
    default: 'Active'
  },
  applicationDeadline: {
    type: Date,
    required: false
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Note: Mongoose handles timestamps automatically with {timestamps: true}
// No need for manual pre-save hook

module.exports = mongoose.model('Job', jobSchema);
