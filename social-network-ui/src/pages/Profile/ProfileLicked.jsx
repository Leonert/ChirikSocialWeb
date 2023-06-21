import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import PostList from '../../components/PostList/PostList';

export const ProfileLicked = () => {
  const [posts, setPosts] = useState([]);
  const { data } = useRouteLoaderData('profile');

  const fetchPosts = async () => {
    try {
      const response = await axiosIns.get(`/api/users/p/${data.username}/liked`);
      const lick = response.data;

      if (response.status === 204) {
        setPosts([]);
      } else {
        setPosts(lick);
      }
    } catch (e) {
      return { Error: e };
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchPosts();
  }, []);

  return <PostList incomingPost={posts} lickedProfile={true} />;
};
