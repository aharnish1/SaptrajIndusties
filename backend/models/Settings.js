const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true,
    maxlength: [30, 'Phone number cannot exceed 30 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  legalDepartmentEmail: {
    type: String,
    required: [true, 'Legal department email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    default: 'aharnishparekar7@gmail.com'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

settingsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Settings', settingsSchema);