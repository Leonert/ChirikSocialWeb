import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import ProfilePostList from './Posts/ProfilePostList';

const ProfilePosts = () => {
  const { data } = useRouteLoaderData('profile');

  const filteredPosts = data.withoutAuthorPosts.filter(
    (post) => post.originalPost === null || (post.text === null && post.image === null && post.originalPost)
  );
  const posts = [...filteredPosts].reverse();

  return <ProfilePostList posts={posts} author={data} />;
};

export default ProfilePosts;
