import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import { Layout } from '../layout/Layout';
import { defaultTheme } from '../theme';

export const theme = defaultTheme;

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Layout />
      </MuiThemeProvider>
    ),
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
