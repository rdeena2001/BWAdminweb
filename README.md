# BWAdmin - Resort/Hotel Booking Platform (Full Stack)

A comprehensive full-stack application for managing resort and hotel bookings, featuring a React.js admin frontend and Node.js/Express backend API.

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

### Frontend (Client)
- **Framework**: React.js 18.2.0
- **Language**: JavaScript (ES6+)
- **UI Library**: Material-UI (MUI) 5.15.1
- **Routing**: React Router DOM 6.20.1
- **HTTP Client**: Axios 1.6.2
- **Charts**: Chart.js 4.4.0 + React-Chartjs-2 5.2.0
- **Date Handling**: Day.js 1.11.10
- **Icons**: Material-UI Icons
- **Build Tool**: Create React App

### Backend (Server)
- **Framework**: Node.js + Express.js 4.18.2
- **Language**: JavaScript (ES6+)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: Nodemon
- **Data Storage**: In-memory (JSON objects)

## 📁 Project Structure

```
BWAdmin/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   └── NotificationContext.js
│   │   ├── layouts/
│   │   │   ├── Layout.js
│   │   │   ├── Header.js
│   │   │   └── Sidebar.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── bookings/
│   │   │   ├── coupons/
│   │   │   ├── pricing/
│   │   │   ├── properties/
│   │   │   ├── reports/
│   │   │   ├── rooms/
│   │   │   ├── staff/
│   │   │   ├── users/
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── propertyService.js
│   │   │   ├── roomService.js
│   │   │   ├── bookingService.js
│   │   │   ├── couponService.js
│   │   │   ├── userService.js
│   │   │   ├── staffService.js
│   │   │   └── reportService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── data/
│   │   │   ├── properties.js
│   │   │   ├── rooms.js
│   │   │   ├── bookings.js
│   │   │   ├── coupons.js
│   │   │   ├── users.js
│   │   │   ├── staff.js
│   │   │   └── dashboard.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── dashboard.js
│   │   │   ├── properties.js
│   │   │   ├── rooms.js
│   │   │   ├── bookings.js
│   │   │   ├── coupons.js
│   │   │   ├── users.js
│   │   │   ├── staff.js
│   │   │   └── reports.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── package.json                     # Root package.json
├── README.md
└── .gitignore
```

## 🚦 Getting Started

### Prerequisites
- Node.js 20.19.6 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rdeena2001/BWAdminweb.git
   cd BWAdmin
   ```

2. **Install dependencies for both client and server**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

4. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5000`
   - **API Health Check**: `http://localhost:5000/health`

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
