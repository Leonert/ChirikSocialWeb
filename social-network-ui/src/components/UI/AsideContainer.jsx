import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AsideContainer = ({ header, children, asideActions }) => {
  return (
    <Box>
      <Typography>{header}</Typography>
      <Box>{children}</Box>
      <Link to={asideActions}>Show more</Link>
    </Box>
  );
};

export default AsideContainer;
