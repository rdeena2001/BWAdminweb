const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
  getStaffStats,
  getDepartments
} = require('../data/staff');

const router = express.Router();

// @route   GET /api/staff
// @desc    Get all staff with optional filters
// @access  Private (Admin/Manager only)
router.get('/', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const { role, department, isActive, search } = req.query;
    const filters = {};

    if (role) filters.role = role;
    if (department) filters.department = department;
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    if (search) filters.search = search;

    const staff = getStaff(filters);

    res.json({
      success: true,
      data: staff,
      count: staff.length
    });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching staff'
    });
  }
});

// @route   GET /api/staff/stats
// @desc    Get staff statistics
// @access  Private (Admin/Manager only)
router.get('/stats', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const stats = getStaffStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get staff stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching staff statistics'
    });
  }
});

// @route   GET /api/staff/departments
// @desc    Get list of departments
// @access  Private (Admin/Manager only)
router.get('/departments', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const departments = getDepartments();

    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching departments'
    });
  }
});

// @route   GET /api/staff/:id
// @desc    Get staff by ID
// @access  Private (Admin/Manager only)
router.get('/:id', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const staff = getStaffById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching staff member'
    });
  }
});

// @route   POST /api/staff
// @desc    Create new staff member
// @access  Private (Admin only)
router.post('/', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const staffData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'role', 'department'];
    for (const field of requiredFields) {
      if (!staffData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(staffData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate role
    const validRoles = ['admin', 'manager', 'staff'];
    if (!validRoles.includes(staffData.role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be one of: ' + validRoles.join(', ')
      });
    }

    const newStaff = createStaff(staffData);

    res.status(201).json({
      success: true,
      message: 'Staff member created successfully',
      data: newStaff
    });
  } catch (error) {
    console.error('Create staff error:', error);
    if (error.message === 'Email already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating staff member'
    });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update staff member
// @access  Private (Admin only)
router.put('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const updatedStaff = updateStaff(req.params.id, req.body);

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member updated successfully',
      data: updatedStaff
    });
  } catch (error) {
    console.error('Update staff error:', error);
    if (error.message === 'Email already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating staff member'
    });
  }
});

// @route   PATCH /api/staff/:id/toggle
// @desc    Toggle staff member active status
// @access  Private (Admin only)
router.patch('/:id/toggle', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const updatedStaff = toggleStaffStatus(req.params.id);

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: `Staff member ${updatedStaff.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedStaff
    });
  } catch (error) {
    console.error('Toggle staff status error:', error);
    if (error.message.includes('Cannot')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating staff status'
    });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete staff member
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = deleteStaff(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    console.error('Delete staff error:', error);
    if (error.message.includes('Cannot delete')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting staff member'
    });
  }
});

module.exports = router;
