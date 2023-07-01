import { Container, Grid } from '@material-ui/core';
import { Box, useMediaQuery } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import SockJsClient from 'react-stomp';

import { BottomLine } from '../components/BottomLine/BottomLine';
import { CustomModalWindow } from '../components/CustomModalWindow/CustomModalWindow';
import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar';
import SideMenu from '../components/SideMenu/SideMenu';
import MobileMenu from '../components/SideMenu/SideMenuMobile';
import { loginUserWithJwt } from '../features/slices/authSlice';
import { addNotification } from '../features/slices/userDatas/notificationsSlice';
import { SOCKET_URL, TOKEN } from '../util/constants';
import { createNotifications, notify } from '../util/notificationsMessage/notificationsMessage';
import { useLayoutStyles } from './LayoutStyles';

export const Layout = () => {
  const classes = useLayoutStyles();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const username = useSelector((state) => state.auth.user?.username || '');

  const onSocketChange = (notification) => {
    dispatch(addNotification(notification));

    const notif = createNotifications(notification);

    notify(notif.message);
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      dispatch(loginUserWithJwt());
    }
  }, []);

  return (
    <>
      <Container className={classes.wrapper} maxWidth="lg">
        {matches && (
          <Box sx={{ minWidth: { xs: 86, lg: 256 } }} className={classes.sideMenuWrapper}>
            <SideMenu />
          </Box>
        )}
        {!matches && <MobileMenu />}
        <Grid container>
          <ScrollRestoration
            getKey={(location) => {
              return location.pathname === '/' ? location.pathname : location.key;
            }}
          />
          <Outlet />
          <CustomModalWindow />
        </Grid>
      </Container>
      <CustomSnackbar />
      {!user && <BottomLine />}
      <SockJsClient url={SOCKET_URL} topics={[`/user/${username}/queue/notification`]} onMessage={onSocketChange} />
      <Toaster position="bottom-left" />
    </>
  );
};
