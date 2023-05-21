import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import axiosIns from '../../../axiosInstance';
import Post from '../../../components/Post/Post';
import { usePostStyle } from '../../../components/Post/PostStyle';
import ReplyHeader from '../../../components/Post/ReplyHeader';
import { getPostId, openReplayModal } from '../../../features/slices/homeSlice';

const ProfilePostList = ({ posts, user }) => {
  const classes = usePostStyle();
  const dispatch = useDispatch();

  const handleRetweet = (id) => {
    axiosIns.post('/api/posts', { originalPost: id });
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
            replay={
              post.originalPost ? (
                post.text === null && post.image === null ? (
                  <ReplyHeader repeat={user.name} />
                ) : (
                  <Typography className={classes.reply}>Reply</Typography>
                )
              ) : null
            }
            classes={classes.Page}
            key={post.id}
            avatar={user.profileImage}
            name={user.name}
            username={user.username}
            retweet={post.retweetsNumber}
            like={post.likesNumber}
            view={post.view}
            reply={post.repliesNumber}
            content={post.text}
            data={post.createdDate}
            image={post.image}
            originalPost={post.originalPost}
            handleClick={() => dispatch(getPostId(`${post.id}`))}
            handleClickLike={() => handelLike(`${post.id}`)}
            handleClickReplay={() => handleReplay(`${post.id}`)}
            handleClickRetweet={() => handleRetweet(`${post.id}`)}
          ></Post>
        ))}
    </div>
  );
};

export default ProfilePostList;
