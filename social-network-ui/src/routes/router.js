import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';

import {MuiThemeProvider} from "@material-ui/core";
import { defaultTheme} from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Messages from "../pages/Messages/Messages";
import Home from "../pages/Home/Home";
import {HOME, SEARCH} from "../util/path-constants";

export const theme= (defaultTheme);
export const router = createBrowserRouter([
  {
    path: '/',
    element:
        <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Layout />
        </MuiThemeProvider>,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: HOME,
        element:
          <Home />
      },
      {
          path: SEARCH,
          element:
           <Home />
      },
      {
          path: '/notifications',
          element:
              <Home />
      },
      {
          path: '/messages',
          element:
             <Messages />
      },
      {
          path: '/bookmarks',
          element:
              <Home />
      },
      {
          path: '/lists',
          element:
              <Home />
      },
      {
          path: '/profile',
          element:
              <Home />
      },
    ],
  },
]);
