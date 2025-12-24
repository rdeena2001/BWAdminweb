const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getRecentBookings
} = require('../data/bookings');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings with optional filters
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status, propertyId, guestEmail, checkIn, checkOut, search, limit } = req.query;
    let bookings = getBookings({ status, propertyId, guestEmail, checkIn, checkOut });

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      bookings = bookings.filter(booking =>
        booking.bookingNumber.toLowerCase().includes(searchTerm) ||
        booking.guestName.toLowerCase().includes(searchTerm) ||
        booking.guestEmail.toLowerCase().includes(searchTerm) ||
        booking.propertyName.toLowerCase().includes(searchTerm)
      );
    }

    // Apply limit if specified
    if (limit) {
      bookings = bookings.slice(0, parseInt(limit));
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// @route   GET /api/bookings/recent
// @desc    Get recent bookings for dashboard
// @access  Private
router.get('/recent', verifyToken, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const recentBookings = getRecentBookings(parseInt(limit));

    res.json({
      success: true,
      data: recentBookings
    });
  } catch (error) {
    console.error('Get recent bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking'
    });
  }
});

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private (Admin/Manager/Staff)
router.post('/', verifyToken, requireRole(['admin', 'manager', 'staff']), async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate required fields
    const requiredFields = [
      'guestName', 'guestEmail', 'propertyId', 'roomId',
      'checkIn', 'checkOut', 'guests', 'totalAmount'
    ];

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Validate dates
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    // Calculate nights
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    bookingData.nights = nights;

    const newBooking = createBooking(bookingData);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking
// @access  Private (Admin/Manager/Staff)
router.put('/:id', verifyToken, requireRole(['admin', 'manager', 'staff']), async (req, res) => {
  try {
    const updatedBooking = updateBooking(req.params.id, req.body);

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking'
    });
  }
});

// @route   PATCH /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (Admin/Manager/Staff)
router.patch('/:id/status', verifyToken, requireRole(['admin', 'manager', 'staff']), async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'checked-in', 'checked-out'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const updatedBooking = updateBookingStatus(req.params.id, status);

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status'
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete booking
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = deleteBooking(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking'
    });
  }
});

module.exports = router;
