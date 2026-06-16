import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import StatsSection from '../components/Home/StatsSection';
import ServicesSection from '../components/Home/ServicesSection';
import ProcessTimeline from '../components/Home/ProcessTimeline';
import Button from '../components/UI/Button';
import { ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import MetalDustParticle from '../components/UI/MetalDustParticle';
import aboutBg from "../assets/aboutBg.jpeg";



const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      
      {/* Infrastructure Snippet */}
      <section className="py-24 bg-bg-deep border-y border-border-subtle industrial-grid">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <span className="text-accent-primary uppercase tracking-widest font-bold text-sm font-body">Infrastructure</span>
              <h2 className="text-4xl font-display font-bold text-text-primary mt-4 mb-6 steel-heading" data-text="Advanced Machinery">Advanced Machinery</h2>
              <p className="text-text-muted mb-6 leading-relaxed font-body">
                Equipped with state-of-the-art Bodor Fiber Laser machines and precision CNC bending equipment, our facility is geared for high-volume, high-accuracy production.
              </p>
              <ul className="space-y-4 mb-8">
                {['Bodor Fiber Laser Machine', 'CNC Bending Machines', 'Advanced Welding Stations', 'Dedicated Fabrication Shop'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-secondary font-body">
                    <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
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
              <div className="aspect-video bg-metal-dark border border-border-subtle rounded-lg flex items-center justify-center relative overflow-hidden group box-glow-hover">
                <div className="absolute inset-0 bg-accent-primary opacity-10 group-hover:opacity-20 transition-opacity"></div>
                
                <img src={aboutBg} alt="Infrastructure" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessTimeline />

      {/* Quality Assurance Snippet */}
      <section className="py-24 bg-bg-deep">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ShieldCheck size={48} className="text-accent-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-text-primary mb-6 steel-heading" data-text="Uncompromising Quality">Uncompromising Quality</h2>
          <p className="text-text-muted max-w-2xl mx-auto mb-12 font-body">
            "Accuracy the smart choice." Our ISO 9001:2015 certified quality processes ensure that every component leaving our facility meets exacting international standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Vernier Caliper', 'Height Gauge', 'Micrometer', 'Weld Gauge'].map((tool, i) => (
              <div key={i} className="px-6 py-3 bg-metal-dark border border-border-subtle rounded flex items-center gap-2 box-glow-hover">
                <Ruler size={16} className="text-accent-primary" />
                <span className="text-sm text-text-primary font-semibold font-body">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* Final CTA */}
      <section className="py-24 relative border-t border-border-subtle overflow-hidden">

        {/* Background Base */}
        <div className="absolute inset-0 bg-metal-dark z-0">

          {/* Cinematic orange radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.10)_0%,transparent_65%)]"></div>

          {/* Industrial grid */}
          <div className="absolute inset-0 industrial-grid opacity-20"></div>

          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>

        </div>

        {/* Metal Dust Particle Layer */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-70">

  {[...Array(window.innerWidth < 768 ? 20 : 45)].map((_, i) => (
  <MetalDustParticle
    key={i}
    x={Math.random() * window.innerWidth}
    y={Math.random() * 500}
    delay={Math.random() * 4}
  />
))}

</div>

        {/* Floating Ambient Glow */}
        <div className="absolute left-1/2 top-1/2 z-[2] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"></div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">

          <h2
            className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 steel-heading tracking-wide drop-shadow-[0_4px_20px_rgba(255,140,0,0.25)]"
            data-text="Need Precision Fabrication?"
          >
            Need Precision Fabrication?
          </h2>
          <Link to="/quote">
            <Button
              variant="primary"
              className="text-lg px-8 py-4 shadow-[0_0_30px_rgba(255,140,0,0.35)] hover:shadow-[0_0_50px_rgba(255,140,0,0.60)] transition-all duration-500 hover:scale-105"
            >
              Request a Quote Today
            </Button>
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Home;
