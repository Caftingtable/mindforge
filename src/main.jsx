import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './Routes.jsx';
import Authentication from './Components/Authentication.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <RouterProvider router={router} />
      </Authentication>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppRoot />
  // </React.StrictMode>
);
