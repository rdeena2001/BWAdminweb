import api from './api';

export const staffService = {
  async getStaff(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.role) params.append('role', filters.role);
      if (filters.department) params.append('department', filters.department);
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/staff?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch staff');
    }
  },

  async getStaffStats() {
    try {
      const response = await api.get('/staff/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch staff stats');
    }
  },

  async getDepartments() {
    try {
      const response = await api.get('/staff/departments');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch departments');
    }
  },

  async getStaffById(id) {
    try {
      const response = await api.get(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch staff member');
    }
  },

  async createStaff(staffData) {
    try {
      const response = await api.post('/staff', staffData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create staff member');
    }
  },

  async updateStaff(id, staffData) {
    try {
      const response = await api.put(`/staff/${id}`, staffData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update staff member');
    }
  },

  async toggleStaffStatus(id) {
    try {
      const response = await api.patch(`/staff/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle staff status');
    }
  },

  async deleteStaff(id) {
    try {
      const response = await api.delete(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete staff member');
    }
  }
};
