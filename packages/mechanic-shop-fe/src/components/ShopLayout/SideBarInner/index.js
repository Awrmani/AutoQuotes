import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  PrecisionManufacturing,
  Mail,
  Phone,
  LocationOn,
  AccountCircle,
  Inventory,
  SupportAgent,
  CalendarMonth,
  Settings,
  ManageAccounts,
  Assessment,
} from '@mui/icons-material';

const sideBarProps = {
  user: {
    label: 'Username',
    icon: <AccountCircle />,
    admin: false,
  },
  categories: [
    {
      label: 'Inventories',
      icon: <Inventory />,
      link: '/inventory',
    },
    {
      label: 'Services',
      icon: <SupportAgent />,
      link: '/service',
    },
    {
      label: 'Appointments',
      icon: <CalendarMonth />,
      link: '/appointment',
    },
  ],
  adminCategories: [
    {
      label: 'Configuration',
      icon: <Settings />,
      link: '/configuration',
    },
    {
      label: 'User Management',
      icon: <ManageAccounts />,
      link: '/userManagement',
    },
    {
      label: 'Report',
      icon: <Assessment />,
      link: '/report',
    },
  ],
};

const SideBarInner = () => {
  return (
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
        <IconButton color="inherit" edge="start">
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
            <ListItemButton LinkComponent="a" href={item.link}>
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
                <ListItemButton href={sideBarProps.user.link}>
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
};

export default SideBarInner;
