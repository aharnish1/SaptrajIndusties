const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for system-wide notifications
  },
  type: {
    type: String,
    enum: ['inquiry', 'job_application', 'quote', 'system', 'alert'],
    required: true
  },
  category: {
    type: String,
    enum: ['new', 'update', 'reminder', 'urgent', 'info'],
    default: 'info'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // Reference to related document (inquiry, job, quote, etc.)
  },
  relatedModel: {
    type: String,
    required: false // Model name of related document
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  actionUrl: {
    type: String,
    default: '' // URL to navigate when notification is clicked
  },
  expiresAt: {
    type: Date,
    default: null // Optional expiration date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ category: 1, createdAt: -1 });
notificationSchema.index({ priority: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { sparse: true });
notificationSchema.index({ relatedId: 1, type: 1, isRead: 1 });

// Virtual for notification ID
notificationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to create notification
notificationSchema.statics.createNotification = async function(notificationData) {
  const notification = new this(notificationData);
  return await notification.save();
};

// Static method to get unread count for recipient
notificationSchema.statics.getUnreadCount = async function(recipientId) {
  return await this.countDocuments({
    recipient: recipientId,
    isRead: false,
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  });
};

// Static method to clean expired notifications
notificationSchema.statics.cleanExpired = async function() {
  const result = await this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
  return result.deletedCount;
};

module.exports = mongoose.model('Notification', notificationSchema);
