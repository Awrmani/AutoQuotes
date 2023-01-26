import React from 'react';
import { Outlet } from 'react-router-dom';

const ShopLayout = () => {
  return (
    <div>
      This is a Layout component, it wraps all logged in screens
      <Outlet />
    </div>
  );
};

export default ShopLayout;
