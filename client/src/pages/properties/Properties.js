import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  LocationOn,
  Star,
  Hotel,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const Properties = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, property: null });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    // Simulate API call
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          name: 'Ocean View Resort',
          location: 'Miami Beach, FL',
          type: 'Resort',
          rooms: 45,
          rating: 4.8,
          status: 'active',
          image: '/api/placeholder/300/200',
          amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
          description: 'Luxury beachfront resort with stunning ocean views',
        },
        {
          id: 2,
          name: 'Mountain Lodge',
          location: 'Aspen, CO',
          type: 'Lodge',
          rooms: 28,
          rating: 4.6,
          status: 'active',
          image: '/api/placeholder/300/200',
          amenities: ['Fireplace', 'Ski Access', 'Restaurant', 'WiFi'],
          description: 'Cozy mountain retreat perfect for winter getaways',
        },
        {
          id: 3,
          name: 'City Hotel',
          location: 'New York, NY',
          type: 'Hotel',
          rooms: 120,
          rating: 4.4,
          status: 'active',
          image: '/api/placeholder/300/200',
          amenities: ['Gym', 'Business Center', 'Restaurant', 'WiFi'],
          description: 'Modern hotel in the heart of Manhattan',
        },
        {
          id: 4,
          name: 'Beach Resort',
          location: 'Malibu, CA',
          type: 'Resort',
          rooms: 85,
          rating: 4.9,
          status: 'maintenance',
          image: '/api/placeholder/300/200',
          amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant'],
          description: 'Exclusive beachfront resort with private beach',
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (id) => {
    navigate(`/properties/edit/${id}`);
  };

  const handleDelete = (property) => {
    setDeleteDialog({ open: true, property });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setProperties(properties.filter(p => p.id !== deleteDialog.property.id));
      showSuccess('Property deleted successfully');
      setDeleteDialog({ open: false, property: null });
    } catch (error) {
      showError('Failed to delete property');
    }
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Properties</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/properties/new')}
        >
          Add Property
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property.id}>
            <Card>
              <Box
                sx={{
                  height: 200,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Hotel sx={{ fontSize: 60, color: 'grey.400' }} />
              </Box>

              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                  <Typography variant="h6" component="h2">
                    {property.name}
                  </Typography>
                  <Chip
                    label={property.status}
                    color={getStatusColor(property.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={0.5}>
                    {property.location}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                  <Star fontSize="small" sx={{ color: 'orange' }} />
                  <Typography variant="body2" ml={0.5}>
                    {property.rating} • {property.rooms} rooms
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {property.description}
                </Typography>

                <Box mb={2}>
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                  {property.amenities.length > 3 && (
                    <Chip
                      label={`+${property.amenities.length - 3} more`}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  )}
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(property.id)}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(property)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProperties.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No properties found
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, property: null })}
      >
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog.property?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, property: null })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Properties;
