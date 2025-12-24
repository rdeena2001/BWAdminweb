let bookings = [
  {
    id: 1,
    bookingNumber: 'BW001',
    guestName: 'John Doe',
    guestEmail: 'john.doe@email.com',
    guestPhone: '+1 (555) 123-4567',
    propertyId: 1,
    propertyName: 'Ocean View Resort',
    roomId: 1,
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
    specialRequests: 'Late check-in requested',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z'
  },
  {
    id: 2,
    bookingNumber: 'BW002',
    guestName: 'Jane Smith',
    guestEmail: 'jane.smith@email.com',
    guestPhone: '+1 (555) 234-5678',
    propertyId: 2,
    propertyName: 'Mountain Lodge',
    roomId: 3,
    roomNumber: '201',
    roomType: 'Standard',
    checkIn: '2024-01-16',
    checkOut: '2024-01-20',
    nights: 4,
    guests: 2,
    totalAmount: 800,
    paidAmount: 400,
    status: 'pending',
    paymentStatus: 'partial',
    specialRequests: 'Ground floor room preferred',
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z'
  },
  {
    id: 3,
    bookingNumber: 'BW003',
    guestName: 'Mike Johnson',
    guestEmail: 'mike.johnson@email.com',
    guestPhone: '+1 (555) 345-6789',
    propertyId: 3,
    propertyName: 'City Hotel',
    roomId: 4,
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
    specialRequests: 'Business meeting setup required',
    createdAt: '2024-01-08T16:00:00Z',
    updatedAt: '2024-01-15T10:20:00Z'
  },
  {
    id: 4,
    bookingNumber: 'BW004',
    guestName: 'Sarah Wilson',
    guestEmail: 'sarah.wilson@email.com',
    guestPhone: '+1 (555) 456-7890',
    propertyId: 4,
    propertyName: 'Beach Resort',
    roomId: 5,
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
    specialRequests: 'Anniversary celebration - flowers requested',
    createdAt: '2024-01-14T13:00:00Z',
    updatedAt: '2024-01-16T15:45:00Z'
  },
  {
    id: 5,
    bookingNumber: 'BW005',
    guestName: 'Tom Brown',
    guestEmail: 'tom.brown@email.com',
    guestPhone: '+1 (555) 567-8901',
    propertyId: 1,
    propertyName: 'Ocean View Resort',
    roomId: 2,
    roomNumber: '102',
    roomType: 'Deluxe',
    checkIn: '2024-01-19',
    checkOut: '2024-01-21',
    nights: 2,
    guests: 2,
    totalAmount: 900,
    paidAmount: 450,
    status: 'pending',
    paymentStatus: 'partial',
    specialRequests: 'Vegetarian meals requested',
    createdAt: '2024-01-16T10:30:00Z',
    updatedAt: '2024-01-16T10:30:00Z'
  }
];

let nextId = 6;

const getBookings = (filters = {}) => {
  let filteredBookings = [...bookings];

  if (filters.status) {
    filteredBookings = filteredBookings.filter(booking => booking.status === filters.status);
  }

  if (filters.propertyId) {
    filteredBookings = filteredBookings.filter(booking => booking.propertyId === parseInt(filters.propertyId));
  }

  if (filters.guestEmail) {
    filteredBookings = filteredBookings.filter(booking =>
      booking.guestEmail.toLowerCase().includes(filters.guestEmail.toLowerCase())
    );
  }

  if (filters.checkIn) {
    filteredBookings = filteredBookings.filter(booking => booking.checkIn >= filters.checkIn);
  }

  if (filters.checkOut) {
    filteredBookings = filteredBookings.filter(booking => booking.checkOut <= filters.checkOut);
  }

  return filteredBookings;
};

const getBookingById = (id) => bookings.find(b => b.id === parseInt(id));

const getBookingByNumber = (bookingNumber) => bookings.find(b => b.bookingNumber === bookingNumber);

const createBooking = (bookingData) => {
  const newBooking = {
    id: nextId++,
    bookingNumber: `BW${String(nextId).padStart(3, '0')}`,
    ...bookingData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  return newBooking;
};

const updateBooking = (id, bookingData) => {
  const index = bookings.findIndex(b => b.id === parseInt(id));
  if (index === -1) return null;

  bookings[index] = {
    ...bookings[index],
    ...bookingData,
    updatedAt: new Date().toISOString()
  };
  return bookings[index];
};

const updateBookingStatus = (id, status) => {
  const booking = getBookingById(id);
  if (!booking) return null;

  return updateBooking(id, { status });
};

const deleteBooking = (id) => {
  const index = bookings.findIndex(b => b.id === parseInt(id));
  if (index === -1) return false;

  bookings.splice(index, 1);
  return true;
};

// Get recent bookings for dashboard
const getRecentBookings = (limit = 5) => {
  return bookings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

module.exports = {
  getBookings,
  getBookingById,
  getBookingByNumber,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getRecentBookings
};
