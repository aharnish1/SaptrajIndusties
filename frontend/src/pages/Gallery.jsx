import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn, Filter } from 'lucide-react';
import Button from '../components/UI/Button';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'laser-cutting', name: 'Laser Cutting' },
    { id: 'fabrication', name: 'Fabrication' },
    { id: 'welding', name: 'Welding' },
    { id: 'infrastructure', name: 'Infrastructure' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Industrial Shed Fabrication',
      category: 'fabrication',
      description: 'Large-scale industrial structure with precision welding',
      featured: true
    },
    {
      id: 2,
      title: 'CNC Laser Cutting Components',
      category: 'laser-cutting',
      description: 'High-precision laser cut parts for automotive industry',
      featured: true
    },
    {
      id: 3,
      title: 'Steel Structure Assembly',
      category: 'fabrication',
      description: 'Complex steel framework for warehouse facility'
    },
    {
      id: 4,
      title: 'Precision Welding Project',
      category: 'welding',
      description: 'MIG welding of heavy-duty industrial components'
    },
    {
      id: 5,
      title: 'Bodor Fiber Laser Operation',
      category: 'laser-cutting',
      description: 'Advanced fiber laser cutting in action'
    },
    {
      id: 6,
      title: 'Factory Floor Overview',
      category: 'infrastructure',
      description: '20,000 sq ft state-of-the-art manufacturing facility'
    },
    {
      id: 7,
      title: 'CNC Bending Process',
      category: 'fabrication',
      description: 'Precision CNC bending of sheet metal components'
    },
    {
      id: 8,
      title: 'Quality Inspection',
      category: 'infrastructure',
      description: 'ISO certified quality control process'
    },
    {
      id: 9,
      title: 'Arc Welding Station',
      category: 'welding',
      description: 'Professional arc welding setup for heavy fabrication'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
                Project Showcase
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
              Explore our portfolio of precision engineering projects and industrial fabrication solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gunmetal-gray border-b border-[#333] sticky top-24 z-30">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-industrial-yellow" />
              <span className="text-white font-semibold">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-industrial-yellow text-deep-black'
                      : 'bg-transparent border border-gunmetal-gray text-gray-300 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-lg border border-[#333] hover:border-industrial-yellow transition-all duration-300 ${
                  item.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Placeholder */}
                <div className={`aspect-video bg-gunmetal-gray flex items-center justify-center relative overflow-hidden ${
                  item.featured ? 'lg:aspect-video' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-industrial-yellow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <span className="text-gray-600 font-mono tracking-widest uppercase text-sm">
                    [Project Image: {item.title}]
                  </span>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-deep-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <div className="text-center">
                      <ZoomIn size={32} className="text-industrial-yellow mx-auto mb-3" />
                      <Button variant="outline" size="sm">View Project</Button>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="text-industrial-yellow text-xs uppercase tracking-widest font-bold">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Gallery;
