import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ExternalLink, Clock, User, Building2 } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { inquiriesAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadInquiries, setUnreadInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { socket, isConnected, unreadCount, updateUnreadCount } = useSocket();
  const navigate = useNavigate();

  // Debug unreadCount changes
  useEffect(() => {
    console.log('🔍 NotificationBell Debug - unreadCount:', unreadCount);
    console.log('🔍 NotificationBell Debug - unreadInquiries length:', unreadInquiries.length);
  }, [unreadCount, unreadInquiries]);

  // Fetch unread inquiries
  const fetchUnreadInquiries = async () => {
    try {
      setLoading(true);
      const response = await inquiriesAPI.getUnread();
      console.log('🔍 NotificationBell Debug - API response:', response);
      console.log('🔍 NotificationBell Debug - response.data:', response?.data);
      console.log('🔍 NotificationBell Debug - response.count:', response?.count);
      
      setUnreadInquiries(response?.data || []);
      updateUnreadCount(response?.count || 0);
      
      console.log('🔍 NotificationBell Debug - State set - unreadInquiries length:', response?.data?.length || 0);
      console.log('🔍 NotificationBell Debug - State set - unreadCount:', response?.count || 0);
    } catch (error) {
      console.error('Error fetching unread inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread inquiries on component mount and when socket connects
  useEffect(() => {
    console.log('🔍 NotificationBell Debug - useEffect triggered, isConnected:', isConnected);
    // Always fetch on mount, and also when socket connects
    fetchUnreadInquiries();
  }, [isConnected]);

  // Listen for new inquiries
  useEffect(() => {
    if (socket) {
      socket.on('newInquiry', () => {
        fetchUnreadInquiries();
      });
    }

    return () => {
      if (socket) {
        socket.off('newInquiry');
      }
    };
  }, [socket]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Handle inquiry click
  const handleInquiryClick = async (inquiryId) => {
    try {
      console.log('🔍 NotificationBell - Clicking inquiry:', inquiryId);
      
      // Mark as read immediately
      await inquiriesAPI.markAsRead(inquiryId);
      
      // Update local state
      setUnreadInquiries(prev => prev.filter(inquiry => inquiry._id !== inquiryId));
      updateUnreadCount(prev => Math.max(0, prev - 1));
      
      // Close dropdown and navigate to inquiries page with query parameter
      setIsOpen(false);
      navigate(`/inquiries?open=${inquiryId}`);
      
      console.log('🔍 NotificationBell - Navigating to inquiries with open param:', inquiryId);
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
    }
  };

  // Handle view all inquiries
  const handleViewAll = async () => {
    try {
      // Mark all as read
      await inquiriesAPI.markAllAsRead();
      setUnreadInquiries([]);
      updateUnreadCount(0);
      setIsOpen(false);
      navigate('/inquiries');
    } catch (error) {
      console.error('Error marking all inquiries as read:', error);
    }
  };

  // Manual refresh for testing
  const handleRefresh = async () => {
    try {
      console.log('🔍 Manual refresh triggered');
      setLoading(true);
      
      const response = await inquiriesAPI.getUnread();
      console.log('🔍 Manual refresh - API response:', response);
      
      if (response?.success !== false) {
        setUnreadInquiries(response?.data || []);
        updateUnreadCount(response?.count || 0);
        console.log('🔍 Manual refresh - State updated successfully');
      } else {
        console.error('🔍 Manual refresh - API returned error:', response?.message);
      }
    } catch (error) {
      console.error('🔍 Manual refresh - Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 transition-all duration-300 ${
          unreadCount > 0
            ? 'text-yellow-400 animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] hover:text-yellow-300'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <motion.div
          animate={{
            rotate: isOpen ? 15 : 0,
            scale: unreadCount > 0 ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            rotate: { duration: 0.2 },
            scale: unreadCount > 0 ? { 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0 }
          }}
        >
          <Bell size={20} />
        </motion.div>
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              y: [0, -2, 0]
            }}
            transition={{ 
              scale: { duration: 0.3 },
              y: unreadCount > 0 ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              } : { duration: 0 }
            }}
            className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-bold border-2 border-[#1a1a1a] shadow-lg"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
        
        {/* Connection Indicator */}
        <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-gray-600'
        }`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#333]">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold">Notifications</h3>
                <button
                  onClick={handleRefresh}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Refresh notifications"
                >
                  ↻
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-400">
                  <div className="animate-pulse">Loading notifications...</div>
                </div>
              ) : unreadInquiries.length === 0 ? (
                <>
                  <div className="p-4 text-center text-gray-400">
                    <Bell size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No new inquiries</p>
                  </div>
                  {/* Debug info */}
                  <div className="p-2 text-xs text-gray-600 border-t border-[#333]">
                    Debug: unreadInquiries.length = {unreadInquiries.length}
                  </div>
                </>
              ) : (
                <div className="divide-y divide-[#333]">
                  {unreadInquiries.map((inquiry) => (
                    <motion.div
                      key={inquiry._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                      onClick={() => handleInquiryClick(inquiry._id)}
                    >
                      {/* Unread Indicator */}
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-industrial-yellow rounded-full mt-2 flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          {/* Name */}
                          <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-gray-400" />
                            <p className="text-white font-medium truncate">
                              {inquiry.name}
                            </p>
                          </div>
                          
                          {/* Company */}
                          {inquiry.company && (
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 size={14} className="text-gray-400" />
                              <p className="text-gray-400 text-sm truncate">
                                {inquiry.company}
                              </p>
                            </div>
                          )}
                          
                          {/* Message Preview */}
                          <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                            {inquiry.message}
                          </p>
                          
                          {/* Time */}
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Clock size={12} />
                            {formatTimeAgo(inquiry.date)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {unreadInquiries.length > 0 && (
              <div className="p-3 border-t border-[#333]">
                <button
                  onClick={handleViewAll}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-industrial-yellow text-deep-black font-medium rounded hover:bg-white transition-colors"
                >
                  <ExternalLink size={16} />
                  View All Inquiries
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
