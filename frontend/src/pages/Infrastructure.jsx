import React from 'react';
import InfrastructureCarousel from '../components/InfrastructureCarousel';
import TeamSection from '../components/TeamSection';
import laserCutting1 from '../assets/infrastructurePhotoes/laserCutting1.jpeg';
import laserCutting2 from '../assets/infrastructurePhotoes/laserCutting2.jpeg';
import laserCutting3 from '../assets/infrastructurePhotoes/laserCutting3.jpeg';
import laserCutting4 from '../assets/infrastructurePhotoes/laserCutting4.jpeg';
import laserCutting5 from '../assets/infrastructurePhotoes/laserCutting5.jpeg';
import laserCutting6 from '../assets/infrastructurePhotoes/laserCutting6.jpeg';
import CNCBending1 from '../assets/infrastructurePhotoes/CNCBending1.jpeg';
import CNCBending2 from '../assets/infrastructurePhotoes/CNCBending2.jpeg';
import Assembly1 from '../assets/infrastructurePhotoes/Assembly1.jpeg';
import Assembly2 from '../assets/infrastructurePhotoes/Assembly2.jpeg';
import CompleteWork1 from '../assets/infrastructurePhotoes/CompleteWork1.jpeg';
import CompleteWork2 from '../assets/infrastructurePhotoes/CompleteWork2.jpeg';
import CompleteWork3 from '../assets/infrastructurePhotoes/CompleteWork3.jpeg';
import CompleteWork4 from '../assets/infrastructurePhotoes/CompleteWork4.jpeg';
import Compressor1 from '../assets/infrastructurePhotoes/Compressor1.jpeg';
import DeliveryArea1 from '../assets/infrastructurePhotoes/DeliveryArea1.jpeg';
import DeliveryArea2 from '../assets/infrastructurePhotoes/DeliveryArea2.jpeg';
import Fire1 from '../assets/infrastructurePhotoes/Fire1.jpeg';
import Office1 from '../assets/infrastructurePhotoes/Office1.jpeg';
import Outside1 from '../assets/infrastructurePhotoes/Outside1.jpeg';
import Outside2 from '../assets/infrastructurePhotoes/Outside2.jpeg';
import Outside3 from '../assets/infrastructurePhotoes/Outside3.jpeg';
import Outside4 from '../assets/infrastructurePhotoes/Outside4.jpeg';
import Outside5 from '../assets/infrastructurePhotoes/Outside5.jpeg';
import Painting1 from '../assets/infrastructurePhotoes/Painting1.jpeg';
import Painting2 from '../assets/infrastructurePhotoes/Painting2.jpeg';
import Painting3 from '../assets/infrastructurePhotoes/Painting3.jpeg';
import Raw1 from '../assets/infrastructurePhotoes/Raw1.jpeg';
import Raw2 from '../assets/infrastructurePhotoes/Raw2.jpeg';
import SandBlasting1 from '../assets/infrastructurePhotoes/SandBlasting1.jpeg';
import SandBlasting2 from '../assets/infrastructurePhotoes/SandBlasting2.jpeg';
import SandBlasting3 from '../assets/infrastructurePhotoes/SandBlasting3.jpeg';
import Scrap1 from '../assets/infrastructurePhotoes/Scrap1.jpeg';
import Scrap2 from '../assets/infrastructurePhotoes/Scrap2.jpeg';
import myphoto from '../assets/MyPhoto.png';
import aboutBg from "../assets/aboutBg.jpeg";

