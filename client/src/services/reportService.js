import api from './api';

export const reportService = {
  async getBookingReports(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.propertyId) params.append('propertyId', filters.propertyId);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/reports/bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch booking reports');
    }
  },

  async getRevenueReports(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.propertyId) params.append('propertyId', filters.propertyId);

      const response = await api.get(`/reports/revenue?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch revenue reports');
    }
  },

  async getPropertyReports() {
    try {
      const response = await api.get('/reports/properties');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch property reports');
    }
  }
};
