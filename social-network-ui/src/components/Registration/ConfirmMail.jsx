import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';

const ConfirmMail = ({ formik, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        maxWidth: '438px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '20px', mt: '192px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 32, mr: '14px' }}>Email confirmation</Typography>
        <MailOutlineIcon fontSize="large" />
      </Box>
      <Typography sx={{ textAlign: 'center' }}>
        We have sent an email with a link on {formik.values.email} to confirm your registration.
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>
        After verifying your profile, you can{' '}
        <Link
          onClick={() => {
            handleClose();
            dispatch(handleLoginModal(true));
            dispatch(handleModal(true));
          }}
          sx={{ cursor: 'pointer' }}
        >
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default ConfirmMail;
