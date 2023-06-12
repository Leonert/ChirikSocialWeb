import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)(({ theme }) => ({
  display: 'block',
  padding: '16px',
  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
}));

const AsideContainer = ({ header, children, asideActions, isSticky }) => {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: (theme) => theme.palette.background.lightDefault,
        position: isSticky ? 'sticky' : 'relative',
        top: 0,
        mb: '16px',
        mt: '16px',
      }}
    >
      <Typography sx={{ p: '12px 16px', fontSize: '26px', fontWeight: 700 }}>{header}</Typography>
      <Box>{children}</Box>
      <CustomLink to={asideActions}>Show more</CustomLink>
    </Box>
  );
};

export default AsideContainer;
