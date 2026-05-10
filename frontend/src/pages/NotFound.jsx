import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Wrench } from 'lucide-react';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-9xl md:text-[12rem] font-heading font-bold text-industrial-yellow opacity-20">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Wrench size={80} className="text-industrial-yellow opacity-50" />
            </div>
          </div>
          
          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            The manufacturing page you're looking for has been moved, 
            or the precision components are still being fabricated.
          </p>
          
          {/* Industrial Elements */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-industrial-yellow border-t-transparent rounded-full"
              />
              <div className="h-12 w-1 bg-gradient-to-b from-industrial-yellow to-transparent"></div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-industrial-yellow border-t-transparent rounded-full"
              />
            </div>
          </div>
          
          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button variant="primary" className="flex items-center gap-2">
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="secondary" className="flex items-center gap-2">
                <Search size={18} />
                Contact Support
              </Button>
            </Link>
          </div>
          
          {/* Additional Help */}
          <div className="mt-12 p-6 bg-gunmetal-gray border border-[#333] rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Looking for something specific?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { label: 'Services', link: '/services' },
                { label: 'Products', link: '/products' },
                { label: 'Projects', link: '/projects' },
                { label: 'Gallery', link: '/gallery' },
                { label: 'About Us', link: '/about-us' },
                { label: 'Infrastructure', link: '/infrastructure' },
                { label: 'Careers', link: '/careers' },
                { label: 'Contact', link: '/contact' }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-gray-400 hover:text-industrial-yellow transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
