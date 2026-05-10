const db = require('../data/mockData');

// Submit contact form
const submitContact = (req, res) => {
  try {
    const { name, email, phone, company, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
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

    const newContact = {
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to contacts array (or inquiries if it's a business inquiry)
    if (subject && subject.toLowerCase().includes('quote') || subject.toLowerCase().includes('business')) {
      db.inquiries.push({
        ...newContact,
        requirement: message,
        type: 'contact'
      });
    } else {
      if (!db.contacts) db.contacts = [];
      db.contacts.push(newContact);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// Get all contact submissions
const getContacts = (req, res) => {
  try {
    const { status, search } = req.query;
    let contacts = db.contacts || [];

    if (status && status !== 'all') {
      contacts = contacts.filter(contact => 
        contact.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      contacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by date (newest first)
    contacts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Update contact status
const updateContactStatus = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    if (!db.contacts) db.contacts = [];
    const contactIndex = db.contacts.findIndex(c => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    db.contacts[contactIndex].status = status;
    db.contacts[contactIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: db.contacts[contactIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
      error: error.message
    });
  }
};

// Delete contact
const deleteContact = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    
    if (!db.contacts) db.contacts = [];
    const contactIndex = db.contacts.findIndex(c => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    db.contacts.splice(contactIndex, 1);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
