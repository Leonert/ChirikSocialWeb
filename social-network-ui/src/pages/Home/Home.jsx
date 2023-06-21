import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetPosts(0)).then((result) => {
      if (GetPosts.fulfilled.match(result)) {
        dispatch(getPost(result.payload));
      }
    });

    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <HeaderMain />
        {user && <ButtonShowMore />}
        {recommendation && <PostList />}
        {following && <Following />}
        {modalUserState && <ModalUser />}
      </Grid>
      <Grid item xs={5}>
        <Form action="/" method="post">
          <SearchInput />
        </Form>
        <AsideTrends />
        <AsideRecommendFollows />
      </Grid>
    </Grid>
  );
}

export default Home;
