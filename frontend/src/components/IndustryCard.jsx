import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const IndustryCard = ({ industry, index, isActive }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  return (
    <Link 
      to={`/industries/${industry.id}`}
      className="block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isActive ? 1 : 0.7, 
          y: 0,
          scale: isActive ? 1.02 : 1
        }}
        transition={{ 
          duration: 0.4,
          delay: index * 0.1
        }}
        className="relative group cursor-pointer"
        style={{
          transform: `
            perspective(1000px)
            rotateY(${(mousePosition.x - 0.5) * 5}deg)
            rotateX(${(mousePosition.y - 0.5) * -5}deg)
          `
        }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500 group-hover:opacity-30"
            style={{
              backgroundImage: `url(/images/industries/${industry.id}.jpg)`
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
          
          {/* Animated Spotlight */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 204, 0, 0.15) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Content */}
        <div className="relative p-8 h-full min-h-[320px] flex flex-col justify-between">
          
          {/* Top Section */}
          <div>
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-xl flex items-center justify-center mb-6 shadow-lg"
            >
              <industry.icon size={32} className="text-black" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-industrial-yellow transition-colors duration-300">
              {industry.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {industry.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {industry.tags?.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-xs text-yellow-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-industrial-yellow">{industry.projects}</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">{industry.experience}</div>
                <div className="text-xs text-gray-400">Experience</div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-industrial-yellow font-semibold text-sm"
            >
              <span>Explore</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>

        {/* Active Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-industrial-yellow/50 transition-all duration-500 pointer-events-none" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-yellow/20 to-transparent blur-xl" />
        </div>
      </motion.div>
    </Link>
  );
};

export default IndustryCard;
