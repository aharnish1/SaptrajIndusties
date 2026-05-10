import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../ServiceCard';
import { Settings, Zap, Wrench, Package, Cpu, Factory } from 'lucide-react';

const services = [
  { 
    id: 'cnc-laser-cutting',
    icon: Zap, 
    title: 'CNC Laser Cutting', 
    description: 'Precision laser cutting with high-speed Bodor Fiber Laser machines for complex geometries.',
    stats: ['±0.1mm Precision', '25mm Thickness', '35m/min Speed']
  },
  { 
    id: 'cnc-bending',
    icon: Settings, 
    title: 'CNC Bending', 
    description: 'Accurate CNC bending services ensuring tight tolerances and perfect angles for sheet metal.',
    stats: ['±0.5° Accuracy', '200 Ton Capacity', '4m Length']
  },
  { 
    id: 'mig-arc-welding',
    icon: Wrench, 
    title: 'MIG & Arc Welding', 
    description: 'Expert welding by certified professionals for high-strength industrial assemblies.',
    stats: ['AWS D1.1 Certified', '50mm Thickness', '100% Quality']
  },
  { 
    id: 'structural-fabrication',
    icon: Factory, 
    title: 'Structural Fabrication', 
    description: 'Heavy-duty structural steel fabrication for large scale industrial projects.',
    stats: ['150mm Thickness', '600mm Beams', '500 Tons/Month']
  },
  { 
    id: 'sheet-metal-fabrication',
    icon: Package, 
    title: 'Sheet Metal Fabrication', 
    description: 'End-to-end sheet metal solutions from prototyping to mass production.',
    stats: ['0.5mm - 8mm', '10,000+/Month', 'Complete Solutions']
  },
  { 
    id: 'electric-panel-fabrication',
    icon: Cpu, 
    title: 'Electric Panel Fabrication', 
    description: 'Custom engineered electric control panels built to exact specifications.',
    stats: ['IEC/UL Compliant', 'Custom Design', 'Full Assembly']
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-deep-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm md:text-base tracking-[3px] uppercase text-gray-400 mb-4">
              CAPABILITIES
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Manufacturing Services
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Advanced metal fabrication solutions with precision engineering, 
              cutting-edge technology, and uncompromising quality standards.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
