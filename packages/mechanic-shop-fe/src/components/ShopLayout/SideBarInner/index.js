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
} from '@mui/material';
import {
  PrecisionManufacturing,
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
  Assessment,
} from '@mui/icons-material';
import { removeToken } from '@autoquotes/libraries/src/actions';
import { getCurrentUser } from '../../../reducers/queriesReducer';
import paths from '../../../paths';

const SideBarInner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUser);
  const { name, role } = currentUser ?? {};

  const sideBarProps = useMemo(
    () => ({
      user: {
        label: name,
        icon: <AccountCircle />,
        admin: false,
      },
      categories: [
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
          path: paths.userList(),
        },
        {
          label: 'Report',
          icon: <Assessment />,
        },
      ],
    }),
    [name]
  );

  const onLogout = useCallback(() => {
    dispatch(removeToken());
  }, [dispatch]);

  return (
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
        <PrecisionManufacturing sx={{ mr: 1 }} />

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
        {sideBarProps.categories.map(({ path, label, icon }) => (
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

      {role === 'admin' ? (
        <Box>
          <Divider />
          <List>
            {sideBarProps.adminCategories.map(({ label, path, icon }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  href={sideBarProps.user.path}
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
        </Box>
      ) : null}

      <Box
        position={'absolute'}
        sx={{
          paddingBottom: 2,
          bottom: 0,
        }}
      >
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

        <Divider />
        <Box
          sx={{
            paddingLeft: 2,
          }}
        >
          <Typography variant="h5" sx={{ my: 1, textAlign: 'center' }}>
            Need help?
          </Typography>
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
