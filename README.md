# BWAdmin - Resort/Hotel Booking Platform Admin Panel

A comprehensive React.js admin web application for managing resort and hotel bookings, built with Material-UI and modern web technologies.

## 🚀 Features

### Core Admin Features
- **Dashboard** - Overview with statistics, charts, and recent bookings
- **Property Management** - Add, edit, delete properties with amenities and images
- **Room Management** - Manage rooms per property with pricing and availability
- **Pricing Management** - Seasonal, date-based, and weekend pricing rules
- **Booking Control** - View, approve, cancel bookings with detailed information
- **Coupons & Offers** - Create and manage discount coupons
- **User Management** - Manage customer accounts and status
- **Staff Management** - Role-based staff access control
- **Reports & Analytics** - Booking and revenue reports with charts

### Technical Features
- **Authentication** - JWT-based login with protected routes
- **Responsive Design** - Desktop-first with mobile compatibility
- **Modern UI** - Material-UI components with clean design
- **Charts & Graphs** - Chart.js integration for data visualization
- **Search & Filtering** - Advanced filtering across all modules
- **Pagination** - Efficient data handling for large datasets
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Smooth UX with loading indicators

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18.2.0
- **Language**: JavaScript (ES6+)
- **UI Library**: Material-UI (MUI) 5.15.1
- **Routing**: React Router DOM 6.20.1
- **HTTP Client**: Axios 1.6.2
- **Charts**: Chart.js 4.4.0 + React-Chartjs-2 5.2.0
- **Date Handling**: Day.js 1.11.10
- **Icons**: Material-UI Icons
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/
│   └── common/
│       └── ProtectedRoute.js
├── contexts/
│   ├── AuthContext.js
│   └── NotificationContext.js
├── layouts/
│   ├── Layout.js
│   ├── Header.js
│   └── Sidebar.js
├── pages/
│   ├── auth/
│   │   └── Login.js
│   ├── bookings/
│   │   ├── Bookings.js
│   │   └── BookingDetails.js
│   ├── coupons/
│   │   ├── Coupons.js
│   │   └── CouponForm.js
│   ├── pricing/
│   │   └── Pricing.js
│   ├── properties/
│   │   ├── Properties.js
│   │   └── PropertyForm.js
│   ├── reports/
│   │   └── Reports.js
│   ├── rooms/
│   │   ├── Rooms.js
│   │   └── RoomForm.js
│   ├── staff/
│   │   └── Staff.js
│   ├── users/
│   │   └── Users.js
│   └── Dashboard.js
├── services/
│   ├── api.js
│   └── authService.js
├── App.js
└── index.js
```

## 🚦 Getting Started

### Prerequisites
- Node.js 20.19.6 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BWAdmin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials
- **Admin**: admin@bwadmin.com / admin123
- **Manager**: manager@bwadmin.com / manager123

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### API Integration
The application is currently configured with mock data. To integrate with a real backend:

1. Update the API base URL in `src/services/api.js`
2. Replace mock functions in service files with actual API calls
3. Update authentication flow in `src/services/authService.js`

## 📱 Features Overview

### Dashboard
- Real-time statistics (bookings, revenue, properties, users)
- Interactive charts showing trends over time
- Recent bookings table with quick actions
- Responsive card-based layout

### Property Management
- Complete CRUD operations for properties
- Image upload interface (UI ready)
- Amenities selection with chips
- Location and contact information management
- Status management (active/maintenance/inactive)

### Room Management
- Room listing with property filtering
- Detailed room information (capacity, beds, price)
- Availability toggle switches
- Room amenities management
- Real-time status updates

### Booking System
- Comprehensive booking overview
- Advanced filtering (status, date, property)
- Booking approval/cancellation workflow
- Detailed booking information pages
- Payment status tracking

### User & Staff Management
- Role-based access control
- User status management (active/blocked)
- Staff member CRUD operations
- Department and role assignment
- Activity tracking

### Reports & Analytics
- Booking and revenue reports
- Date range filtering
- Interactive charts and graphs
- Export functionality (UI ready)
- Property-wise performance metrics

## 🎨 UI/UX Features

- **Consistent Design**: Material Design principles
- **Responsive Layout**: Works on all screen sizes
- **Dark/Light Theme**: Built-in theme support
- **Loading States**: Smooth user experience
- **Error Handling**: Comprehensive error messages
- **Toast Notifications**: Real-time feedback
- **Search & Filter**: Advanced data filtering
- **Pagination**: Efficient data display

## 🔒 Security Features

- JWT-based authentication
- Protected routes
- Role-based access control
- Secure API communication
- Input validation
- XSS protection

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure environment variables
4. Set up redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**BWAdmin** - Professional Resort & Hotel Management Solution
