import api from './api';

// Mock data for development
const mockUsers = [
  {
    id: 1,
    email: 'admin@bwadmin.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: null
  },
  {
    id: 2,
    email: 'manager@bwadmin.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    avatar: null
  }
];

export const authService = {
  async login(email, password) {
    // Mock login - replace with real API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          const token = 'mock-jwt-token-' + Date.now();

          resolve({
            token,
            user: userWithoutPassword
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });

    // Real API call would be:
    // return api.post('/auth/login', { email, password });
  },

  async verifyToken(token) {
    // Mock token verification - replace with real API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && token.startsWith('mock-jwt-token-')) {
          resolve(mockUsers[0]);
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });

    // Real API call would be:
    // return api.get('/auth/verify');
  },

  async logout() {
    // Real API call would be:
    // return api.post('/auth/logout');
    return Promise.resolve();
  }
};
