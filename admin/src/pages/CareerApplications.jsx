import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Download, Eye, Edit2, Trash2, Filter, Search } from 'lucide-react';
import { jobApplicationsAPI } from '../services/api';
import { formatDistanceToNow } from 'date-fns';

const CareerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;
      if (jobFilter) params.jobId = jobFilter;
      
      const response = await jobApplicationsAPI.getAll(params);
      console.log('🔍 Frontend Applications Debug - API Response:', response);
      console.log('🔍 Frontend Applications Debug - First 3 apps:', response?.data?.slice(0, 3)?.map(app => ({
        id: app._id,
        fullName: app.fullName,
        resume: app.resume,
        createdAt: app.createdAt,
        jobTitle: app.jobTitle
      })));
      setApplications(response?.data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, statusFilter, jobFilter]);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await jobApplicationsAPI.updateStatus(applicationId, newStatus);
      fetchApplications();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update application status');
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await jobApplicationsAPI.delete(applicationId);
        fetchApplications();
      } catch (err) {
        console.error('Error deleting application:', err);
        alert('Failed to delete application');
      }
    }
  };

  // Safe resume URL helper
  const getResumeUrl = (resumePath) => {
    if (!resumePath) return null;
    
    if (resumePath.startsWith('http')) {
      return resumePath;
    }
    
    if (resumePath.startsWith('/uploads/')) {
      return `http://localhost:5000${resumePath}`;
    }
    
    return null;
  };

  const handleViewResume = (application) => {
    const resumeUrl = getResumeUrl(application.resume);
    if (resumeUrl) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('No resume available');
    }
  };

  const handleDownloadResume = async (application) => {
    try {
      console.log('🔍 Resume Download Debug - Application resume field:', application.resume);
      
      const resumeUrl = getResumeUrl(application.resume);
      
      if (resumeUrl) {
        console.log('🔍 Resume Download Debug - Generated resume URL:', resumeUrl);
        
        // Create download link with proper attributes
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = resumeUrl.split('/').pop() || 'resume.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        console.log('🔍 Resume Download Debug - Anchor element properties:', {
          href: link.href,
          download: link.download,
          target: link.target
        });
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('🔍 Resume Download Debug - Download triggered successfully');
      } else {
        console.log('🔍 Resume Download Debug - No resume field found');
        alert('No resume file available');
      }
    } catch (err) {
      console.error('🔍 Resume Download Debug - Error:', err);
      alert('Failed to download resume');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Under Review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Shortlisted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Hired':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const uniqueJobs = [...new Set(applications.map(app => app.jobTitle))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-industrial-yellow"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
        <button 
          onClick={fetchApplications}
          className="ml-4 text-industrial-yellow hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Career Applications</h1>
          <p className="text-gray-400 mt-2">Manage job applications and candidate information</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <User className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Applications</p>
              <p className="text-2xl font-bold text-white">{applications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Calendar className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">
                {applications.filter(app => app.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Eye className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Under Review</p>
              <p className="text-2xl font-bold text-white">
                {applications.filter(app => app.status === 'Under Review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Briefcase className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Shortlisted</p>
              <p className="text-2xl font-bold text-white">
                {applications.filter(app => app.status === 'Shortlisted').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white focus:outline-none focus:border-industrial-yellow"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white focus:outline-none focus:border-industrial-yellow"
          >
            <option value="">All Jobs</option>
            {uniqueJobs.map((jobTitle, index) => (
              <option key={index} value={jobTitle}>{jobTitle}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#111] border-b border-[#333]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Job
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application._id} className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {application.fullName}
                        </div>
                        {application.currentCompany && (
                          <div className="text-sm text-gray-400">
                            {application.currentCompany}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {application.jobTitle}
                        </div>
                        <div className="text-sm text-gray-400">
                          {application.experience}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <Mail size={14} />
                          {application.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <Phone size={14} />
                          {application.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {application.experience}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewApplication(application)}
                          className="text-industrial-yellow hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                                                
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
                          className="text-sm bg-[#2a2a2a] border border-[#444] rounded text-white px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Hired">Hired</option>
                        </select>
                        
                        <button
                          onClick={() => handleDeleteApplication(application._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#333]">
              <h2 className="text-xl font-semibold text-white">Application Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Experience Level</label>
                    <p className="text-white">{selectedApplication.experience}</p>
                  </div>
                  {selectedApplication.currentCompany && (
                    <div>
                      <label className="text-sm text-gray-400">Current Company</label>
                      <p className="text-white">{selectedApplication.currentCompany}</p>
                    </div>
                  )}
                  {selectedApplication.portfolio && (
                    <div>
                      <label className="text-sm text-gray-400">Portfolio</label>
                      <a 
                        href={selectedApplication.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-industrial-yellow hover:text-white"
                      >
                        {selectedApplication.portfolio}
                      </a>
                    </div>
                  )}
                  {selectedApplication.linkedIn && (
                    <div>
                      <label className="text-sm text-gray-400">LinkedIn</label>
                      <a 
                        href={selectedApplication.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-industrial-yellow hover:text-white"
                      >
                        {selectedApplication.linkedIn}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Applied Position</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Job Title</label>
                    <p className="text-white">{selectedApplication.jobTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Applied Date</label>
                    <p className="text-white">{formatDate(selectedApplication.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Cover Letter</h3>
                  <div className="bg-[#2a2a2a] border border-[#333] rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                  </div>
                </div>
              )}

              {/* Resume */}
              {selectedApplication.resume && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Resume</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewResume(selectedApplication)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Eye size={16} />
                      View Resume
                    </button>
                 
                  </div>
                </div>
              )}
              
              {!selectedApplication.resume && (
                <div className="text-gray-400">
                  <h3 className="text-lg font-semibold text-white mb-4">Resume</h3>
                  <p>No resume uploaded</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-[#333]">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => {
                    handleStatusUpdate(selectedApplication._id, e.target.value);
                    setSelectedApplication(prev => ({ ...prev, status: e.target.value }));
                  }}
                  className="px-4 py-2 bg-[#2a2a2a] border border-[#444] rounded text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerApplications;
