import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-deep-black text-metallic-silver">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.1)_0%,transparent_60%)]"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Privacy <span className="text-industrial-yellow">Policy</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your data security and privacy are our top priorities at SAPTRAJ INDUSTRIES LLP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Database className="text-industrial-yellow" size={24} />
                <h3 className="text-2xl font-bold text-white">Information We Collect</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• Contact information (name, email, phone)</li>
                <li>• Company details and requirements</li>
                <li>• Project specifications and technical data</li>
                <li>• Communication records and service history</li>
                <li>• Website usage analytics (anonymized)</li>
              </ul>
            </motion.div>

            {/* How We Use Your Data */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Eye className="text-industrial-yellow" size={24} />
                <h3 className="text-2xl font-bold text-white">How We Use Your Data</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• Provide manufacturing quotations and technical consultations</li>
                <li>• Process project inquiries and service requests</li>
                <li>• Send product information and technical specifications</li>
                <li>• Schedule manufacturing capacity and delivery timelines</li>
                <li>• Improve our industrial fabrication services</li>
              </ul>
            </motion.div>
          </div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <Lock className="text-industrial-yellow" size={24} />
              <h3 className="text-2xl font-bold text-white">Data Protection Measures</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-industrial-yellow mb-4">Security</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• SSL encryption on all communications</li>
                  <li>• Secure data storage systems</li>
                  <li>• Restricted access to sensitive information</li>
                  <li>• Regular security audits and updates</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-industrial-yellow mb-4">Compliance</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• GDPR compliant data handling</li>
                  <li>• ISO 9001:2015 quality management</li>
                  <li>• Industry best practices</li>
                  <li>• Regular compliance training</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="text-industrial-yellow" size={24} />
              <h3 className="text-2xl font-bold text-white">Your Rights</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Access to your personal data</li>
              <li>• Request data correction or deletion</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Data portability to other services</li>
              <li>• Complaint and grievance procedures</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#0A0A0A] border-t border-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Questions About Privacy?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors">
              Contact Our Team
            </Link>
            <Link to="mailto:saptarajindustries@gmail.com" className="px-8 py-4 border border-industrial-yellow text-industrial-yellow font-bold rounded hover:bg-industrial-yellow hover:text-deep-black transition-colors">
              Email Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
