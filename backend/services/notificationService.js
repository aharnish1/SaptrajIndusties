const Notification = require('../models/Notification');

let ioInstance = null;

const setIO = (io) => {
  ioInstance = io;
};

const getIO = () => ioInstance;

const buildActiveQuery = (extra = {}) => ({
  ...extra,
  $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }]
});

const emitToAdmin = (event, payload) => {
  const io = getIO();
  if (io) {
    io.to('admin').emit(event, payload);
  }
};

const createAndEmit = async (notificationData) => {
  const notification = await Notification.createNotification(notificationData);

  emitToAdmin('newNotification', {
    notification,
    timestamp: new Date(),
    message: notification.message
  });

  if (notification.type === 'quote') {
    emitToAdmin('newQuoteRequest', {
      notification,
      timestamp: new Date(),
      message: notification.message
    });
  }

  return notification;
};

const markRelatedAsRead = async (relatedId, types = []) => {
  if (!relatedId) return { modifiedCount: 0 };

  const query = buildActiveQuery({
    relatedId,
    isRead: false
  });

  if (types.length > 0) {
    query.type = { $in: types };
  }

  const result = await Notification.updateMany(query, {
    isRead: true,
    readAt: new Date()
  });

  return result;
};

const markAllAsRead = async (recipientId = null) => {
  const query = buildActiveQuery({ isRead: false });

  if (recipientId) {
    query.recipient = recipientId;
  }

  return Notification.updateMany(query, {
    isRead: true,
    readAt: new Date()
  });
};

const getUnreadCount = async (recipientId = null) => {
  const query = buildActiveQuery({ isRead: false });

  if (recipientId) {
    query.recipient = recipientId;
  }

  return Notification.countDocuments(query);
};

module.exports = {
  setIO,
  getIO,
  buildActiveQuery,
  createAndEmit,
  markRelatedAsRead,
  markAllAsRead,
  getUnreadCount
};
