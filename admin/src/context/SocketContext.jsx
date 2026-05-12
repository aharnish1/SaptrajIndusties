import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000', {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      maxReconnectionAttempts: 5,
      transports: ["websocket", "polling"]
    });

    newSocket.on('connect', () => {
      console.log('🔌 Connected to Socket.IO server:', newSocket.id);
      setIsConnected(true);
      
      // Auto-join admin room
      newSocket.emit('joinAdmin');
      console.log('👤 Auto-joined admin room');
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🔌 Socket.IO connection error:', error);
      setIsConnected(false);
    });

    // Listen for new inquiry notifications
    newSocket.on('newInquiry', (data) => {
      console.log('📢 New inquiry received:', data);
      
      // Show toast notification
      toast.success(data.message || 'New inquiry received!', {
        duration: 5000,
        position: 'top-right'
      });

      // Increment unread count
      setUnreadCount(prev => prev + 1);

      // Play notification sound (optional)
      playNotificationSound();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const playNotificationSound = () => {
    try {
      // Create a simple beep sound
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

  const updateUnreadCount = (count) => {
    setUnreadCount(count);
  };

  const value = {
    socket,
    isConnected,
    unreadCount,
    updateUnreadCount
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
