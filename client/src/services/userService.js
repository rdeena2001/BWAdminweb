import api from './api';

export const userService = {
  async getUsers(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      if (filters.joinDateFrom) params.append('joinDateFrom', filters.joinDateFrom);
      if (filters.joinDateTo) params.append('joinDateTo', filters.joinDateTo);

      const response = await api.get(`/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  async getUserStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user stats');
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  },

  async createUser(userData) {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create user');
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  },

  async updateUserStatus(id, status) {
    try {
      const response = await api.patch(`/users/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user status');
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  }
};
