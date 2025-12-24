import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Hotel,
  Bed,
  AttachMoney,
  BookOnline,
  LocalOffer,
  People,
  Group,
  Assessment,
} from '@mui/icons-material';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
  },
  {
    text: 'Properties',
    icon: <Hotel />,
    path: '/properties',
  },
  {
    text: 'Rooms',
    icon: <Bed />,
    path: '/rooms',
  },
  {
    text: 'Pricing',
    icon: <AttachMoney />,
    path: '/pricing',
  },
  {
    text: 'Bookings',
    icon: <BookOnline />,
    path: '/bookings',
  },
  {
    text: 'Coupons',
    icon: <LocalOffer />,
    path: '/coupons',
  },
  {
    text: 'Users',
    icon: <People />,
    path: '/users',
  },
  {
    text: 'Staff',
    icon: <Group />,
    path: '/staff',
  },
  {
    text: 'Reports',
    icon: <Assessment />,
    path: '/reports',
  },
];

const Sidebar = ({ drawerWidth, mobileOpen, onDrawerToggle, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onDrawerToggle();
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Hotel color="primary" />
          <Typography variant="h6" noWrap component="div" color="primary">
            BWAdmin
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path ||
                          (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'white' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
