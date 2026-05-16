import React from 'react';
import ServicesSection from '../components/Home/ServicesSection';
import aboutBg from "../assets/aboutBg.jpeg";

const Services = () => {
  return (
    <div className="w-full">
       <div
                    className="relative py-40 border-b border-border-subtle bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${aboutBg})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="absolute inset-0 industrial-grid opacity-20"></div>
            
                    <div className="relative container mx-auto px-6 md:px-12 text-center z-10">
                      <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-4 steel-heading" data-text="Our Services">
                        Our Services
                      </h1>
                      <p className="text-text-muted max-w-2xl mx-auto font-body">Comprehensive metal fabrication solutions from prototyping to mass production.</p>
                    </div>
                  </div>
      <ServicesSection />
    </div>
  );
};

export default Services;







        