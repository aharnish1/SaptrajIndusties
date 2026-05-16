import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Clock,
  MessageSquare,
  FileText,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { notificationsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TYPE_CONFIG = {
  inquiry: {
    icon: MessageSquare,
    label: 'Inquiry',
    badgeClass: 'bg-industrial-yellow/20 text-industrial-yellow'
  },
  quote: {
    icon: FileText,
    label: 'Quote',
    badgeClass: 'bg-orange-500/20 text-orange-400'
  },
  job_application: {
    icon: Briefcase,
    label: 'Application',
    badgeClass: 'bg-blue-500/20 text-blue-400'
  },
  system: {
    icon: AlertCircle,
    label: 'System',
    badgeClass: 'bg-gray-500/20 text-gray-400'
  },
  alert: {
    icon: AlertCircle,
    label: 'Alert',
    badgeClass: 'bg-red-500/20 text-red-400'
  }
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  }
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  const {
    socket,
    isConnected,
    unreadCount,
    updateUnreadCount,
    refreshUnreadCount
  } = useSocket();

  const navigate = useNavigate();

  /**
   * Fetch notifications safely
   */
  const fetchNotifications = useCallback(
    async (silent = false) => {
      try {
        if (!silent) {
          setLoading(true);
        }

        const [unreadResponse, countResponse] = await Promise.all([
          notificationsAPI.getUnread({ limit: 20 }),
          notificationsAPI.getUnreadCount()
        ]);

        const fetchedNotifications = unreadResponse?.data || [];
        const fetchedCount = countResponse?.count || 0;

        setNotifications((prev) => {
          const prevIds = JSON.stringify(
            prev.map((item) => item._id || item.id)
          );

          const newIds = JSON.stringify(
            fetchedNotifications.map((item) => item._id || item.id)
          );

          return prevIds !== newIds
            ? fetchedNotifications
            : prev;
        });

        updateUnreadCount(fetchedCount);
      } catch (error) {
        console.error(
          '❌ Error fetching notifications:',
          error
        );
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [updateUnreadCount]
  );

  /**
   * Initial fetch
   */
  useEffect(() => {
    if (isConnected) {
      fetchNotifications();
    }
  }, [isConnected]);

  /**
   * Real-time socket listeners
   */
  useEffect(() => {
    if (!socket || !isConnected) return;

    let timeout;

    const handleRealtimeNotification = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        fetchNotifications(true);
      }, 300);
    };

    socket.on(
      'newNotification',
      handleRealtimeNotification
    );

    socket.on(
      'newInquiry',
      handleRealtimeNotification
    );

    socket.on(
      'newJobApplication',
      handleRealtimeNotification
    );

    socket.on(
      'newQuoteRequest',
      handleRealtimeNotification
    );

    return () => {
      clearTimeout(timeout);

      socket.off(
        'newNotification',
        handleRealtimeNotification
      );

      socket.off(
        'newInquiry',
        handleRealtimeNotification
      );

      socket.off(
        'newJobApplication',
        handleRealtimeNotification
      );

      socket.off(
        'newQuoteRequest',
        handleRealtimeNotification
      );
    };
  }, [socket, isConnected, fetchNotifications]);

  /**
   * Close dropdown on outside click
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  /**
   * Handle single notification click
   */
  const handleNotificationClick = async (
    notification
  ) => {
    try {
      const id =
        notification._id || notification.id;

      await notificationsAPI.markAsRead(id);

      setNotifications((prev) =>
        prev.filter(
          (item) =>
            (item._id || item.id) !== id
        )
      );

      updateUnreadCount((prev) =>
        Math.max(0, prev - 1)
      );

      setIsOpen(false);

      const actionUrl =
        notification.actionUrl?.startsWith('/')
          ? notification.actionUrl
          : `/${
              notification.actionUrl || 'dashboard'
            }`.replace('//', '/');

      if (actionUrl) {
        navigate(actionUrl);
      }
    } catch (error) {
      console.error(
        '❌ Error marking notification as read:',
        error
      );
    }
  };

  /**
   * Mark all notifications as read
   */
  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();

      setNotifications([]);

      updateUnreadCount(0);

      setIsOpen(false);

      await refreshUnreadCount();
    } catch (error) {
      console.error(
        '❌ Error marking all notifications as read:',
        error
      );
    }
  };

  /**
   * Memoized notifications
   */
  const renderedNotifications = useMemo(
    () => notifications,
    [notifications]
  );

  return (
    <motion.div
      className="relative"
      ref={dropdownRef}
    >
      {/* Notification Button */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        className={`relative p-2 transition-all duration-300 ${
          unreadCount > 0
            ? 'text-yellow-400 animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] hover:text-yellow-300'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Notifications"
      >
        <motion.div
          animate={{
            rotate: isOpen ? 15 : 0,
            scale:
              unreadCount > 0
                ? [1, 1.05, 1]
                : 1
          }}
          transition={{
            rotate: { duration: 0.2 },
            scale:
              unreadCount > 0
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                : { duration: 0 }
          }}
        >
          <Bell size={20} />
        </motion.div>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              y: [0, -2, 0]
            }}
            transition={{
              scale: { duration: 0.3 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-bold border-2 border-[#1a1a1a] shadow-lg"
          >
            {unreadCount > 99
              ? '99+'
              : unreadCount}
          </motion.div>
        )}

        {/* Live Status Dot */}
        <motion.div
          className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
            isConnected
              ? 'bg-green-500'
              : 'bg-gray-600'
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl z-50 max-h-[28rem] overflow-hidden"
          >
            {/* Header */}
            <motion.div className="flex items-center justify-between p-4 border-b border-[#333]">
              <div>
                <h3 className="text-white font-semibold">
                  Notifications
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  {unreadCount} unread · Live
                  updates
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>

            {/* Body */}
            <div className="max-h-72 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-400">
                  <motion.div className="animate-pulse">
                    Loading notifications...
                  </motion.div>
                </div>
              ) : renderedNotifications.length ===
                0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Bell
                    size={32}
                    className="mx-auto mb-2 opacity-50"
                  />

                  <p>No new notifications</p>

                  <p className="text-xs mt-1 text-gray-600">
                    You&apos;re all caught up
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#333]">
                  {renderedNotifications.map(
                    (notification) => {
                      const config =
                        TYPE_CONFIG[
                          notification.type
                        ] ||
                        TYPE_CONFIG.system;

                      const Icon =
                        config.icon;

                      return (
                        <motion.button
                          key={
                            notification._id ||
                            notification.id
                          }
                          type="button"
                          initial={{
                            opacity: 0,
                            x: -20
                          }}
                          animate={{
                            opacity: 1,
                            x: 0
                          }}
                          className="w-full text-left p-4 hover:bg-[#2a2a2a] transition-colors"
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-industrial-yellow rounded-full mt-2 flex-shrink-0" />

                            <motion.div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${config.badgeClass}`}
                                >
                                  <Icon size={10} />
                                  {config.label}
                                </span>

                                {notification.priority ===
                                  'urgent' && (
                                  <span className="text-[10px] text-red-400 font-medium">
                                    URGENT
                                  </span>
                                )}
                              </div>

                              <p className="text-white font-medium text-sm truncate">
                                {
                                  notification.title
                                }
                              </p>

                              <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                                {
                                  notification.message
                                }
                              </p>

                              <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                                <Clock size={12} />

                                {formatTimeAgo(
                                  notification.createdAt
                                )}
                              </div>
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {renderedNotifications.length >
              0 && (
              <div className="p-3 border-t border-[#333]">
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="w-full px-4 py-2 bg-industrial-yellow text-deep-black font-medium rounded hover:bg-white transition-colors text-sm"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationBell;