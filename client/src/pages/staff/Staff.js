import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Block,
  CheckCircle,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const Staff = () => {
  const { showSuccess, showError } = useNotification();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, staff: null });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    department: '',
    isActive: true,
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setTimeout(() => {
      setStaff([
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
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingStaff) {
        setStaff(staff.map(s =>
          s.id === editingStaff.id ? { ...s, ...formData } : s
        ));
        showSuccess('Staff member updated successfully');
      } else {
        const newStaff = {
          id: Date.now(),
          ...formData,
          joinDate: new Date().toISOString().split('T')[0],
          lastLogin: 'Never',
        };
        setStaff([...staff, newStaff]);
        showSuccess('Staff member added successfully');
      }

      handleCloseDialog();
    } catch (error) {
      showError('Failed to save staff member');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      department: staffMember.department,
      isActive: staffMember.isActive,
    });
    setDialogOpen(true);
  };

  const handleDelete = (staffMember) => {
    setDeleteDialog({ open: true, staff: staffMember });
  };

  const confirmDelete = async () => {
    try {
      setStaff(staff.filter(s => s.id !== deleteDialog.staff.id));
      showSuccess('Staff member deleted successfully');
      setDeleteDialog({ open: false, staff: null });
    } catch (error) {
      showError('Failed to delete staff member');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      department: '',
      isActive: true,
    });
  };

  const toggleStaffStatus = (staffId) => {
    setStaff(staff.map(s =>
      s.id === staffId ? { ...s, isActive: !s.isActive } : s
    ));
    showSuccess('Staff status updated');
  };

  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch =
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === '' || staffMember.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'warning';
      case 'staff':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading && staff.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Staff Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
        >
          Add Staff Member
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              placeholder="Search staff..."
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
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role"
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
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
                  <TableCell>Staff Member</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.map((staffMember) => (
                  <TableRow key={staffMember.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2 }}>
                          {staffMember.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{staffMember.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {staffMember.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{staffMember.email}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {staffMember.phone}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={staffMember.role}
                        color={getRoleColor(staffMember.role)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>

                    <TableCell>{staffMember.department}</TableCell>
                    <TableCell>{staffMember.joinDate}</TableCell>
                    <TableCell>{staffMember.lastLogin}</TableCell>

                    <TableCell>
                      <Chip
                        label={staffMember.isActive ? 'Active' : 'Inactive'}
                        color={staffMember.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(staffMember)}
                        >
                          <Edit />
                        </IconButton>

                        <IconButton
                          size="small"
                          color={staffMember.isActive ? 'warning' : 'success'}
                          onClick={() => toggleStaffStatus(staffMember.id)}
                        >
                          {staffMember.isActive ? <Block /> : <CheckCircle />}
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(staffMember)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredStaff.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No staff members found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : (editingStaff ? 'Update' : 'Add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, staff: null })}
      >
        <DialogTitle>Delete Staff Member</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deleteDialog.staff?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, staff: null })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Staff;
