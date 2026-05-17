const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');
const { createNotification } = require('./notificationController');
const notificationService = require('../services/notificationService');

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

    const isQuoteRequest = Boolean(
      (materialType && materialType.trim()) ||
      (quantity && String(quantity).trim()) ||
      req.file
    );

    // Create notification in database
    try {
      await createNotification({
        type: isQuoteRequest ? 'quote' : 'inquiry',
        category: 'new',
        title: isQuoteRequest
          ? `New Quote Request from ${name}`
          : `New Inquiry from ${name}`,
        message: isQuoteRequest
          ? `${name} submitted a quote request for ${materialType || 'material'} (Qty: ${quantity || 'N/A'})`
          : `${name} from ${company || 'N/A'} has submitted a new inquiry regarding: ${requirement}`,
        relatedId: savedInquiry._id,
        relatedModel: 'Inquiry',
        priority: isQuoteRequest ? 'urgent' : 'high',
        actionUrl: `/inquiries?open=${savedInquiry._id}`,
        data: {
          inquiryId: savedInquiry._id,
          name: savedInquiry.name,
          email: savedInquiry.email,
          requirement: savedInquiry.requirement,
          isQuoteRequest
        }
      });
      console.log('✅ Notification created successfully');
    } catch (notificationError) {
      console.error('❌ Error creating notification:', notificationError);
      // Don't fail the request if notification creation fails
    }

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

    await notificationService.markRelatedAsRead(
      inquiry._id,
      ['inquiry', 'quote']
    );

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

    await notificationService.markAllAsRead();

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

// Reply to inquiry
const replyToInquiry = async (req, res) => {
  console.log('===========================================');
  console.log('🔧 REPLY API - Request received');
  console.log('🔧 REPLY API - Method:', req.method);
  console.log('🔧 REPLY API - URL:', req.url);
  console.log('🔧 REPLY API - Params:', req.params);
  console.log('===========================================');
  
  try {
    const { message } = req.body;
    const inquiryId = req.params.id;
    const adminId = req.user?.id || req.user?._id || 'system';

    console.log('🔧 REPLY API - ID:', inquiryId);
    console.log('🔧 REPLY API - Admin ID:', adminId);
    console.log('🔧 REPLY API - Message length:', message?.length);

    // Validate message
    if (!message || message.trim() === '') {
      console.log('🔧 REPLY API - Empty message, returning 400');
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    // Find inquiry with timeout
    console.log('🔧 REPLY API - Finding inquiry in database...');
    const inquiry = await Promise.race([
      Inquiry.findById(inquiryId),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB query timeout')), 10000)
      )
    ]);
    
    if (!inquiry) {
      console.error('❌ REPLY API - Inquiry not found:', inquiryId);
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    console.log('🔧 REPLY API - Inquiry found, email:', inquiry.email);

    // Prepare email content
    const emailSubject = `Re: ${inquiry.requirement || 'Your Inquiry'}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reply to Your Inquiry</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #FFD700;
            color: #1a1a1a;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 20px -30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            margin-bottom: 20px;
          }
          .reply-message {
            background-color: #fff;
            padding: 20px;
            border-left: 4px solid #FFD700;
            margin: 20px 0;
            border-radius: 4px;
          }
          .original-inquiry {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
          }
          .original-inquiry h3 {
            margin-top: 0;
            font-size: 16px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reply to Your Inquiry</h1>
          </div>
          <div class="content">
            <p>Dear ${inquiry.name},</p>
            <p>Thank you for your inquiry. We have reviewed your request and our response is below:</p>
            
            <div class="reply-message">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="original-inquiry">
              <h3>Your Original Inquiry:</h3>
              <p><strong>Requirement:</strong> ${inquiry.requirement}</p>
              <p><strong>Message:</strong> ${inquiry.message}</p>
              ${inquiry.company ? `<p><strong>Company:</strong> ${inquiry.company}</p>` : ''}
              ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
            </div>
            
            <p>If you have any further questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Saptraj Industries Team</p>
          </div>
          <div class="footer">
            <p>This email was sent in response to your inquiry submitted on ${new Date(inquiry.date).toLocaleDateString()}.</p>
            <p>&copy; ${new Date().getFullYear()} Saptraj Industries. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Add reply to inquiry
    inquiry.replies.push({
      message: message.trim(),
      repliedBy: adminId !== 'system' ? adminId : undefined,
      repliedAt: new Date()
    });

    // Update status to Replied
    inquiry.status = 'Replied';

    // Save inquiry with timeout
    console.log('🔧 REPLY API - Saving to database...');
    await Promise.race([
      inquiry.save(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DB save timeout')), 10000)
      )
    ]);

    console.log('✅ REPLY API - Reply saved to database');

    // Send email TRULY in background - no waiting, no blocking
    // Use setTimeout to detach from main event loop
    console.log('🔧 REPLY API - Scheduling background email...');
    setTimeout(() => {
      sendEmail(inquiry.email, emailSubject, emailHtml)
        .then(emailResult => {
          console.log('📧 BACKGROUND EMAIL - Result:', emailResult.success ? 'SUCCESS' : 'FAILED', emailResult.messageId || emailResult.error);
        })
        .catch(emailError => {
          console.error('📧 BACKGROUND EMAIL - Exception:', emailError.message);
        });
    }, 100);

    console.log('🔧 REPLY API - Returning response to client NOW');

    // Return immediately - don't wait for email
    return res.json({
      success: true,
      message: 'Reply sent successfully',
      data: inquiry
    });
  } catch (error) {
    console.error('❌ Error replying to inquiry:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error sending reply',
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
  markAllAsRead,
  replyToInquiry
};
