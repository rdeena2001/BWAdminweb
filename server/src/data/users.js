let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-05-15',
    totalBookings: 12,
    totalSpent: 4500,
    status: 'active',
    lastLogin: '2024-01-20',
    avatar: null,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    preferences: {
      newsletter: true,
      notifications: true,
      roomType: 'Suite'
    },
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2023-08-22',
    totalBookings: 8,
    totalSpent: 2800,
    status: 'active',
    lastLogin: '2024-01-19',
    avatar: null,
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    preferences: {
      newsletter: true,
      notifications: false,
      roomType: 'Deluxe'
    },
    createdAt: '2023-08-22T14:00:00Z',
    updatedAt: '2024-01-19T12:45:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2023-03-10',
    totalBookings: 15,
    totalSpent: 6200,
    status: 'inactive',
    lastLogin: '2023-12-15',
    avatar: null,
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    preferences: {
      newsletter: false,
      notifications: true,
      roomType: 'Standard'
    },
    createdAt: '2023-03-10T09:00:00Z',
    updatedAt: '2023-12-15T18:20:00Z'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2023-11-05',
    totalBookings: 3,
    totalSpent: 950,
    status: 'active',
    lastLogin: '2024-01-18',
    avatar: null,
    address: {
      street: '321 Elm St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    },
    preferences: {
      newsletter: true,
      notifications: true,
      roomType: 'Suite'
    },
    createdAt: '2023-11-05T16:00:00Z',
    updatedAt: '2024-01-18T11:15:00Z'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom.brown@email.com',
    phone: '+1 (555) 567-8901',
    joinDate: '2023-07-18',
    totalBookings: 20,
    totalSpent: 8900,
    status: 'blocked',
    lastLogin: '2024-01-10',
    avatar: null,
    address: {
      street: '654 Maple Ave',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    preferences: {
      newsletter: false,
      notifications: false,
      roomType: 'Executive'
    },
    createdAt: '2023-07-18T13:00:00Z',
    updatedAt: '2024-01-10T09:30:00Z'
  }
];

let nextId = 6;

const getUsers = (filters = {}) => {
  let filteredUsers = [...users];

  if (filters.status) {
    filteredUsers = filteredUsers.filter(user => user.status === filters.status);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.joinDateFrom) {
    filteredUsers = filteredUsers.filter(user => user.joinDate >= filters.joinDateFrom);
  }

  if (filters.joinDateTo) {
    filteredUsers = filteredUsers.filter(user => user.joinDate <= filters.joinDateTo);
  }

  return filteredUsers;
};

const getUserById = (id) => users.find(u => u.id === parseInt(id));

const getUserByEmail = (email) => users.find(u => u.email.toLowerCase() === email.toLowerCase());

const createUser = (userData) => {
  // Check if email already exists
  if (getUserByEmail(userData.email)) {
    throw new Error('Email already exists');
  }

  const newUser = {
    id: nextId++,
    ...userData,
    totalBookings: 0,
    totalSpent: 0,
    joinDate: new Date().toISOString().split('T')[0],
    lastLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) return null;

  // Check if email already exists (excluding current user)
  if (userData.email) {
    const existingUser = getUserByEmail(userData.email);
    if (existingUser && existingUser.id !== parseInt(id)) {
      throw new Error('Email already exists');
    }
  }

  users[index] = {
    ...users[index],
    ...userData,
    updatedAt: new Date().toISOString()
  };
  return users[index];
};

const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};

const updateUserStatus = (id, status) => {
  const user = getUserById(id);
  if (!user) return null;

  return updateUser(id, { status });
};

const updateUserStats = (id, bookingAmount) => {
  const user = getUserById(id);
  if (!user) return null;

  return updateUser(id, {
    totalBookings: user.totalBookings + 1,
    totalSpent: user.totalSpent + bookingAmount
  });
};

// Get user statistics for dashboard
const getUserStats = () => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;

  return {
    totalUsers,
    activeUsers,
    blockedUsers,
    inactiveUsers
  };
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateUserStats,
  getUserStats
};
