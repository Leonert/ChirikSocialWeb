import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeStatusFollowing, changeStatusRecommendation } from '../../features/slices/homeSlice';
import { useHeaderMenuStyles } from './HeaderMainStyles';

export default function HeaderMain() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const dispatch = useDispatch();
  const classes = useHeaderMenuStyles();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={classes.wrapper}>
      <Grid className={classes.container} container >
        <Grid item xs={12} sm={12} md={12}>
          <h2 style={{ paddingLeft: '20px', margin: '0 0 20px 0 ' }}>Home</h2>
        </Grid>
        <Grid item xs={6}>
          {user && (
            <Button className={classes.buttonHeader} onClick={() => dispatch(changeStatusRecommendation())}>
              For you
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          {user && (
            <Button className={classes.buttonHeader} onClick={() => dispatch(changeStatusFollowing())}>
              Following
            </Button>
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridWrapper}>
          {user && recommendation && (
            <Box
              sx={{
                width: 70,
                height: 3,
                backgroundColor: 'primary.dark',
              }}
            />
          )}
        </Grid>
        <Grid item xs={6} className={classes.gridWrapper}>
          {user && following && (
            <Box
              sx={{
                width: 85,
                height: 3,
                backgroundColor: 'primary.dark',
              }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
