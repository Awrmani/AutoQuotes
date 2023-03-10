import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Avatar,
} from '@mui/material';
import {
  Logout,
  Mail,
  Phone,
  LocationOn,
  AccountCircle,
  Inventory,
  SupportAgent,
  CalendarMonth,
  Settings,
  ManageAccounts,
  DirectionsCar,
} from '@mui/icons-material';
import { removeToken } from '@autoquotes/libraries/src/actions';
import {
  getCurrentUser,
  getShopSettings,
} from '../../../reducers/queriesReducer';
import paths from '../../../paths';

const SideBarInner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopSettings = useSelector(getShopSettings);
  const currentUser = useSelector(getCurrentUser);
  const { name, role, id } = currentUser ?? {};
  const { name: shopName, logo } = shopSettings;
  const sideBarProps = useMemo(
    () => ({
      user: {
        label: name,
        icon: <AccountCircle />,
        admin: false,
        path: paths.editUser({ id }),
      },
      categories: [
        {
          label: 'Vehicle types',
          icon: <DirectionsCar />,
          path: paths.vehicleTypeList(),
        },
        {
          label: 'Parts',
          icon: <Inventory />,
          path: paths.partList(),
        },
        {
          label: 'Services',
          icon: <SupportAgent />,
          path: paths.serviceList(),
        },
        {
          label: 'Appointments',
          icon: <CalendarMonth />,
          path: paths.appointmentList(),
        },
        {
          label: 'Settings',
          icon: <Settings />,
          path: paths.shopSettings(),
          adminOnly: true,
        },
        {
          label: 'User Management',
          icon: <ManageAccounts />,
          path: paths.userList(),
          adminOnly: true,
        },
      ],
    }),
    [name, id]
  );

  const onLogout = useCallback(() => {
    dispatch(removeToken());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Toolbar
          sx={{
            minHeight: '64px',
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => navigate(paths.dashboard())}
        >
          <Avatar
            variant="square"
            alt={shopName}
            src={logo}
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              width: 32,
              height: 32,
            }}
          />

          <Typography variant="h6">{shopName}</Typography>
        </Toolbar>

        <Divider />
        <List>
          <ListItem key={sideBarProps.user.label} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(sideBarProps.user.path);
              }}
            >
              <ListItemIcon>{sideBarProps.user.icon}</ListItemIcon>
              <ListItemText primary={sideBarProps.user.label} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List>
          {sideBarProps.categories
            .filter(({ adminOnly }) => !adminOnly || role === 'admin')
            .map(({ path, label, icon, adminOnly }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    path && navigate(path);
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <List>
          <ListItem disablePadding onClick={onLogout}>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box>
        <Divider />
        <Box
          sx={{
            paddingLeft: 2,
          }}
        >
          <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              noWrap
              component={'span'}
              color="primary.main"
              variant="h6"
              sx={{ my: 0, textAlign: 'center', border: 1, px: 1 }}
            >
              {'Need help?'}
            </Typography>
          </Box>
          <IconButton color="inherit" edge="start" disableRipple>
            <Mail sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0 }}
              href="mailto:autoquotes@gmail.com"
              fontSize="small"
              color="primary"
            >
              autoquotes@gmail.com
            </Typography>
          </IconButton>

          <IconButton color="inherit" edge="start" disableRipple>
            <Phone sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0 }}
              href="tel:+12345678910"
              fontSize="small"
              color="primary"
            >
              +1 (234) 457 8910
            </Typography>
          </IconButton>

          <IconButton color="inherit" edge="start" disableRipple>
            <LocationOn sx={{ mr: 1 }} />
            <Typography
              component={'a'}
              sx={{ m: 0, letterSpacing: 0 }}
              href="https://goo.gl/maps/iAG3PDidLF4zrCzy8"
              fontSize="small"
              color="primary"
              align="left"
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
