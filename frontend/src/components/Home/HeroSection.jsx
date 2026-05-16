import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import MetalDustText from '../UI/MetalDustText';
import { ArrowRight } from 'lucide-react';
import aboutVideo from '../../assets/aboutVideo.mp4';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden -mt-24">
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
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/70 to-transparent z-20"></div>
        
        {/* Industrial Amber Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08)_0%,transparent_70%)] z-25"></div>
        
        {/* Industrial Grid */}
        <div className="absolute inset-0 industrial-grid opacity-20 z-30"></div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-35"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-40">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-accent-primary"></span>
            <span className="text-accent-primary tracking-[0.3em] text-sm uppercase font-bold font-body">
              WHERE ACCURACY MEETS SMART CHOICE.
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight mb-6">
            Precision Engineered <br/>
            <MetalDustText className="steel-metal-text" data-text="Steel Manufacturing">
              Steel Manufacturing
            </MetalDustText>
          </h1>
          
          <p className="text-xl text-text-muted mb-10 max-w-2xl border-l-2 border-border-subtle pl-4 font-body">
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
      {/* <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center"
      >
        <span className="text-xs text-text-dim uppercase tracking-widest mb-2 font-body">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-primary to-transparent"></div>
      </motion.div> */}
    </section>
  );
};

export default HeroSection;
