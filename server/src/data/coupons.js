let coupons = [
  {
    id: 1,
    code: 'SUMMER20',
    name: 'Summer Special',
    description: '20% off on all bookings during summer season',
    type: 'percentage',
    value: 20,
    minAmount: 100,
    maxDiscount: 50,
    expiryDate: '2024-08-31',
    usageLimit: 100,
    usedCount: 45,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    code: 'WELCOME50',
    name: 'Welcome Offer',
    description: '$50 off for new customers on their first booking',
    type: 'fixed',
    value: 50,
    minAmount: 200,
    maxDiscount: 50,
    expiryDate: '2024-12-31',
    usageLimit: 500,
    usedCount: 123,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-18T14:20:00Z'
  },
  {
    id: 3,
    code: 'WEEKEND15',
    name: 'Weekend Deal',
    description: '15% off on weekend stays (Friday to Sunday)',
    type: 'percentage',
    value: 15,
    minAmount: 150,
    maxDiscount: 75,
    expiryDate: '2024-06-30',
    usageLimit: 200,
    usedCount: 89,
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  },
  {
    id: 4,
    code: 'HOLIDAY25',
    name: 'Holiday Special',
    description: '25% off on bookings during holiday season',
    type: 'percentage',
    value: 25,
    minAmount: 300,
    maxDiscount: 100,
    expiryDate: '2024-12-25',
    usageLimit: 150,
    usedCount: 67,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  }
];

let nextId = 5;

const getCoupons = (filters = {}) => {
  let filteredCoupons = [...coupons];

  if (filters.isActive !== undefined) {
    filteredCoupons = filteredCoupons.filter(coupon => coupon.isActive === filters.isActive);
  }

  if (filters.type) {
    filteredCoupons = filteredCoupons.filter(coupon => coupon.type === filters.type);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredCoupons = filteredCoupons.filter(coupon =>
      coupon.code.toLowerCase().includes(searchTerm) ||
      coupon.name.toLowerCase().includes(searchTerm)
    );
  }

  return filteredCoupons;
};

const getCouponById = (id) => coupons.find(c => c.id === parseInt(id));

const getCouponByCode = (code) => coupons.find(c => c.code.toLowerCase() === code.toLowerCase());

const createCoupon = (couponData) => {
  // Check if code already exists
  if (getCouponByCode(couponData.code)) {
    throw new Error('Coupon code already exists');
  }

  const newCoupon = {
    id: nextId++,
    ...couponData,
    code: couponData.code.toUpperCase(),
    usedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  coupons.push(newCoupon);
  return newCoupon;
};

const updateCoupon = (id, couponData) => {
  const index = coupons.findIndex(c => c.id === parseInt(id));
  if (index === -1) return null;

  // Check if code already exists (excluding current coupon)
  if (couponData.code) {
    const existingCoupon = getCouponByCode(couponData.code);
    if (existingCoupon && existingCoupon.id !== parseInt(id)) {
      throw new Error('Coupon code already exists');
    }
    couponData.code = couponData.code.toUpperCase();
  }

  coupons[index] = {
    ...coupons[index],
    ...couponData,
    updatedAt: new Date().toISOString()
  };
  return coupons[index];
};

const deleteCoupon = (id) => {
  const index = coupons.findIndex(c => c.id === parseInt(id));
  if (index === -1) return false;

  coupons.splice(index, 1);
  return true;
};

const toggleCouponStatus = (id) => {
  const coupon = getCouponById(id);
  if (!coupon) return null;

  return updateCoupon(id, { isActive: !coupon.isActive });
};

const validateCoupon = (code, orderAmount) => {
  const coupon = getCouponByCode(code);

  if (!coupon) {
    return { valid: false, message: 'Coupon not found' };
  }

  if (!coupon.isActive) {
    return { valid: false, message: 'Coupon is not active' };
  }

  if (new Date(coupon.expiryDate) < new Date()) {
    return { valid: false, message: 'Coupon has expired' };
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: 'Coupon usage limit reached' };
  }

  if (orderAmount < coupon.minAmount) {
    return { valid: false, message: `Minimum order amount is $${coupon.minAmount}` };
  }

  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = (orderAmount * coupon.value) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.value;
  }

  return {
    valid: true,
    coupon,
    discount,
    finalAmount: orderAmount - discount
  };
};

module.exports = {
  getCoupons,
  getCouponById,
  getCouponByCode,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  validateCoupon
};
