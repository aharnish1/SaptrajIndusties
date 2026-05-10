import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, Users, GraduationCap, Send, Building } from 'lucide-react';
import Button from '../components/UI/Button';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'production', name: 'Production' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'quality', name: 'Quality Assurance' },
    { id: 'management', name: 'Management' },
    { id: 'admin', name: 'Administration' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior CNC Operator',
      department: 'production',
      location: 'Chakan, Pune',
      type: 'Full-time',
      experience: '5+ years',
      salary: '₹4-6 LPA',
      description: 'Operate and maintain advanced CNC laser cutting and bending machines for precision manufacturing.',
      requirements: [
        'Diploma/Degree in Mechanical Engineering',
        '5+ years experience in CNC operations',
        'Knowledge of laser cutting and bending processes',
        'Ability to read technical drawings',
        'ISO quality standards knowledge'
      ],
      posted: '2 days ago',
      urgent: true
    },
    {
      id: 2,
      title: 'Quality Control Engineer',
      department: 'quality',
      location: 'Chakan, Pune',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹3-5 LPA',
      description: 'Ensure quality standards are met throughout the manufacturing process using precision measuring instruments.',
      requirements: [
        'Degree in Mechanical/Quality Engineering',
        '3+ years in quality control',
        'Knowledge of ISO 9001:2015 standards',
        'Experience with measuring instruments',
        'Strong analytical and problem-solving skills'
      ],
      posted: '1 week ago',
      urgent: false
    },
    {
      id: 3,
      title: 'Fabrication Supervisor',
      department: 'production',
      location: 'Chakan, Pune',
      type: 'Full-time',
      experience: '7+ years',
      salary: '₹5-8 LPA',
      description: 'Lead and supervise fabrication team, ensuring timely delivery and quality standards.',
      requirements: [
        'Diploma/Degree in Mechanical Engineering',
        '7+ years in fabrication industry',
        'Leadership and team management skills',
        'Knowledge of welding and assembly processes',
        'Planning and scheduling experience'
      ],
      posted: '3 days ago',
      urgent: true
    },
    {
      id: 4,
      title: 'Design Engineer',
      department: 'engineering',
      location: 'Chakan, Pune',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹3-4.5 LPA',
      description: 'Design and develop fabrication solutions using CAD software and engineering principles.',
      requirements: [
        'Degree in Mechanical Engineering',
        '2+ years design experience',
        'Proficiency in AutoCAD/SolidWorks',
        'Knowledge of manufacturing processes',
        'Creative problem-solving abilities'
      ],
      posted: '5 days ago',
      urgent: false
    },
    {
      id: 5,
      title: 'Welding Technician',
      department: 'production',
      location: 'Chakan, Pune',
      type: 'Full-time',
      experience: '2-3 years',
      salary: '₹2.5-3.5 LPA',
      description: 'Perform MIG and arc welding operations for various industrial fabrication projects.',
      requirements: [
        'ITI/Diploma in Welding Technology',
        '2+ years welding experience',
        'Certification in MIG/Arc welding',
        'Understanding of welding safety protocols',
        'Ability to work in a team environment'
      ],
      posted: '1 week ago',
      urgent: false
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const benefits = [
    {
      icon: Building,
      title: 'Modern Facility',
      description: 'Work in our state-of-the-art 20,000 sq ft manufacturing facility'
    },
    {
      icon: GraduationCap,
      title: 'Training & Development',
      description: 'Continuous learning opportunities and skill enhancement programs'
    },
    {
      icon: Users,
      title: 'Team Environment',
      description: 'Collaborative work culture with experienced professionals'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Structured working hours with competitive compensation'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/90 to-deep-black/70 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.1)_0%,transparent_70%)]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-16 bg-industrial-yellow"></span>
              <span className="text-industrial-yellow tracking-[0.3em] text-sm uppercase font-bold">
                Join Our Team
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-yellow to-white text-glow">
                Career
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-gunmetal-gray pl-4">
              Join SAPTRAJ INDUSTRIES and be part of a precision manufacturing team delivering excellence across industries.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Culture Section */}
      <section className="py-20 bg-gunmetal-gray border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Why Work With Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We believe in nurturing talent and providing growth opportunities in a dynamic manufacturing environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-industrial-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-deep-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Current Openings</h2>
            <p className="text-gray-400">Explore opportunities to join our growing team</p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  selectedDepartment === dept.id
                    ? 'bg-industrial-yellow text-deep-black'
                    : 'bg-transparent border border-gunmetal-gray text-gray-300 hover:border-gray-500 hover:text-white'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gunmetal-gray border border-[#333] rounded-lg p-6 hover:border-industrial-yellow transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          {job.urgent && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                              URGENT
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Briefcase size={16} />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-industrial-yellow font-bold text-lg">{job.salary}</div>
                        <div className="text-gray-400 text-sm">{job.experience}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-industrial-yellow mt-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Posted {job.posted}</span>
                      <Button variant="primary" className="flex items-center gap-2">
                        Apply Now <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No openings available in this department. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 border-t border-[#333] bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Can't Find the Right Role?</h2>
              <p className="text-gray-400">
                Send us your resume and we'll keep you in mind for future opportunities.
              </p>
            </div>
            
            <div className="bg-deep-black border border-[#333] rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white placeholder-gray-500 focus:border-industrial-yellow focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white placeholder-gray-500 focus:border-industrial-yellow focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white placeholder-gray-500 focus:border-industrial-yellow focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Department</label>
                    <select className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none">
                      <option value="">Select Department</option>
                      <option value="production">Production</option>
                      <option value="engineering">Engineering</option>
                      <option value="quality">Quality Assurance</option>
                      <option value="management">Management</option>
                      <option value="admin">Administration</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Experience</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white placeholder-gray-500 focus:border-industrial-yellow focus:outline-none"
                    placeholder="e.g., 3+ years in CNC operations"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gunmetal-gray border border-[#333] rounded text-white placeholder-gray-500 focus:border-industrial-yellow focus:outline-none resize-none"
                    placeholder="Tell us about yourself and why you'd like to join SAPTRAJ INDUSTRIES..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Upload Resume</label>
                  <div className="border-2 border-dashed border-gunmetal-gray rounded-lg p-8 text-center hover:border-industrial-yellow transition-colors cursor-pointer">
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    <p className="text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-2">PDF, DOC, DOCX (MAX. 5MB)</p>
                  </div>
                </div>
                
                <Button variant="primary" type="submit" className="w-full flex items-center justify-center gap-2">
                  Send Application <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
