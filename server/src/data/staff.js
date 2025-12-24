let staff = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@bwadmin.com',
    phone: '+1 (555) 111-1111',
    role: 'admin',
    department: 'Management',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20',
    isActive: true,
    avatar: null,
    permissions: ['all'],
    salary: 75000,
    address: {
      street: '100 Admin Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2024-01-20T16:30:00Z'
  },
  {
    id: 2,
    name: 'Manager Smith',
    email: 'manager@bwadmin.com',
    phone: '+1 (555) 222-2222',
    role: 'manager',
    department: 'Operations',
    joinDate: '2023-03-20',
    lastLogin: '2024-01-19',
    isActive: true,
    avatar: null,
    permissions: ['bookings', 'rooms', 'users', 'reports'],
    salary: 55000,
    address: {
      street: '200 Manager St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2023-03-20T09:00:00Z',
    updatedAt: '2024-01-19T14:15:00Z'
  },
  {
    id: 3,
    name: 'Reception Staff',
    email: 'reception@bwadmin.com',
    phone: '+1 (555) 333-3333',
    role: 'staff',
    department: 'Front Desk',
    joinDate: '2023-06-10',
    lastLogin: '2024-01-18',
    isActive: true,
    avatar: null,
    permissions: ['bookings', 'users'],
    salary: 35000,
    address: {
      street: '300 Reception Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    createdAt: '2023-06-10T10:00:00Z',
    updatedAt: '2024-01-18T12:45:00Z'
  },
  {
    id: 4,
    name: 'Housekeeping Lead',
    email: 'housekeeping@bwadmin.com',
    phone: '+1 (555) 444-4444',
    role: 'staff',
    department: 'Housekeeping',
    joinDate: '2023-04-25',
    lastLogin: '2024-01-17',
    isActive: false,
    avatar: null,
    permissions: ['rooms'],
    salary: 32000,
    address: {
      street: '400 Service Rd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    },
    createdAt: '2023-04-25T11:00:00Z',
    updatedAt: '2024-01-17T15:20:00Z'
  },
  {
    id: 5,
    name: 'Maintenance Tech',
    email: 'maintenance@bwadmin.com',
    phone: '+1 (555) 555-5555',
    role: 'staff',
    department: 'Maintenance',
    joinDate: '2023-08-15',
    lastLogin: '2024-01-16',
    isActive: true,
    avatar: null,
    permissions: ['rooms'],
    salary: 38000,
    address: {
      street: '500 Tech Lane',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    createdAt: '2023-08-15T07:00:00Z',
    updatedAt: '2024-01-16T13:10:00Z'
  }
];

let nextId = 6;

const getStaff = (filters = {}) => {
  let filteredStaff = [...staff];

  if (filters.role) {
    filteredStaff = filteredStaff.filter(member => member.role === filters.role);
  }

  if (filters.department) {
    filteredStaff = filteredStaff.filter(member => member.department === filters.department);
  }

  if (filters.isActive !== undefined) {
    filteredStaff = filteredStaff.filter(member => member.isActive === filters.isActive);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredStaff = filteredStaff.filter(member =>
      member.name.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm) ||
      member.department.toLowerCase().includes(searchTerm)
    );
  }

  return filteredStaff;
};

const getStaffById = (id) => staff.find(s => s.id === parseInt(id));

const getStaffByEmail = (email) => staff.find(s => s.email.toLowerCase() === email.toLowerCase());

const createStaff = (staffData) => {
  // Check if email already exists
  if (getStaffByEmail(staffData.email)) {
    throw new Error('Email already exists');
  }

  const newStaff = {
    id: nextId++,
    ...staffData,
    joinDate: new Date().toISOString().split('T')[0],
    lastLogin: null,
    permissions: getDefaultPermissions(staffData.role),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  staff.push(newStaff);
  return newStaff;
};

const updateStaff = (id, staffData) => {
  const index = staff.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;

  // Check if email already exists (excluding current staff)
  if (staffData.email) {
    const existingStaff = getStaffByEmail(staffData.email);
    if (existingStaff && existingStaff.id !== parseInt(id)) {
      throw new Error('Email already exists');
    }
  }

  // Update permissions if role changed
  if (staffData.role && staffData.role !== staff[index].role) {
    staffData.permissions = getDefaultPermissions(staffData.role);
  }

  staff[index] = {
    ...staff[index],
    ...staffData,
    updatedAt: new Date().toISOString()
  };
  return staff[index];
};

const deleteStaff = (id) => {
  const index = staff.findIndex(s => s.id === parseInt(id));
  if (index === -1) return false;

  // Don't allow deleting the main admin
  if (staff[index].role === 'admin' && staff[index].id === 1) {
    throw new Error('Cannot delete main admin account');
  }

  staff.splice(index, 1);
  return true;
};

const toggleStaffStatus = (id) => {
  const staffMember = getStaffById(id);
  if (!staffMember) return null;

  // Don't allow deactivating the main admin
  if (staffMember.role === 'admin' && staffMember.id === 1) {
    throw new Error('Cannot deactivate main admin account');
  }

  return updateStaff(id, { isActive: !staffMember.isActive });
};

const getDefaultPermissions = (role) => {
  switch (role) {
    case 'admin':
      return ['all'];
    case 'manager':
      return ['bookings', 'rooms', 'users', 'reports', 'coupons'];
    case 'staff':
      return ['bookings', 'users'];
    default:
      return [];
  }
};

// Get staff statistics
const getStaffStats = () => {
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.isActive).length;
  const inactiveStaff = staff.filter(s => !s.isActive).length;
  const adminCount = staff.filter(s => s.role === 'admin').length;
  const managerCount = staff.filter(s => s.role === 'manager').length;
  const staffCount = staff.filter(s => s.role === 'staff').length;

  return {
    totalStaff,
    activeStaff,
    inactiveStaff,
    roles: {
      admin: adminCount,
      manager: managerCount,
      staff: staffCount
    }
  };
};

// Get departments list
const getDepartments = () => {
  const departments = [...new Set(staff.map(s => s.department))];
  return departments.sort();
};

module.exports = {
  getStaff,
  getStaffById,
  getStaffByEmail,
  createStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
  getStaffStats,
  getDepartments
};
