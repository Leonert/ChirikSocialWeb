import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import AsideTrends from '../../components/AsideTrends/AsideTrends';
import ButtonShowMore from '../../components/ButtonShowMore/ButtonShowMore';
import Following from '../../components/Following/Following';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import ModalUser from '../../components/ModalUser/ModalUser';
import PostList from '../../components/PostList/PostList';
import SearchInput from '../../components/SearchInput/SearchInput';
import { GetPosts, clearPosts, getPost } from '../../features/slices/homeSlice';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const modalUserState = useSelector((state) => state.home.modalUser);

  const { user } = useSelector((state) => state.auth);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Grid container sx={{ margin: '0', paddingTop: '0' }}>
      <Grid item xs={12} md={7} sx={{ paddingTop: '0' }}>
        <HeaderMain />
        {user && <ButtonShowMore />}
        {recommendation && <PostList apiUrl="api/posts?" />}
        {following && <Following />}
        {modalUserState && <ModalUser />}
      </Grid>
      {matches && (
        <Grid item xs={5}>
          <Form action="/" method="post">
            <SearchInput />
          </Form>
          <AsideTrends />
          <AsideRecommendFollows />
        </Grid>
      )}
    </Grid>
  );
}

export default Home;
