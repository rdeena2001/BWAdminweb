import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import {
  Search,
  Visibility,
  Block,
  CheckCircle,
  Person,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const Users = () => {
  const { showSuccess, showError } = useNotification();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setTimeout(() => {
      setUsers([
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
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleUserStatus = async (userId, newStatus) => {
    try {
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      showSuccess(`User ${newStatus} successfully`);
    } catch (error) {
      showError(`Failed to ${newStatus} user`);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'blocked':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Bookings</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2 }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.phone}
                      </Typography>
                    </TableCell>

                    <TableCell>{user.joinDate}</TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{user.totalBookings}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        bookings
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">${user.totalSpent}</Typography>
                    </TableCell>

                    <TableCell>{user.lastLogin}</TableCell>

                    <TableCell>
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>

                        {user.status === 'active' && (
                          <IconButton
                            size="small"
                            color="warning"
                            onClick={() => toggleUserStatus(user.id, 'blocked')}
                          >
                            <Block />
                          </IconButton>
                        )}

                        {user.status === 'blocked' && (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => toggleUserStatus(user.id, 'active')}
                          >
                            <CheckCircle />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />

          {filteredUsers.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No users found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
