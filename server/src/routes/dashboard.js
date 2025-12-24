const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const {
  getDashboardStats,
  getChartData,
  getPropertyPerformance,
  getRecentActivity
} = require('../data/dashboard');
const { getRecentBookings } = require('../data/bookings');

const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get dashboard overview data
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const stats = getDashboardStats();
    const chartData = getChartData();
    const recentBookings = getRecentBookings(5);
    const recentActivity = getRecentActivity();

    res.json({
      success: true,
      data: {
        stats,
        chartData,
        recentBookings,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics only
// @access  Private
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const stats = getDashboardStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
});

// @route   GET /api/dashboard/charts
// @desc    Get chart data for dashboard
// @access  Private
router.get('/charts', verifyToken, async (req, res) => {
  try {
    const chartData = getChartData();

    res.json({
      success: true,
      data: chartData
    });
  } catch (error) {
    console.error('Dashboard charts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chart data'
    });
  }
});

// @route   GET /api/dashboard/property-performance
// @desc    Get property performance data
// @access  Private
router.get('/property-performance', verifyToken, async (req, res) => {
  try {
    const propertyPerformance = getPropertyPerformance();

    res.json({
      success: true,
      data: propertyPerformance
    });
  } catch (error) {
    console.error('Property performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property performance data'
    });
  }
});

// @route   GET /api/dashboard/recent-activity
// @desc    Get recent activity feed
// @access  Private
router.get('/recent-activity', verifyToken, async (req, res) => {
  try {
    const recentActivity = getRecentActivity();

    res.json({
      success: true,
      data: recentActivity
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent activity'
    });
  }
});

module.exports = router;
