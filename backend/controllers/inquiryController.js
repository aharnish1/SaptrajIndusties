const db = require('../data/mockData');

// Get all inquiries
const getInquiries = (req, res) => {
  try {
    const { status, search } = req.query;
    let filteredInquiries = [...db.inquiries];

    if (status && status !== 'all') {
      filteredInquiries = filteredInquiries.filter(inquiry => 
        inquiry.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      filteredInquiries = filteredInquiries.filter(inquiry =>
        inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.company.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
        inquiry.requirement.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filteredInquiries.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      data: filteredInquiries,
      count: filteredInquiries.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
};

// Get inquiry by ID
const getInquiryById = (req, res) => {
  try {
    const inquiry = db.inquiries.find(i => i.id === parseInt(req.params.id));
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry',
      error: error.message
    });
  }
};

// Create new inquiry
const createInquiry = (req, res) => {
  try {
    const { name, company, email, phone, requirement, materialType, quantity, message } = req.body;

    if (!name || !email || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and requirement are required'
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const newInquiry = {
      id: Date.now(),
      name,
      company: company || '',
      email,
      phone: phone || '',
      requirement,
      materialType: materialType || '',
      quantity: quantity || '',
      message: message || '',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.inquiries.push(newInquiry);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: newInquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating inquiry',
      error: error.message
    });
  }
};

// Update inquiry status
const updateInquiryStatus = (req, res) => {
  try {
    const inquiryId = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const inquiryIndex = db.inquiries.findIndex(i => i.id === inquiryId);

    if (inquiryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    db.inquiries[inquiryIndex].status = status;
    db.inquiries[inquiryIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: db.inquiries[inquiryIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating inquiry status',
      error: error.message
    });
  }
};

// Delete inquiry
const deleteInquiry = (req, res) => {
  try {
    const inquiryId = parseInt(req.params.id);
    const inquiryIndex = db.inquiries.findIndex(i => i.id === inquiryId);

    if (inquiryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    db.inquiries.splice(inquiryIndex, 1);

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting inquiry',
      error: error.message
    });
  }
};

// Get inquiry statistics
const getInquiryStats = (req, res) => {
  try {
    const stats = {
      total: db.inquiries.length,
      new: db.inquiries.filter(i => i.status === 'New').length,
      inProgress: db.inquiries.filter(i => i.status === 'In Progress').length,
      completed: db.inquiries.filter(i => i.status === 'Completed').length,
      thisMonth: db.inquiries.filter(i => {
        const inquiryDate = new Date(i.date);
        const currentDate = new Date();
        return inquiryDate.getMonth() === currentDate.getMonth() && 
               inquiryDate.getFullYear() === currentDate.getFullYear();
      }).length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry statistics',
      error: error.message
    });
  }
};

module.exports = {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats
};
