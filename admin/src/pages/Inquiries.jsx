import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Eye, Mail, Trash2, X, Send, CheckCircle } from 'lucide-react';
import { inquiriesAPI } from '../services/api';
import { useSocket } from '../context/SocketContext';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [activeInquiryId, setActiveInquiryId] = useState(null);
  const { socket, updateUnreadCount } = useSocket();
  const [searchParams] = useSearchParams();

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

      console.log('API Response:', response.data);

      const inquiriesData =
        response?.data?.data ||
        response?.data ||
        [];

      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);

    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries');
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Listen for new inquiries via Socket.IO
  useEffect(() => {
    if (socket) {
      socket.on('newInquiry', (data) => {
        console.log('New inquiry received in Inquiries page:', data);
        fetchInquiries(); // Refresh the list
      });
    }

    return () => {
      if (socket) {
        socket.off('newInquiry');
      }
    };
  }, [socket]);

  // Handle query parameters for auto-opening inquiry
  useEffect(() => {
    const openInquiryId = searchParams.get('open');
    
    if (openInquiryId && inquiries.length > 0) {
      console.log('🔍 Inquiries Page - Auto-opening inquiry:', openInquiryId);
      
      // Find the inquiry in the list
      const inquiry = inquiries.find(inv => inv._id === openInquiryId);
      
      if (inquiry) {
        // Set active inquiry for highlighting
        setActiveInquiryId(openInquiryId);
        
        // Set selected inquiry and open modal
        setSelectedInquiry(inquiry);
        setShowViewModal(true);
        
        // Scroll inquiry into view
        setTimeout(() => {
          const element = document.getElementById(`inquiry-${openInquiryId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        
        console.log('🔍 Inquiries Page - Modal opened for inquiry:', inquiry);
      } else {
        console.warn('🔍 Inquiries Page - Inquiry not found:', openInquiryId);
      }
      
      // Clean up URL parameter
      searchParams.delete('open');
      window.history.replaceState({}, '', `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
    }
  }, [searchParams, inquiries]);

  const handleViewInquiry = async (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowViewModal(true);

    // Mark as read if unread
    if (!inquiry.isRead) {
      try {
        await inquiriesAPI.markAsRead(inquiry._id || inquiry.id);
        
        // Update local state
        setInquiries(prev => 
          prev.map(item => 
            item._id === inquiry._id 
              ? { ...item, isRead: true, readAt: new Date() }
              : item
          )
        );
        
        // Update unread count in SocketContext
        const unreadCount = inquiries.filter(item => !item.isRead && item._id !== inquiry._id).length;
        updateUnreadCount(unreadCount);
        
        console.log('Inquiry marked as read:', inquiry._id);
      } catch (error) {
        console.error('Error marking inquiry as read:', error);
      }
    }
  };

  const handleReplyInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);

    setReplyData({
      to: inquiry.email || '',
      subject: `Re: ${inquiry.requirement || 'Your Inquiry'}`,
      message: ''
    });

    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    alert('Reply sent successfully!');

    setShowReplyModal(false);

    setReplyData({
      to: '',
      subject: '',
      message: ''
    });

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

  const getStatusColor = (status = '') => {
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
    
    console.log('🔍 Debug - selectedInquiry:', selectedInquiry);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Inquiry Details
            </h2>

            <button
              onClick={() => setShowViewModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Name
                </label>

                <p className="text-white">
                  {selectedInquiry.name}
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Company
                </label>

                <p className="text-white">
                  {selectedInquiry.company}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Email
                </label>

                <p className="text-white">
                  {selectedInquiry.email}
                </p>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Phone
                </label>

                <p className="text-white">
                  {selectedInquiry.phone}
                </p>
              </div>

            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Requirement
              </label>

              <p className="text-white">
                {selectedInquiry.requirement}
              </p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Status
              </label>

              <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(selectedInquiry.status)}`}>
                {selectedInquiry.status}
              </span>
            </div>

            {/* File Attachment Section */}
            {selectedInquiry.attachment && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Attachment
                </label>
                
                <div className="bg-[#111] border border-[#333] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-industrial-yellow/20 rounded flex items-center justify-center">
                        <span className="text-industrial-yellow text-xs font-bold">
                          {selectedInquiry.attachmentType?.includes('image') ? 'IMG' : 
                           selectedInquiry.attachmentType?.includes('pdf') ? 'PDF' :
                           selectedInquiry.attachmentType?.includes('word') ? 'DOC' : 'FILE'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {selectedInquiry.attachmentOriginalName || 'Attachment'}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {selectedInquiry.attachmentType || 'Unknown type'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* File Preview/Actions */}
                  <div className="flex gap-2">
                    {selectedInquiry.attachmentType?.includes('image/') ? (
                      <div className="flex-1">
                        <img
                          src={`http://localhost:5000${selectedInquiry.attachment}`}
                          alt={selectedInquiry.attachmentOriginalName || 'Attachment'}
                          className="w-full max-h-48 object-contain rounded border border-[#333] mb-2"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center bg-[#0A0A0A] rounded border border-[#333] p-4 mb-2">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-industrial-yellow/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-industrial-yellow text-lg font-bold">
                              {selectedInquiry.attachmentType?.includes('pdf') ? 'PDF' :
                               selectedInquiry.attachmentType?.includes('word') ? 'DOC' : 'FILE'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {selectedInquiry.attachmentOriginalName || 'File'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={`http://localhost:5000${selectedInquiry.attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-industrial-yellow text-deep-black text-sm font-medium rounded hover:bg-white transition-colors text-center"
                    >
                      {selectedInquiry.attachmentType?.includes('image/') ? 'View Full Size' : 
                       selectedInquiry.attachmentType?.includes('pdf') ? 'Open PDF' : 'Open File'}
                    </a>
                    <a
                      href={`http://localhost:5000${selectedInquiry.attachment}`}
                      download={selectedInquiry.attachmentOriginalName || 'attachment'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 border border-[#444] text-white text-sm font-medium rounded hover:bg-[#222] transition-colors text-center"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* No File Case */}
            {!selectedInquiry.attachment && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Attachment
                </label>
                <div className="bg-[#111] border border-[#333] rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">No attachment uploaded</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  const ReplyModal = () => {
    if (!showReplyModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-6 w-full max-w-2xl">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Reply to Inquiry
            </h2>

            <button
              onClick={() => setShowReplyModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">

            <input
              type="email"
              value={replyData.to}
              readOnly
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white"
            />

            <input
              type="text"
              value={replyData.subject}
              onChange={(e) =>
                setReplyData(prev => ({
                  ...prev,
                  subject: e.target.value
                }))
              }
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white"
            />

            <textarea
              rows="6"
              value={replyData.message}
              onChange={(e) =>
                setReplyData(prev => ({
                  ...prev,
                  message: e.target.value
                }))
              }
              className="w-full px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white"
              placeholder="Type your message..."
            />

          </div>

          <div className="flex justify-end mt-6">
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
      <div className="flex items-center justify-center h-64 text-white">
        Loading inquiries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Inquiries
          </h1>

          <p className="text-gray-400 mt-2">
            Manage customer inquiries.
          </p>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Company</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {Array.isArray(inquiries) && inquiries.length > 0 ? (

              inquiries.map((inquiry) => (

                <tr
                  key={inquiry._id || inquiry.id}
                  id={`inquiry-${inquiry._id || inquiry.id}`}
                  className={`border-b border-[#333] hover:bg-[#111] transition-all duration-300 ${
                    !inquiry.isRead ? 'bg-industrial-yellow/5' : ''
                  } ${
                    activeInquiryId === (inquiry._id || inquiry.id)
                      ? 'ring-2 ring-industrial-yellow/50 shadow-lg shadow-industrial-yellow/20 bg-industrial-yellow/10'
                      : ''
                  }`}
                >

                  <td className="p-4 text-white">
                    <div className="flex items-center gap-2">
                      {!inquiry.isRead && (
                        <div className="w-2 h-2 bg-industrial-yellow rounded-full" />
                      )}
                      <span className={!inquiry.isRead ? 'font-semibold' : ''}>
                        {inquiry.name}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-400">
                    {inquiry.email}
                  </td>

                  <td className="p-4 text-gray-400">
                    {inquiry.company || '-'}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(inquiry.date || inquiry.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleViewInquiry(inquiry)}
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                      title="View inquiry"
                    >
                      <Eye size={18} />
                    </button>

                    {!inquiry.isRead && (
                      <button
                        onClick={() => handleViewInquiry(inquiry)}
                        className="text-industrial-yellow hover:text-white transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => handleReplyInquiry(inquiry)}
                      className="text-gray-400 hover:text-industrial-yellow transition-colors"
                      title="Reply"
                    >
                      <Mail size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteInquiry(inquiry._id || inquiry.id)
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-400"
                >
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