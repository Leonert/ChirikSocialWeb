import React from 'react';

import PostList from '../../../components/PostList/PostList';

const ProfilePostList = ({ posts, author }) => {
  return <div>{posts && <PostList incomingPost={posts} author={author} />}</div>;
};

export default ProfilePostList;
