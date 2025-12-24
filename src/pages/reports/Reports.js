import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  TextField
} from '@mui/material';
import {
  GetApp,
  TrendingUp,
  Assessment,
  DateRange,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
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
import { useNotification } from '../../contexts/NotificationContext';

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

const Reports = () => {
  const { showSuccess } = useNotification();
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('bookings');
  const [dateRange, setDateRange] = useState({
    start: dayjs().subtract(30, 'days'),
    end: dayjs(),
  });
  const [reportData, setReportData] = useState({
    summary: {},
    chartData: {},
    tableData: [],
  });

  useEffect(() => {
    fetchReportData();
  }, [reportType, dateRange]);

  const fetchReportData = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (reportType === 'bookings') {
        setReportData({
          summary: {
            totalBookings: 156,
            confirmedBookings: 134,
            cancelledBookings: 22,
            pendingBookings: 8,
            averageBookingValue: 285,
          },
          chartData: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
              {
                label: 'Bookings',
                data: [45, 52, 38, 21],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
              },
            ],
          },
          tableData: [
            { property: 'Ocean View Resort', bookings: 45, revenue: 13500, avgValue: 300 },
            { property: 'Mountain Lodge', bookings: 38, revenue: 9500, avgValue: 250 },
            { property: 'City Hotel', bookings: 52, revenue: 10400, avgValue: 200 },
            { property: 'Beach Resort', bookings: 21, revenue: 8400, avgValue: 400 },
          ],
        });
      } else {
        setReportData({
          summary: {
            totalRevenue: 41800,
            averageRevenue: 1393,
            highestDay: 2100,
            lowestDay: 450,
            growthRate: 12.5,
          },
          chartData: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
              {
                label: 'Revenue ($)',
                data: [13500, 9500, 10400, 8400],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
              },
            ],
          },
          tableData: [
            { property: 'Ocean View Resort', revenue: 13500, percentage: 32.3, growth: 15.2 },
            { property: 'City Hotel', revenue: 10400, percentage: 24.9, growth: 8.7 },
            { property: 'Mountain Lodge', revenue: 9500, percentage: 22.7, growth: 12.1 },
            { property: 'Beach Resort', revenue: 8400, percentage: 20.1, growth: 18.5 },
          ],
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    showSuccess('Report exported successfully (UI only)');
  };

  const StatCard = ({ title, value, subtitle, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="h2">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
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

  if (loading) {
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
          <Typography variant="h4">Reports & Analytics</Typography>
          <Button
            variant="contained"
            startIcon={<GetApp />}
            onClick={handleExport}
          >
            Export Report
          </Button>
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    label="Report Type"
                  >
                    <MenuItem value="bookings">Booking Reports</MenuItem>
                    <MenuItem value="revenue">Revenue Reports</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={dateRange.start}
                  onChange={(value) => setDateRange(prev => ({ ...prev, start: value }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={dateRange.end}
                  onChange={(value) => setDateRange(prev => ({ ...prev, end: value }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={fetchReportData}
                  startIcon={<Assessment />}
                >
                  Generate Report
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {reportType === 'bookings' ? (
            <>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Total Bookings"
                  value={reportData.summary.totalBookings}
                  icon={<Assessment />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Confirmed"
                  value={reportData.summary.confirmedBookings}
                  icon={<TrendingUp />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Cancelled"
                  value={reportData.summary.cancelledBookings}
                  icon={<Assessment />}
                  color="error"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Pending"
                  value={reportData.summary.pendingBookings}
                  icon={<Assessment />}
                  color="warning"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Avg. Value"
                  value={`$${reportData.summary.averageBookingValue}`}
                  icon={<Assessment />}
                  color="info"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Total Revenue"
                  value={`$${reportData.summary.totalRevenue?.toLocaleString()}`}
                  icon={<Assessment />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Daily Average"
                  value={`$${reportData.summary.averageRevenue?.toLocaleString()}`}
                  icon={<TrendingUp />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Highest Day"
                  value={`$${reportData.summary.highestDay?.toLocaleString()}`}
                  icon={<Assessment />}
                  color="info"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Lowest Day"
                  value={`$${reportData.summary.lowestDay?.toLocaleString()}`}
                  icon={<Assessment />}
                  color="warning"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <StatCard
                  title="Growth Rate"
                  value={`${reportData.summary.growthRate}%`}
                  subtitle="vs last period"
                  icon={<TrendingUp />}
                  color="success"
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* Chart */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {reportType === 'bookings' ? 'Bookings Trend' : 'Revenue Trend'}
                </Typography>
                {reportType === 'bookings' ? (
                  <Line
                    data={reportData.chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                ) : (
                  <Bar
                    data={reportData.chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      },
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {reportType === 'bookings' ? 'Bookings by Property' : 'Revenue by Property'}
            </Typography>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    {reportType === 'bookings' ? (
                      <>
                        <TableCell>Bookings</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Avg. Value</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Percentage</TableCell>
                        <TableCell>Growth</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.property}</TableCell>
                      {reportType === 'bookings' ? (
                        <>
                          <TableCell>{row.bookings}</TableCell>
                          <TableCell>${row.revenue?.toLocaleString()}</TableCell>
                          <TableCell>${row.avgValue}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>${row.revenue?.toLocaleString()}</TableCell>
                          <TableCell>{row.percentage}%</TableCell>
                          <TableCell>
                            <Chip
                              label={`+${row.growth}%`}
                              color="success"
                              size="small"
                            />
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
