import Typography from '@mui/material/Typography';
import React from 'react';

import Button from '../UI/Button';
import { useButtonShowStyles } from './ButtonShowMoreStyle';

function ButtonShowMore(props) {
  const classes = useButtonShowStyles();
  

  return (
    <Button className={classes.buttonHeader}>
      <Typography className={classes.btnText}>Show {props.text} tweets</Typography>
    </Button>
  );
}

export default ButtonShowMore;
