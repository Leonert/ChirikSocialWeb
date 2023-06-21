import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';


import axiosIns from '../../axiosInstance';
import PostList from '../../components/PostList/PostList';
import ReplayModal from '../../components/ReplayModal/ReplayModal';
import { clearPosts, getBookmarks } from '../../features/slices/homeSlice';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const post = useSelector((state) => state.home.post);
  console.log(post);
  useEffect(() => {
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
        {!isLoading && <PostList isBookmarkPage={true} incomingPost={post} />}
        <ReplayModal />
      </Container>
    </>
  );
};

export default Bookmarks;
