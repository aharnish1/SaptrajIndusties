import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';
import { jobsAPI } from '../services/api';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: '',
    experienceRequired: '',
    salaryRange: {
      currency: 'USD',
      min: 0,
      max: 0
    },
    description: '',
    responsibilities: [''],
    requirements: [''],
    skills: [''],
    status: 'Active',
    applicationDeadline: ''
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getAll();
      setJobs(response?.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setSelectedJob(null);
    setIsEditing(false);
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: '',
      experienceRequired: '',
      salaryRange: {
        currency: 'USD',
        min: 0,
        max: 0
      },
      description: '',
      responsibilities: [''],
      requirements: [''],
      skills: [''],
      status: 'Active',
      applicationDeadline: ''
    });
    setShowModal(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditing(true);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      employmentType: job.employmentType || '',
      experienceRequired: job.experienceRequired || '',
      salaryRange: job.salaryRange || { currency: 'USD', min: 0, max: 0 },
      description: job.description || '',
      responsibilities: job.responsibilities || [''],
      requirements: job.requirements || [''],
      skills: job.skills || [''],
      status: job.status || 'Active',
      applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await jobsAPI.delete(jobId);
        fetchJobs();
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job');
      }
    }
  };

  const handleToggleJobStatus = async (job) => {
    try {
      const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
      await jobsAPI.update(job._id, { ...job, status: newStatus });
      fetchJobs();
    } catch (err) {
      console.error('Error updating job status:', err);
      alert('Failed to update job status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Debug: Log current form state
      console.log("=== FORM SUBMISSION DEBUG ===");
      console.log("Current formData:", formData);
      console.log("Required fields check:", {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        employmentType: formData.employmentType,
        experienceRequired: formData.experienceRequired
      });
      
      // Clean array data before sending
      const cleanFormData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r && r.trim()),
        requirements: formData.requirements.filter(r => r && r.trim()),
        skills: formData.skills.filter(s => s && s.trim())
      };
      
      console.log("Clean payload:", cleanFormData);
      
      if (isEditing && selectedJob) {
        await jobsAPI.update(selectedJob._id, cleanFormData);
      } else {
        await jobsAPI.create(cleanFormData);
      }
      setShowModal(false);
      fetchJobs();
    } catch (err) {
      console.error('Error saving job:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save job';
      alert(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("INPUT CHANGE", { name, value, type: e.target.type });
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const updated = {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
        console.log("UPDATED FORMDATA (nested)", updated);
        return updated;
      });
    } else {
      setFormData(prev => {
        const updated = {
          ...prev,
          [name]: value
        };
        console.log("UPDATED FORMDATA (flat)", updated);
        return updated;
      });
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Inactive':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'Closed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

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
          onClick={fetchJobs}
          className="ml-4 text-industrial-yellow hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page space-y-6">
      <div className="admin-page-header">
        <div className="min-w-0">
          <h1 className="admin-page-title steel-heading">Careers Management</h1>
          <p className="admin-page-subtitle">Manage job postings and applications</p>
        </div>
        <button
          type="button"
          onClick={handleAddJob}
          className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors flex-shrink-0"
        >
          <Plus size={20} />
          Add Job
        </button>
      </div>

      <div className="admin-stats-grid-3">
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-industrial-yellow/10 rounded-lg">
              <Briefcase className="text-industrial-yellow" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Jobs</p>
              <p className="text-2xl font-bold text-white">{jobs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Users className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Jobs</p>
              <p className="text-2xl font-bold text-white">
                {jobs.filter(job => job.status === 'Active').length}
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
              <p className="text-gray-400 text-sm">Applications</p>
              <p className="text-2xl font-bold text-white">View All</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-scroll">
          <table className="admin-table min-w-[960px]">
            <thead className="bg-[#111] border-b border-[#333]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{job.title}</div>
                        <div className="text-sm text-gray-400">{job.experienceRequired}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.employmentType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="text-industrial-yellow hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleJobStatus(job)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                            job.status === 'Active' 
                              ? 'text-green-400 hover:text-green-300' 
                              : 'text-red-400 hover:text-red-300'
                          }`}
                        >
                          {job.status === 'Active' ? 'Close' : 'Reopen'}
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
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
                    No job postings found. Click "Add Job" to create your first job posting.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#333]">
              <h2 className="text-xl font-semibold text-white">
                {isEditing ? 'Edit Job' : 'Add New Job'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white focus:outline-none focus:border-industrial-yellow"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Required</label>
                  <input
                    type="text"
                    name="experienceRequired"
                    value={formData.experienceRequired}
                    onChange={handleInputChange}
                    placeholder="e.g., 3-5 years"
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white focus:outline-none focus:border-industrial-yellow"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Salary Min</label>
                  <input
                    type="number"
                    name="salaryRange.min"
                    value={formData.salaryRange.min}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Salary Max</label>
                  <input
                    type="number"
                    name="salaryRange.max"
                    value={formData.salaryRange.max}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Responsibilities</label>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('responsibilities', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('responsibilities')}
                  className="text-industrial-yellow hover:text-white text-sm"
                >
                  + Add Responsibility
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="text-industrial-yellow hover:text-white text-sm"
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('skills')}
                  className="text-industrial-yellow hover:text-white text-sm"
                >
                  + Add Skill
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#333] rounded text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-industrial-yellow text-black rounded hover:bg-white transition-colors"
                >
                  {isEditing ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
