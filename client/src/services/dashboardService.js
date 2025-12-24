import api from './api';

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard data');
    }
  },

  async getStats() {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  },

  async getChartData() {
    try {
      const response = await api.get('/dashboard/charts');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch chart data');
    }
  },

  async getPropertyPerformance() {
    try {
      const response = await api.get('/dashboard/property-performance');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch property performance');
    }
  },

  async getRecentActivity() {
    try {
      const response = await api.get('/dashboard/recent-activity');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch recent activity');
    }
  }
};
