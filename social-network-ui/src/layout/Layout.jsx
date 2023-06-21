import { Box, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { BottomLine } from '../components/BottomLine/BottomLine';
import { CustomModalWindow } from '../components/CustomModalWindow/CustomModalWindow';
import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar';
import SideMenu from '../components/SideMenu/SideMenu';
import { loginUserWithJwt } from '../features/slices/authSlice';
import { TOKEN } from '../util/constants';

export const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const CustomContainer = styled(Container)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
  }));

  useLayoutEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      dispatch(loginUserWithJwt());
    }
  }, []);

  return (
    <>
      <CustomContainer maxWidth="lg">
        <Stack direction="row" container>
          <Box sx={{ minWidth: { xs: 86, lg: 256 } }} item>
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
      </CustomContainer>
      <CustomSnackbar />
      {!user && <BottomLine />}
    </>
  );
};
