let properties = [
  {
    id: 1,
    name: 'Ocean View Resort',
    description: 'Luxury beachfront resort with stunning ocean views and world-class amenities.',
    type: 'Resort',
    address: '123 Ocean Drive',
    city: 'Miami Beach',
    state: 'FL',
    zipCode: '33139',
    country: 'USA',
    phone: '+1 (305) 555-0123',
    email: 'info@oceanviewresort.com',
    website: 'https://oceanviewresort.com',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Gym', 'Bar'],
    status: 'active',
    rating: 4.8,
    totalRooms: 45,
    images: [],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 2,
    name: 'Mountain Lodge',
    description: 'Cozy mountain retreat perfect for winter getaways and outdoor adventures.',
    type: 'Lodge',
    address: '456 Mountain Trail',
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    country: 'USA',
    phone: '+1 (970) 555-0456',
    email: 'info@mountainlodge.com',
    website: 'https://mountainlodge.com',
    amenities: ['WiFi', 'Fireplace', 'Ski Access', 'Restaurant', 'Spa', 'Hot Tub'],
    status: 'active',
    rating: 4.6,
    totalRooms: 28,
    images: [],
    createdAt: '2023-02-20T09:00:00Z',
    updatedAt: '2024-01-18T12:45:00Z'
  },
  {
    id: 3,
    name: 'City Hotel',
    description: 'Modern hotel in the heart of Manhattan with business facilities.',
    type: 'Hotel',
    address: '789 Broadway',
    city: 'New York',
    state: 'NY',
    zipCode: '10003',
    country: 'USA',
    phone: '+1 (212) 555-0789',
    email: 'info@cityhotel.com',
    website: 'https://cityhotel.com',
    amenities: ['WiFi', 'Gym', 'Business Center', 'Restaurant', 'Concierge', 'Laundry'],
    status: 'active',
    rating: 4.4,
    totalRooms: 120,
    images: [],
    createdAt: '2023-03-10T14:00:00Z',
    updatedAt: '2024-01-19T16:20:00Z'
  },
  {
    id: 4,
    name: 'Beach Resort',
    description: 'Exclusive beachfront resort with private beach and luxury amenities.',
    type: 'Resort',
    address: '321 Pacific Coast Highway',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    country: 'USA',
    phone: '+1 (310) 555-0321',
    email: 'info@beachresort.com',
    website: 'https://beachresort.com',
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant', 'Water Sports'],
    status: 'maintenance',
    rating: 4.9,
    totalRooms: 85,
    images: [],
    createdAt: '2023-04-05T11:00:00Z',
    updatedAt: '2024-01-15T09:10:00Z'
  }
];

let nextId = 5;

const getProperties = () => properties;

const getPropertyById = (id) => properties.find(p => p.id === parseInt(id));

const createProperty = (propertyData) => {
  const newProperty = {
    id: nextId++,
    ...propertyData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  properties.push(newProperty);
  return newProperty;
};

const updateProperty = (id, propertyData) => {
  const index = properties.findIndex(p => p.id === parseInt(id));
  if (index === -1) return null;

  properties[index] = {
    ...properties[index],
    ...propertyData,
    updatedAt: new Date().toISOString()
  };
  return properties[index];
};

const deleteProperty = (id) => {
  const index = properties.findIndex(p => p.id === parseInt(id));
  if (index === -1) return false;

  properties.splice(index, 1);
  return true;
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
