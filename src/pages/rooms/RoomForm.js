import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  AttachMoney,
  People,
  Bed,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const ROOM_TYPES = [
  'Standard',
  'Deluxe',
  'Suite',
  'Executive',
  'Presidential',
  'Family',
  'Connecting',
];

const ROOM_AMENITIES = [
  'WiFi', 'Air Conditioning', 'Mini Bar', 'Safe', 'TV', 'Balcony',
  'Ocean View', 'City View', 'Mountain View', 'Garden View',
  'Fireplace', 'Jacuzzi', 'Work Desk', 'Mini Fridge', 'Coffee Maker',
  'Room Service', 'Laundry Service', 'Concierge', 'Kitchenette'
];

const RoomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useNotification();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    type: '',
    propertyId: '',
    capacity: 2,
    beds: 1,
    price: 0,
    description: '',
    amenities: [],
    status: 'available',
    size: '',
    floor: '',
  });

  useEffect(() => {
    fetchProperties();
    if (isEdit) {
      fetchRoom();
    }
  }, [id, isEdit]);

  const fetchProperties = async () => {
    // Simulate API call
    setProperties([
      { id: 1, name: 'Ocean View Resort' },
      { id: 2, name: 'Mountain Lodge' },
      { id: 3, name: 'City Hotel' },
      { id: 4, name: 'Beach Resort' },
    ]);
  };

  const fetchRoom = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFormData({
        number: '101',
        name: 'Ocean View Suite',
        type: 'Suite',
        propertyId: 1,
        capacity: 4,
        beds: 2,
        price: 299,
        description: 'Spacious suite with panoramic ocean views and modern amenities.',
        amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi', 'Air Conditioning'],
        status: 'available',
        size: '450 sq ft',
        floor: '1',
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      showSuccess(isEdit ? 'Room updated successfully' : 'Room created successfully');
      navigate('/rooms');
    } catch (error) {
      showError('Failed to save room');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/rooms')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          {isEdit ? 'Edit Room' : 'Add New Room'}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Room Number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Room Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Property</InputLabel>
                      <Select
                        name="propertyId"
                        value={formData.propertyId}
                        onChange={handleChange}
                        label="Property"
                      >
                        {properties.map((property) => (
                          <MenuItem key={property.id} value={property.id}>
                            {property.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Room Type</InputLabel>
                      <Select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        label="Room Type"
                      >
                        {ROOM_TYPES.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Room Details */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <People />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Number of Beds"
                      name="beds"
                      type="number"
                      value={formData.beds}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Bed />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Price per Night"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Room Size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g., 350 sq ft"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Floor"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        label="Status"
                      >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="occupied">Occupied</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                        <MenuItem value="unavailable">Unavailable</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Amenities */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room Amenities
                </Typography>

                <Box>
                  {ROOM_AMENITIES.map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      color={formData.amenities.includes(amenity) ? 'primary' : 'default'}
                      variant={formData.amenities.includes(amenity) ? 'filled' : 'outlined'}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Actions */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate('/rooms')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Room' : 'Create Room')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RoomForm;
