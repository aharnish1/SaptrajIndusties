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
         className={`fixed top-0 left-0 right-0 z-[100] transition-[padding,background-color] duration-300 will-change-transform border-b border-border-subtle ${
          isScrolled
            ? 'glass-industrial py-2 sm:py-3 md:py-4 bg-black/90'
            : 'bg-black/75 backdrop-blur-md py-3 sm:py-4 md:py-6'
        }`}
      style={{
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center gap-2 sm:gap-3 group">
            <div className="relative group-hover:box-glow-hover transition-all">
              <img 
                src={logo} 
                alt="SAPTRAJ INDUSTRIES LLP" 
                className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-wider text-text-primary group-hover:text-accent-primary transition-colors">
                SAPTRAJ
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-text-dim uppercase">Industries LLP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={`text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors flex items-center gap-1 font-body ${
                        link.dropdown.some(item => location.pathname === item.path) 
                          ? 'text-accent-primary text-glow-subtle' 
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180 text-accent-primary" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-44 xl:w-48 glass-industrial border border-border-subtle rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`block px-3 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm transition-colors hover:bg-accent-primary/10 hover:text-accent-primary font-body ${
                            location.pathname === dropdownItem.path ? 'text-accent-primary bg-accent-primary/10' : 'text-text-muted'
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
                  className={`text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors relative group font-body ${
                    location.pathname === link.path ? 'text-accent-primary text-glow-subtle' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent transform origin-left transition-transform duration-300 ${
                      location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to="/quote"
              className="px-4 xl:px-6 py-2 btn-secondary-gradient text-accent-primary font-bold uppercase tracking-wider text-xs xl:text-sm hover:text-glow-primary transition-all box-glow-hover font-body"
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 text-text-primary p-2 hover:text-accent-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-30 bg-bg-deep flex flex-col items-center justify-center pt-20 industrial-grid"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 w-full px-4 sm:px-6 overflow-y-auto max-h-screen pb-8">
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
                      <div className="text-center mb-3 sm:mb-4">
                        <span className="text-lg sm:text-2xl font-display font-bold uppercase tracking-widest text-accent-primary text-glow-subtle">
                          {link.name}
                        </span>
                      </div>
                      <div className="space-y-2 sm:space-y-3 pl-6 sm:pl-8">
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
                              className={`text-base sm:text-lg font-semibold uppercase tracking-wider block text-left font-body ${
                                location.pathname === dropdownItem.path ? 'text-accent-primary' : 'text-text-muted hover:text-text-primary'
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <div className="border-b border-border-subtle mt-3 sm:mt-4"></div>
                    </motion.div>
                  );
                }
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={link.name}
                    className="w-full text-center border-b border-border-subtle pb-3 sm:pb-4"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg sm:text-2xl font-display font-bold uppercase tracking-widest font-body ${
                        location.pathname === link.path ? 'text-accent-primary text-glow-subtle' : 'text-text-primary'
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
                className="mt-3 sm:mt-4 w-full"
              >
                <Link
                  to="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 sm:px-8 py-3 sm:py-4 btn-primary-gradient text-deep-black font-bold uppercase tracking-widest block w-full text-center text-base sm:text-lg font-body"
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
