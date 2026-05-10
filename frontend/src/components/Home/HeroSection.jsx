import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden -mt-24">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-[#050505] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.1)_0%,transparent_70%)]"></div>
        {/* Placeholder for video */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-gray-700 font-mono tracking-widest">[Cinematic Welding/CNC Video Background]</span>
        </div>
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/80 to-transparent z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-industrial-yellow"></span>
            <span className="text-industrial-yellow tracking-[0.3em] text-sm uppercase font-bold">
              WHERE ACCURACY MEETS SMART CHOICE.
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
            Precision Engineered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
              Steel Manufacturing
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
            Advanced CNC Laser Cutting, Sheet Metal Fabrication, and Industrial Engineering Solutions for Global Enterprises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
           { /* <Link to="/quote">
              <Button variant="primary" className="flex items-center justify-center gap-2">
                Request Quote <ArrowRight size={18} />
              </Button>
            </Link> */}
            <Link to="/services">
              <Button variant="primary" className="flex items-center justify-center gap-2">
                Explore Capabilities
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-industrial-yellow to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
