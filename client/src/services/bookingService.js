import api from './api';

export const bookingService = {
  async getBookings(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.propertyId) params.append('propertyId', filters.propertyId);
      if (filters.guestEmail) params.append('guestEmail', filters.guestEmail);
      if (filters.checkIn) params.append('checkIn', filters.checkIn);
      if (filters.checkOut) params.append('checkOut', filters.checkOut);
      if (filters.search) params.append('search', filters.search);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch bookings');
    }
  },

  async getRecentBookings(limit = 5) {
    try {
      const response = await api.get(`/bookings/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch recent bookings');
    }
  },

  async getBookingById(id) {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch booking');
    }
  },

  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create booking');
    }
  },

  async updateBooking(id, bookingData) {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update booking');
    }
  },

  async updateBookingStatus(id, status) {
    try {
      const response = await api.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update booking status');
    }
  },

  async deleteBooking(id) {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete booking');
    }
  }
};
