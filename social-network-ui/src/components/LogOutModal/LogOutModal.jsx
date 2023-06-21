import { Box, Button, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleLogOutModal } from '../../features/slices/authModalSlice';
import { logoutUser } from '../../features/slices/authSlice';
import { TweetIcon } from '../../icon';

const PREFIX = 'LogOutModal';
const classes = {
  pageItem: `${PREFIX}-pageItem`,
  iconImg: `${PREFIX}-iconImg`,
  button: `${PREFIX}-button`,
  header: `${PREFIX}-header`,
  item: `${PREFIX}-item`,
};

const DialogWrapper = styled(Dialog)(({ theme }) => ({
  Page: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
  },
  [`${classes.pageItem}`]: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 40px',
    margin: 0,
    maxWidth: 400,
    '& svg': {
      fill: theme.palette.primary.main,
      width: '40px',
      padding: '10px 0',
    },
  },

  [`${classes.iconImg}`]: {
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '2%',
  },
  [`${classes.button}`]: {
    height: '48px !important',
    padding: theme.spacing(3.2),
    marginTop: '10px !important',
    backgroundColor: `${theme.palette.primary.main} !important`,
    borderRadius: '30px !important',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
    '& .MuiButton-label': {
      fontSize: 16,
      color: theme.palette.text.primary,
    },
  },
  [`${classes.header}`]: {
    textAlign: 'center',
    paddingBottom: '20px',
    fontSize: ' 1.5rem !important',
  },
  [`${classes.item}`]: {
    paddingBottom: 10,
  },
}));

function LogOutModal() {
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
    <DialogWrapper className={classes.content} open={openModal} onClose={onClose} aria-labelledby="form-dialog-title">
      <Box className={classes.pageItem}>
        <div className={classes.logoIcon} style={{ display: 'flex', justifyContent: 'center' }}>
          {TweetIcon}
        </div>
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
    </DialogWrapper>
  );
}

export default LogOutModal;
