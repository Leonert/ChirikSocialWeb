import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import EmailConfirmation from '../pages/EmailConfirmation/EmailConfirmation';
import Home from '../pages/Home/Home';
import Messages from '../pages/Messages/Messages';
import Profile from '../pages/Profile/Profile';
import profileLoader from '../pages/Profile/profileLoader';

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
        element: <Profile />,
        loader: profileLoader,
        children: [
          {
            index: true,
            element: <div>posts</div>,
          },
          {
            path: 'replies',
            element: <div>replies</div>,
          },
          {
            path: 'media',
            element: <div>media</div>,
          },
          {
            path: 'likes',
            element: <div>likes</div>,
          },
        ],
      },
    ],
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmation />,
  },
]);
