import { Box, Typography } from '@mui/material';
import React from 'react';

import useNotFoundStyles from './NotFoundStyles';

const NotFound = () => {
  const classes = useNotFoundStyles();

  return (
    <Box textAlign="center">
      <Typography variant="h2" className={classes.title}>
        Not Found
      </Typography>
      <Typography variant="h5">The page you were looking for does not exist</Typography>
    </Box>
  );
};

export default NotFound;
