const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/auth');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../data/properties');

const router = express.Router();

// @route   GET /api/properties
// @desc    Get all properties
// @access  Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const { search, status, type } = req.query;
    let properties = getProperties();

    // Apply filters
    if (search) {
      const searchTerm = search.toLowerCase();
      properties = properties.filter(property =>
        property.name.toLowerCase().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
      );
    }

    if (status) {
      properties = properties.filter(property => property.status === status);
    }

    if (type) {
      properties = properties.filter(property => property.type === type);
    }

    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching properties'
    });
  }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const property = getPropertyById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property'
    });
  }
});

// @route   POST /api/properties
// @desc    Create new property
// @access  Private (Admin/Manager only)
router.post('/', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const propertyData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'description', 'type', 'address', 'city', 'state', 'country'];
    for (const field of requiredFields) {
      if (!propertyData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    const newProperty = createProperty(propertyData);

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: newProperty
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating property'
    });
  }
});

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private (Admin/Manager only)
router.put('/:id', verifyToken, requireRole(['admin', 'manager']), async (req, res) => {
  try {
    const updatedProperty = updateProperty(req.params.id, req.body);

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating property'
    });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private (Admin only)
router.delete('/:id', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const deleted = deleteProperty(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property'
    });
  }
});

module.exports = router;
