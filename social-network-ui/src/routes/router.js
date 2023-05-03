import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';

import {MuiThemeProvider} from "@material-ui/core";
import { defaultTheme} from "../theme";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  },
]);
