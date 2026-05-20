import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStats, updateStats } from '../services/statsService';

const Settings = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    legalDepartmentEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [statsData, setStatsData] = useState({
    certification: '',
    monthlyCapacity: '',
    facilitySize: '',
    experience: ''
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchSettings = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        console.log('Fetching settings from:', `${backendUrl}/settings`);
        const response = await axios.get(`${backendUrl}/settings`);
        console.log('Settings response:', response.data);
        if (isMounted) {
          const data = response.data.data;
          setFormData({
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            legalDepartmentEmail: data.legalDepartmentEmail || ''
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error.message);
        if (isMounted) setMessage('Failed to load settings');
      }
    };
    
    const fetchStats = async () => {
      try {
        const statsUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/stats`;
        console.log('Fetching stats from:', statsUrl);
        const data = await getStats();
        console.log('Stats response:', data);
        if (isMounted) setStatsData(data);
      } catch (error) {
        console.error('Error loading stats:', error.message);
        if (isMounted) setMessage('Failed to load stats');
      }
    };
    
    fetchSettings();
    fetchStats();
    
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      console.log('Saving settings:', formData);

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL || ''}/settings`,
        formData
      );

      console.log('Save success:', response);
      setMessage('Settings saved successfully!');

    } catch (error) {
      console.error('Save failed:', error);
      setMessage('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setStatsData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatsSave = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      console.log('Saving stats:', statsData);
      const response = await updateStats(statsData);
      console.log('Save success:', response);
      setMessage('Stats saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      setMessage('Error saving stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold steel-heading" data-text="Platform Settings">
              Platform Settings
            </h1>
        <p className="text-gray-400 mt-2">Manage website configurations and admin preferences.</p>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-8 max-w-3xl">
        <h2 className="text-xl font-bold steel-heading-sm" data-text="Contact Settings">
            Contact Settings
          </h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Contact Email</label>
            <input 
              type="email" 
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Contact Phone</label>
            <input 
              type="text" 
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Location / Address</label>
            <input 
              type="text" 
              id="contact-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Legal Department Email</label>
            <input 
              type="email" 
              id="legal-email"
              name="legalDepartmentEmail"
              value={formData.legalDepartmentEmail}
              onChange={handleChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="legal@saptrajindustries.com"
            />
            <p className="text-xs  text-gray-500 mt-1">Email address for legal department inquiries from Terms of Service page</p>
          </div>
          <div className="pb-6 border-b border-[#333]">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-industrial-yellow text-deep-black px-6 py-2 font-bold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Contact Settings'}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/10 border border-green-500/20 text-green-500' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
              {message}
            </div>
          )}

          
        </form>

        <h2 className="text-xl mt-10 font-bold steel-heading-sm" data-text="Homepage Statistics">
            Homepage Statistics
          </h2>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">ISO Certification</label>
            <input 
              type="text" 
              id="iso-certification"
              name="certification"
              value={statsData.certification}
              onChange={handleStatsChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="ISO 9001:2015"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Monthly Capacity</label>
            <input 
              type="text" 
              id="monthly-capacity"
              name="monthlyCapacity"
              value={statsData.monthlyCapacity}
              onChange={handleStatsChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="300 MT"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Facility Size</label>
            <input 
              type="text" 
              id="facility-size"
              name="facilitySize"
              value={statsData.facilitySize}
              onChange={handleStatsChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="20,000"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide text-gray-400 uppercase">Years Experience</label>
            <input 
              type="text" 
              id="years-experience"
              name="experience"
              value={statsData.experience}
              onChange={handleStatsChange}
              className="bg-[#111] border border-[#333] rounded px-4 py-2 text-white focus:border-industrial-yellow focus:outline-none"
              placeholder="7+"
            />
          </div>
        </div>

        <form onSubmit={handleStatsSave} className="pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-industrial-yellow text-deep-black px-6 py-2 font-bold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Stats'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;