import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import SockJsClient from 'react-stomp';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import AsideTrends from '../../components/AsideTrends/AsideTrends';
import Following from '../../components/Following/Following';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import ModalUser from '../../components/ModalUser/ModalUser';
import PostList from '../../components/PostList/PostList';
import SearchInput from '../../components/SearchInput/SearchInput';
import { tweetedPost } from '../../features/slices/homeSlice';
import { SOCKET_URL } from '../../util/constants';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const modalUserState = useSelector((state) => state.home.modalUser);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const onSocketChanged = (post) => {
    dispatch(tweetedPost(post));
  };

  return (
    <Grid container sx={{ margin: '0', paddingTop: '0' }}>
      <Grid item xs={12} md={7} sx={{ paddingTop: '0' }}>
        <HeaderMain />
        <SockJsClient url={SOCKET_URL} topics={['/topic/posts']} onMessage={onSocketChanged} />
        {recommendation && <PostList apiUrl="api/posts?" />}
        {following && <Following />}
        {modalUserState && <ModalUser />}
      </Grid>
      {matches && (
        <Grid item xs={5} sx={{ padding: '0 20px' }}>
          <Form action="/" method="post">
            <SearchInput />
          </Form>
          <AsideTrends />
          {user && <AsideRecommendFollows />}
        </Grid>
      )}
    </Grid>
  );
}

export default Home;
