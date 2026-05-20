import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import MetalDustText from '../UI/MetalDustText';
import { ArrowRight } from 'lucide-react';
import aboutVideo from '../../assets/aboutVideo.mp4';

const HeroSection = () => {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Video Background Layer */}
      <div className="absolute inset-0 bg-bg-deep z-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay Layer */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/70 to-transparent z-[4]"></div>
        
        {/* Industrial Amber Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08)_0%,transparent_70%)] z-[5]"></div>
        
        {/* Industrial Grid */}
        <div className="absolute inset-0 industrial-grid opacity-20 z-[6]"></div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[7]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex items-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl w-full"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="h-[2px] w-8 sm:w-12 bg-accent-primary"></span>
            <span className="text-accent-primary tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase font-bold font-body">
              WHERE ACCURACY MEETS SMART CHOICE.
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-text-primary leading-[1.05] sm:leading-[1] mb-4 sm:mb-6 mt-2 lg:mt-4">
            Precision Engineered <br className="hidden sm:block" />
            <p className="steel-metal-text mt-2" data-text="Steel Manufacturing">
              Steel Manufacturing
            </p>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 md:mb-10 max-w-2xl border-l-2 border-border-subtle pl-4 font-body leading-relaxed">
            Advanced CNC Laser Cutting, Sheet Metal Fabrication, and Industrial Engineering Solutions for Global Enterprises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/services">
              <Button variant="primary" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                Explore Capabilities
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
