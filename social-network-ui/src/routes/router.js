import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import SideMenu from '../components/SideMenu/SideMenu';
import { defaultTheme } from '../theme';
import Layout from './layout/Layout';

export const theme = defaultTheme;
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/home',
        element: <SideMenu />,
      },
      {
        path: '/search',
        element: <SideMenu />,
      },
      {
        path: '/notifications',
        element: <SideMenu />,
      },
      {
        path: '/messages',
        element: <SideMenu />,
      },
      {
        path: '/bookmarks',
        element: <SideMenu />,
      },
      {
        path: '/lists',
        element: <SideMenu />,
      },
      {
        path: '/profile',
        element: <SideMenu />,
      },
    ],
  },
]);
