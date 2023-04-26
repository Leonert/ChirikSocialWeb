import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getPost } from '../../../features/slices/homeSlice';
import ButtonShowMore from '../../ButtonShowMore/ButtonShowMore';
import Following from '../../Following/Following';
import HeaderMain from '../../HeaderMain/HeaderMain';
import PostList from '../../PostList/PostList';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);

  const dispatch = useDispatch();
  const fetchPost = () => {
    fetch('./data.json')
      .then((r) => r.json())
      .then((products) => {
        dispatch(getPost(products));
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []); 

  return (
    <Box
      sx={{
        width: '33%',
        backgroundColor: ' #1e2028',
        display: 'grid',
        marginLeft: '33%',
        paddingTop: '114px',
        paddingBottom: '20px',
      }}
    >
      <HeaderMain />
      <ButtonShowMore />
      {recommendation && <PostList />}
      {following && <Following />}
    </Box>
  );
}

export default Home;
