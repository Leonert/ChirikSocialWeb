import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPostId, openReplayModal } from '../../features/slices/homeSlice';
import Post from '../Post/Post';

export default function PostList() {
  const posts = useSelector((state) => state.home.post);

  const dispatch = useDispatch();
  const handleRetweet = (props) => {
    dispatch(openReplayModal(props));
    alert(`past ${props}  add to Retweet`);
  };
  const handleReplay = (props) => {
    dispatch(openReplayModal(props));
  };
  const handelLike = (props) => {
    dispatch(openReplayModal(props));
    alert(`past ${props}  add to like`);
  };

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
            handleClickLike={() => handelLike(`${post.id}`)}
            handleClickReplay={() => handleReplay(`${post.id}`)}
            handleClickRetweet={() => handleRetweet(`${post.id}`)}
          />
        ))}
    </div>
  );
}
