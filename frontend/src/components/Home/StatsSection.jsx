import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsSection = () => {

  const [stats, setStats] = useState([]);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/stats`);

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
    <section className="bg-bg-muted py-16 industrial-grid">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="card-industrial rounded-xl p-8 text-center"
            >

              <h2 className="text-5xl font-bold text-accent-primary mb-4 font-display text-glow-subtle">
                {stat.value}
              </h2>

              <p className="text-text-secondary text-lg tracking-wide font-body">
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
