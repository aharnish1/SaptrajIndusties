import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FacilityDetails = ({ facility }) => {
  if (!facility) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={facility.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#171717] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col h-full"
      >
        <div className="relative w-full aspect-video overflow-hidden border-b border-[#2a2a2a]">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={facility.image} 
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend image with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] to-transparent opacity-60"></div>
        </div>
        
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-start">
          <motion.h3 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-3"
          >
            {facility.name}
          </motion.h3>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="h-1 bg-[#f59e0b] mb-5 rounded-full"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-gray-300 leading-relaxed text-sm md:text-base"
          >
            {facility.description}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FacilityDetails;
