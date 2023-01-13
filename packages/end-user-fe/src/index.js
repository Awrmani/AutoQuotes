import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementsByTagName('react-root')[0]);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
