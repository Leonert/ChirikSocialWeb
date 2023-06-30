import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import ProfilePostList from './Posts/ProfilePostList';

const ProfileReplies = () => {
  const { data } = useRouteLoaderData('profile');

  const filteredPosts = data.withoutAuthorPosts.filter(
    (post) => (post.text != null || post.image != null) && post.originalPost != null
  );
  const posts = [...filteredPosts].reverse();

  return <ProfilePostList posts={posts} author={data} />;
};

export default ProfileReplies;
