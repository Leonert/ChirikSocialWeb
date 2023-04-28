import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getPostId } from '../../features/slices/homeSlice';
import Post from '../Post/Post';

export default function PostList() {
  const posts = useSelector((state) => state.home.post);
  const dispatch = useDispatch();
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            key={+post.id}
            avatar={post.avatar}
            name={post.nickname}
            retweet={post.retweet}
            like={post.like}
            view={post.view}
            replay={post.replay}
            content={post.post}
            data={post.data}
            image={post.img}
            handleClick={() => dispatch(getPostId(`${post.id}`))}
          />
        ))}
    </div>
  );
}