const Infrastructure = () => {
  // Infrastructure images data  
  const infrastructureSlides = [
  {
    id: 1,
    image: Office1,
    title: "Factory Administration Office",
    description: "Administrative office managing operations, planning, procurement, and customer coordination."
  },

  {
    id: 2,
    image: Outside1,
    title: "Manufacturing Facility Exterior",
    description: "Main production facility equipped for heavy fabrication and industrial manufacturing."
  },

  {
    id: 3,
    image: Outside2,
    title: "Saptraj Industries LLP",
    description: "Official company identification displaying manufacturing capabilities and facility information."
  },

  {
    id: 4,
    image: Outside3,
    title: "Production Facility View",
    description: "External view of the manufacturing unit with dedicated loading and operational areas."
  },

  {
    id: 5,
    image: Outside4,
    title: "Factory Warehouse Entrance",
    description: "Material handling and dispatch area designed for efficient logistics operations."
  },

  {
    id: 6,
    image: Outside5,
    title: "Industrial Premises",
    description: "Comprehensive view of the factory premises and infrastructure."
  },

  {
    id: 7,
    image: Painting1,
    title: "Industrial Painting Process",
    description: "Protective coating application on fabricated structures for enhanced durability."
  },

  {
    id: 8,
    image: Painting2,
    title: "Fabricated Structural Assemblies",
    description: "Structural components prepared for painting and final finishing operations."
  },

  {
    id: 9,
    image: Painting3,
    title: "Finished Painted Structures",
    description: "Completed fabricated structures with industrial-grade protective coating."
  },

  {
    id: 10,
    image: Raw1,
    title: "MS Plate Inventory",
    description: "High-quality mild steel plates stocked for precision manufacturing requirements."
  },

  {
    id: 11,
    image: Raw2,
    title: "Laser Cut Components",
    description: "Precision laser-cut sheet metal parts ready for fabrication and assembly."
  },

  {
    id: 12,
    image: SandBlasting1,
    title: "Sand Blasting Booth",
    description: "Dedicated surface preparation facility for cleaning and finishing metal components."
  },

  {
    id: 13,
    image: SandBlasting2,
    title: "Surface Treatment Facility",
    description: "Controlled blasting environment ensuring superior surface quality before coating."
  },

  {
    id: 14,
    image: SandBlasting3,
    title: "Blasting Media",
    description: "Industrial abrasive material used for effective rust and scale removal."
  },

  {
    id: 15,
    image: Assembly1,
    title: "Heavy Fabrication Shop",
    description: "Large-scale fabrication area supporting structural and sheet metal manufacturing."
  },

  {
    id: 16,
    image: Assembly2,
    title: "Production Assembly Area",
    description: "Dedicated workspace for fabrication, assembly, and material processing operations."
  },

 
  {
    id: 17,
    image: Scrap1,
    title: "Industrial Scrap Collection",
    description: "Organized collection and segregation of recyclable fabrication scrap."
  },

  {
    id: 18,
    image: Scrap2,
    title: "Metal Waste Management",
    description: "Efficient scrap handling process supporting sustainable manufacturing practices."
  },

  {
  id: 19,
  image: laserCutting1,
  title: "Fiber Laser Cutting Machine",
  description: "High-precision CNC fiber laser cutting system for accurate sheet metal processing."
},

{
  id: 20,
  image: laserCutting2,
  title: "Laser Cutting Operations",
  description: "Advanced laser cutting facility delivering precision and consistency in every component."
},

{
  id: 21,
  image: laserCutting3,
  title: "Automated Laser Processing",
  description: "Modern CNC-controlled laser cutting equipment for complex fabrication requirements."
},

{
  id: 22,
  image: laserCutting4,
  title: "Sheet Metal Laser Cutting",
  description: "Efficient processing of mild steel, stainless steel, and custom sheet metal components."
},

{
  id: 23,
  image: laserCutting5,
  title: "Precision Cutting Facility",
  description: "State-of-the-art laser cutting technology ensuring superior dimensional accuracy."
},

{
  id: 24,
  image: laserCutting6,
  title: "Production Laser Cell",
  description: "Dedicated laser cutting area supporting high-volume manufacturing operations."
},

{
  id: 25,
  image: CNCBending1,
  title: "CNC Press Brake Machine",
  description: "Advanced CNC bending system for precise sheet metal forming and fabrication."
},

{
  id: 26,
  image: CNCBending2,
  title: "Precision Bending Operations",
  description: "High-accuracy bending facility capable of producing complex formed components."
},

{
  id: 27,
  image: Fire1,
  title: "Fire Safety Infrastructure",
  description: "Dedicated fire protection and emergency response equipment ensuring workplace safety."
},

{
  id: 28,
  image: CompleteWork1,
  title: "Finished Fabricated Structure",
  description: "Completed structural fabrication ready for inspection, coating, and dispatch."
},

{
  id: 29,
  image: CompleteWork2,
  title: "Custom Fabricated Assembly",
  description: "Precision-engineered fabricated assembly manufactured to customer specifications."
},

{
  id: 30,
  image: CompleteWork3,
  title: "Industrial Fabrication Project",
  description: "High-quality fabricated component designed for industrial applications."
},

{
  id: 31,
  image: CompleteWork4,
  title: "Completed Engineering Product",
  description: "Finished engineering product showcasing fabrication and assembly expertise."
},

{
  id: 32,
  image: Compressor1,
  title: "Industrial Air Compressor",
  description: "Compressed air system supporting laser cutting, fabrication, painting, and shop-floor operations."
},

{
  id: 33,
  image: DeliveryArea1,
  title: "Dispatch & Loading Area",
  description: "Dedicated loading zone ensuring safe handling and timely product delivery."
},

{
  id: 34,
  image: DeliveryArea2,
  title: "Material Dispatch Facility",
  description: "Organized dispatch area for efficient movement of finished products and materials."
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
