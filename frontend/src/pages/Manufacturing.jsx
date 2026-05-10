import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCw, Settings, Zap, Wrench, Shield, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import Button from '../components/UI/Button';

const Manufacturing = () => {
  const [activeProcess, setActiveProcess] = useState(null);
  
  const manufacturingProcess = [
    {
      id: 1,
      title: 'Design & Engineering',
      description: 'Concept development and technical design using advanced CAD software and engineering principles.',
      duration: '1-2 days',
      equipment: ['CAD Software', 'Engineering Team', 'Design Review'],
      details: 'Our engineering team transforms your requirements into detailed technical drawings and manufacturing plans.',
      image: 'design-engineering'
    },
    {
      id: 2,
      title: 'Material Selection',
      description: 'Careful selection of high-quality raw materials based on project specifications and requirements.',
      duration: '1 day',
      equipment: ['Material Testing', 'Quality Check', 'Inventory Management'],
      details: 'We source premium quality materials from certified suppliers and conduct thorough quality inspections.',
      image: 'material-selection'
    },
    {
      id: 3,
      title: 'CNC Laser Cutting',
      description: 'Precision laser cutting using Bodor Fiber Laser machines for accurate and clean cuts.',
      duration: '2-4 hours',
      equipment: ['Bodor Fiber Laser', 'CNC Control', 'Safety Systems'],
      details: 'Advanced fiber laser technology ensures precise cuts with minimal material waste and superior edge quality.',
      image: 'laser-cutting'
    },
    {
      id: 4,
      title: 'CNC Bending',
      description: 'Precision bending of sheet metal components using advanced CNC bending machines.',
      duration: '1-3 hours',
      equipment: ['CNC Bending Press', 'Tooling', 'Measurement Systems'],
      details: 'Computer-controlled bending ensures consistent angles and precise dimensions across all components.',
      image: 'cnc-bending'
    },
    {
      id: 5,
      title: 'Welding & Assembly',
      description: 'Professional MIG and arc welding for strong and durable component assembly.',
      duration: '2-6 hours',
      equipment: ['MIG Welders', 'Arc Welders', 'Assembly Fixtures'],
      details: 'Certified welders perform structural welding with strict adherence to welding procedures and quality standards.',
      image: 'welding-assembly'
    },
    {
      id: 6,
      title: 'Quality Inspection',
      description: 'Comprehensive quality control using precision measuring instruments and inspection processes.',
      duration: '1-2 hours',
      equipment: ['Vernier Caliper', 'Micrometer', 'Height Gauge', 'Weld Gauge'],
      details: 'Every component undergoes rigorous inspection to ensure dimensional accuracy and quality compliance.',
      image: 'quality-inspection'
    },
    {
      id: 7,
      title: 'Surface Treatment',
      description: 'Surface preparation and treatment for corrosion resistance and enhanced durability.',
      duration: '2-4 hours',
      equipment: ['Cleaning Systems', 'Treatment Equipment', 'Curing Ovens'],
      details: 'Surface treatment processes including cleaning, coating, and finishing to protect against environmental factors.',
      image: 'surface-treatment'
    },
    {
      id: 8,
      title: 'Final Assembly & Packaging',
      description: 'Complete product assembly and secure packaging for safe transportation.',
      duration: '1-3 hours',
      equipment: ['Assembly Tools', 'Testing Equipment', 'Packaging Materials'],
      details: 'Final assembly, testing, and careful packaging to ensure products reach you in perfect condition.',
      image: 'final-assembly'
    }
  ];

  const equipment = [
    {
      name: 'Bodor Fiber Laser Machine',
      type: 'Laser Cutting',
      capacity: 'High-Precision Cutting',
      features: ['Fiber Laser Technology', 'CNC Control', 'Auto Focus', 'High Speed'],
      image: 'bodor-laser'
    },
    {
      name: 'CNC Bending Press',
      type: 'Metal Forming',
      capacity: 'Up to 100 Tons',
      features: ['CNC Control', 'Multi-Axis', 'Precision Backstop', 'Safety Guards'],
      image: 'cnc-press'
    },
    {
      name: 'MIG Welding Station',
      type: 'Welding',
      capacity: 'Industrial Welding',
      features: ['MIG Technology', 'Argon Gas', 'Multi-Position', 'Quality Control'],
      image: 'mig-welder'
    },
    {
      name: 'Arc Welding Equipment',
      type: 'Welding',
      capacity: 'Heavy Fabrication',
      features: ['Arc Technology', 'Heavy Duty', 'Portable', 'Professional Grade'],
      image: 'arc-welder'
    }
  ];

  const qualityTools = [
    { name: 'Vernier Caliper', precision: '0.02mm', usage: 'Dimensional measurement' },
    { name: 'Micrometer', precision: '0.01mm', usage: 'Precision measurements' },
    { name: 'Height Gauge', precision: '0.02mm', usage: 'Vertical measurements' },
    { name: 'Weld Gauge', precision: 'N/A', usage: 'Weld quality inspection' },
    { name: 'Surface Table', precision: 'Grade 0', usage: 'Flatness measurement' },
    { name: 'Measuring Tape', precision: '1mm', usage: 'General measurements' }
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
              <span className="text-industrial-yellow tracking-[0.3em] text-sm uppercase font-bold">
                Manufacturing Process
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                Manufacturing
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
              From design to delivery, our systematic manufacturing process ensures precision, quality, and on-time delivery for every project.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Process Overview */}
      <section className="py-20 bg-gunmetal-gray border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Our Manufacturing Journey</h2>
            <p className="text-gray-400">8-step precision manufacturing process from concept to completion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {manufacturingProcess.slice(0, 4).map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-industrial-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-deep-black">{step.id}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{step.duration}</p>
                <p className="text-gray-500 text-xs line-clamp-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Detailed Manufacturing Process</h2>
            <p className="text-gray-400">Click on any step to explore detailed information</p>
          </div>
          
          <div className="space-y-6">
            {manufacturingProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gunmetal-gray border border-[#333] rounded-lg overflow-hidden transition-all duration-300 ${
                  activeProcess === step.id ? 'border-industrial-yellow' : 'hover:border-gray-500'
                }`}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setActiveProcess(activeProcess === step.id ? null : step.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-industrial-yellow rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-deep-black">{step.id}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-industrial-yellow font-semibold">{step.duration}</div>
                        <div className="text-gray-500 text-sm">Duration</div>
                      </div>
                      <ArrowRight 
                        size={20} 
                        className={`text-gray-400 transition-transform duration-300 ${
                          activeProcess === step.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
                
                {activeProcess === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#333] p-6 bg-deep-black/50"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Process Details</h4>
                        <p className="text-gray-300 mb-4">{step.details}</p>
                        
                        <h4 className="text-lg font-semibold text-white mb-3">Equipment Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.equipment.map((item, itemIndex) => (
                            <span key={itemIndex} className="px-3 py-1 bg-industrial-yellow/20 text-industrial-yellow rounded text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="aspect-video bg-gradient-to-br from-gunmetal-gray to-deep-black rounded border border-[#333] flex items-center justify-center">
                          <span className="text-gray-600 font-mono tracking-widest uppercase text-sm">
                            [Process Image: {step.image}]
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-20 bg-gunmetal-gray border-t border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Advanced Equipment</h2>
            <p className="text-gray-400">State-of-the-art machinery for precision manufacturing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-deep-black border border-[#333] rounded-lg overflow-hidden hover:border-industrial-yellow transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gunmetal-gray to-deep-black relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-industrial-yellow opacity-0 hover:opacity-10 transition-opacity"></div>
                  <span className="text-gray-600 font-mono tracking-widest uppercase text-sm">
                    [Equipment: {item.image}]
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="px-3 py-1 bg-industrial-yellow/20 text-industrial-yellow rounded text-sm">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">Capacity: {item.capacity}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle size={16} className="text-industrial-yellow" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Tools */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield size={48} className="text-industrial-yellow" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Quality Control Tools</h2>
            <p className="text-gray-400">Precision instruments for accurate quality measurements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gunmetal-gray border border-[#333] rounded-lg p-6 text-center hover:border-industrial-yellow transition-all duration-300"
              >
                <div className="w-16 h-16 bg-industrial-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye size={24} className="text-deep-black" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <div className="space-y-2">
                  <div className="text-industrial-yellow font-semibold">{tool.precision}</div>
                  <div className="text-gray-400 text-sm">{tool.usage}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Visualization */}
      <section className="py-20 bg-gunmetal-gray border-t border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Manufacturing Flow</h2>
            <p className="text-gray-400">Seamless integration of processes for optimal efficiency</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-industrial-yellow/30"></div>
            <div className="space-y-12">
              {manufacturingProcess.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-deep-black border border-[#333] rounded-lg p-4 inline-block">
                      <h4 className="text-white font-bold mb-1">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.duration}</p>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-industrial-yellow rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-deep-black">{step.id}</span>
                    </div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#333] bg-deep-black">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Experience Precision Manufacturing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Our systematic manufacturing process ensures your projects are completed with precision, quality, and on-time delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="text-lg px-8 py-4">
              Start Manufacturing Project
            </Button>
            <Button variant="secondary">
              Schedule Factory Tour
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;
