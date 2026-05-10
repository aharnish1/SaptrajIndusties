import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      dropdown: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Infrastructure', path: '/infrastructure' },
        { name: 'Certifications', path: '/certifications' },
      ]
    },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { 
      name: 'Portfolio', 
      dropdown: [
        { name: 'Projects', path: '/projects' },
        { name: 'Gallery', path: '/gallery' }
      ]
    },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-deep-black/90 backdrop-blur-md border-b border-gunmetal-gray py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center gap-3 group">
            <div className="relative group-hover:box-glow transition-all">
              <img 
                src={logo} 
                alt="SAPTRAJ INDUSTRIES LLP" 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-wider text-white group-hover:text-industrial-yellow transition-colors">
                SAPTRAJ
              </span>
              <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Industries LLP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={`text-sm font-semibold tracking-wider uppercase transition-colors flex items-center gap-1 ${
                        link.dropdown.some(item => location.pathname === item.path) 
                          ? 'text-industrial-yellow' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-48 bg-deep-black border border-[#333] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`block px-4 py-3 text-sm transition-colors hover:bg-industrial-yellow/10 hover:text-industrial-yellow ${
                            location.pathname === dropdownItem.path ? 'text-industrial-yellow bg-industrial-yellow/10' : 'text-gray-300'
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wider uppercase transition-colors relative group ${
                    location.pathname === link.path ? 'text-industrial-yellow' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-[2px] bg-industrial-yellow transform origin-left transition-transform duration-300 ${
                      location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to="/quote"
              className="px-6 py-2 border border-industrial-yellow text-industrial-yellow font-bold uppercase tracking-wider text-sm hover:bg-industrial-yellow hover:text-deep-black transition-all box-glow"
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-deep-black flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-6 w-full px-6">
              {navLinks.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={link.name}
                      className="w-full"
                    >
                      <div className="text-center mb-4">
                        <span className="text-2xl font-heading font-bold uppercase tracking-widest text-industrial-yellow">
                          {link.name}
                        </span>
                      </div>
                      <div className="space-y-3 pl-8">
                        {link.dropdown.map((dropdownItem, dropdownIndex) => (
                          <motion.div
                            key={dropdownItem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + dropdownIndex * 0.05 }}
                          >
                            <Link
                              to={dropdownItem.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`text-lg font-semibold uppercase tracking-wider block text-left ${
                                location.pathname === dropdownItem.path ? 'text-industrial-yellow' : 'text-gray-300 hover:text-white'
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <div className="border-b border-gunmetal-gray mt-4"></div>
                    </motion.div>
                  );
                }
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={link.name}
                    className="w-full text-center border-b border-gunmetal-gray pb-4"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl font-heading font-bold uppercase tracking-widest ${
                        location.pathname === link.path ? 'text-industrial-yellow' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 w-full"
              >
                <Link
                  to="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-4 bg-industrial-yellow text-deep-black font-bold uppercase tracking-widest block w-full text-center"
                >
                  Request Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
