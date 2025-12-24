import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './layouts/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Properties from './pages/properties/Properties';
import PropertyForm from './pages/properties/PropertyForm';
import Rooms from './pages/rooms/Rooms';
import RoomForm from './pages/rooms/RoomForm';
import Pricing from './pages/pricing/Pricing';
import Bookings from './pages/bookings/Bookings';
import BookingDetails from './pages/bookings/BookingDetails';
import Coupons from './pages/coupons/Coupons';
import CouponForm from './pages/coupons/CouponForm';
import Users from './pages/users/Users';
import Staff from './pages/staff/Staff';
import Reports from './pages/reports/Reports';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Property Management */}
            <Route path="properties" element={<Properties />} />
            <Route path="properties/new" element={<PropertyForm />} />
            <Route path="properties/edit/:id" element={<PropertyForm />} />

            {/* Room Management */}
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/new" element={<RoomForm />} />
            <Route path="rooms/edit/:id" element={<RoomForm />} />

            {/* Pricing Management */}
            <Route path="pricing" element={<Pricing />} />

            {/* Booking Control */}
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingDetails />} />

            {/* Coupons & Offers */}
            <Route path="coupons" element={<Coupons />} />
            <Route path="coupons/new" element={<CouponForm />} />
            <Route path="coupons/edit/:id" element={<CouponForm />} />

            {/* User & Staff Management */}
            <Route path="users" element={<Users />} />
            <Route path="staff" element={<Staff />} />

            {/* Reports */}
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
