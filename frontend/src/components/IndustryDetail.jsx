import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  Clock, 
  Users, 
  Target, 
  CheckCircle, 
  Star,
  Download,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Factory,
  Zap,
  Wrench,
  Shield
} from 'lucide-react';
import Button from './UI/Button';

// Industry data
const industryData = {
  automotive: {
    title: 'Automotive Industry',
    tagline: 'Precision Engineering for Modern Mobility',
    description: 'Leading provider of precision metal fabrication solutions for the automotive industry, delivering high-quality components for vehicle manufacturing and assembly lines.',
    heroImage: '/images/industries/automotive-hero.jpg',
    overview: {
      services: 'Comprehensive metal fabrication services including laser cutting, CNC bending, welding, and assembly for automotive components.',
      capabilities: 'Advanced manufacturing capabilities with tolerance precision up to ±0.1mm, handling materials from mild steel to high-grade alloys.',
      expertise: 'Specialized expertise in automotive-grade fabrication with ISO 9001:2015 certified quality management systems.',
      materials: 'Expertise in working with automotive-grade materials including high-strength steel, aluminum alloys, and specialty metals.',
      standards: 'Adherence to automotive industry standards with rigorous quality control and testing protocols.',
      capacity: 'Monthly production capacity of 300+ metric tons with flexible scheduling for just-in-time delivery.'
    },
    services: [
      {
        icon: Factory,
        title: 'Laser Cutting',
        description: 'Precision laser cutting for automotive components with tight tolerances and clean edges.',
        features: ['±0.1mm tolerance', 'Complex geometries', 'High-speed processing', 'Material optimization']
      },
      {
        icon: Wrench,
        title: 'CNC Bending',
        description: 'Advanced CNC bending for chassis components and structural parts.',
        features: ['Multi-axis bending', 'Consistent quality', 'Complex shapes', 'High volume capacity']
      },
      {
        icon: Zap,
        title: 'Welding Services',
        description: 'Professional MIG/TIG welding for automotive structural components.',
        features: ['Certified welders', 'Multiple materials', 'Structural integrity', 'Quality testing']
      },
      {
        icon: Shield,
        title: 'Quality Testing',
        description: 'Comprehensive quality testing and inspection for automotive components.',
        features: ['Dimensional inspection', 'Material testing', 'Stress analysis', 'Documentation']
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Chassis Component Manufacturing',
        description: 'Precision fabrication of chassis components for leading automotive OEM.',
        image: '/images/projects/chassis.jpg',
        tags: ['Laser Cutting', 'CNC Bending', 'Welding'],
        client: 'Leading OEM',
        year: '2023'
      },
      {
        id: 2,
        title: 'Assembly Line Structures',
        description: 'Custom fabrication of assembly line structures and equipment.',
        image: '/images/projects/assembly.jpg',
        tags: ['Structural Steel', 'Custom Design', 'Installation'],
        client: 'Auto Manufacturer',
        year: '2023'
      },
      {
        id: 3,
        title: 'Body Panel Components',
        description: 'High-precision body panel components with complex geometries.',
        image: '/images/projects/body-panels.jpg',
        tags: ['Laser Cutting', 'Forming', 'Finishing'],
        client: 'Tier-1 Supplier',
        year: '2022'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 9001:2015 Certified',
        description: 'Internationally recognized quality management system ensuring consistent excellence.'
      },
      {
        icon: Target,
        title: 'Precision Engineering',
        description: 'Advanced precision capabilities with tight tolerances and quality control.'
      },
      {
        icon: Users,
        title: 'Expert Team',
        description: 'Skilled professionals with extensive automotive industry experience.'
      },
      {
        icon: Clock,
        title: 'Timely Delivery',
        description: 'Just-in-time delivery systems to support automotive production schedules.'
      }
    ],
    stats: [
      { value: '45+', label: 'Automotive Projects' },
      { value: '5+', label: 'Years Experience' },
      { value: '300+', label: 'Tons/Month Capacity' },
      { value: '±0.1mm', label: 'Precision Tolerance' }
    ],
    process: [
      {
        step: 1,
        title: 'Consultation & Design',
        description: 'Detailed consultation and design review to understand automotive requirements.'
      },
      {
        step: 2,
        title: 'Material Selection',
        description: 'Expert material selection based on automotive specifications and performance requirements.'
      },
      {
        step: 3,
        title: 'Precision Manufacturing',
        description: 'Advanced manufacturing with strict quality control and automotive standards.'
      },
      {
        step: 4,
        title: 'Quality Testing',
        description: 'Comprehensive testing and inspection to ensure automotive-grade quality.'
      },
      {
        step: 5,
        title: 'Delivery & Support',
        description: 'Just-in-time delivery with ongoing technical support and service.'
      }
    ]
  },
  textile: {
    title: 'Textile Industry',
    tagline: 'Advanced Fabrication for Textile Manufacturing',
    description: 'Specialized metal fabrication solutions for textile machinery and manufacturing equipment.',
    heroImage: '/images/industries/textile-hero.jpg',
    overview: {
      services: 'Comprehensive fabrication services for textile machinery components and structures.',
      capabilities: 'Advanced manufacturing capabilities for textile industry requirements.',
      expertise: 'Specialized expertise in textile machinery fabrication.',
      materials: 'Expertise in working with textile machinery materials.',
      standards: 'Adherence to textile industry standards.',
      capacity: 'Production capacity for textile industry needs.'
    },
    services: [
      {
        icon: Factory,
        title: 'Machine Frames',
        description: 'Robust machine frames for textile manufacturing equipment.',
        features: ['Heavy-duty construction', 'Precision alignment', 'Vibration resistance', 'Custom designs']
      },
      {
        icon: Wrench,
        title: 'Component Manufacturing',
        description: 'Precision components for textile machinery.',
        features: ['High precision', 'Durable materials', 'Custom specifications', 'Quality tested']
      },
      {
        icon: Zap,
        title: 'Structural Fabrication',
        description: 'Structural components for textile manufacturing facilities.',
        features: ['Load-bearing capacity', 'Safety compliance', 'Efficient design', 'Quick installation']
      },
      {
        icon: Shield,
        title: 'Maintenance Solutions',
        description: 'Fabricated components for textile machinery maintenance.',
        features: ['Replacement parts', 'Upgrade solutions', 'Retrofit services', 'Technical support']
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Loom Component Manufacturing',
        description: 'Precision components for modern textile looms.',
        image: '/images/projects/loom.jpg',
        tags: ['Precision', 'Custom', 'High-volume'],
        client: 'Textile Manufacturer',
        year: '2023'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'Industry Expertise',
        description: 'Deep understanding of textile industry requirements.'
      },
      {
        icon: Target,
        title: 'Custom Solutions',
        description: 'Tailored fabrication solutions for textile machinery.'
      },
      {
        icon: Users,
        title: 'Technical Team',
        description: 'Experienced team with textile industry knowledge.'
      },
      {
        icon: Clock,
        title: 'Quick Turnaround',
        description: 'Fast production and delivery for textile industry needs.'
      }
    ],
    stats: [
      { value: '28+', label: 'Textile Projects' },
      { value: '4+', label: 'Years Experience' },
      { value: '200+', label: 'Tons/Month Capacity' },
      { value: '±0.2mm', label: 'Precision Tolerance' }
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Understanding textile machinery requirements.'
      },
      {
        step: 2,
        title: 'Design & Engineering',
        description: 'Custom design for textile applications.'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Precision manufacturing for textile components.'
      },
      {
        step: 4,
        title: 'Quality Assurance',
        description: 'Testing for textile industry standards.'
      },
      {
        step: 5,
        title: 'Installation Support',
        description: 'Installation and technical support.'
      }
    ]
  }
  // Add other industries as needed
};

