import { Grid } from '@mui/material';

import { Followers } from '../../components/AllFollowings/Followers/Followers';

export const FollowersPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Followers />
      </Grid>
    </Grid>
  );
};
