import React from 'react';


import PostList from '../../../components/PostList/PostList';

const ProfilePostList = ({ posts }) => {
  return <div>{posts && <PostList incomingPost={posts} />}</div>;
};

export default ProfilePostList;
