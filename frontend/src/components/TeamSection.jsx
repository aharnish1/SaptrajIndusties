import React from 'react';
import TeamCard from './TeamCard';

const TeamSection = ({ teamMembers }) => {
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
