import React from 'react';
import { Mail } from 'lucide-react';

const TeamCard = ({ member }) => {
  return (
    <div className="bg-[#0a0a0a] border border-[#333] rounded-lg p-6 hover:border-industrial-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-industrial-yellow/20 hover:scale-105">
      
      {/* Member Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={
            member.image
              ? member.image.startsWith('http')
                ? member.image
                : `${import.meta.env.VITE_BACKEND_URL || ''}${member.image}`
              : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name || 'User') + '&background=0a0a0a&color=fff&size=200'
          }
          alt={member.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name || 'User') + '&background=0a0a0a&color=fff&size=200';
          }}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <p className="text-sm text-gray-300">{member.designation}</p>
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-industrial-yellow font-semibold mb-3">{member.designation}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
        
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-industrial-yellow transition-colors duration-300"
          >
            <Mail size={16} />
            <span className="text-sm">Email</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
