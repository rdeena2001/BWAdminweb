import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Hotel,
  CalendarToday,
  AttachMoney,
  Phone,
  Email,
} from '@mui/icons-material';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    // Simulate API call
    setTimeout(() => {
      setBooking({
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
        specialRequests: 'Late check-in requested',
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          Booking not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/bookings')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          Booking Details - {booking.bookingNumber}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Guest Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Guest Name</Typography>
                      <Typography>{booking.guestName}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Email sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Email</Typography>
                      <Typography>{booking.guestEmail}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Phone sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Phone</Typography>
                      <Typography>{booking.guestPhone}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Person sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Number of Guests</Typography>
                      <Typography>{booking.guests}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Status
              </Typography>
              <Box mb={2}>
                <Chip
                  label={booking.status}
                  color="success"
                  sx={{ textTransform: 'capitalize', mb: 1 }}
                />
                <Chip
                  label={booking.paymentStatus}
                  color="success"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize', ml: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Created: {booking.createdAt}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reservation Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Hotel sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Property</Typography>
                      <Typography>{booking.propertyName}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Hotel sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Room</Typography>
                      <Typography>Room {booking.roomNumber} - {booking.roomType}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CalendarToday sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Check-in</Typography>
                      <Typography>{booking.checkIn}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CalendarToday sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Check-out</Typography>
                      <Typography>{booking.checkOut}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CalendarToday sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Duration</Typography>
                      <Typography>{booking.nights} night(s)</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {booking.specialRequests && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Special Requests
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.specialRequests}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoney sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Total Amount</Typography>
                      <Typography variant="h6">${booking.totalAmount}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoney sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Paid Amount</Typography>
                      <Typography variant="h6" color="success.main">
                        ${booking.paidAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoney sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2">Balance</Typography>
                      <Typography variant="h6" color={booking.totalAmount - booking.paidAmount > 0 ? 'error.main' : 'success.main'}>
                        ${booking.totalAmount - booking.paidAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate('/bookings')}>
              Back to Bookings
            </Button>
            <Button variant="contained" color="primary">
              Edit Booking
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingDetails;
