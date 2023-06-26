import { Grid } from '@mui/material';

import { Following } from '../../components/AllFollowings/Following/Following';

export const FollowingPage = () => {
  return (
    <Grid sx={{ backgroundColor: 'rgb(21, 32, 43)' }} container spacing={2}>
      <Grid item xs={12} md={7}>
        <Following />
      </Grid>
    </Grid>
  );
};
