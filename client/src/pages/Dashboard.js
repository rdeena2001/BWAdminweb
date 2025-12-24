import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  Hotel,
  People,
  AttachMoney,
  Visibility,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="h2">
            {value}
          </Typography>
          {trend && (
            <Box display="flex" alignItems="center" mt={1}>
              <TrendingUp color="success" fontSize="small" />
              <Typography variant="body2" color="success.main" ml={0.5}>
                +{trend}% from last month
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}.light`,
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { sx: { color: `${color}.main` } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalBookings: 1247,
      totalRevenue: 89650,
      totalProperties: 24,
      activeUsers: 892,
    },
    recentBookings: [],
    chartData: {
      bookings: [],
      revenue: [],
    },
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        stats: {
          totalBookings: 1247,
          totalRevenue: 89650,
          totalProperties: 24,
          activeUsers: 892,
        },
        recentBookings: [
          {
            id: 1,
            guestName: 'John Doe',
            property: 'Ocean View Resort',
            checkIn: '2024-01-15',
            checkOut: '2024-01-18',
            amount: 1200,
            status: 'confirmed',
          },
          {
            id: 2,
            guestName: 'Jane Smith',
            property: 'Mountain Lodge',
            checkIn: '2024-01-16',
            checkOut: '2024-01-20',
            amount: 800,
            status: 'pending',
          },
          {
            id: 3,
            guestName: 'Mike Johnson',
            property: 'City Hotel',
            checkIn: '2024-01-17',
            checkOut: '2024-01-19',
            amount: 600,
            status: 'confirmed',
          },
          {
            id: 4,
            guestName: 'Sarah Wilson',
            property: 'Beach Resort',
            checkIn: '2024-01-18',
            checkOut: '2024-01-22',
            amount: 1500,
            status: 'cancelled',
          },
          {
            id: 5,
            guestName: 'Tom Brown',
            property: 'Spa Resort',
            checkIn: '2024-01-19',
            checkOut: '2024-01-21',
            amount: 900,
            status: 'confirmed',
          },
        ],
        chartData: {
          bookings: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Bookings',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
              },
            ],
          },
          revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Revenue ($)',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
              },
            ],
          },
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
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
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bookings"
            value={dashboardData.stats.totalBookings.toLocaleString()}
            icon={<Hotel />}
            color="primary"
            trend={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="success"
            trend={8}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Properties"
            value={dashboardData.stats.totalProperties}
            icon={<Hotel />}
            color="info"
            trend={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={dashboardData.stats.activeUsers.toLocaleString()}
            icon={<People />}
            color="warning"
            trend={15}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings Over Time
              </Typography>
              <Line
                data={dashboardData.chartData.bookings}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Over Time
              </Typography>
              <Bar
                data={dashboardData.chartData.revenue}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Bookings */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Bookings
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest Name</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.property}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell>${booking.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
