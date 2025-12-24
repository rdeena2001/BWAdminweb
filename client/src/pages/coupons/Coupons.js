import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  LocalOffer,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';

const Coupons = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, coupon: null });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setTimeout(() => {
      setCoupons([
        {
          id: 1,
          code: 'SUMMER20',
          name: 'Summer Special',
          description: '20% off on all bookings',
          type: 'percentage',
          value: 20,
          minAmount: 100,
          maxDiscount: 50,
          expiryDate: '2024-08-31',
          usageLimit: 100,
          usedCount: 45,
          isActive: true,
        },
        {
          id: 2,
          code: 'WELCOME50',
          name: 'Welcome Offer',
          description: '$50 off for new customers',
          type: 'fixed',
          value: 50,
          minAmount: 200,
          maxDiscount: 50,
          expiryDate: '2024-12-31',
          usageLimit: 500,
          usedCount: 123,
          isActive: true,
        },
        {
          id: 3,
          code: 'WEEKEND15',
          name: 'Weekend Deal',
          description: '15% off weekend stays',
          type: 'percentage',
          value: 15,
          minAmount: 150,
          maxDiscount: 75,
          expiryDate: '2024-06-30',
          usageLimit: 200,
          usedCount: 89,
          isActive: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (id) => {
    navigate(`/coupons/edit/${id}`);
  };

  const handleDelete = (coupon) => {
    setDeleteDialog({ open: true, coupon });
  };

  const confirmDelete = async () => {
    try {
      setCoupons(coupons.filter(c => c.id !== deleteDialog.coupon.id));
      showSuccess('Coupon deleted successfully');
      setDeleteDialog({ open: false, coupon: null });
    } catch (error) {
      showError('Failed to delete coupon');
    }
  };

  const toggleCouponStatus = async (couponId) => {
    try {
      setCoupons(coupons.map(coupon =>
        coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
      ));
      showSuccess('Coupon status updated');
    } catch (error) {
      showError('Failed to update coupon status');
    }
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type) => {
    return type === 'percentage' ? 'primary' : 'secondary';
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Coupons & Offers</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/coupons/new')}
        >
          Add Coupon
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search coupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Usage</TableCell>
                  <TableCell>Expiry</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <LocalOffer sx={{ mr: 1, color: 'grey.500' }} />
                        <Typography variant="subtitle2" color="primary">
                          {coupon.code}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{coupon.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {coupon.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={coupon.type}
                        color={getTypeColor(coupon.type)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.round((coupon.usedCount / coupon.usageLimit) * 100)}% used
                      </Typography>
                    </TableCell>
                    <TableCell>{coupon.expiryDate}</TableCell>
                    <TableCell>
                      <Switch
                        checked={coupon.isActive}
                        onChange={() => toggleCouponStatus(coupon.id)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(coupon.id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(coupon)}
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

          {filteredCoupons.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No coupons found
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, coupon: null })}
      >
        <DialogTitle>Delete Coupon</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete coupon "{deleteDialog.coupon?.code}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, coupon: null })}>
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

export default Coupons;
