let rooms = [
  {
    id: 1,
    number: '101',
    name: 'Ocean View Suite',
    type: 'Suite',
    propertyId: 1,
    capacity: 4,
    beds: 2,
    price: 299,
    size: '450 sq ft',
    floor: '1',
    description: 'Spacious suite with panoramic ocean views and modern amenities.',
    amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi', 'Air Conditioning', 'Safe'],
    status: 'available',
    images: [],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 2,
    number: '102',
    name: 'Deluxe Room',
    type: 'Deluxe',
    propertyId: 1,
    capacity: 2,
    beds: 1,
    price: 199,
    size: '300 sq ft',
    floor: '1',
    description: 'Comfortable deluxe room with modern amenities and city view.',
    amenities: ['City View', 'WiFi', 'Mini Fridge', 'Air Conditioning', 'TV'],
    status: 'occupied',
    images: [],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-19T14:20:00Z'
  },
  {
    id: 3,
    number: '201',
    name: 'Mountain View Room',
    type: 'Standard',
    propertyId: 2,
    capacity: 2,
    beds: 1,
    price: 149,
    size: '250 sq ft',
    floor: '2',
    description: 'Cozy room with stunning mountain views and rustic charm.',
    amenities: ['Mountain View', 'Fireplace', 'WiFi', 'Heating', 'Coffee Maker'],
    status: 'maintenance',
    images: [],
    createdAt: '2023-02-20T09:00:00Z',
    updatedAt: '2024-01-18T11:15:00Z'
  },
  {
    id: 4,
    number: '301',
    name: 'Executive Suite',
    type: 'Executive',
    propertyId: 3,
    capacity: 6,
    beds: 3,
    price: 399,
    size: '600 sq ft',
    floor: '3',
    description: 'Premium executive suite perfect for business travelers.',
    amenities: ['City View', 'Work Desk', 'Mini Bar', 'WiFi', 'Kitchenette', 'Meeting Area'],
    status: 'available',
    images: [],
    createdAt: '2023-03-10T14:00:00Z',
    updatedAt: '2024-01-17T16:45:00Z'
  },
  {
    id: 5,
    number: '105',
    name: 'Beach Suite',
    type: 'Suite',
    propertyId: 4,
    capacity: 4,
    beds: 2,
    price: 450,
    size: '500 sq ft',
    floor: '1',
    description: 'Luxurious beachfront suite with direct beach access.',
    amenities: ['Beach View', 'Balcony', 'Jacuzzi', 'Mini Bar', 'WiFi', 'Room Service'],
    status: 'available',
    images: [],
    createdAt: '2023-04-05T11:00:00Z',
    updatedAt: '2024-01-16T13:30:00Z'
  }
];

let nextId = 6;

const getRooms = (filters = {}) => {
  let filteredRooms = [...rooms];

  if (filters.propertyId) {
    filteredRooms = filteredRooms.filter(room => room.propertyId === parseInt(filters.propertyId));
  }

  if (filters.status) {
    filteredRooms = filteredRooms.filter(room => room.status === filters.status);
  }

  if (filters.type) {
    filteredRooms = filteredRooms.filter(room => room.type === filters.type);
  }

  return filteredRooms;
};

const getRoomById = (id) => rooms.find(r => r.id === parseInt(id));

const createRoom = (roomData) => {
  const newRoom = {
    id: nextId++,
    ...roomData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  rooms.push(newRoom);
  return newRoom;
};

const updateRoom = (id, roomData) => {
  const index = rooms.findIndex(r => r.id === parseInt(id));
  if (index === -1) return null;

  rooms[index] = {
    ...rooms[index],
    ...roomData,
    updatedAt: new Date().toISOString()
  };
  return rooms[index];
};

const deleteRoom = (id) => {
  const index = rooms.findIndex(r => r.id === parseInt(id));
  if (index === -1) return false;

  rooms.splice(index, 1);
  return true;
};

const updateRoomStatus = (id, status) => {
  const room = getRoomById(id);
  if (!room) return null;

  return updateRoom(id, { status });
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatus
};
