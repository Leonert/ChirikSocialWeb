import { Grid, Typography } from '@mui/material';
import React from 'react';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import SearchField from '../../components/SearchField/SearchField';

const Explore = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <SearchField />
        <Typography>Trends for you</Typography>
      </Grid>
      <Grid item xs={5}>
        <AsideRecommendFollows />
      </Grid>
    </Grid>
  );
};

export default Explore;
