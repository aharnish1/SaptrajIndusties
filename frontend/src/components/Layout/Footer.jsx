import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../assets/logo.png';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'saptarajindustries@gmail.com',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra, India'
  });

  // Create Google Maps URL for location
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`;

  useEffect(() => {
    // Load settings from API
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/settings');
        
        console.log('Footer API response:', response.data);
        
        // Backend returns direct object, not nested
        setContactInfo({
          email: response.data.email || 'saptarajindustries@gmail.com',
          phone: response.data.phone || '+91 98765 43210',
          location: response.data.location || 'Pune, Maharashtra, India'
        });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    fetchSettings();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchSettings, 5000);
    
    return () => clearInterval(interval);
  }, []); 
  return (
    <footer className="bg-[#020202] pt-20 pb-10 border-t border-gunmetal-gray relative overflow-hidden">
      {/* Background industrial texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_1px)] bg-[size:4px_4px]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logo} 
                alt="SAPTRAJ INDUSTRIES LLP" 
                className="h-10 w-auto object-contain"
              />
              <span className="font-heading font-bold text-xl tracking-wider text-white">
                SAPTRAJ
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Precision Engineered Steel Manufacturing Solutions. ISO 9001:2015 Certified enterprise providing world-class fabrication services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gunmetal-gray flex items-center justify-center text-gray-400 hover:text-industrial-yellow hover:bg-[#333] transition-colors border border-[#333]">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gunmetal-gray flex items-center justify-center text-gray-400 hover:text-industrial-yellow hover:bg-[#333] transition-colors border border-[#333]">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gunmetal-gray flex items-center justify-center text-gray-400 hover:text-industrial-yellow hover:bg-[#333] transition-colors border border-[#333]">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 uppercase tracking-wider relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-industrial-yellow"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Services', path: '/services' },
                { name: 'Products', path: '/products' },
                { name: 'Projects', path: '/projects' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-industrial-yellow transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-laser-red opacity-50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 uppercase tracking-wider relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-industrial-yellow"></span>
            </h3>
            <ul className="space-y-3">
              {['CNC Laser Cutting', 'CNC Bending', 'MIG & Arc Welding', 'Structural Fabrication', 'Sheet Metal Assemblies', 'Electric Panels'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-400 hover:text-industrial-yellow transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-laser-red opacity-50"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 uppercase tracking-wider relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-industrial-yellow"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-industrial-yellow shrink-0 mt-1" size={18} />
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open location in Google Maps"
                  aria-label="Open company location in Google Maps"
                  className="text-gray-400 hover:text-industrial-yellow transition-colors duration-300 cursor-pointer text-sm"
                >
                  {contactInfo.location}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-industrial-yellow shrink-0" size={18} />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  title="Call company phone number"
                  aria-label="Call company phone number"
                  className="text-gray-400 hover:text-industrial-yellow transition-colors duration-300 text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-industrial-yellow shrink-0" size={18} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  title="Send email"
                  aria-label="Send email to company"
                  className="text-gray-400 hover:text-industrial-yellow transition-colors duration-300 break-all text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Saptraj Industries LLP. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            {/* <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link> TODO: Re-enable when PrivacyPolicy page is created */}
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
