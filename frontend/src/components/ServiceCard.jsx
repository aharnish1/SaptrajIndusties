import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Settings, Wrench, Package, Cpu, Factory } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/services/${service.id}`}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative group cursor-pointer"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Industrial Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,212,0,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,212,0,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Spotlight */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-industrial-yellow/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* Card Content */}
        <div className="relative bg-[#0a0a0a] border border-[#333] rounded-2xl p-8 h-full min-h-[320px] flex flex-col justify-between transition-all duration-300 group-hover:border-industrial-yellow/50 group-hover:shadow-2xl group-hover:shadow-industrial-yellow/20">
          
          {/* Top Section */}
          <div>
            {/* Icon with Advanced Hover Effects */}
            <motion.div
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-industrial-yellow/30">
                <service.icon size={32} className="text-black" />
              </div>
              
            </motion.div>

            {/* Title with Animated Underline */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-industrial-yellow transition-colors duration-300">
                {service.title}
              </h3>
              
              {/* Animated Underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-0.5 bg-gradient-to-r from-industrial-yellow to-transparent"
              />
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
              {service.description}
            </p>

            {/* Service Stats */}
            {service.stats && (
              <div className="flex flex-wrap gap-2 mb-4">
                {service.stats.map((stat, statIndex) => (
                  <span
                    key={statIndex}
                    className="px-3 py-1 bg-industrial-yellow/10 border border-industrial-yellow/20 rounded-full text-xs text-industrial-yellow"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section with CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Learn More</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={16} className="text-industrial-yellow" />
              </motion.div>
            </div>

            {/* Hover Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 bg-industrial-yellow rounded-full"
            />
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-industrial-yellow/50 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-industrial-yellow/50 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-industrial-yellow/50 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-industrial-yellow/50 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shine Animation */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: isHovered ? 300 : -100,
            opacity: isHovered ? 0.3 : 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      </motion.div>
    </Link>
  );
};

export default ServiceCard;
