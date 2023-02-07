import { useState } from 'react';
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  AccountCircle,
  Menu,
  Inventory,
  Settings,
  CalendarMonth,
  SupportAgent,
  ManageAccounts,
  PrecisionManufacturing,
  Assessment,
  Mail,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const drawerWidth = 240;
const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sideBarProps = {
    user: {
      label: 'Username',
      icon: <AccountCircle />,
      role: '',
    },
    categories: [
      {
        label: 'Inventories',
        icon: <Inventory />,
      },
      {
        label: 'Services',
        icon: <SupportAgent />,
      },
      {
        label: 'Appointments',
        icon: <CalendarMonth />,
      },
    ],
    adminCategories: [
      {
        label: 'Configuration',
        icon: <Settings />,
      },
      {
        label: 'User Management',
        icon: <ManageAccounts />,
      },
      {
        label: 'Report',
        icon: <Assessment />,
      },
    ],
  };

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          minHeight: '64px',
          bgcolor: 'primary.main',
          display: 'flex',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
          <PrecisionManufacturing />
        </IconButton>

        <Typography variant="h6">Six Stars</Typography>
      </Toolbar>

      <Divider />
      <List>
        <ListItem key={sideBarProps.user.label} disablePadding>
          <ListItemButton>
            <ListItemIcon>{sideBarProps.user.icon}</ListItemIcon>
            <ListItemText primary={sideBarProps.user.label} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        {sideBarProps.categories.map(item => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {sideBarProps.user.admin ? (
        <Box>
          <Divider />
          <List>
            {sideBarProps.adminCategories.map(item => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      <Box
        position={'absolute'}
        sx={{
          paddingBottom: 2,
          bottom: 0,
        }}
      >
        <Divider />

        <Box
          sx={{
            paddingLeft: 2,
            minWidth: `${drawerWidth - 1}px`,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
            Need help?
          </Typography>
          <IconButton color="inherit" edge="start" disableRipple>
            <Mail sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0 }}
              href="mailto:autoquotes@gmail.com"
            >
              autoquotes@gmail.com
            </Typography>
          </IconButton>

          <IconButton color="inherit" edge="start" disableRipple>
            <Phone sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0 }}
              href="tel: +1 999.999.9999"
            >
              +1 999.999.9999
            </Typography>
          </IconButton>

          <IconButton color="inherit" edge="start" disableRipple>
            <LocationOn sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0, letterSpacing: 0 }}
              href="https://goo.gl/maps/iAG3PDidLF4zrCzy8"
            >
              A1750 Finch Avenue East Toronto, Ontario, Canada M2J 2X5
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% -${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none', md: 'none' },
        }}
      >
        <Toolbar sx={{ minHeight: '64px' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Six Stars
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default SideBar;
