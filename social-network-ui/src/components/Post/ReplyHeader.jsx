import RepeatIcon from '@mui/icons-material/Repeat';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import React from 'react';

import { usePostStyle } from './PostStyle';

const ReplyHeader = (props) => {
  const classes = usePostStyle();
  return (
    <Box className={classes.pageItem}>
      <RepeatIcon />
      <Typography className={classes.pageItem}>{props.repeat}</Typography>
    </Box>
  );
};

export default ReplyHeader;
