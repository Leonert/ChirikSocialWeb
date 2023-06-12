import { Grid } from '@mui/material';
import React from 'react';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import SearchField from '../../components/SearchField/SearchField';
import TrendsSection from './TrendsSection';

const Explore = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <SearchField />
        <TrendsSection />
      </Grid>
      <Grid item xs={5}>
        <AsideRecommendFollows />
      </Grid>
    </Grid>
  );
};

export default Explore;
