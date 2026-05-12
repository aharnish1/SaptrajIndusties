import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, Users, GraduationCap, Send, Building } from 'lucide-react';
import Button from '../components/UI/Button';
import { jobsAPI } from '../services/api';
import { formatDistanceToNow } from 'date-fns';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [jobStatusFilter, setJobStatusFilter] = useState('active'); // 'active', 'closed', 'all'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    linkedin: '',
    portfolio: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'production', name: 'Production' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'quality', name: 'Quality Assurance' },
    { id: 'management', name: 'Management' },
    { id: 'admin', name: 'Administration' }
  ];

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobsAPI.getAll();
        setJobs(response?.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job listings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setApplicationForm(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob._id);
      formData.append('jobTitle', selectedJob.title);
      formData.append('fullName', applicationForm.fullName);
      formData.append('email', applicationForm.email);
      formData.append('phone', applicationForm.phone);
      formData.append('coverLetter', applicationForm.coverLetter);
      formData.append('linkedin', applicationForm.linkedin);
      formData.append('portfolio', applicationForm.portfolio);
      if (applicationForm.resume) {
        formData.append('resume', applicationForm.resume);
      }

      // Debug FormData before submission
      console.log('🔍 Frontend Application Debug - FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`🔍 ${key}:`, value);
      }
      console.log('🔍 Frontend Application Debug - Resume file:', applicationForm.resume);

      // Submit to backend API
      const response = await fetch('http://localhost:5000/api/jobs/apply', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowApplicationModal(false);
        setApplicationForm({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: '',
          linkedin: '',
          portfolio: '',
          resume: null
        });
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter jobs based on selected department and status
  const filteredJobs = jobs.filter(job => {
    const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
    const normalizedJobStatus = (job.status || "").trim().toLowerCase();
    const normalizedFilter = jobStatusFilter.toLowerCase();
    const statusMatch = jobStatusFilter === 'all' || normalizedJobStatus === normalizedFilter;
    
    // Debug logging for filter verification
    console.log('FILTER DEBUG:', {
      jobTitle: job.title,
      jobStatus: job.status,
      normalizedJobStatus,
      jobStatusFilter,
      normalizedFilter,
      statusMatch,
      departmentMatch,
      willShow: departmentMatch && statusMatch
    });
    
    return departmentMatch && statusMatch;
  });

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

      {/* Job Openings */}
      <section className="py-16 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Current Openings</h2>
            <p className="text-gray-400">Explore opportunities to join our growing team</p>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-8">
            {/* Department Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-gray-400 mr-2">Department:</span>
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

            {/* Status Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-gray-400 mr-2">Status:</span>
              {[
                { id: 'active', name: 'Active' },
                { id: 'closed', name: 'Closed' },
                { id: 'all', name: 'All Jobs' }
              ].map(status => (
                <button
                  key={status.id}
                  onClick={() => setJobStatusFilter(status.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                    jobStatusFilter === status.id
                      ? 'bg-industrial-yellow text-deep-black'
                      : 'bg-transparent border border-gunmetal-gray text-gray-300 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
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
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            {job.status && (
                              <span className={`px-2 py-1 text-xs font-bold rounded ${
                                job.status === 'Active' 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-red-500 text-white'
                              }`}>
                                {job.status}
                              </span>
                            )}
                          </div>
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
                      <span className="text-gray-500 text-sm">Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                      <Button 
                        variant="primary" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicationModal(true);
                        }}
                        disabled={job.status === 'Closed'}
                      >
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

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-deep-gray rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={applicationForm.fullName}
                      onChange={handleApplicationChange}
                      required
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleApplicationChange}
                      required
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationForm.phone}
                      onChange={handleApplicationChange}
                      required
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Resume *</label>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={applicationForm.linkedin}
                      onChange={handleApplicationChange}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Portfolio URL</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={applicationForm.portfolio}
                      onChange={handleApplicationChange}
                      className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={applicationForm.coverLetter}
                    onChange={handleApplicationChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </section>

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
    </div>
  );
};

export default Careers;
