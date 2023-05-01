import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import SideMenu from '../components/SideMenu/SideMenu';
import { Layout } from '../layout/Layout';
import EmailConfirmation from '../pages/EmailConfirmation/EmailConfirmation';
import { defaultTheme } from '../theme';

export const theme = defaultTheme;
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/home',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/search',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/notifications',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/messages',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/bookmarks',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/lists',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/profile',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SideMenu />
          </MuiThemeProvider>
        ),
      },
      {
        path: '/email-confirmation',
        element: (
          <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <EmailConfirmation />
          </MuiThemeProvider>
        ),
      },
    ],
  },
]);
