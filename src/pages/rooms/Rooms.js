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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Bed,
  People,
  AttachMoney,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const Rooms = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [rooms, setRooms] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, room: null });

  useEffect(() => {
    fetchRooms();
    fetchProperties();
  }, []);

  const fetchRooms = async () => {
    // Simulate API call
    setTimeout(() => {
      setRooms([
        {
          id: 1,
          number: '101',
          name: 'Ocean View Suite',
          type: 'Suite',
          propertyId: 1,
          propertyName: 'Ocean View Resort',
          capacity: 4,
          beds: 2,
          price: 299,
          status: 'available',
          amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi'],
          description: 'Spacious suite with panoramic ocean views',
        },
        {
          id: 2,
          number: '102',
          name: 'Deluxe Room',
          type: 'Deluxe',
          propertyId: 1,
          propertyName: 'Ocean View Resort',
          capacity: 2,
          beds: 1,
          price: 199,
          status: 'occupied',
          amenities: ['City View', 'WiFi', 'Mini Fridge'],
          description: 'Comfortable deluxe room with modern amenities',
        },
        {
          id: 3,
          number: '201',
          name: 'Mountain View Room',
          type: 'Standard',
          propertyId: 2,
          propertyName: 'Mountain Lodge',
          capacity: 2,
          beds: 1,
          price: 149,
          status: 'maintenance',
          amenities: ['Mountain View', 'Fireplace', 'WiFi'],
          description: 'Cozy room with stunning mountain views',
        },
        {
          id: 4,
          number: '301',
          name: 'Executive Suite',
          type: 'Executive',
          propertyId: 3,
          propertyName: 'City Hotel',
          capacity: 6,
          beds: 3,
          price: 399,
          status: 'available',
          amenities: ['City View', 'Work Desk', 'Mini Bar', 'WiFi'],
          description: 'Premium executive suite for business travelers',
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchProperties = async () => {
    // Simulate API call
    setProperties([
      { id: 1, name: 'Ocean View Resort' },
      { id: 2, name: 'Mountain Lodge' },
      { id: 3, name: 'City Hotel' },
      { id: 4, name: 'Beach Resort' },
    ]);
  };

  const handleEdit = (id) => {
    navigate(`/rooms/edit/${id}`);
  };

  const handleDelete = (room) => {
    setDeleteDialog({ open: true, room });
  };

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setRooms(rooms.filter(r => r.id !== deleteDialog.room.id));
      showSuccess('Room deleted successfully');
      setDeleteDialog({ open: false, room: null });
    } catch (error) {
      showError('Failed to delete room');
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      setRooms(rooms.map(room =>
        room.id === roomId
          ? { ...room, status: room.status === 'available' ? 'unavailable' : 'available' }
          : room
      ));
      showSuccess('Room status updated');
    } catch (error) {
      showError('Failed to update room status');
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProperty = selectedProperty === '' || room.propertyId.toString() === selectedProperty;
    return matchesSearch && matchesProperty;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'primary';
      case 'maintenance':
        return 'warning';
      case 'unavailable':
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
        <Typography variant="h4">Rooms</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/rooms/new')}
        >
          Add Room
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search rooms..."
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
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Property</InputLabel>
            <Select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              label="Filter by Property"
            >
              <MenuItem value="">All Properties</MenuItem>
              {properties.map((property) => (
                <MenuItem key={property.id} value={property.id.toString()}>
                  {property.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room #</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Bed sx={{ mr: 1, color: 'grey.500' }} />
                        {room.number}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{room.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {room.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{room.propertyName}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <People fontSize="small" sx={{ mr: 0.5 }} />
                        {room.capacity}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <AttachMoney fontSize="small" />
                        {room.price}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={room.status}
                        color={getStatusColor(room.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={room.status === 'available'}
                        onChange={() => toggleAvailability(room.id)}
                        disabled={room.status === 'occupied' || room.status === 'maintenance'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(room.id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(room)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredRooms.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No rooms found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, room: null })}
      >
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete room "{deleteDialog.room?.number} - {deleteDialog.room?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, room: null })}>
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

export default Rooms;
