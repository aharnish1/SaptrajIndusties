import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
    { name: 'Projects', path: '/projects' },
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-[105] lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[#050505] z-[110] flex flex-col border-l border-[#222222] shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between px-5 pt-5 pb-5 border-b border-[#222222] shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group focus:outline-none">
                <img 
                  src={logo} 
                  alt="Saptraj Logo" 
                  className="h-8 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-[16px] tracking-wider text-[#ffffff]">
                    SAPTRAJ
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[#9ca3af] uppercase">Industries LLP</span>
                </div>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#9ca3af] hover:text-[#f59e0b] hover:bg-[#111111] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Area */}
            <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-[6px]">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  const isOpen = openDropdown === link.name;
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button 
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className={`flex items-center justify-between w-full min-h-[52px] py-3 px-4 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[#f59e0b] ${
                          isOpen || link.dropdown.some(item => location.pathname === item.path)
                            ? 'bg-[#111111] border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.1)] text-[#ffffff]' 
                            : 'bg-[#111111] border-[#222222] text-[#ffffff] hover:border-[#f59e0b] hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                        }`}
                        aria-expanded={isOpen}
                      >
                        <span className="text-[16px] sm:text-[18px] font-semibold uppercase tracking-[2px] font-body">{link.name}</span>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={18} className={isOpen ? "text-[#f59e0b]" : "text-[#9ca3af]"} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-[24px] pt-1.5 space-y-1">
                              {link.dropdown.map(dropdownItem => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block min-h-[44px] py-2.5 flex items-center px-4 rounded-md text-[14px] tracking-[1px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b] font-body ${
                                    location.pathname === dropdownItem.path 
                                      ? 'text-[#f59e0b] bg-[#f59e0b]/10' 
                                      : 'text-[#9ca3af] hover:text-[#ffffff] hover:bg-[#222222]'
                                  }`}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center w-full min-h-[52px] py-3 px-4 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[#f59e0b] font-body ${
                      location.pathname === link.path
                        ? 'border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]'
                        : 'border-[#222222] bg-[#111111] text-[#ffffff] hover:border-[#f59e0b] hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                    }`}
                  >
                    <span className="text-[16px] sm:text-[18px] font-semibold uppercase tracking-[2px]">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom CTA & Footer */}
            <div className="border-t border-[#222222] p-5 bg-[#050505] shrink-0">
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center min-h-[48px] py-3 bg-[#f59e0b] text-[#050505] text-base font-bold uppercase tracking-[2px] rounded-lg hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all mb-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#050505] font-body"
              >
                Request Quote
              </Link>
              
              <div className="text-center">
                <p className="text-[#ffffff] font-semibold text-xs tracking-[1px] uppercase mb-0.5 font-display">Saptraj Industries LLP</p>
                <p className="text-[#9ca3af] text-[11px] tracking-wider font-body">Precision Metal Fabrication</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
