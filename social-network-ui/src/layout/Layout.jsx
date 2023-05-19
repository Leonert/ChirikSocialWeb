import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { BottomLine } from '../components/BottomLine/BottomLine';
// import { CustomModalWindow } from '../components/CustomModalWindow/CustomModalWindow';
import { CustomModalWindow } from '../components/CustomModalWindow/CustomModalWindow';
import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar';
import SideMenu from '../components/SideMenu/SideMenu';
import { loginUser } from '../features/slices/authSlice';
import { useLayoutStyles } from './LayoutStyles';

export const Layout = () => {
  const classes = useLayoutStyles();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const authDatals = localStorage.getItem('authData');
    const authData = JSON.parse(authDatals);
    const token = localStorage.getItem('token');

    if (authData) {
      if (authData.email && authData.password && authData.rememberMe && token) {
        dispatch(loginUser({ email: authData.email, password: authData.password, rememberMe: authData.rememberMe }));
      }
    }
  }, []);

  return (
    <>
      <Container className={classes.wrapper} maxWidth="lg">
        <Grid sm={1} md={2} item style={{ minWidth: '256px' }}>
          <SideMenu />
        </Grid>
        <Grid container spacing={3}>
          <Outlet />
          <CustomModalWindow />
        </Grid>
      </Container>
      <CustomSnackbar />
      {!user && <BottomLine />}
    </>
  );
};
