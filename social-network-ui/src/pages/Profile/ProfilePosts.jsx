import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import ProfilePostList from './Posts/ProfilePostList';

const ProfilePosts = () => {
  const { data } = useRouteLoaderData('profile');

  const filteredPosts = data.withoutAuthorPosts.filter(
    (post) => post.originalPost === null || (post.text === null && post.image === null && post.originalPost)
  );

  return <ProfilePostList posts={filteredPosts} user={data} />;
};

export default ProfilePosts;
