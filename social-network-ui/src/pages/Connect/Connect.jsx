import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Connect = () => {
  return (
    <Box>
      <Stack direction="row" p="6px 0" alignItems="center">
        <NavLink
          style={{
            textDecoration: 'none',
            color: 'inherit',
            zIndex: 2,
            margin: '4px 26px 0 20px',
          }}
          to="/"
        >
          <ArrowBackIcon />
        </NavLink>
        <Typography component="h2" fontSize="18px">
          Connect
        </Typography>
      </Stack>
    </Box>
  );
};

export default Connect;
