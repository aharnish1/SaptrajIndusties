import axios from 'axios';

const STATS_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/stats`;

export const getStats = async () => {
  try {
    const response = await axios.get(STATS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    throw error;
  }
};

export const updateStats = async (statsData) => {
  try {
    const response = await axios.put(STATS_URL, statsData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating stats:', error.message);
    throw error;
  }
};