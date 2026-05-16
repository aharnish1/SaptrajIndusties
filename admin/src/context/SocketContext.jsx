import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { notificationsAPI } from '../services/api';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log('Could not play notification sound:', error);
  }
};

const getToastMessage = (data, fallback) =>
  data?.message || data?.notification?.message || fallback;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(async () => {
    try {
      const response = await notificationsAPI.getUnreadCount();
      setUnreadCount(response?.count || 0);
    } catch (error) {
      console.error('Failed to refresh notification count:', error);
    }
  }, []);

  const handleRealtimeAlert = useCallback((message, type = 'success') => {
    if (type === 'success') {
      toast.success(message, { duration: 5000, position: 'top-right' });
    } else {
      toast(message, { duration: 5000, position: 'top-right' });
    }
    playNotificationSound();
    refreshUnreadCount();
  }, [refreshUnreadCount]);

  useEffect(() => {
    refreshUnreadCount();
  }, [refreshUnreadCount]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      maxReconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('joinAdmin');
      refreshUnreadCount();
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('connect_error', () => {
      setIsConnected(false);
    });

    newSocket.on('newNotification', (data) => {
      handleRealtimeAlert(
        getToastMessage(data, 'New notification received'),
        'success'
      );
    });

    // Legacy events: refresh count only (toast handled by newNotification)
    newSocket.on('newInquiry', () => refreshUnreadCount());
    newSocket.on('newJobApplication', () => refreshUnreadCount());
    newSocket.on('newQuoteRequest', () => refreshUnreadCount());

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [handleRealtimeAlert, refreshUnreadCount]);

  const updateUnreadCount = useCallback((countOrUpdater) => {
    if (typeof countOrUpdater === 'function') {
      setUnreadCount(countOrUpdater);
    } else {
      setUnreadCount(countOrUpdater);
    }
  }, []);

  const value = {
    socket,
    isConnected,
    unreadCount,
    updateUnreadCount,
    refreshUnreadCount
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
