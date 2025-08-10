import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { routes } from '@/routes';
import { Root } from '@/root';
import { ScrollRestoration } from '@/components/core/scroll-restoration';

import store from './stores';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Root>
        <ScrollRestoration />
        <Outlet />
        
      </Root>
    ),
    children: [...routes],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
