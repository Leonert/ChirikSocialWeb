import { Button, Dialog } from '@material-ui/core';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleLogOutModal } from '../../features/slices/authModalSlice';
import { logoutUser } from '../../features/slices/authSlice';
import { Chirick } from '../../icon';
import { useLogOutStyle } from './LogOutModalStyle';

function LogOutModal() {
  const classes = useLogOutStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = useSelector((state) => state.authModal.modalLogOut);
  const onClose = () => {
    dispatch(handleLogOutModal(false));
  };
  const logOut = () => {
    dispatch(handleLogOutModal(false));
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Dialog className={classes.content} open={openModal} onClose={onClose} aria-labelledby="form-dialog-title">
      <Box className={classes.pageItem}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center !important',
            '& .MuiIconButton-root': {
              maxWidth: '65px',
              maxHeight: '65px',
              '& svg': {
                color: (theme) => theme.palette.primary.main,
                height: '100%',
                width: '100%',
              },
            },
          }}
        >
          <IconButton>{Chirick}</IconButton>
        </Box>
        <Typography className={classes.header} component="h2">
          Log out of Chirik?
        </Typography>
        <Typography className={classes.item}>
          You can always log back in at any time. If you just want to switch accounts, you can do that by adding an
          existing account.
        </Typography>
        <Button className={classes.button} onClick={logOut}>
          Log Out
        </Button>
        <Button className={classes.button} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default LogOutModal;
