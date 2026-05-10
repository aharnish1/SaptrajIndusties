import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const processes = [
  { step: '01', title: 'Raw Material', desc: 'Premium grade steel and metal alloys sourced from certified vendors.' },
  { step: '02', title: 'Laser Cutting', desc: 'High-speed fiber laser cutting ensuring dimensional accuracy.' },
  { step: '03', title: 'CNC Bending', desc: 'Precision forming and bending with computer numeric control.' },
  { step: '04', title: 'Fabrication', desc: 'Expert assembly and structuring of cut and bent components.' },
  { step: '05', title: 'Welding', desc: 'MIG & Arc welding by certified operators for structural integrity.' },
  { step: '06', title: 'Quality Inspection', desc: 'Rigorous quality checks using calibrated instruments (ISO 9001:2015).' },
  { step: '07', title: 'Final Delivery', desc: 'Secure packaging and dispatch to the client location.' }
];

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <span className="text-industrial-yellow uppercase tracking-widest font-bold text-sm">Workflow</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">Manufacturing Process</h2>
          <div className="w-24 h-1 bg-industrial-yellow mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#222]">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-industrial-yellow shadow-[0_0_15px_#FFD400]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          {processes.map((process, index) => (
            <div key={index} className={`relative flex items-center justify-between mb-16 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block w-5/12"></div>

              {/* Center Node */}
              <div className="absolute left-[15px] md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-deep-black border-2 border-gunmetal-gray flex items-center justify-center z-10 transition-colors duration-300">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-3 h-3 rounded-full bg-industrial-yellow shadow-[0_0_10px_#FFD400]"
                />
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="w-full pl-16 md:pl-0 md:w-5/12"
              >
                <div className={`p-6 border border-[#333] bg-gunmetal-gray/50 backdrop-blur-sm rounded-lg hover:border-industrial-yellow transition-colors relative group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="absolute -top-6 text-6xl font-bold font-heading text-white opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    {process.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">{process.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{process.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
