import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ConfirmMail = () => {
  return (
    <Box
      sx={{
        maxWidth: '438px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 32 }}>We sent you a code</Typography>
      <Typography sx={{}}>You can confirm </Typography>
    </Box>
  );
};

export default ConfirmMail;
