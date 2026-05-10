let statsData = {
  certification: 'ISO 9001:2015',
  monthlyCapacity: '300 MT',
  facilitySize: '20,000',
  experience: '7+'
};

const getStats = (req, res) => {

  try {

    res.status(200).json(statsData);

  } catch (error) {

    console.error('GET stats error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
};

const updateStats = (req, res) => {

  try {

    console.log('Incoming body:', req.body);

    const {
      certification,
      monthlyCapacity,
      facilitySize,
      experience
    } = req.body;

    statsData = {
      certification,
      monthlyCapacity,
      facilitySize,
      experience
    };

    console.log('Updated stats:', statsData);

    res.status(200).json({
      success: true,
      message: 'Stats updated successfully',
      data: statsData
    });

  } catch (error) {

    console.error('PUT stats error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error updating stats'
    });
  }
};

module.exports = {
  getStats,
  updateStats
};
