import { Box, Container, Grid, Stack } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { BottomLine } from '../components/BottomLine/BottomLine';
import { CustomModalWindow } from '../components/CustomModalWindow/CustomModalWindow';
import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar';
import SideMenu from '../components/SideMenu/SideMenu';
import { loginUserWithJwt } from '../features/slices/authSlice';
import { TOKEN } from '../util/constants';
import { useLayoutStyles } from './LayoutStyles';

export const Layout = () => {
  const classes = useLayoutStyles();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      dispatch(loginUserWithJwt());
    }
  }, []);

  return (
    <>
      <Container className={classes.wrapper} maxWidth="lg">
        <Stack direction="row" container>
          <Box sx={{ minWidth: { xs: 86, lg: 256 } }} className={classes.sideMenuWrapper} item>
            <SideMenu />
          </Box>
          <Box flex="1">
            <Outlet />
          </Box>
          <ScrollRestoration
            getKey={(location) => {
              return location.pathname === '/' ? location.pathname : location.key;
            }}
          />
          <CustomModalWindow />
        </Stack>
      </Container>
      <CustomSnackbar />
      {!user && <BottomLine />}
    </>
  );
};
