import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Shield, Users, Hammer } from 'lucide-react';

const TermsOfService = () => {
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
              Terms of <span className="text-industrial-yellow">Service</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional terms and conditions for SAPTRAJ INDUSTRIES LLP manufacturing services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Service Terms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Hammer className="text-industrial-yellow" size={24} />
                <h3 className="text-2xl font-bold text-white">Service Terms</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• All quotations are valid for 30 days from issue date</li>
                <li>• Prices subject to material availability and market conditions</li>
                <li>• 50% advance payment required for order confirmation</li>
                <li>• Delivery timelines depend on project complexity and current workload</li>
                <li>• Technical specifications must be provided in writing</li>
                <li>• Cancellation fees may apply for confirmed orders</li>
              </ul>
            </motion.div>

            {/* Manufacturing Terms */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <FileText className="text-industrial-yellow" size={24} />
                <h3 className="text-2xl font-bold text-white">Manufacturing Terms</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• Quality standards: ISO 9001:2015 compliance</li>
                <li>• Tolerance limits: ±0.1mm for precision components</li>
                <li>• Material specifications: Customer-provided or industry standard</li>
                <li>• Testing and inspection: As per international standards</li>
                <li>• Warranty: 12 months against manufacturing defects</li>
                <li>• Liability limited to manufacturing defects only</li>
              </ul>
            </motion.div>
          </div>

          {/* Payment Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="text-industrial-yellow" size={24} />
              <h3 className="text-2xl font-bold text-white">Payment Terms</h3>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Payment methods: Bank transfer, UPI, Check</li>
              <li>• Credit facilities available for approved clients</li>
              <li>• International payments: Wire transfer, LC at sight</li>
              <li>• GST and other taxes as applicable</li>
              <li>• Late payment interest: 18% per annum</li>
              <li>• Dispute resolution: As per Indian legal framework</li>
            </ul>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <Users className="text-industrial-yellow" size={24} />
              <h3 className="text-2xl font-bold text-white">Intellectual Property</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-industrial-yellow mb-4">Client IP</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• All client designs remain client property</li>
                  <li>• Confidentiality agreements available</li>
                  <li>• NDAs for sensitive projects</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-industrial-yellow mb-4">Our IP</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Manufacturing processes are proprietary</li>
                  <li>• Tooling and fixtures remain our property</li>
                  <li>• Process improvements cannot be disclosed</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#0A0A0A] border-t border-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Questions About Terms?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors">
              Contact Legal Team
            </Link>
            <Link to="mailto:saptarajindustries@gmail.com" className="px-8 py-4 border border-industrial-yellow text-industrial-yellow font-bold rounded hover:bg-industrial-yellow hover:text-deep-black transition-colors">
              Email Legal Department
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
