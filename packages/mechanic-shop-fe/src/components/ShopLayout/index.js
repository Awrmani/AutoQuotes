import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const ShopLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default ShopLayout;
