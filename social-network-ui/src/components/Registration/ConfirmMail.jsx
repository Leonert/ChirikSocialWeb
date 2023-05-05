import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ConfirmMail = ({ formik }) => {
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
    </Box>
  );
};

export default ConfirmMail;
