import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import {
  Search,
  Visibility,
  CheckCircle,
  Cancel,
  FilterList,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNotification } from '../../contexts/NotificationContext';

const Bookings = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionDialog, setActionDialog] = useState({ open: false, booking: null, action: null });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // Simulate API call
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          bookingNumber: 'BW001',
          guestName: 'John Doe',
          guestEmail: 'john.doe@email.com',
          guestPhone: '+1 (555) 123-4567',
          propertyName: 'Ocean View Resort',
          roomNumber: '101',
          roomType: 'Suite',
          checkIn: '2024-01-15',
          checkOut: '2024-01-18',
          nights: 3,
          guests: 2,
          totalAmount: 1200,
          paidAmount: 1200,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-01-10',
        },
        {
          id: 2,
          bookingNumber: 'BW002',
          guestName: 'Jane Smith',
          guestEmail: 'jane.smith@email.com',
          guestPhone: '+1 (555) 234-5678',
          propertyName: 'Mountain Lodge',
          roomNumber: '201',
          roomType: 'Deluxe',
          checkIn: '2024-01-16',
          checkOut: '2024-01-20',
          nights: 4,
          guests: 2,
          totalAmount: 800,
          paidAmount: 400,
          status: 'pending',
          paymentStatus: 'partial',
          createdAt: '2024-01-12',
        },
        {
          id: 3,
          bookingNumber: 'BW003',
          guestName: 'Mike Johnson',
          guestEmail: 'mike.johnson@email.com',
          guestPhone: '+1 (555) 345-6789',
          propertyName: 'City Hotel',
          roomNumber: '301',
          roomType: 'Executive',
          checkIn: '2024-01-17',
          checkOut: '2024-01-19',
          nights: 2,
          guests: 1,
          totalAmount: 600,
          paidAmount: 0,
          status: 'cancelled',
          paymentStatus: 'refunded',
          createdAt: '2024-01-08',
        },
        {
          id: 4,
          bookingNumber: 'BW004',
          guestName: 'Sarah Wilson',
          guestEmail: 'sarah.wilson@email.com',
          guestPhone: '+1 (555) 456-7890',
          propertyName: 'Beach Resort',
          roomNumber: '105',
          roomType: 'Suite',
          checkIn: '2024-01-18',
          checkOut: '2024-01-22',
          nights: 4,
          guests: 4,
          totalAmount: 1500,
          paidAmount: 1500,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-01-14',
        },
        {
          id: 5,
          bookingNumber: 'BW005',
          guestName: 'Tom Brown',
          guestEmail: 'tom.brown@email.com',
          guestPhone: '+1 (555) 567-8901',
          propertyName: 'Spa Resort',
          roomNumber: '202',
          roomType: 'Deluxe',
          checkIn: '2024-01-19',
          checkOut: '2024-01-21',
          nights: 2,
          guests: 2,
          totalAmount: 900,
          paidAmount: 450,
          status: 'pending',
          paymentStatus: 'partial',
          createdAt: '2024-01-16',
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      showSuccess(`Booking ${newStatus} successfully`);
      setActionDialog({ open: false, booking: null, action: null });
    } catch (error) {
      showError(`Failed to ${newStatus} booking`);
    }
  };

  const handleActionClick = (booking, action) => {
    setActionDialog({ open: true, booking, action });
  };

  const confirmAction = () => {
    const { booking, action } = actionDialog;
    handleStatusChange(booking.id, action);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || booking.status === statusFilter;

    const matchesDate = !dateFilter ||
      dayjs(booking.checkIn).isSame(dateFilter, 'day') ||
      dayjs(booking.checkOut).isSame(dateFilter, 'day');

    return matchesSearch && matchesStatus && matchesDate;
  });

  const paginatedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'checked-in':
        return 'info';
      case 'checked-out':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'partial':
        return 'warning';
      case 'pending':
        return 'error';
      case 'refunded':
        return 'info';
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bookings Management
        </Typography>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search bookings..."
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

              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="checked-in">Checked In</MenuItem>
                    <MenuItem value="checked-out">Checked Out</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Filter by Date"
                  value={dateFilter}
                  onChange={setDateFilter}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('');
                    setDateFilter(null);
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardContent>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking #</TableCell>
                    <TableCell>Guest</TableCell>
                    <TableCell>Property & Room</TableCell>
                    <TableCell>Check In/Out</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <Typography variant="subtitle2" color="primary">
                          {booking.bookingNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.createdAt}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{booking.guestName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.guestEmail}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {booking.guests} guest(s)
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{booking.propertyName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Room {booking.roomNumber} - {booking.roomType}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {booking.checkIn} to {booking.checkOut}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.nights} night(s)
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">
                          ${booking.totalAmount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Paid: ${booking.paidAmount}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={booking.status}
                          color={getStatusColor(booking.status)}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={booking.paymentStatus}
                          color={getPaymentStatusColor(booking.paymentStatus)}
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                          >
                            <Visibility />
                          </IconButton>

                          {booking.status === 'pending' && (
                            <>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleActionClick(booking, 'confirmed')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleActionClick(booking, 'cancelled')}
                              >
                                <Cancel />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />

            {filteredBookings.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography variant="h6" color="text.secondary">
                  No bookings found
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Action Confirmation Dialog */}
        <Dialog
          open={actionDialog.open}
          onClose={() => setActionDialog({ open: false, booking: null, action: null })}
        >
          <DialogTitle>
            {actionDialog.action === 'confirmed' ? 'Confirm Booking' : 'Cancel Booking'}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {actionDialog.action === 'confirmed' ? 'confirm' : 'cancel'}
              booking {actionDialog.booking?.bookingNumber} for {actionDialog.booking?.guestName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialog({ open: false, booking: null, action: null })}>
              No
            </Button>
            <Button
              onClick={confirmAction}
              color={actionDialog.action === 'confirmed' ? 'success' : 'error'}
              variant="contained"
            >
              Yes, {actionDialog.action === 'confirmed' ? 'Confirm' : 'Cancel'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Bookings;
