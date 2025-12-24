import api from './api';

export const couponService = {
  async getCoupons(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);
      if (filters.type) params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/coupons?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch coupons');
    }
  },

  async getCouponById(id) {
    try {
      const response = await api.get(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch coupon');
    }
  },

  async createCoupon(couponData) {
    try {
      const response = await api.post('/coupons', couponData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to create coupon');
    }
  },

  async updateCoupon(id, couponData) {
    try {
      const response = await api.put(`/coupons/${id}`, couponData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to update coupon');
    }
  },

  async toggleCouponStatus(id) {
    try {
      const response = await api.patch(`/coupons/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle coupon status');
    }
  },

  async validateCoupon(code, orderAmount) {
    try {
      const response = await api.post('/coupons/validate', { code, orderAmount });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to validate coupon');
    }
  },

  async deleteCoupon(id) {
    try {
      const response = await api.delete(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete coupon');
    }
  }
};
