import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import aboutBg from "../../assets/aboutBg.jpeg";
import Button from '../UI/Button';

const ServiceHero3D = ({ service }) => {
  return (
    <section className="relative h-screen overflow-hidden bg-deep-black flex items-center">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 h-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          
          {/* LEFT SIDE - 3D MODEL */}
          <div
                  className="relative py-32 md:py-40 border-b border-[#333] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${aboutBg})`,
                  }}
          ></div>

          {/* RIGHT SIDE - CONTENT */}
          <div className="relative z-30 text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >

              {/* Small Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base tracking-[4px] uppercase text-gray-400 mb-4"
              >
                PRECISION METAL FABRICATION
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5"
              >
                {service?.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-industrial-yellow text-xl md:text-2xl mb-6"
              >
                {service?.subtitle}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg leading-relaxed mb-8"
              >
                {service?.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 mb-10"
              >
                {service?.features?.slice(0, 4).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-industrial-yellow flex-shrink-0" />

                    <span className="text-sm md:text-base">
                      {typeof feature === 'string'
                        ? feature
                        : feature?.title || ''}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >

                <Button
                  variant="primary"
                  className="px-8 py-4 group"
                >
                  <span className="flex items-center gap-2">
                    Request Quote
                    <ArrowRight size={18} />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="px-8 py-4 group"
                >
                  <span className="flex items-center gap-2">
                    Contact Expert
                    <ArrowRight size={18} />
                  </span>
                </Button>

              </motion.div>

            </motion.div>

          </div>
        </div>
      </div>

      {/* Mobile Bottom Overlay */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

    </section>
  );
};

export default ServiceHero3D;