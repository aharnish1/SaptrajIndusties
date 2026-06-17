import React from 'react';
import InfrastructureCarousel from '../components/InfrastructureCarousel';
import TeamSection from '../components/TeamSection';
import PlantLayout from '../components/infrastructure/PlantLayout';
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
import DeliveryArea1 from '../assets/infrastructurePhotoes/DeliveryArea1.jpeg';
import DeliveryArea2 from '../assets/infrastructurePhotoes/DeliveryArea2.jpeg';
import Fire1 from '../assets/infrastructurePhotoes/Fire1.jpeg';
import Office1 from '../assets/infrastructurePhotoes/office1.jpeg';
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
import SandBlasting4 from '../assets/infrastructurePhotoes/SandBlasting4.png';
import Scrap1 from '../assets/infrastructurePhotoes/Scrap1.jpeg';
import Scrap2 from '../assets/infrastructurePhotoes/Scrap2.jpeg';
import Crane from '../assets/infrastructurePhotoes/Crane.png';
import Welding from '../assets/infrastructurePhotoes/Welding.png';
import Compressor1 from '../assets/infrastructurePhotoes/Compressor1.png';
import Compressor2 from '../assets/infrastructurePhotoes/Compressor2.png';
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

  // Facility data for interactive plant layout
  const facilityData = [
    {
      id: "crane",
      name: "Overhead Crane",
      image: Crane,
      description:
        "Heavy-duty overhead crane system for efficient material handling and movement across the production floor.",
      position: {
        top: "3.8%",
        left: "27%",
        width: "30.5%",
        height: "8%",
      },
    },

    {
      id: "welding-station",
      name: "Welding Station",
      image: Welding,
      description:
        "Advanced welding area equipped with TIG and MIG welding machines for heavy fabrication and structural assembly.",
      position: {
        top: "13%",
        left: "29.5%",
        width: "4%",
        height: "20.5%",
      },
    },

    {
      id: "cnc-bending",
      name: "CNC Bending",
      image: CNCBending1,
      description:
        "State-of-the-art CNC Press Brake Machine for highly precise sheet metal forming and complex bending operations.",
      position: {
        top: "36.7%",
        left: "29.5%",
        width: "4%",
        height: "15.5%",
      },
    },

    {
      id: "compressor",
      name: "Compressed Air Distribution Unit",
      image: Compressor2,
      description:
        "Advanced compressed air infrastructure ensuring consistent pressure delivery for production equipment, surface treatment processes, and industrial applications.",
      position: {
        top: "79.8%",
        left: "35.9%",
        width: "3%",
        height: "5%",
      },
    },

    {
      id: "compressor2",
      name: "Industrial Air Compressor",
      image: Compressor1,
      description:
        "High-capacity compressed air system supplying reliable pneumatic power for fabrication, cutting, welding, and manufacturing operations throughout the facility.",
      position: {
        top: "79.8%",
        left: "39.5%",
        width: "3%",
        height: "5%",
      },
    },

    {

      id: "raw-material-top",
      name: "Raw Materials",
      image: Raw1,
      position: {
        top: "13%",
        left: "36%",
        width: "15.7%",
        height: "8%",
      },
    },

    {
      id: "complete-work-left",
      name: "Complete Work",
      image: CompleteWork1,
      position: {
        top: "24%",
        left: "36.5%",
        width: "4%",
        height: "28.7%"
      }
    },

    {
      id: "complete-work-center",
      name: "Complete Work",
      image: CompleteWork3,
      position: {
        top: "24%",
        left: "42.1%",
        width: "4%",
        height: "28.7%"
      }
    },

    {
      id: "welding-station-right",
      name: "Welding Station",
      image: Welding,
      position: {
        top: "24%",
        left: "47.6%",
        width: "4%",
        height: "19.6%"
      }
    },

    {
      id: "raw-material-bottom",
      name: "Raw Materials",
      image: Raw1,
      position: {
        top: "55%",
        left: "29.7%",
        width: "15.5%",
        height: "6%"
      }
    },

    {
      id: "raw-material-bottom-bottom",
      name: "Raw Materials",
      image: Raw2,
      position: {
        top: "63%",
        left: "29.7%",
        width: "15.5%",
        height: "6%"
      }
    },

    {
      id: "scrap-area",
      name: "Scrap Area",
      image: Scrap2,
      description:
        "Dedicated metal waste management zone for systematic collection, segregation, and recycling of industrial fabrication scrap.",
      position: {
        top: "44%",
        left: "47.5%",
        width: "4.5%",
        height: "8.7%",
      },
    },

    {
      id: "shot-blasting",
      name: "Shot Blasting",
      image: SandBlasting4,
      description:
        "Controlled surface treatment facility ensuring thorough rust removal and superior surface quality prior to painting.",
      position: {
        top: "13%",
        left: "63%",
        width: "8.3%",
        height: "13%",
      },
    },

    {
      id: "painting-booth",
      name: "Painting Booth",
      image: Painting1,
      description:
        "Industrial painting facility for applying specialized protective coatings, guaranteeing enhanced structural durability.",
      position: {
        top: "31%",
        left: "63%",
        width: "4%",
        height: "15%",
      },
    },

    {
      id: "painting-booth-right",
      name: "Painting Booth",
      image: Painting2,
      description:
        "Industrial painting facility for applying specialized protective coatings, guaranteeing enhanced structural durability.",
      position: {
        top: "31%",
        left: "67.5%",
        width: "3.7%",
        height: "15%",
      },
    },

    {
      id: "truck-dispatch",
      name: "Truck Dispatch",
      image: DeliveryArea2,
      description:
        "Dedicated loading zone and truck dispatch area ensuring safe handling and timely product delivery.",
      position: {
        top: "61%",
        left: "50%",
        width: "9%",
        height: "9%",
      },
    },

    {
      id: "office",
      name: "Office",
      image: Office1,
      description:
        "Administrative headquarters managing planning, quality control, procurement, operations, and direct customer coordination.",
      position: {
        top: "72%",
        left: "46.5%",
        width: "10%",
        height: "12%",
      },
    },

    {
      id: "fire-station",
      name: "Fire Station",
      image: Fire1,
      description:
        "Dedicated fire protection infrastructure and emergency response equipment ensuring complete workplace safety.",
      position: {
        top: "71%",
        left: "66.7%",
        width: "6%",
        height: "11%",
      },
    },

    {
      id: "security",
      name: "Security",
      image: Outside5,
      description:
        "24/7 facility security monitoring and access control point.",
      position: {
        top: "81%",
        left: "66.7%",
        width: "6%",
        height: "11%",
      },
    },

    {
      id: "cutting-machine",
      name: "Cutting Machine",
      image: laserCutting4,
      description:
        "High precision CNC fiber laser cutting system for accurate, efficient processing of mild steel and stainless steel sheets.",
      position: {
        top: "72.5%",
        left: "29.8%",
        width: "12.5%",
        height: "6%",
      },
    },
  ];

  return (
    <div className="w-full">
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
            <h3 className="text-xs sm:text-sm tracking-[2px] sm:tracking-[3px] uppercase text-accent-primary mb-3 sm:mb-4 font-body">
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

      {/* Interactive Plant Layout Section */}
      <PlantLayout facilities={facilityData} />

      {/* Leadership Team Section */}
      <TeamSection teamMembers={teamMembers} />
    </div>
  );
};

export default Infrastructure;
