import { Grid } from '@mui/material';
import React from 'react';
import { Form } from 'react-router-dom';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import SearchInput from '../../components/SearchInput/SearchInput';
import TrendsSection from './TrendsSection';

const Explore = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Form action="/" method="post">
          <SearchInput />
        </Form>
        <TrendsSection />
      </Grid>
      <Grid item xs={5}>
        <AsideRecommendFollows />
      </Grid>
    </Grid>
  );
};

export default Explore;
