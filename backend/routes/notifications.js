const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET ALL NOTIFICATIONS
router.get(
  '/',
  notificationController.getNotifications
);

// GET UNREAD NOTIFICATIONS
router.get(
  '/unread',
  notificationController.getUnreadNotifications
);

// GET UNREAD COUNT
router.get(
  '/unread-count',
  notificationController.getUnreadCount
);

// GET NOTIFICATION STATS
router.get(
  '/stats',
  notificationController.getNotificationStats
);

// MARK NOTIFICATION AS READ
router.put(
  '/:id/read',
  notificationController.markAsRead
);

// MARK ALL NOTIFICATIONS AS READ
router.put(
  '/read-all',
  notificationController.markAllAsRead
);

// DELETE NOTIFICATION
router.delete(
  '/:id',
  notificationController.deleteNotification
);

// CLEAN EXPIRED NOTIFICATIONS (admin only)
router.delete(
  '/clean/expired',
  notificationController.cleanExpiredNotifications
);

module.exports = router;
