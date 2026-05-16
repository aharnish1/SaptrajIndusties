const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  requirement: {
    type: String,
    required: [true, 'Requirement is required'],
    trim: true,
    maxlength: [200, 'Requirement cannot exceed 200 characters']
  },
  materialType: {
    type: String,
    trim: true,
    maxlength: [100, 'Material type cannot exceed 100 characters']
  },
  quantity: {
    type: String,
    trim: true,
    maxlength: [50, 'Quantity cannot exceed 50 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed', 'Cancelled', 'Replied'],
    default: 'New'
  },
  date: {
    type: Date,
    default: Date.now
  },
  // File attachment fields
  attachment: {
    type: String,
    default: ''
  },
  attachmentType: {
    type: String,
    default: ''
  },
  attachmentOriginalName: {
    type: String,
    default: ''
  },
  // Notification system fields
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  // Reply history
  replies: [{
    message: {
      type: String,
      required: true
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    repliedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search functionality
inquirySchema.index({ name: 'text', company: 'text', requirement: 'text' });
inquirySchema.index({ status: 1 });
inquirySchema.index({ email: 1 });
inquirySchema.index({ date: -1 });
// Notification system indexes
inquirySchema.index({ isRead: 1 });
inquirySchema.index({ readAt: -1 });
inquirySchema.index({ notificationSent: 1 });

// Virtual for inquiry ID
inquirySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