const IndustryDetail = () => {
  const { industryId } = useParams();
  const [industry, setIndustry] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    const industryInfo = industryData[industryId];
    if (industryInfo) {
      setIndustry(industryInfo);
      // Update page title
      document.title = `${industryInfo.title} - SAPTRAJ Industries`;
    }
  }, [industryId]);

  if (!industry) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Industry Not Found</h1>
          <p className="text-gray-400 mb-8">The requested industry page could not be found.</p>
          <Link to="/industries" className="text-industrial-yellow hover:text-yellow-400">
            ← Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black">
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${industry.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-industrial-yellow rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-gray-400 mb-8"
          >
            <Link to="/" className="hover:text-industrial-yellow transition-colors">Home</Link>
            <ChevronRight size={16} />
            <Link to="/industries" className="hover:text-industrial-yellow transition-colors">Industries</Link>
            <ChevronRight size={16} />
            <span className="text-industrial-yellow">{industry.title}</span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              {industry.title}
            </h1>
            <p className="text-xl md:text-2xl text-industrial-yellow mb-8">
              {industry.tagline}
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {industry.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="px-8 py-4">
                Request Quote
              </Button>
              <Button variant="outline" className="px-8 py-4">
                Contact Team
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-industrial-yellow rounded-full flex justify-center">
            <div className="w-1 h-3 bg-industrial-yellow rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.section>

      {/* Industry Overview Section */}
      <section className="py-20 bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Industry Overview
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Services</h3>
                  <p className="text-gray-300 leading-relaxed">{industry.overview.services}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Capabilities</h3>
                  <p className="text-gray-300 leading-relaxed">{industry.overview.capabilities}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Expertise</h3>
                  <p className="text-gray-300 leading-relaxed">{industry.overview.expertise}</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Materials</h3>
                <p className="text-gray-300 leading-relaxed">{industry.overview.materials}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Standards</h3>
                <p className="text-gray-300 leading-relaxed">{industry.overview.standards}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Capacity</h3>
                <p className="text-gray-300 leading-relaxed">{industry.overview.capacity}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Key Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive metal fabrication services tailored for the {industry.title.toLowerCase()} industry
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group"
              >
                <div className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 hover:border-industrial-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-industrial-yellow/20">
                  
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredService === index ? 1.1 : 1,
                      rotate: hoveredService === index ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-xl flex items-center justify-center mb-4"
                  >
                    <service.icon size={32} className="text-black" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-400 text-sm">
                        <CheckCircle size={14} className="text-industrial-yellow" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glow Effect */}
                {hoveredService === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-industrial-yellow/10 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Showcase of our successful projects in the {industry.title.toLowerCase()} industry
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-[#333] hover:border-industrial-yellow/50 transition-all duration-300">
                  
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-industrial-yellow/10 border border-industrial-yellow/20 rounded text-xs text-industrial-yellow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              What makes us the preferred partner for {industry.title.toLowerCase()} industry
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {industry.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industry.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-industrial-yellow mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gunmetal-gray relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-sm md:text-base tracking-[3px] uppercase text-gray-400 mb-4">
              WORKFLOW
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Our Manufacturing Process
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From consultation to final delivery, our streamlined workflow ensures precision, 
              efficiency, and uncompromising quality at every stage.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-industrial-yellow/50 via-industrial-yellow/30 to-industrial-yellow/50 transform -translate-x-1/2 origin-top"
            />

            {/* Process Steps */}
            <div className="space-y-16 md:space-y-24">
              {industry.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-center"
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}
                  >
                    <div className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-industrial-yellow/50 transition-all duration-300">
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-industrial-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-industrial-yellow/20 rounded-full flex items-center justify-center">
                            <span className="text-industrial-yellow font-bold text-sm">{step.step}</span>
                          </div>
                          <div className="h-px bg-industrial-yellow/30 flex-1" />
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-industrial-yellow transition-colors duration-300">
                          {step.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Accent Border */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-industrial-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>

                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="relative">
                      {/* Glow */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 bg-industrial-yellow rounded-full blur-lg opacity-50"
                      />
                      
                      {/* Node */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-lg md:text-xl shadow-lg shadow-industrial-yellow/30">
                        {step.step}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty Space for Alternating Layout */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto' : 'md:pr-8'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-yellow/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.1)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need {industry.title} Solutions?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get in touch with our expert team to discuss your {industry.title.toLowerCase()} industry requirements and discover how we can help you achieve your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="primary" className="px-8 py-4">
                Request Quote
              </Button>
              <Button variant="outline" className="px-8 py-4">
                Contact Team
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>saptarajindustries@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
