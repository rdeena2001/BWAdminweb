const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const { getBookings } = require('../data/bookings');
const { getProperties } = require('../data/properties');

const router = express.Router();

// @route   GET /api/reports/bookings
// @desc    Get booking reports with date filtering
// @access  Private
router.get('/bookings', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate, propertyId, status } = req.query;
    let bookings = getBookings();

    // Apply filters
    if (startDate) {
      bookings = bookings.filter(booking => booking.checkIn >= startDate);
    }
    if (endDate) {
      bookings = bookings.filter(booking => booking.checkOut <= endDate);
    }
    if (propertyId) {
      bookings = bookings.filter(booking => booking.propertyId === parseInt(propertyId));
    }
    if (status) {
      bookings = bookings.filter(booking => booking.status === status);
    }

    // Calculate statistics
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;

    // Generate chart data (weekly breakdown)
    const chartData = generateWeeklyData(bookings, 'bookings');

    // Property-wise breakdown
    const propertyBreakdown = generatePropertyBreakdown(bookings, 'bookings');

    res.json({
      success: true,
      data: {
        summary: {
          totalBookings,
          confirmedBookings,
          cancelledBookings,
          pendingBookings,
          averageBookingValue: totalBookings > 0 ? bookings.reduce((sum, b) => sum + b.totalAmount, 0) / totalBookings : 0
        },
        chartData,
        propertyBreakdown,
        bookings: bookings.slice(0, 100) // Limit to 100 for performance
      }
    });
  } catch (error) {
    console.error('Booking reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating booking reports'
    });
  }
});

// @route   GET /api/reports/revenue
// @desc    Get revenue reports with date filtering
// @access  Private
router.get('/revenue', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate, propertyId } = req.query;
    let bookings = getBookings().filter(b => b.status === 'confirmed');

    // Apply filters
    if (startDate) {
      bookings = bookings.filter(booking => booking.checkIn >= startDate);
    }
    if (endDate) {
      bookings = bookings.filter(booking => booking.checkOut <= endDate);
    }
    if (propertyId) {
      bookings = bookings.filter(booking => booking.propertyId === parseInt(propertyId));
    }

    // Calculate revenue statistics
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const averageRevenue = bookings.length > 0 ? totalRevenue / bookings.length : 0;
    const highestBooking = bookings.length > 0 ? Math.max(...bookings.map(b => b.totalAmount)) : 0;
    const lowestBooking = bookings.length > 0 ? Math.min(...bookings.map(b => b.totalAmount)) : 0;

    // Calculate growth rate (mock calculation)
    const growthRate = 12.5;

    // Generate chart data
    const chartData = generateWeeklyData(bookings, 'revenue');

    // Property-wise breakdown
    const propertyBreakdown = generatePropertyBreakdown(bookings, 'revenue');

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          averageRevenue,
          highestBooking,
          lowestBooking,
          growthRate,
          totalBookings: bookings.length
        },
        chartData,
        propertyBreakdown
      }
    });
  } catch (error) {
    console.error('Revenue reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating revenue reports'
    });
  }
});

// @route   GET /api/reports/properties
// @desc    Get property performance reports
// @access  Private
router.get('/properties', verifyToken, async (req, res) => {
  try {
    const properties = getProperties();
    const bookings = getBookings();

    const propertyReports = properties.map(property => {
      const propertyBookings = bookings.filter(b => b.propertyId === property.id);
      const confirmedBookings = propertyBookings.filter(b => b.status === 'confirmed');
      const revenue = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

      return {
        id: property.id,
        name: property.name,
        type: property.type,
        location: `${property.city}, ${property.state}`,
        totalRooms: property.totalRooms || 0,
        totalBookings: propertyBookings.length,
        confirmedBookings: confirmedBookings.length,
        revenue,
        averageBookingValue: confirmedBookings.length > 0 ? revenue / confirmedBookings.length : 0,
        occupancyRate: property.totalRooms > 0 ? (confirmedBookings.length / property.totalRooms) * 100 : 0,
        rating: property.rating || 0
      };
    });

    res.json({
      success: true,
      data: propertyReports
    });
  } catch (error) {
    console.error('Property reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating property reports'
    });
  }
});

// Helper function to generate weekly data
const generateWeeklyData = (bookings, type) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const data = weeks.map((week, index) => {
    // Mock data generation - in real app, this would be based on actual dates
    const weekBookings = bookings.slice(index * Math.floor(bookings.length / 4), (index + 1) * Math.floor(bookings.length / 4));

    if (type === 'revenue') {
      return weekBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    } else {
      return weekBookings.length;
    }
  });

  return {
    labels: weeks,
    datasets: [
      {
        label: type === 'revenue' ? 'Revenue ($)' : 'Bookings',
        data,
        backgroundColor: type === 'revenue' ? 'rgba(54, 162, 235, 0.8)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: type === 'revenue' ? 'rgb(54, 162, 235)' : 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};

// Helper function to generate property breakdown
const generatePropertyBreakdown = (bookings, type) => {
  const properties = getProperties();

  return properties.map(property => {
    const propertyBookings = bookings.filter(b => b.propertyId === property.id);
    const value = type === 'revenue'
      ? propertyBookings.reduce((sum, b) => sum + b.totalAmount, 0)
      : propertyBookings.length;

    const totalValue = type === 'revenue'
      ? bookings.reduce((sum, b) => sum + b.totalAmount, 0)
      : bookings.length;

    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
    const growth = Math.random() * 20; // Mock growth rate

    return {
      property: property.name,
      [type === 'revenue' ? 'revenue' : 'bookings']: value,
      percentage: Math.round(percentage * 100) / 100,
      growth: Math.round(growth * 100) / 100
    };
  });
};

module.exports = router;
