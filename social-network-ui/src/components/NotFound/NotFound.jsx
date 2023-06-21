import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const NotFound = () => {
  return (
    <Box textAlign="center">
      <Title variant="h2">Not Found</Title>
      <Typography variant="h5">The page you were looking for does not exist</Typography>
    </Box>
  );
};

export default NotFound;
