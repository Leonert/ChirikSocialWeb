import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import EmailConfirmation from '../pages/EmailConfirmation/EmailConfirmation';
import Home from '../pages/Home/Home';
import { defaultTheme } from '../theme';
import Messages from "../pages/Messages/Messages";
import {HOME, MESSAGES} from "../util/path-constants";
import Home from "../pages/Home/Home";

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
        path: HOME,
        element: <Home />,
      },
      {
        path: MESSAGES,
        element: <Messages />,
      },

    ],
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
]);
