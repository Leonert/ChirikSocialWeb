import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import EmailConfirmation from '../pages/EmailConfirmation/EmailConfirmation';
import Home from '../pages/Home/Home';
import Messages from '../pages/Messages/Messages';

export const router = createBrowserRouter([
  {
    path: '/',

    element: <Layout />,
    errorElement: <div>Error page</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/search',
        element: <div></div>,
      },
      {
        path: '/notifications',
        element: <div></div>,
      },
      {
        path: '/messages',

        element: <Messages />,
      },
      {
        path: '/bookmarks',
        element: <div></div>,
      },
      {
        path: '/lists',
        element: <div></div>,
      },
      {
        path: '/profile',
        element: <div></div>,
      },
    ],
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmation />,
  },
]);
