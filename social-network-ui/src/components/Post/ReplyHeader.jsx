import RepeatIcon from '@mui/icons-material/Repeat';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { usePostStyle } from './PostStyle';

const ReplyHeader = (props) => {
  const classes = usePostStyle();

  return (
    <Box className={classes.replyHeader}>
      <RepeatIcon />
      <Typography className={classes.pageItem}>{props.repeat} Retweeted</Typography>
    </Box>
  );
};

export default ReplyHeader;
