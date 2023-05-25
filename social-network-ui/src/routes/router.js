import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../layout/Layout';
import Bookmarks from '../pages/Bookmarks/Bookmarks';
import EmailConfirmation from '../pages/EmailConfirmation/EmailConfirmation';
import { FollowersPage } from '../pages/FollowersPage/FollowersPage';
import { FollowingPage } from '../pages/FollowingPage/FollowingPage';
import Home from '../pages/Home/Home';
import Messages from '../pages/Messages/Messages';
import { Notifications } from '../pages/Notifications/Notifications';
import PostPage from '../pages/PostPage/PostPage';
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
        element: <Notifications />,
      },
      {
        path: '/messages',

        element: <Messages />,
      },
      {
        path: '/bookmarks',
        element: <Bookmarks />,
      },
      {
        path: '/lists',
        element: <div></div>,
      },
      { path: ':id', element: <PostPage /> },
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
      {
        path: '/:username/following',
        element: <FollowingPage />,
      },
      {
        path: '/:username/followers',
        element: <FollowersPage />,
      },
    ],
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmation />,
  },
]);
