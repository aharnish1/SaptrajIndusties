import axios from 'axios';

const API_URL = 'http://localhost:5000/stats';

export const getStats = async () => {
  try {
    const response = await axios.get(API_URL);

    console.log('GET stats response:', response.data);

    return response.data;

  } catch (error) {
    console.error('GET stats error:', error);

    throw error;
  }
};

export const updateStats = async (statsData) => {
  try {
    console.log('Sending stats data:', statsData);

    const response = await axios.put(
      API_URL,
      statsData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('PUT stats response:', response.data);

    return response.data;

  } catch (error) {
    console.error('PUT stats error:', error);

    if (error.response) {
      console.error('Backend response:', error.response.data);
      console.error('Status:', error.response.status);
    }

    throw error;
  }
};
