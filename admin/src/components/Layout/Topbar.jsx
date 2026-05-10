import React from 'react';
import { Bell, Search, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Topbar = () => {
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-20 bg-deep-black border-b border-gunmetal-gray flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          id="topbar-search"
          name="topbarSearch"
          placeholder="Search..." 
          className="w-full bg-[#111] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-industrial-yellow transition-colors"
        />
      </div>

      <div className="flex items-center gap-6">
        
        <div className="flex items-center gap-3 border-l border-[#333] pl-6">
          <div className="w-8 h-8 rounded-full bg-industrial-yellow flex items-center justify-center text-deep-black font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Admin User</span>
            <span className="text-xs text-gray-500">Superadmin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
