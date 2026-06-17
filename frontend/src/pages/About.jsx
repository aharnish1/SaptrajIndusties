import React from 'react';
import aboutBg from "../assets/aboutBg.jpeg";

// IMPORT VIDEO
const VIDEO = "https://res.cloudinary.com/dtwsq7gdq/video/upload/v1781679389/VIDEO_BG_tpxhoc.mp4";

const About = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div
        className="relative py-40 border-b border-border-subtle bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 industrial-grid opacity-20"></div>

        <div className="relative container mx-auto px-6 md:px-12 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-4 steel-heading" data-text="About Us">
            About Us
          </h1>
        </div>
      </div>

      {/* About Section */}
      <section className="py-15 px-6 bg-bg-deep text-center min-h-[50vh] industrial-grid">

        <h3 className="text-sm md:text-base tracking-[3px] uppercase text-accent-primary mb-6 font-body">
          Precision Metal Fabrication & Laser Cutting Solutions
        </h3>

        <h2 className="text-4xl md:text-4xl font-bold text-text-primary mb-10 leading-tight font-display steel-heading" data-text="Engineering Excellence Since 2019">
          Engineering Excellence Since 2019
        </h2>

        <p className="text-text-secondary text-md md:text-md leading-9 max-w-4xl mx-auto font-body">
          Founded in 2019, SAPTRAJ INDUSTRIES LLP is an ISO 9001:2015 certified
          company specializing in precision laser cutting, CNC fabrication,
          sheet metal fabrication, and MIG welding solutions.
          We provide high-quality and customized metal fabrication services
          for industries including automotive, railways, telecommunications,
          power plants, agriculture, textile, and general engineering.
          With advanced technology, skilled professionals, and a strong
          commitment to quality, we ensure reliable products, competitive
          pricing, and timely project delivery. Our focus on innovation,
          continuous improvement, and customer satisfaction has helped us
          achieve trusted Grade "A" fabrication standards.
        </p>

      </section>

      {/* Video Section */}
      <section className="bg-bg-deep py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden shadow-2xl rounded-lg border border-border-subtle box-glow-hover">

            <video
              className="w-full h-[300px] md:h-[600px] object-cover"
              controls
              muted
            >
              <source src={VIDEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;