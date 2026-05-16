import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Mail, Phone, Eye, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/jobs/applications`);
      const data = await response.json();
      setApplications(data.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/jobs/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        alert('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status');
    }
  };

  const deleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/jobs/applications/${applicationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setApplications(prev =>
          prev.filter(app => app._id !== applicationId)
        );
      } else {
        alert('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Error deleting application');
    }
  };

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-500', icon: Clock },
      Reviewed: { color: 'bg-blue-500', icon: Eye },
      Shortlisted: { color: 'bg-green-500', icon: CheckCircle },
      Rejected: { color: 'bg-red-500', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${config.color}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading applications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Job Applications</h1>
          <p className="text-gray-400">
            {applications.length} {applications.length === 1 ? 'application' : 'applications'} received
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={fetchApplications}
          className="flex items-center gap-2"
        >
          Refresh
        </Button>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
          <p className="text-gray-400">Applications will appear here when candidates apply for jobs.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Applicant</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Contact</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Job</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Applied</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <motion.tr
                  key={application._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-white">{application.fullName}</div>
                      <div className="text-sm text-gray-400">ID: {application._id.slice(-8)}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail size={14} />
                        {application.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone size={14} />
                        {application.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-white">{application.jobTitle}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar size={14} />
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => viewApplicationDetails(application)}
                        className="flex items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </Button>
                      
                      <select
                        value={application.status}
                        onChange={(e) => updateApplicationStatus(application._id, e.target.value)}
                        className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteApplication(application._id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Application Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <div className="text-white">{selectedApplication.fullName}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <div className="text-white">{selectedApplication.email}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Phone:</span>
                      <div className="text-white">{selectedApplication.phone}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Applied:</span>
                      <div className="text-white">
                        {new Date(selectedApplication.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedApplication.coverLetter && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Cover Letter</h3>
                    <div className="bg-gray-800 p-4 rounded text-gray-300">
                      {selectedApplication.coverLetter}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Additional Information</h3>
                  <div className="space-y-2 text-gray-300">
                    {selectedApplication.linkedin && (
                      <div>
                        <span className="text-gray-400">LinkedIn:</span>
                        <a
                          href={selectedApplication.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-industrial-yellow hover:underline ml-2"
                        >
                          {selectedApplication.linkedin}
                        </a>
                      </div>
                    )}
                    {selectedApplication.portfolio && (
                      <div>
                        <span className="text-gray-400">Portfolio:</span>
                        <a
                          href={selectedApplication.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-industrial-yellow hover:underline ml-2"
                        >
                          {selectedApplication.portfolio}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedApplication.resume && (
                    <Button
                      variant="primary"
                      onClick={() => viewResume(selectedApplication.resume)}
                      className="flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Resume
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
