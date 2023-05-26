import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import ProfilePostList from './Posts/ProfilePostList';

const ProfilePosts = () => {
  const { data } = useRouteLoaderData('profile');

  return <ProfilePostList posts={data.userPosts} user={data} />;
};

export default ProfilePosts;
