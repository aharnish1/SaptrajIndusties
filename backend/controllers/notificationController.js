const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

const buildListQuery = (filters = {}) => {
  const { recipientId, type, category, priority, isRead } = filters;
  const conditions = [notificationService.buildActiveQuery()];

  if (recipientId) {
    conditions.push({ recipient: recipientId });
  }

  if (type) {
    conditions.push({ type });
  }

  if (category) {
    conditions.push({ category });
  }

  if (priority) {
    conditions.push({ priority });
  }

  if (isRead !== undefined) {
    conditions.push({ isRead: isRead === 'true' });
  }

  return conditions.length === 1 ? conditions[0] : { $and: conditions };
};

const getNotifications = async (req, res) => {
  try {
    const { recipientId, type, category, priority, isRead, page = 1, limit = 20 } = req.query;
    const query = buildListQuery({ recipientId, type, category, priority, isRead });

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1, priority: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Notification.countDocuments(query);

    res.json({
      success: true,
      data: notifications,
      count: notifications.length,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications',
      error: error.message
    });
  }
};

const getUnreadNotifications = async (req, res) => {
  try {
    const { recipientId, limit = 50 } = req.query;
    const query = buildListQuery({ recipientId, isRead: 'false' });

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1, priority: -1 })
      .limit(parseInt(limit, 10))
      .lean();

    res.json({
      success: true,
      data: notifications,
      count: notifications.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unread notifications',
      error: error.message
    });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const { recipientId } = req.query;
    const count = await notificationService.getUnreadCount(recipientId || null);

    res.json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching unread count',
      error: error.message
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.markAsRead();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking notification as read',
      error: error.message
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const result = await notificationService.markAllAsRead(recipientId || null);

    res.json({
      success: true,
      message: 'All notifications marked as read',
      data: { modifiedCount: result.modifiedCount }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking all notifications as read',
      error: error.message
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully',
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting notification',
      error: error.message
    });
  }
};

const createNotification = async (notificationData) => {
  return notificationService.createAndEmit(notificationData);
};

const getNotificationStats = async (req, res) => {
  try {
    const { recipientId } = req.query;
    const match = notificationService.buildActiveQuery();

    if (recipientId) {
      match.recipient = recipientId;
    }

    const stats = await Notification.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          unread: { $sum: { $cond: ['$isRead', 0, 1] } },
          byType: { $push: '$type' },
          byCategory: { $push: '$category' },
          byPriority: { $push: '$priority' }
        }
      }
    ]);

    const typeCounts = {};
    const categoryCounts = {};
    const priorityCounts = {};

    if (stats.length > 0) {
      stats[0].byType.forEach((type) => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
      stats[0].byCategory.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
      stats[0].byPriority.forEach((priority) => {
        priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
      });
    }

    res.json({
      success: true,
      data: {
        total: stats[0]?.total || 0,
        unread: stats[0]?.unread || 0,
        byType: typeCounts,
        byCategory: categoryCounts,
        byPriority: priorityCounts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notification statistics',
      error: error.message
    });
  }
};

const cleanExpiredNotifications = async (req, res) => {
  try {
    const deletedCount = await Notification.cleanExpired();

    res.json({
      success: true,
      message: 'Expired notifications cleaned',
      data: { deletedCount }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cleaning expired notifications',
      error: error.message
    });
  }
};

module.exports = {
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  getNotificationStats,
  cleanExpiredNotifications
};
