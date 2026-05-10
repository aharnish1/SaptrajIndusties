import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import ServicesSection from '../components/Home/ServicesSection';
import ProcessTimeline from '../components/Home/ProcessTimeline';
import Button from '../components/UI/Button';
import { ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import infrastructure5 from '../assets/infrastructurePhotoes/infrastructure5.jpeg';



const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      
      {/* Infrastructure Snippet */}
      <section className="py-24 bg-deep-black border-y border-[#222]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <span className="text-industrial-yellow uppercase tracking-widest font-bold text-sm">Infrastructure</span>
              <h2 className="text-4xl font-heading font-bold text-white mt-4 mb-6">Advanced Machinery</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Equipped with state-of-the-art Bodor Fiber Laser machines and precision CNC bending equipment, our facility is geared for high-volume, high-accuracy production.
              </p>
              <ul className="space-y-4 mb-8">
                {['Bodor Fiber Laser Machine', 'CNC Bending Machines', 'Advanced Welding Stations', 'Dedicated Fabrication Shop'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-industrial-yellow"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/infrastructure">
  <Button variant="outline">View Full Infrastructure</Button>
</Link>
            </div>
            <div className="w-full md:w-1/2">
              {/* Image Placeholder */}
              <div className="aspect-video bg-gunmetal-gray border border-[#333] rounded-lg flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-industrial-yellow opacity-10 group-hover:opacity-20 transition-opacity"></div>
                
                <img src={infrastructure5} alt="Infrastructure" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline />

      {/* Quality Assurance Snippet */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ShieldCheck size={48} className="text-industrial-yellow mx-auto mb-6" />
          <h2 className="text-4xl font-heading font-bold text-white mb-6">Uncompromising Quality</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            "Accuracy the smart choice." Our ISO 9001:2015 certified quality processes ensure that every component leaving our facility meets exacting international standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Vernier Caliper', 'Height Gauge', 'Micrometer', 'Weld Gauge'].map((tool, i) => (
              <div key={i} className="px-6 py-3 bg-gunmetal-gray border border-[#333] rounded flex items-center gap-2">
                <Ruler size={16} className="text-industrial-yellow" />
                <span className="text-sm text-white font-semibold">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative border-t border-[#333] overflow-hidden">
        <div className="absolute inset-0 bg-gunmetal-gray z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.05)_0%,transparent_60%)]"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">Need Precision Fabrication?</h2>
          <Link to="/quote">
            <Button variant="primary" className="text-lg px-8 py-4">
              Request a Quote Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
