import { Grid } from '@mui/material';

import { Followers } from '../../components/AllFollowings/Followers/Followers';

export const FollowersPage = () => {
  return (
    <Grid sx={{ backgroundColor: 'rgb(21, 32, 43)' }} container spacing={2}>
      <Grid item xs={12} md={7}>
        <Followers />
      </Grid>
    </Grid>
  );
};
