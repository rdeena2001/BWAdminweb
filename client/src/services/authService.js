import api from './api';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async verifyToken(token) {
    try {
      const response = await api.get('/auth/verify');
      return response.data.user;
    } catch (error) {
      throw new Error(error.message || 'Token verification failed');
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
      return Promise.resolve();
    } catch (error) {
      // Even if logout fails on server, we should clear local storage
      return Promise.resolve();
    }
  }
};
