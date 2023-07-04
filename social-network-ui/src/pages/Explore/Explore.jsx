import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import SearchInput from '../../components/SearchInput/SearchInput';
import TrendsSection from './TrendsSection';

const Explore = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { user } = useSelector((state) => state.auth);

  return (
    <Grid container spacing={2}>
      <Grid item xs={matches ? 7 : 12} sx={{ mt: matchesSM ? '60px' : 0 }}>
        <Form action="/" method="post">
          <SearchInput />
        </Form>
        <TrendsSection />
      </Grid>
      {matches && user && (
        <Grid item xs={5}>
          <AsideRecommendFollows />
        </Grid>
      )}
    </Grid>
  );
};

export default Explore;
