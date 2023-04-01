import React, { Fragment, useCallback, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
} from '@mui/material';

import { Login } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@autoquotes/libraries/src/actions';
import {
  getCurrentUser,
  getShopSettings,
} from '../../../reducers/queriesReducer';
import paths from '../../../paths';

const EndUserAppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const { name: username } = currentUser ?? {};
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const shopDetails = useSelector(getShopSettings);
  const { name: shopName, logo } = shopDetails;

  const onLogout = useCallback(() => {
    dispatch(removeToken());
    handleCloseUserMenu();
  }, [dispatch]);

  const profileNavigate = useCallback(() => {
    navigate(paths.profile());
    handleCloseUserMenu();
  }, [navigate]);

  const quoteListNavigate = useCallback(() => {
    navigate(paths.userQuotes());
    handleCloseUserMenu();
  }, [navigate]);

  const pages = useMemo(() => {
    return [
      {
        title: 'Get New Quote',
        onclick: () => {
          navigate(paths.quotingPage({}));
        },
      },
      {
        title: 'Book Appointment',
        onclick: () => {
          navigate(paths.appointment());
        },
      },
      {
        title: 'About us',
        onclick: () => {
          navigate(paths.about());
        },
      },
    ];
  }, [navigate]);

  const UserSettings = useMemo(
    () => [
      {
        title: 'Profile',
        onclick: profileNavigate,
      },
      {
        title: 'Your quotes',
        onclick: quoteListNavigate,
      },
      {
        title: 'Logout',
        onclick: onLogout,
      },
    ],
    [onLogout, profileNavigate, quoteListNavigate]
  );

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            variant="square"
            alt={shopName}
            src={logo}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {shopName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(p => (
                <MenuItem key={p.title} onClick={p.onclick}>
                  <Typography textAlign="center">{p.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            variant="square"
            alt={shopName}
            src={logo}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {shopName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(p => (
              <Button
                key={p.title}
                onClick={p.onclick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {p.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {username ? (
              <Fragment>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={username} src="#" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {UserSettings.map(e => (
                    <MenuItem key={e.title} onClick={e.onclick}>
                      <Typography textAlign="center">{e.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Fragment>
            ) : (
              <Tooltip title="Login">
                <IconButton
                  onClick={() => {
                    navigate(paths.login());
                  }}
                  sx={{ p: 0 }}
                >
                  <Login
                    fontSize="large"
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      mr: 1,
                      color: 'white',
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default EndUserAppBar;
