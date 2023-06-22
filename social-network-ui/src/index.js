import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import './index.css';
import './reset.css';
import { router } from './routes/router';
import { defaultTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </ThemeProvider>

);
