import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';
import Button from '../UI/Button';

const InitialStep = (props) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        maxWidth: '364px',
        padding: '0 32px 38px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Typography sx={{ fontSize: '36px', marginTop: '10px', marginBottom: '20px', textAlign: 'center' }}>
        Join Chirik now!{' '}
      </Typography>

      <Link to="https://chirikfp3-079978c808c1.herokuapp.com/oauth2/authorization/google">
        <Button startIcon={<FcGoogle size={20} />} sx={{ maxWidth: '300px', width: '100%', marginBottom: '12px' }}>
          <Typography sx={{ fontSize: '14px' }}> Register with Google </Typography>
        </Button>
      </Link>

      <Divider sx={{ '&::after, &::before': { color: 'white' }, marginBottom: '12px' }}>or</Divider>
      <Button onClick={props.onCreateAccount} sx={{ maxWidth: '300px', width: '100%', marginBottom: '30px' }}>
        <Typography sx={{ fontSize: '14px' }}> Registration </Typography>
      </Button>

      <Typography sx={{ fontSize: '14px', color: 'gray', marginRight: '6px' }}>
        Already have an account?{' '}
        <Typography
          component="span"
          onClick={() => {
            props.handleClose();
            dispatch(handleLoginModal(true));
            dispatch(handleModal(true));
          }}
          sx={{
            ml: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'rgb(63, 81, 181)',
            '&:hover': {
              color: 'rgb(48, 63, 159)',
              textDecoration: 'underline',
            },
          }}
        >
          Log in
        </Typography>
      </Typography>
    </Box>
  );
};

export default InitialStep;
