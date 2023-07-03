import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from '../../components/PostList/PostList';
import ReplayModal from '../../components/ReplayModal/ReplayModal';
import { clearPosts, getBookmarks, tweetedPost } from '../../features/slices/homeSlice';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const post = useSelector((state) => state.home.post);
  const postsList = [...post].reverse();
  useEffect(() => {
    dispatch(tweetedPost(''));
    dispatch(getBookmarks()).then(() => setIsLoading(false));

    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <>
      <Container
        maxWidth="sm"
        sx={isLoading ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : { margin: '0' }}
      >
        <Typography sx={isLoading ? { display: 'none' } : { marginTop: '10px', fontWeight: 'bold', fontSize: '42px' }}>
          Bookmarks
        </Typography>
        {isLoading && <CircularProgress />}
        {!isLoading && <PostList isBookmarkPage={true} incomingPost={postsList} />}
        <ReplayModal />
      </Container>
    </>
  );
};

export default Bookmarks;
