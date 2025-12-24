const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatus
} = require('../data/rooms');

const router = express.Router();

// @route   GET /api/rooms
// @desc    Get all rooms with optional filters
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const { propertyId, status, type, search } = req.query;
    let rooms = getRooms({ propertyId, status, type });

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      rooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm) ||
        room.number.toLowerCase().includes(searchTerm) ||
        room.description.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      success: true,
      data: rooms,
      count: rooms.length
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms'
    });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get room by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const room = getRoomById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching room'
    });
  }
});

// @route   POST /api/rooms
// @desc    Create new room
// @access  Private (Admin/Manager only)
router.post('/', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const roomData = req.body;

    // Validate required fields
    const requiredFields = ['number', 'name', 'type', 'propertyId', 'capacity', 'beds', 'price'];
    for (const field of requiredFields) {
      if (roomData[field] === undefined || roomData[field] === '') {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    const newRoom = createRoom(roomData);

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: newRoom
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating room'
    });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update room
// @access  Private (Admin/Manager only)
router.put('/:id', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const updatedRoom = updateRoom(req.params.id, req.body);

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room updated successfully',
      data: updatedRoom
    });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating room'
    });
  }
});

// @route   PATCH /api/rooms/:id/status
// @desc    Update room status
// @access  Private (Admin/Manager/Staff)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['available', 'occupied', 'maintenance', 'unavailable'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const updatedRoom = updateRoomStatus(req.params.id, status);

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room status updated successfully',
      data: updatedRoom
    });
  } catch (error) {
    console.error('Update room status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating room status'
    });
  }
});

// @route   DELETE /api/rooms/:id
// @desc    Delete room
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = deleteRoom(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting room'
    });
  }
});

module.exports = router;
