let statsData = {
  certification: 'ISO 9001:2015',
  monthlyCapacity: '300 MT',
  facilitySize: '20,000',
  experience: '7+'
};

const Product = require('../models/Product');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');

const getMonthDateRange = (offset = 0) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const startDate = new Date(year, month - offset, 1);
  const endDate = new Date(year, month - offset + 1, 0, 23, 59, 59, 999);
  
  return { startDate, endDate };
};

const calculateGrowth = (currentCount, previousCount) => {
  if (previousCount === 0) {
    return currentCount > 0 ? 100 : 0;
  }
  const growth = ((currentCount - previousCount) / previousCount) * 100;
  return Math.round(growth * 10) / 10;
};

const getStats = async (req, res) => {
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

const getDashboardStats = async (req, res) => {
  try {
    const { startDate: currentStart, endDate: currentEnd } = getMonthDateRange(0);
    const { startDate: previousStart, endDate: previousEnd } = getMonthDateRange(1);
    const { startDate: thisMonthStart } = getMonthDateRange(0);

    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ status: 'Active' });
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({ status: 'Completed' });
    const inProgressProjects = await Project.countDocuments({ status: 'In Progress' });
    const totalInquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'New' });
    const thisMonthInquiries = await Inquiry.countDocuments({
      $or: [
        { createdAt: { $gte: thisMonthStart } },
        { date: { $gte: thisMonthStart } }
      ]
    });
    const prevMonthInquiries = await Inquiry.countDocuments({
      $or: [
        { createdAt: { $gte: previousStart, $lte: previousEnd } },
        { date: { $gte: previousStart, $lte: previousEnd } }
      ]
    });

    const thisMonthProducts = await Product.countDocuments({
      createdAt: { $gte: thisMonthStart }
    });
    const prevMonthProducts = await Product.countDocuments({
      createdAt: { $gte: previousStart, $lte: previousEnd }
    });

    const thisMonthProjects = await Project.countDocuments({
      createdAt: { $gte: thisMonthStart }
    });
    const prevMonthProjects = await Project.countDocuments({
      createdAt: { $gte: previousStart, $lte: previousEnd }
    });

    const stats = {
      products: {
        total: totalProducts,
        active: activeProducts,
        thisMonth: thisMonthProducts,
        previousMonth: prevMonthProducts,
        growth: calculateGrowth(thisMonthProducts, prevMonthProducts)
      },
      projects: {
        total: totalProjects,
        completed: completedProjects,
        inProgress: inProgressProjects,
        thisMonth: thisMonthProjects,
        previousMonth: prevMonthProjects,
        growth: calculateGrowth(thisMonthProjects, prevMonthProjects)
      },
      inquiries: {
        total: totalInquiries,
        new: newInquiries,
        thisMonth: thisMonthInquiries,
        previousMonth: prevMonthInquiries,
        growth: calculateGrowth(thisMonthInquiries, prevMonthInquiries)
      }
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('GET dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

const updateStats = (req, res) => {
  try {
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
  getDashboardStats,
  updateStats
};