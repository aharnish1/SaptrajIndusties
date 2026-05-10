// Settings Controller - Manages website settings data in memory

// In-memory settings data (for demo purposes)
let settingsData = {
  email: 'saptarajindustries@gmail.com',
  phone: '+91 98765 43210',
  location: 'Pune, Maharashtra, India'
};

// GET /settings - Retrieve current settings
const getSettings = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: settingsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message
    });
  }
};

// PUT /settings - Update settings
const updateSettings = (req, res) => {
  try {
    const { email, phone, location } = req.body;

    // Validate required fields
    if (!email || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Email, phone, and location are required'
      });
    }

    // Update in-memory data
    settingsData = {
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim()
    };

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settingsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
