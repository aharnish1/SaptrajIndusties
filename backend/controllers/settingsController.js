const Settings = require('../models/Settings');

const DEFAULT_SETTINGS = {
  contactEmail: 'saptarajindustries@gmail.com',
  contactPhone: '+91 98765 43210',
  location: 'Pune, Maharashtra, India',
  legalDepartmentEmail: 'aharnishparekar7@gmail.com'
};

const initializeSettings = async () => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
      console.log('✅ Default settings initialized');
    }
    return settings;
  } catch (error) {
    console.error('Error initializing settings:', error);
    return null;
  }
};

const getOrCreateSettings = async () => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }
    return settings;
  } catch (error) {
    console.error('Error in getOrCreateSettings:', error);
    return null;
  }
};

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }

    res.status(200).json({
      success: true,
      data: {
        email: settings.contactEmail,
        phone: settings.contactPhone,
        location: settings.location,
        legalDepartmentEmail: settings.legalDepartmentEmail
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { email, phone, location, legalDepartmentEmail } = req.body;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact email format'
      });
    }
    
    if (legalDepartmentEmail && !emailRegex.test(legalDepartmentEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid legal department email format'
      });
    }

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(DEFAULT_SETTINGS);
    }

    if (email) settings.contactEmail = email.trim();
    if (phone) settings.contactPhone = phone.trim();
    if (location) settings.location = location.trim();
    if (legalDepartmentEmail) settings.legalDepartmentEmail = legalDepartmentEmail.trim().toLowerCase();

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        email: settings.contactEmail,
        phone: settings.contactPhone,
        location: settings.location,
        legalDepartmentEmail: settings.legalDepartmentEmail
      }
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
};

const getLegalEmail = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }

    res.status(200).json({
      success: true,
      data: {
        legalDepartmentEmail: settings.legalDepartmentEmail
      }
    });
  } catch (error) {
    console.error('Error fetching legal email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve legal email',
      error: error.message
    });
  }
};

const updateLegalEmail = async (req, res) => {
  try {
    const { legalDepartmentEmail } = req.body;

    if (!legalDepartmentEmail) {
      return res.status(400).json({
        success: false,
        message: 'Legal department email is required'
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(legalDepartmentEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(DEFAULT_SETTINGS);
    }

    settings.legalDepartmentEmail = legalDepartmentEmail.trim().toLowerCase();
    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Legal department email updated successfully',
      data: {
        legalDepartmentEmail: settings.legalDepartmentEmail
      }
    });
  } catch (error) {
    console.error('Error updating legal email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update legal email',
      error: error.message
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getLegalEmail,
  updateLegalEmail,
  initializeSettings
};