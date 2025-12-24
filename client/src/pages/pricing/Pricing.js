import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
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
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  AttachMoney,
  DateRange,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNotification } from '../../contexts/NotificationContext';

const Pricing = () => {
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [pricingRules, setPricingRules] = useState([]);
  const [properties, setProperties] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, rule: null });

  const [formData, setFormData] = useState({
    name: '',
    propertyId: '',
    roomType: '',
    startDate: dayjs(),
    endDate: dayjs().add(1, 'month'),
    basePrice: 0,
    weekendMultiplier: 1.2,
    isWeekendPricing: false,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulate API calls
    setTimeout(() => {
      setProperties([
        { id: 1, name: 'Ocean View Resort' },
        { id: 2, name: 'Mountain Lodge' },
        { id: 3, name: 'City Hotel' },
        { id: 4, name: 'Beach Resort' },
      ]);

      setRoomTypes(['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential']);

      setPricingRules([
        {
          id: 1,
          name: 'Summer Season - Ocean View',
          propertyId: 1,
          propertyName: 'Ocean View Resort',
          roomType: 'Suite',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          basePrice: 350,
          weekendMultiplier: 1.3,
          isWeekendPricing: true,
          isActive: true,
          type: 'seasonal',
        },
        {
          id: 2,
          name: 'Winter Holidays - Mountain Lodge',
          propertyId: 2,
          propertyName: 'Mountain Lodge',
          roomType: 'Deluxe',
          startDate: '2024-12-20',
          endDate: '2025-01-05',
          basePrice: 280,
          weekendMultiplier: 1.5,
          isWeekendPricing: true,
          isActive: true,
          type: 'seasonal',
        },
        {
          id: 3,
          name: 'Business Week - City Hotel',
          propertyId: 3,
          propertyName: 'City Hotel',
          roomType: 'Executive',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          basePrice: 220,
          weekendMultiplier: 0.8,
          isWeekendPricing: true,
          isActive: true,
          type: 'yearly',
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

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const propertyName = properties.find(p => p.id === formData.propertyId)?.name || '';

      const newRule = {
        id: editingRule ? editingRule.id : Date.now(),
        ...formData,
        propertyName,
        startDate: formData.startDate.format('YYYY-MM-DD'),
        endDate: formData.endDate.format('YYYY-MM-DD'),
        type: 'custom',
      };

      if (editingRule) {
        setPricingRules(rules => rules.map(rule =>
          rule.id === editingRule.id ? newRule : rule
        ));
        showSuccess('Pricing rule updated successfully');
      } else {
        setPricingRules(rules => [...rules, newRule]);
        showSuccess('Pricing rule created successfully');
      }

      handleCloseDialog();
    } catch (error) {
      showError('Failed to save pricing rule');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      propertyId: rule.propertyId,
      roomType: rule.roomType,
      startDate: dayjs(rule.startDate),
      endDate: dayjs(rule.endDate),
      basePrice: rule.basePrice,
      weekendMultiplier: rule.weekendMultiplier,
      isWeekendPricing: rule.isWeekendPricing,
      isActive: rule.isActive,
    });
    setDialogOpen(true);
  };

  const handleDelete = (rule) => {
    setDeleteDialog({ open: true, rule });
  };

  const confirmDelete = async () => {
    try {
      setPricingRules(rules => rules.filter(r => r.id !== deleteDialog.rule.id));
      showSuccess('Pricing rule deleted successfully');
      setDeleteDialog({ open: false, rule: null });
    } catch (error) {
      showError('Failed to delete pricing rule');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRule(null);
    setFormData({
      name: '',
      propertyId: '',
      roomType: '',
      startDate: dayjs(),
      endDate: dayjs().add(1, 'month'),
      basePrice: 0,
      weekendMultiplier: 1.2,
      isWeekendPricing: false,
      isActive: true,
    });
  };

  const toggleRuleStatus = (ruleId) => {
    setPricingRules(rules => rules.map(rule =>
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    showSuccess('Pricing rule status updated');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'seasonal':
        return 'primary';
      case 'yearly':
        return 'success';
      case 'custom':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (loading && pricingRules.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Pricing Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            Add Pricing Rule
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Pricing Rules
            </Typography>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rule Name</TableCell>
                    <TableCell>Property</TableCell>
                    <TableCell>Room Type</TableCell>
                    <TableCell>Date Range</TableCell>
                    <TableCell>Base Price</TableCell>
                    <TableCell>Weekend Pricing</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pricingRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{rule.name}</Typography>
                      </TableCell>
                      <TableCell>{rule.propertyName}</TableCell>
                      <TableCell>{rule.roomType}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <DateRange fontSize="small" sx={{ mr: 0.5 }} />
                          {rule.startDate} to {rule.endDate}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <AttachMoney fontSize="small" />
                          {rule.basePrice}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {rule.isWeekendPricing ? (
                          <Chip
                            label={`${rule.weekendMultiplier}x`}
                            color="primary"
                            size="small"
                          />
                        ) : (
                          <Chip label="No" variant="outlined" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={rule.type}
                          color={getTypeColor(rule.type)}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.isActive}
                          onChange={() => toggleRuleStatus(rule.id)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(rule)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(rule)}
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

            {pricingRules.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography variant="h6" color="text.secondary">
                  No pricing rules found
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {editingRule ? 'Edit Pricing Rule' : 'Add New Pricing Rule'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Rule Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Property</InputLabel>
                    <Select
                      name="propertyId"
                      value={formData.propertyId}
                      onChange={handleChange}
                      label="Property"
                    >
                      {properties.map((property) => (
                        <MenuItem key={property.id} value={property.id}>
                          {property.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      label="Room Type"
                    >
                      {roomTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(value) => handleDateChange('startDate', value)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(value) => handleDateChange('endDate', value)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Base Price"
                    name="basePrice"
                    type="number"
                    value={formData.basePrice}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: <AttachMoney />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Weekend Multiplier"
                    name="weekendMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.weekendMultiplier}
                    onChange={handleChange}
                    disabled={!formData.isWeekendPricing}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isWeekendPricing}
                        onChange={handleChange}
                        name="isWeekendPricing"
                      />
                    }
                    label="Enable Weekend Pricing"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isActive}
                        onChange={handleChange}
                        name="isActive"
                      />
                    }
                    label="Active"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : (editingRule ? 'Update' : 'Create')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, rule: null })}
        >
          <DialogTitle>Delete Pricing Rule</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the pricing rule "{deleteDialog.rule?.name}"?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, rule: null })}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Pricing;
