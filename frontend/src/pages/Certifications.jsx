import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, FileText, Star, Users } from 'lucide-react';
import Button from '../components/UI/Button';
import { Download } from "lucide-react";
import certificateImage from '../assets/certificates/certificateImage.jpeg';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'ISO 9001:2015',
      issuer: 'International Organization for Standardization',
      description: 'Quality Management Systems certification ensuring consistent quality in our manufacturing processes and customer satisfaction.',
      date: 'Valid until 2026',
      category: 'Quality Management',
      image: 'iso-9001',
      featured: true
    },
    {
      id: 2,
      title: 'MSME Registration',
      issuer: 'Ministry of Micro, Small and Medium Enterprises',
      description: 'Government recognition as a certified micro and small-scale manufacturing enterprise.',
      date: 'Permanent',
      category: 'Business Registration',
      image: 'msme'
    },
    {
      id: 3,
      title: 'GST Certification',
      issuer: 'Goods and Services Tax Council',
      description: 'Certified for GST compliance and tax regulations in manufacturing and services.',
      date: 'Annual Renewal',
      category: 'Tax Compliance',
      image: 'gst'
    },
    {
      id: 4,
      title: 'Factory License',
      issuer: 'Directorate of Industrial Safety and Health',
      description: 'Compliance with industrial safety regulations and manufacturing facility standards.',
      date: 'Valid until 2027',
      category: 'Safety Compliance',
      image: 'factory'
    },
    {
      id: 5,
      title: 'Pollution Control Certificate',
      issuer: 'Maharashtra Pollution Control Board',
      description: 'Environmental compliance for manufacturing processes and waste management.',
      date: 'Annual Renewal',
      category: 'Environmental',
      image: 'pollution'
    },
    {
      id: 6,
      title: 'Trade License',
      issuer: 'Pune Municipal Corporation',
      description: 'Authorized for manufacturing and fabrication business operations in Pune region.',
      date: 'Annual Renewal',
      category: 'Business License',
      image: 'trade'
    }
  ];

  const qualityStandards = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes at every stage of manufacturing'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Recognized by leading industrial clients for precision and reliability'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals with extensive industry experience'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete documentation and traceability for all manufacturing processes'
    }
  ];

  const achievements = [
    { number: '99.8%', label: 'Quality Compliance Rate' },
    { number: '0', label: 'Safety Incidents' },
    { number: '150+', label: 'Satisfied Clients' },
    { number: '5+', label: 'Years of Excellence' }
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
                Certifications & Standards
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                Excellence
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
              Our commitment to quality, safety, and environmental standards is validated through comprehensive certifications and industry recognitions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured ISO Certification */}
      <section className="py-20 bg-gunmetal-gray border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-deep-black border-2 border-industrial-yellow rounded-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 flex items-center justify-center bg-gradient-to-br from-industrial-yellow/10 to-transparent">
                <div className="text-center">
                  <div className="relative group">

    {/* Glow Effect */}
    <div className="absolute inset-0 bg-yellow-400/20 blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

    {/* Certificate Image */}
    <img
      src={certificateImage}
      alt="ISO 9001:2015 Certificate"
      className="
        relative z-10
        w-full max-w-[420px]
        rounded-xl
        border border-yellow-400/30
        shadow-2xl
        transition-all duration-500
        group-hover:scale-105
        group-hover:shadow-yellow-400/20
      "
    />

  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-12">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={20} className="text-industrial-yellow" />
                  <span className="text-industrial-yellow font-bold">Featured Certification</span>
                </div>
                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                  Internationally Recognized Quality Standards
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our ISO 9001:2015 certification demonstrates our commitment to delivering consistent, high-quality manufacturing solutions. This international standard ensures that we follow systematic quality management processes, from raw material inspection to final product delivery.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Systematic approach to quality management',
                    'Customer-focused manufacturing processes',
                    'Continuous improvement methodologies',
                    'Regular internal and external audits',
                    'Documented standard operating procedures'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-industrial-yellow flex-shrink-0"></span>
                      {item}
                    </div>
                  ))}
                </div>

                  <a
  href="../assets/certificates/Certificate.pdf"
  download
  className="
    inline-flex items-center gap-3
    bg-yellow-400 hover:bg-yellow-500
    text-black font-bold
    px-8 py-4
    transition-all duration-300
    shadow-lg hover:shadow-yellow-400/30
  "
>
  <Download size={20} />
  DOWNLOAD CERTIFICATE
                  </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="py-16 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-industrial-yellow mb-2">{achievement.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Certifications Grid */}
      <section className="py-20 bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">All Certifications</h2>
            <p className="text-gray-400">Comprehensive compliance with industry standards and regulations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-deep-black border border-[#333] rounded-lg overflow-hidden hover:border-industrial-yellow transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-gunmetal-gray to-deep-black relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-industrial-yellow opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="text-center">
                    <Award size={48} className="text-industrial-yellow mx-auto mb-3" />
                    <span className="text-gray-600 font-mono text-xs">[Certificate: {cert.image}]</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-industrial-yellow/20 text-industrial-yellow text-xs font-bold rounded">
                      {cert.category}
                    </span>
                    <span className="text-gray-500 text-xs">{cert.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{cert.issuer}</p>
                  <p className="text-gray-300 text-sm line-clamp-3">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-deep-black border-t border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Our Commitment to Quality</h2>
            <p className="text-gray-400">Beyond certifications, we maintain rigorous internal standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-industrial-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <standard.icon size={24} className="text-deep-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{standard.title}</h3>
                <p className="text-gray-400 text-sm">{standard.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
