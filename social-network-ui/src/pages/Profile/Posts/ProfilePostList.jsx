import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import axiosIns from '../../../axiosInstance';
import Post from '../../../components/Post/Post';
import { usePostStyle } from '../../../components/Post/PostStyle';
import ReplyHeader from '../../../components/Post/ReplyHeader';
import PostList from '../../../components/PostList/PostList';
import { getPostId, openReplayModal } from '../../../features/slices/homeSlice';

const ProfilePostList = ({ posts, user }) => {
  const classes = usePostStyle();

  return <div>{posts && <PostList incomingPost={posts} />}</div>;
};

export default ProfilePostList;
