import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import ProfilePostList from './Posts/ProfilePostList';

const ProfileReplies = () => {
  const { data } = useRouteLoaderData('profile');
  console.log(data, 'data');
  const filteredPosts = data.withoutAuthorPosts.filter(
    (post) => (post.text != null || post.image != null) && post.originalPost != null
  );

  return <ProfilePostList posts={filteredPosts} author={data} />;
};

export default ProfileReplies;
