import React, { useState, useEffect } from 'react';
import { Eye, Mail, Trash2, X, Send } from 'lucide-react';
import { inquiriesAPI } from '../services/api';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyData, setReplyData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inquiriesAPI.getAll();
      setInquiries(response.data.data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowViewModal(true);
    
    // Auto-change status from NEW to READ when viewed
    if (inquiry.status === 'New') {
      handleUpdateStatus(inquiry.id, 'Read');
    }
  };

  const handleReplyInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyData({
      to: inquiry.email,
      subject: `Re: ${inquiry.requirement || 'Your Inquiry'}`,
      message: ''
    });
    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    // Demo behavior - show success message
    alert('Reply sent successfully!');
    setShowReplyModal(false);
    setReplyData({ to: '', subject: '', message: '' });
    setSelectedInquiry(null);
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await inquiriesAPI.delete(id);
        fetchInquiries();
      } catch (err) {
        console.error('Error deleting inquiry:', err);
        setError('Failed to delete inquiry');
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await inquiriesAPI.update(id, { status });
      fetchInquiries();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-industrial-yellow/10 text-industrial-yellow border-industrial-yellow/20';
      case 'read':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'in progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const ViewModal = () => {
    if (!showViewModal || !selectedInquiry) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Inquiry Details</h2>
            <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Name</label>
                <p className="text-white">{selectedInquiry.name}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Company</label>
                <p className="text-white">{selectedInquiry.company}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <p className="text-white">{selectedInquiry.email}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone</label>
                <p className="text-white">{selectedInquiry.phone}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Date</label>
              <p className="text-white">{selectedInquiry.date}</p>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Requirement</label>
              <p className="text-white">{selectedInquiry.requirement}</p>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Status</label>
              <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(selectedInquiry.status)}`}>
                {selectedInquiry.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReplyModal = () => {
    if (!showReplyModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Reply to Inquiry</h2>
            <button onClick={() => setShowReplyModal(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">To</label>
              <input
                type="email"
                value={replyData.to}
                onChange={(e) => setReplyData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Subject</label>
              <input
                type="text"
                value={replyData.subject}
                onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Message</label>
              <textarea
                value={replyData.message}
                onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
                rows="6"
                placeholder="Type your reply message here..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleSendReply}
              className="flex items-center gap-2 px-6 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors"
            >
              <Send size={18} />
              Send Reply
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 text-industrial-yellow hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Inquiries</h1>
          <p className="text-gray-400 mt-2">Manage customer quote requests and contact messages.</p>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Date</th>
              <th className="p-4">Name</th>
              <th className="p-4">Company</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                  <td className="p-4 text-gray-400">{inquiry.date}</td>
                  <td className="p-4 text-white font-medium">{inquiry.name}</td>
                  <td className="p-4 text-gray-400">{inquiry.company}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button 
                      onClick={() => handleViewInquiry(inquiry)}
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleReplyInquiry(inquiry)}
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                    >
                      <Mail size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      className="text-gray-400 hover:text-laser-red transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ViewModal />
      <ReplyModal />
    </div>
  );
};

export default Inquiries;
