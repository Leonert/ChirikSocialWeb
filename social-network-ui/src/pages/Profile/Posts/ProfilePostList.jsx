import React from 'react';

import { usePostStyle } from '../../../components/Post/PostStyle';
import PostList from '../../../components/PostList/PostList';

const ProfilePostList = ({ posts }) => {
  return <div>{posts && <PostList incomingPost={posts} />}</div>;
};

export default ProfilePostList;
