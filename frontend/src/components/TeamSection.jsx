import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch only active team members for public display
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/team-members?activeOnly=true`);
      const data = await response.json();
      setTeamMembers(data.data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members');
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-1 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-industrial-yellow mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-1 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="text-gray-400">
              <p className="text-lg mb-4">Failed to load team members</p>
              <p className="text-sm">Please try refreshing the page</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-1 bg-deep-black">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-sm md:text-base tracking-[3px] uppercase text-gray-400 mb-4">
            OUR TEAM
          </h3>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-gray-300 text-md md:text-lg leading-relaxed max-w-3xl mx-auto">
            Our experienced leadership team drives innovation, quality, and operational 
            excellence across every project.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
