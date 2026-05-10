import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Users, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import Button from '../components/UI/Button';
import { Link, useLocation } from 'react-router-dom';

const Projects = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'textile', name: 'Textile' },
    { id: 'power', name: 'Power Plant' },
    { id: 'railways', name: 'Railways' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'telecom', name: 'Telecommunications' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Automotive Component Manufacturing',
      client: 'Leading Automotive OEM',
      industry: 'automotive',
      date: 'March 2026',
      status: 'completed',
      description: 'Precision laser cutting and fabrication of automotive chassis components with tight tolerances.',
      technologies: ['CNC Laser Cutting', 'MIG Welding', 'Quality Inspection'],
      duration: '3 months',
      value: '₹2.5 Crore',
      images: 8
    },
    {
      id: 2,
      title: 'Textile Machinery Structure',
      client: 'TexCorp Industries',
      industry: 'textile',
      date: 'February 2026',
      status: 'completed',
      description: 'Complete structural fabrication for textile manufacturing plant with custom components.',
      technologies: ['Sheet Metal Fabrication', 'CNC Bending', 'Assembly'],
      duration: '4 months',
      value: '₹1.8 Crore',
      images: 12
    },
    {
      id: 3,
      title: 'Power Plant Support Structures',
      client: 'Energy Solutions Ltd',
      industry: 'power',
      date: 'January 2026',
      status: 'in-progress',
      description: 'Heavy-duty structural components for power generation facility with corrosion-resistant coating.',
      technologies: ['Structural Fabrication', 'Arc Welding', 'Surface Treatment'],
      duration: '6 months',
      value: '₹4.2 Crore',
      images: 6
    },
    {
      id: 4,
      title: 'Railway Platform Components',
      client: 'National Railways',
      industry: 'railways',
      date: 'December 2025',
      status: 'completed',
      description: 'Precision fabrication of railway platform safety components and structural elements.',
      technologies: ['CNC Cutting', 'Precision Welding', 'Quality Control'],
      duration: '2 months',
      value: '₹1.2 Crore',
      images: 10
    },
    {
      id: 5,
      title: 'Agricultural Equipment Frames',
      client: 'AgriTech Solutions',
      industry: 'agriculture',
      date: 'November 2025',
      status: 'completed',
      description: 'Robust agricultural equipment frames with weather-resistant coating and precision assembly.',
      technologies: ['Heavy Fabrication', 'MIG Welding', 'Assembly'],
      duration: '3 months',
      value: '₹95 Lakh',
      images: 7
    },
    {
      id: 6,
      title: 'Telecommunication Tower Components',
      client: 'ConnectComm Networks',
      industry: 'telecom',
      date: 'October 2025',
      status: 'completed',
      description: 'High-precision components for telecommunication infrastructure with anti-corrosion treatment.',
      technologies: ['Laser Cutting', 'CNC Bending', 'Surface Treatment'],
      duration: '5 months',
      value: '₹3.1 Crore',
      images: 9
    }
  ];

  const filteredProjects = selectedIndustry === 'all' 
    ? projects 
    : projects.filter(project => project.industry === selectedIndustry);

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-500' : 'bg-yellow-500';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completed' : 'In Progress';
  };

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
                Project Portfolio
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                Projects
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
              Delivering precision fabrication solutions across diverse industrial sectors with proven excellence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Statistics Bar */}
      {/* <div className="bg-gunmetal-gray border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '8', label: 'Industries Served' },
              { number: '300MT', label: 'Monthly Capacity' },
              { number: '99.8%', label: 'On-Time Delivery' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-industrial-yellow mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Filter Section */}
      <div className="bg-deep-black border-b border-[#333] sticky top-24 z-30">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-industrial-yellow" />
              <span className="text-white font-semibold">Filter by Industry:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    selectedIndustry === industry.id
                      ? 'bg-industrial-yellow text-deep-black'
                      : 'bg-transparent border border-gunmetal-gray text-gray-300 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-16 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gunmetal-gray border border-[#333] rounded-lg overflow-hidden hover:border-industrial-yellow transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Project Image */}
                  <div className="lg:w-1/3 aspect-video lg:aspect-auto bg-gradient-to-br from-gunmetal-gray to-deep-black relative overflow-hidden">
                    <div className="absolute inset-0 bg-industrial-yellow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-600 font-mono tracking-widest uppercase text-sm">
                        [Project Image: {project.title}]
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-industrial-yellow transition-colors">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                              <div className="flex items-center gap-1">
                                <Building2 size={16} />
                                <span>{project.client}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{project.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-6 line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</div>
                            <div className="text-white font-semibold">{project.duration}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Project Value</div>
                            <div className="text-white font-semibold">{project.value}</div>
                          </div>
                          
                        
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 bg-deep-black border border-[#333] rounded text-xs text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-industrial-yellow">
                          <CheckCircle size={16} />
                          <span className="text-sm font-semibold">ISO Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 border-t border-[#333] bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join our list of satisfied clients across industries. Let's discuss your manufacturing requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                  to="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-4 bg-industrial-yellow text-deep-black font-bold uppercase tracking-widest block w-secondary text-center"
                >
                  Request Quote
                </Link>
            <Button variant="secondary">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
