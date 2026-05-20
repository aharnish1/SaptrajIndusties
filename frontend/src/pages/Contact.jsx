import React, { useState } from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { inquiriesAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import aboutBg from "../assets/aboutBg.jpeg";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        requirement: 'General Contact',
        message: formData.message
      };

      console.log('Submitting contact form:', submissionData);
      
      const response = await inquiriesAPI.create(submissionData);
      
      console.log('Contact submission response:', response);

      // Show success toast
      toast.success('Message sent successfully! We will get back to you soon.', {
        duration: 5000,
        style: {
          background: '#0A0A0A',
          color: '#fff',
          border: '1px solid #FF7A00',
        },
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      toast.error('Failed to send message. Please try again.', {
        duration: 5000,
        style: {
          background: '#0A0A0A',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative py-16 sm:py-24 md:py-32 lg:py-40 border-b border-border-subtle bg-cover bg-center"
              style={{
                backgroundImage: `url(${aboutBg})`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 industrial-grid opacity-20"></div>
      
              <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-4 steel-heading" data-text="Contact Us">
                  Contact Us
                </h1>
      
                <p className="text-text-muted max-w-2xl mx-auto font-body">Get in touch with Saptraj Industries for your precision fabrication needs.</p>
              </div>
            </div>
        
      
    
      
      <section className="py-12 sm:py-16 md:py-24 bg-bg-deep industrial-grid">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary mb-6 sm:mb-8 border-l-4 border-accent-primary pl-4">Contact Information</h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-metal-dark rounded flex items-center justify-center shrink-0 border border-border-subtle box-glow-hover">
                  <MapPin className="text-accent-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-1 font-body text-sm sm:text-base">Factory Location</h4>
                  <p className="text-text-muted text-xs sm:text-sm font-body leading-relaxed">GATE NO.262 NANEKARWADI, OPP GANDHARV HOTEL, ALANDI PHATA,
                  CHAKAN, TAL - KHED, DIST, PUNE - 410501, MAHARASHTRA, INDIA.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-metal-dark rounded flex items-center justify-center shrink-0 border border-border-subtle box-glow-hover">
                  <Phone className="text-accent-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-1 font-body text-sm sm:text-base">Phone Number</h4>
                  <p className="text-text-muted text-xs sm:text-sm font-body">+91 7588735608</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-metal-dark rounded flex items-center justify-center shrink-0 border border-border-subtle box-glow-hover">
                  <Mail className="text-accent-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-1 font-body text-sm sm:text-base">Email Address</h4>
                  <p className="text-text-muted text-xs sm:text-sm font-body break-all">saptarajindustries@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="card-industrial p-6 sm:p-8 rounded-lg sm:rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-text-primary mb-4 sm:mb-6">Send us a Message</h2>
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input 
                    label="Full Name" 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                  <Input 
                    label="Company Name" 
                    id="company" 
                    placeholder="ABC Manufacturing" 
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input 
                    label="Email Address" 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  <Input 
                    label="Phone Number" 
                    id="phone" 
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <Input 
                  label="Message" 
                  id="message" 
                  type="textarea" 
                  placeholder="How can we help you?" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                />
                <Button 
                  type="submit"
                  variant="primary" 
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
