import { useState } from 'react';
import { Drawer } from '@mui/material';
import SideBarInner from '../SideBarInner';
import { DRAWER_WIDTH } from '../../../constants/layout';

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Drawer
      data-testid="drawer"
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: DRAWER_WIDTH,
        },
      }}
    >
      <SideBarInner
        drawerWidth={DRAWER_WIDTH}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Drawer>
  );
};

export default SideBar;
