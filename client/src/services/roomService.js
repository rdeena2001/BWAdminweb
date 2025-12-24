import api from './api';

export const roomService = {
  async getRooms(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.propertyId) params.append('propertyId', filters.propertyId);
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/rooms?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch rooms');
    }
  },

  async getRoomById(id) {
    try {
      const response = await api.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch room');
    }
  },

  async createRoom(roomData) {
    try {
      const response = await api.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create room');
    }
  },

  async updateRoom(id, roomData) {
    try {
      const response = await api.put(`/rooms/${id}`, roomData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update room');
    }
  },

  async updateRoomStatus(id, status) {
    try {
      const response = await api.patch(`/rooms/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update room status');
    }
  },

  async deleteRoom(id) {
    try {
      const response = await api.delete(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete room');
    }
  }
};
