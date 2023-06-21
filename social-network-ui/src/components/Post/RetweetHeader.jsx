import RepeatIcon from '@mui/icons-material/Repeat';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PageItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 800 + ' !important',
  fontSize: 15 + ' !important',
}));

const ReplyHeader = (props) => {
  return (
    <Box sx={{ padding: '15px', display: 'flex', columnGap: '15px' }}>
      <RepeatIcon />
      <PageItem>{props.repeat} Retweeted</PageItem>
    </Box>
  );
};

export default ReplyHeader;
