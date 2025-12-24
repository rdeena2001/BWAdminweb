import api from './api';

export const propertyService = {
  async getProperties(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);

      const response = await api.get(`/properties?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch properties');
    }
  },

  async getPropertyById(id) {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch property');
    }
  },

  async createProperty(propertyData) {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create property');
    }
  },

  async updateProperty(id, propertyData) {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update property');
    }
  },

  async deleteProperty(id) {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete property');
    }
  }
};
