import Typography from '@mui/material/Typography';
import React from 'react';

import Button from '../UI/Button';

function ButtonShowMore(props) {
  return (
    <Button
      sx={{
        backgroundColor: 'transparent',
        borderRadius: '0',
        border: '1px solid #faf5f5',
      }}
    >
      {' '}
      <Typography sx={{ mb: 1.5, paddingBottom: '0', margin: '0' }} color="#fff">
        Show {props.text} tweets
      </Typography>
    </Button>
  );
}

export default ButtonShowMore;
