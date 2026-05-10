import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Cpu, Zap, Train, Tractor, Smartphone, Wrench, Building, ChevronRight, Star } from 'lucide-react';
import Button from '../components/UI/Button';
import IndustryCard from '../components/IndustryCard';

const Industries = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const industries = [
    {
      id: 'automotive',
      title: 'Automotive',
      icon: Factory,
      description: 'Precision components for vehicle manufacturing and automotive assembly lines.',
      color: 'from-blue-600 to-blue-400',
      tags: ['Precision', 'Heavy Duty', 'Industrial', 'Custom Fabrication'],
      solutions: [
        'Chassis components fabrication',
        'Body panel laser cutting',
        'Custom brackets and mounts',
        'Assembly line structures'
      ],
      projects: 45,
      experience: '5+ years',
      clients: ['Leading OEMs', 'Tier-1 Suppliers', 'Auto Component Manufacturers']
    },
    {
      id: 'textile',
      title: 'Textile',
      icon: Cpu,
      description: 'Specialized fabrication for textile machinery and manufacturing equipment.',
      color: 'from-purple-600 to-purple-400',
      tags: ['Precision', 'Custom', 'High-volume'],
      solutions: [
        'Textile machine frames',
        'Loom components',
        'Fabric handling systems',
        'Processing equipment structures'
      ],
      projects: 28,
      experience: '4+ years',
      clients: ['Textile Plants', 'Machinery Manufacturers', 'Processing Units']
    },
    {
      id: 'power',
      title: 'Power Plant',
      icon: Zap,
      description: 'Heavy-duty fabrication for power generation and distribution infrastructure.',
      color: 'from-yellow-600 to-orange-400',
      tags: ['Heavy Duty', 'Industrial', 'Custom'],
      solutions: [
        'Power plant structures',
        'Turbine housing components',
        'Support frameworks',
        'Control panel enclosures'
      ],
      projects: 32,
      experience: '6+ years',
      clients: ['Power Generation Companies', 'EPC Contractors', 'Infrastructure Developers']
    },
    {
      id: 'railways',
      title: 'Railways',
      icon: Train,
      description: 'Railway infrastructure components with safety and durability standards.',
      color: 'from-green-600 to-green-400',
      tags: ['Safety', 'Durability', 'Industrial', 'Custom'],
      solutions: [
        'Platform components',
        'Signal structures',
        'Trackside equipment',
        'Station infrastructure'
      ],
      projects: 18,
      experience: '3+ years',
      clients: ['National Railways', 'Metro Systems', 'Rail Infrastructure Companies']
    },
    {
      id: 'agriculture',
      title: 'Agriculture',
      icon: Tractor,
      description: 'Robust fabrication solutions for agricultural machinery and equipment.',
      color: 'from-lime-600 to-green-400',
      tags: ['Heavy Duty', 'Durable', 'Custom', 'Precision'],
      solutions: [
        'Tractor components',
        'Harvesting equipment frames',
        'Irrigation system structures',
        'Farm machinery parts'
      ],
      projects: 22,
      experience: '4+ years',
      clients: ['Agri Equipment OEMs', 'Farm Machinery Companies', 'Irrigation System Providers']
    },
    {
      id: 'telecom',
      title: 'Telecommunications',
      icon: Smartphone,
      description: 'Precision fabrication for telecommunication infrastructure and equipment.',
      color: 'from-cyan-600 to-blue-400',
      tags: ['Precision', 'Custom', 'Industrial', 'High-tech'],
      solutions: [
        'Tower components',
        'Equipment shelters',
        'Antenna mounting structures',
        'Cable management systems'
      ],
      projects: 15,
      experience: '3+ years',
      clients: ['Telecom Operators', 'Infrastructure Providers', 'Equipment Manufacturers']
    },
    {
      id: 'earthmoving',
      title: 'Earth Moving',
      icon: Wrench,
      description: 'Heavy-duty components for construction and earthmoving equipment.',
      color: 'from-red-600 to-orange-400',
      tags: ['Heavy Duty', 'Durable', 'Custom', 'Industrial'],
      solutions: [
        'Excavator components',
        'Bulldozer parts',
        'Loader attachments',
        'Heavy equipment frames'
      ],
      projects: 12,
      experience: '2+ years',
      clients: ['Construction Equipment OEMs', 'Heavy Machinery Companies', 'Infrastructure Contractors']
    },
    {
      id: 'general',
      title: 'General Engineering',
      icon: Building,
      description: 'Custom fabrication solutions for diverse industrial applications.',
      color: 'from-gray-600 to-gray-400',
      tags: ['Custom', 'Versatile', 'Precision', 'Industrial'],
      solutions: [
        'Custom machine parts',
        'Industrial structures',
        'Process equipment',
        'Specialized components'
      ],
      projects: 38,
      experience: '7+ years',
      clients: ['Various Industries', 'Custom Projects', 'OEM Partners']
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/90 to-deep-black/70 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.1)_0%,transparent_70%)]"></div>
      

       <div className="container mx-auto px-6 md:px-12 relative z-20">
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                 >
                   <div className="flex items-center gap-4 mb-6">
                     <span className="h-[2px] w-16 bg-industrial-yellow"></span>
                     
                   </div>
                   
                   <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                     Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                       We Serve
                     </span>
                   </h1>
                   
                   <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
                    Specialized metal fabrication solutions tailored for diverse industrial sectors, 
              delivering precision engineering excellence across multiple domains.
                   </p>
                 </motion.div>
               </div>

      </div>

      {/* Enhanced Industry Cards Grid */}
      <section 
        className="py-20 bg-deep-black relative"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <IndustryCard 
                  industry={industry} 
                  index={index}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Cross-Industry Capabilities</h2>
            <p className="text-gray-400">Our core manufacturing competencies serve all industry sectors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Precision Engineering',
                description: 'Tight tolerances and exact specifications across all industries',
                icon: '⚡'
              },
              {
                title: 'Scalable Production',
                description: 'From prototype to mass production capabilities',
                icon: '📈'
              },
              {
                title: 'Quality Assurance',
                description: 'ISO 9001:2015 certified processes for every sector',
                icon: '🛡️'
              },
              {
                title: 'Custom Solutions',
                description: 'Tailored fabrication for unique industry requirements',
                icon: '🔧'
              },
              {
                title: 'Fast Delivery',
                description: 'Efficient production and timely delivery across sectors',
                icon: '🚀'
              },
              {
                title: 'Technical Support',
                description: 'Expert consultation and after-sales service',
                icon: '📞'
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gunmetal-gray border border-[#333] rounded-lg p-6 text-center hover:border-industrial-yellow transition-all duration-300"
              >
                <div className="text-4xl mb-4">{capability.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{capability.title}</h3>
                <p className="text-gray-400 text-sm">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#333] bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Your Industry, Our Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Whether you're in automotive, textiles, power, or any other sector, we have the experience and capabilities to meet your manufacturing needs.
          </p>
          <Button variant="primary" className="text-lg px-8 py-4">
            Discuss Your Industry Requirements
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Industries;
