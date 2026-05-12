const Inquiry = require('../models/Inquiry');

// Get all inquiries
const getInquiries = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    // Execute query with pagination
    const inquiries = await Inquiry.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Inquiry.countDocuments(query);
    
    res.json({
      success: true,
      data: inquiries,
      count: inquiries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
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
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
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
const createInquiry = async (req, res) => {
  try {
    console.log('🔍 Debug - req.body:', req.body);
    console.log('🔍 Debug - req.file:', req.file);
    
    const { name, company, email, phone, requirement, materialType, quantity, message } = req.body;

    if (!name || !email || !requirement) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and requirement are required'
      });
    }

    const newInquiry = new Inquiry({
      name,
      company: company || '',
      email,
      phone: phone || '',
      requirement,
      materialType: materialType || '',
      quantity: quantity || '',
      message: message || '',
      status: 'New',
      date: new Date(),
      // File attachment fields
      attachment: req.file ? `/uploads/inquiries/${req.file.filename}` : '',
      attachmentType: req.file ? req.file.mimetype : '',
      attachmentOriginalName: req.file ? req.file.originalname : '',
      isRead: false,
      notificationSent: false
    });

    const savedInquiry = await newInquiry.save();
    
    console.log('🔍 Debug - savedInquiry:', savedInquiry);

    // Emit Socket.IO event for real-time notification
    const io = req.app.get('io');
    if (io) {
      console.log('📢 Emitting new inquiry notification to admin room');
      io.to('admin').emit('newInquiry', {
        inquiry: savedInquiry,
        timestamp: new Date(),
        message: `New inquiry received from ${name}`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: savedInquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating inquiry',
      error: error.message
    });
  }
};

// Update inquiry status
const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: updatedInquiry
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
const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!deletedInquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted successfully',
      data: deletedInquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting inquiry',
      error: error.message
    });
  }
};

// Get unread inquiries
const getUnreadInquiries = async (req, res) => {
  try {
    console.log('🔍 Backend Debug - Fetching unread inquiries...');
    
    // Handle case where isRead field might not exist in old documents
    const inquiries = await Inquiry.find({
      $or: [
        { isRead: false },
        { isRead: { $exists: false } }
      ]
    })
      .sort({ date: -1 })
      .limit(10)
      .lean(); // Use lean for better performance
    
    console.log('🔍 Backend Debug - Unread inquiries found:', inquiries.length);
    console.log('🔍 Backend Debug - Unread inquiries sample:', inquiries.slice(0, 2));
    
    res.status(200).json({
      success: true,
      data: inquiries,
      count: inquiries.length
    });
  } catch (error) {
    console.error('🔍 Backend Debug - Error fetching unread inquiries:', error);
    console.error('🔍 Backend Debug - Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error fetching unread inquiries',
      error: error.message
    });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    console.log('Fetching unread inquiry count...');
    const count = await Inquiry.countDocuments({ isRead: false });
    
    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching unread count',
      error: error.message
    });
  }
};

// Mark inquiry as read
const markAsRead = async (req, res) => {
  try {
    console.log(`Marking inquiry ${req.params.id} as read...`);
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true, 
        readAt: new Date() 
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry marked as read',
      data: inquiry
    });
  } catch (error) {
    console.error('Error marking inquiry as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking inquiry as read',
      error: error.message
    });
  }
};

// Mark all inquiries as read
const markAllAsRead = async (req, res) => {
  try {
    console.log('Marking all inquiries as read...');
    const result = await Inquiry.updateMany(
      { isRead: false },
      { 
        isRead: true, 
        readAt: new Date() 
      }
    );

    res.json({
      success: true,
      message: 'All inquiries marked as read',
      data: { modifiedCount: result.modifiedCount }
    });
  } catch (error) {
    console.error('Error marking all inquiries as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking all inquiries as read',
      error: error.message
    });
  }
};

// Get inquiry statistics
const getInquiryStats = async (req, res) => {
  try {
    const stats = await Inquiry.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: {
            $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] }
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    const thisMonth = await Inquiry.countDocuments({
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
      }
    });
    
    const result = {
      total: stats[0]?.total || 0,
      new: stats[0]?.new || 0,
      inProgress: stats[0]?.inProgress || 0,
      completed: stats[0]?.completed || 0,
      cancelled: stats[0]?.cancelled || 0,
      thisMonth
    };

    res.json({
      success: true,
      data: result
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
  getInquiryStats,
  getUnreadInquiries,
  getUnreadCount,
  markAsRead,
  markAllAsRead
};
