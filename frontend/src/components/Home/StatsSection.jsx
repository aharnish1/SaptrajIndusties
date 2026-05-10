import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsSection = () => {

  const [stats, setStats] = useState([]);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get('http://localhost:5000/stats');

      console.log('Stats API response:', response.data);

      const data = response.data;

      // Convert backend object into array
      const formattedStats = [
        {
          value: data.certification,
          label: 'CERTIFIED'
        },
        {
          value: data.monthlyCapacity,
          label: 'MONTHLY CAPACITY'
        },
        {
          value: data.facilitySize,
          label: 'SQ FT FACILITY'
        },
        {
          value: data.experience,
          label: 'YEARS EXPERIENCE'
        }
      ];

      setStats(formattedStats);

    } catch (error) {

      console.error('Error fetching stats:', error);

    }
  };

  return (
    <section className="bg-[#111] py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="bg-black border border-[#333] rounded-xl p-8 text-center shadow-lg"
            >

              <h2 className="text-5xl font-bold text-industrial-yellow mb-4">
                {stat.value}
              </h2>

              <p className="text-gray-300 text-lg tracking-wide">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default StatsSection;
