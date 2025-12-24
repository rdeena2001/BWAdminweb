const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  validateCoupon
} = require('../data/coupons');

const router = express.Router();

// @route   GET /api/coupons
// @desc    Get all coupons with optional filters
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const { isActive, type, search } = req.query;
    const filters = {};

    if (isActive !== undefined) {
      filters.isActive = isActive === 'true';
    }
    if (type) filters.type = type;
    if (search) filters.search = search;

    const coupons = getCoupons(filters);

    res.json({
      success: true,
      data: coupons,
      count: coupons.length
    });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons'
    });
  }
});

// @route   GET /api/coupons/:id
// @desc    Get coupon by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const coupon = getCouponById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      data: coupon
    });
  } catch (error) {
    console.error('Get coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching coupon'
    });
  }
});

// @route   POST /api/coupons
// @desc    Create new coupon
// @access  Private (Admin/Manager only)
router.post('/', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const couponData = req.body;

    // Validate required fields
    const requiredFields = ['code', 'name', 'description', 'type', 'value', 'expiryDate', 'usageLimit'];
    for (const field of requiredFields) {
      if (couponData[field] === undefined || couponData[field] === '') {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Validate coupon type and value
    if (!['percentage', 'fixed'].includes(couponData.type)) {
      return res.status(400).json({
        success: false,
        message: 'Type must be either "percentage" or "fixed"'
      });
    }

    if (couponData.type === 'percentage' && (couponData.value < 0 || couponData.value > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Percentage value must be between 0 and 100'
      });
    }

    // Validate expiry date
    if (new Date(couponData.expiryDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Expiry date must be in the future'
      });
    }

    const newCoupon = createCoupon(couponData);

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: newCoupon
    });
  } catch (error) {
    console.error('Create coupon error:', error);
    if (error.message === 'Coupon code already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating coupon'
    });
  }
});

// @route   PUT /api/coupons/:id
// @desc    Update coupon
// @access  Private (Admin/Manager only)
router.put('/:id', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const updatedCoupon = updateCoupon(req.params.id, req.body);

    if (!updatedCoupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon updated successfully',
      data: updatedCoupon
    });
  } catch (error) {
    console.error('Update coupon error:', error);
    if (error.message === 'Coupon code already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating coupon'
    });
  }
});

// @route   PATCH /api/coupons/:id/toggle
// @desc    Toggle coupon active status
// @access  Private (Admin/Manager only)
router.patch('/:id/toggle', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const updatedCoupon = toggleCouponStatus(req.params.id);

    if (!updatedCoupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: `Coupon ${updatedCoupon.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedCoupon
    });
  } catch (error) {
    console.error('Toggle coupon status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating coupon status'
    });
  }
});

// @route   POST /api/coupons/validate
// @desc    Validate coupon code and calculate discount
// @access  Private
router.post('/validate', verifyToken, async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || !orderAmount) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code and order amount are required'
      });
    }

    const validation = validateCoupon(code, orderAmount);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    res.json({
      success: true,
      message: 'Coupon is valid',
      data: {
        coupon: validation.coupon,
        discount: validation.discount,
        finalAmount: validation.finalAmount
      }
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating coupon'
    });
  }
});

// @route   DELETE /api/coupons/:id
// @desc    Delete coupon
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = deleteCoupon(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting coupon'
    });
  }
});

module.exports = router;
