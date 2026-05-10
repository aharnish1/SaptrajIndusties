import React from 'react';
import InfrastructureCarousel from '../components/InfrastructureCarousel';
import TeamSection from '../components/TeamSection';
import infrastructure1 from '../assets/infrastructurePhotoes/infrastructure1.jpeg';
import infrastructure2 from '../assets/infrastructurePhotoes/infrastructure2.jpeg';
import infrastructure3 from '../assets/infrastructurePhotoes/infrastructure3.jpeg';
import infrastructure4 from '../assets/infrastructurePhotoes/infrastructure4.jpeg';
import infrastructure5 from '../assets/infrastructurePhotoes/infrastructure5.jpeg';
import myphoto from '../assets/MyPhoto.png';
import aboutBg from "../assets/aboutBg.jpeg";

const Infrastructure = () => {
  // Infrastructure images data
  const infrastructureSlides = [
    {
      id: 1,
      image: infrastructure1,
      title: 'Laser Cutting Workshop',
      description: 'State-of-the-art fiber laser cutting systems with precision CNC control'
    },
    {
      id: 2,
      image: infrastructure2,
      title: 'CNC Bending Area',
      description: 'Advanced CNC bending machines for precise metal fabrication'
    },
    {
      id: 3,
      image: infrastructure3,
      title: 'Welding Station',
      description: 'Professional MIG and TIG welding capabilities for various materials'
    },
    {
      id: 4,
      image: infrastructure4,
      title: 'Assembly Line',
      description: 'Dedicated assembly area for project completion'
    },
    {
      id: 5,
      image: infrastructure5,
      title: 'Quality Control',
      description: 'Rigorous quality inspection and testing facilities'
    }
  ];

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      designation: 'Managing Director',
      bio: '15+ years of experience in metal fabrication and industrial manufacturing. Pioneered precision laser cutting technology in the region.',
      image: myphoto,
      
    },
    {
      id: 2,
      name: 'Amit Sharma',
      designation: 'Operations Manager',
      bio: 'Expert in CNC operations, production planning, and quality control systems. Ensures efficient workflow across all manufacturing stages.',
      image: myphoto,
    
    },
    {
      id: 3,
      name: 'Priya Patel',
      designation: 'Production Head',
      bio: 'Specialized in laser cutting, CNC programming, and production optimization. Leads manufacturing excellence with innovative approaches.',
      image: myphoto,
    
    },
    {
      id: 4,
      name: 'Vikram Singh',
      designation: 'Quality Control Manager',
      bio: 'Certified quality assurance professional with expertise in ISO standards and precision measurement tools.',
      image: myphoto,
      
    },
    {
      id: 5,
      name: 'Neha Deshmukh',
      designation: 'Technical Supervisor',
      bio: 'Skilled technician with deep knowledge of laser systems, maintenance procedures, and safety protocols.',
      image: myphoto,
      
    },
    {
      id: 6,
      name: 'Rajesh Kumar',
      designation: 'Technical Supervisor',
      bio: 'Skilled technician with deep knowledge of laser systems, maintenance procedures, and safety protocols.',
      image: myphoto,
      
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      {/* Hero Section */}
            <div
              className="relative py-40 border-b border-[#333] bg-cover bg-center"
              style={{
                backgroundImage: `url(${aboutBg})`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
      
              <div className="relative container mx-auto px-6 md:px-12 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
                  Our Infrastructure
                </h1>
              </div>
            </div>

      {/* Infrastructure Gallery Section */}
      <section className="py-15 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-sm md:text-base tracking-[3px] uppercase text-gray-400 mb-4">
              OUR FACILITY
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Advanced Manufacturing Infrastructure
            </h2>
            <p className="text-gray-300 text-md md:text-lg leading-relaxed max-w-4xl mx-auto">
              Explore our state-of-the-art machinery, fabrication units, laser cutting systems, 
              and manufacturing facilities designed for precision engineering and high-quality production.
            </p>
          </div>

          {/* Infrastructure Carousel */}
          <InfrastructureCarousel slides={infrastructureSlides} />
        </div>
      </section>

      {/* Leadership Team Section */}
      <TeamSection teamMembers={teamMembers} />
    </div>
  );
};

export default Infrastructure;
