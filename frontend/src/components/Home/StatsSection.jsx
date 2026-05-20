import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsSection = () => {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/stats`);
        const data = response.data;

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

    fetchStats();
  }, []);

  return (
    <section className="bg-bg-muted py-10 sm:py-12 md:py-16 industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="card-industrial rounded-xl p-4 sm:p-6 md:p-8 text-center"
            >

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-primary mb-2 sm:mb-3 md:mb-4 font-display text-glow-subtle">
                {stat.value}
              </h2>

              <p className="text-text-secondary text-xs sm:text-sm md:text-base lg:text-lg tracking-wide font-body leading-tight">
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
