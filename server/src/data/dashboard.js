const { getBookings, getRecentBookings } = require('./bookings');
const { getProperties } = require('./properties');
const { getUserStats } = require('./users');
const { getRooms } = require('./rooms');

const getDashboardStats = () => {
  const bookings = getBookings();
  const properties = getProperties();
  const rooms = getRooms();
  const userStats = getUserStats();

  // Calculate booking statistics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  // Calculate revenue
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const monthlyRevenue = bookings
    .filter(b => {
      const bookingDate = new Date(b.createdAt);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return bookingDate.getMonth() === currentMonth &&
             bookingDate.getFullYear() === currentYear &&
             b.status === 'confirmed';
    })
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  // Calculate occupancy
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const occupancyRate = rooms.length > 0 ? (occupiedRooms / rooms.length) * 100 : 0;

  return {
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      pending: pendingBookings,
      cancelled: cancelledBookings
    },
    revenue: {
      total: totalRevenue,
      monthly: monthlyRevenue,
      average: totalBookings > 0 ? totalRevenue / totalBookings : 0
    },
    properties: {
      total: properties.length,
      active: properties.filter(p => p.status === 'active').length,
      maintenance: properties.filter(p => p.status === 'maintenance').length
    },
    rooms: {
      total: rooms.length,
      occupied: occupiedRooms,
      available: availableRooms,
      occupancyRate: Math.round(occupancyRate * 100) / 100
    },
    users: userStats
  };
};

const getChartData = () => {
  const bookings = getBookings();
  const currentDate = new Date();

  // Generate data for the last 6 months
  const months = [];
  const bookingData = [];
  const revenueData = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    months.push(monthName);

    // Filter bookings for this month
    const monthBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.getMonth() === date.getMonth() &&
             bookingDate.getFullYear() === date.getFullYear();
    });

    bookingData.push(monthBookings.length);

    const monthRevenue = monthBookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
    revenueData.push(monthRevenue);
  }

  return {
    bookings: {
      labels: months,
      datasets: [
        {
          label: 'Bookings',
          data: bookingData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        },
      ],
    },
    revenue: {
      labels: months,
      datasets: [
        {
          label: 'Revenue ($)',
          data: revenueData,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
        },
      ],
    },
  };
};

const getPropertyPerformance = () => {
  const bookings = getBookings();
  const properties = getProperties();

  return properties.map(property => {
    const propertyBookings = bookings.filter(b => b.propertyId === property.id);
    const confirmedBookings = propertyBookings.filter(b => b.status === 'confirmed');
    const revenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    return {
      id: property.id,
      name: property.name,
      bookings: propertyBookings.length,
      confirmedBookings: confirmedBookings.length,
      revenue,
      averageBookingValue: confirmedBookings.length > 0 ? revenue / confirmedBookings.length : 0,
      occupancyRate: property.totalRooms > 0 ? (confirmedBookings.length / property.totalRooms) * 100 : 0
    };
  });
};

const getRecentActivity = () => {
  const recentBookings = getRecentBookings(10);

  return recentBookings.map(booking => ({
    id: booking.id,
    type: 'booking',
    title: `New booking ${booking.bookingNumber}`,
    description: `${booking.guestName} booked ${booking.roomType} at ${booking.propertyName}`,
    timestamp: booking.createdAt,
    status: booking.status
  }));
};

module.exports = {
  getDashboardStats,
  getChartData,
  getPropertyPerformance,
  getRecentActivity
};
