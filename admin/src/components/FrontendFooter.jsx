import React, { useState, useEffect } from 'react';
import { getSettings } from '../services/storageService';

const FrontendFooter = () => {
  const [settings, setSettings] = useState({
    email: 'saptarajindustries@gmail.com',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra, India'
  });

  useEffect(() => {
    // Load settings from localStorage
    const loadedSettings = getSettings();
    setSettings(loadedSettings);
  }, []);

  // Fallback: Force update every 2 seconds as backup
  useEffect(() => {
    const interval = setInterval(() => {
      const currentSettings = getSettings();
      setSettings(currentSettings);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Listen for storage changes (for real-time sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'settingsData') {
        const updatedSettings = getSettings();
        setSettings(updatedSettings);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <footer className="bg-deep-black border-t border-gunmetal-gray py-8 text-gray-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Contact</h3>
            <p className="text-sm">{settings.email}</p>
            <p className="text-sm">{settings.phone}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Location</h3>
            <p className="text-sm">{settings.location}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="text-industrial-yellow hover:text-white transition-colors">Admin Panel</a>
              <a href="#" className="text-industrial-yellow hover:text-white transition-colors">Services</a>
              <a href="#" className="text-industrial-yellow hover:text-white transition-colors">Products</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FrontendFooter;
