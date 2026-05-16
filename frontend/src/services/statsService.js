import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL || ''}/stats`;

export const getStats = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateStats = async (data) => {
  const response = await axios.put(API_URL, data);
  return response.data;
};
