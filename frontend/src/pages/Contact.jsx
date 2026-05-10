import React from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="w-full">
      <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Get in touch with Saptraj Industries for your precision fabrication needs.</p>
        </div>
      </div>
      
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-heading font-bold text-white mb-8 border-l-4 border-industrial-yellow pl-4">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gunmetal-gray rounded flex items-center justify-center shrink-0 border border-[#333]">
                  <MapPin className="text-industrial-yellow" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Factory Location</h4>
                  <p className="text-gray-400 text-sm">GATE NO.262 NANEKARWADI, OPP GANDHARV HOTEL, ALANDI PHATA,
                  CHAKAN, TAL - KHED, DIST, PUNE - 410501, MAHARASHTRA, INDIA.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gunmetal-gray rounded flex items-center justify-center shrink-0 border border-[#333]">
                  <Phone className="text-industrial-yellow" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone Number</h4>
                  <p className="text-gray-400 text-sm">+91 7588735608</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gunmetal-gray rounded flex items-center justify-center shrink-0 border border-[#333]">
                  <Mail className="text-industrial-yellow" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Address</h4>
                  <p className="text-gray-400 text-sm">saptarajindustries@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="bg-[#0A0A0A] border border-gunmetal-gray p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-industrial-yellow"></div>
              <h2 className="text-2xl font-heading font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" id="name" placeholder="John Doe" />
                  <Input label="Company Name" id="company" placeholder="ABC Manufacturing" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Email Address" id="email" type="email" placeholder="john@example.com" />
                  <Input label="Phone Number" id="phone" placeholder="+91 98765 43210" />
                </div>
                <Input label="Message" id="message" type="textarea" placeholder="How can we help you?" />
                <Button variant="primary" className="w-full mt-4">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
