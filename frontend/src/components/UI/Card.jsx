import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`bg-[#0A0A0A] border border-gunmetal-gray p-6 rounded-lg relative overflow-hidden group ${className}`}
    >
      {/* Top industrial accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-industrial-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Metallic shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
