import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { bookmarksPost, getPostId, likesPost, openReplayModal } from '../../features/slices/homeSlice';
import Post from '../Post/Post';
import { usePostStyle } from '../Post/PostStyle';
import ReplyHeader from '../Post/ReplyHeader';

export default function PostList() {
  const posts = useSelector((state) => state.home.post);
  console.log(posts);
  const classes = usePostStyle();
  const dispatch = useDispatch();

  const handleRetweet = (id) => {
    axiosIns.post(
      '/api/posts',
      { originalPost: id },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  };

  const handleReplay = (props) => {
    dispatch(openReplayModal(props));
  };

  const handelLike = (props) => {
    const token = localStorage.getItem('token');

    axiosIns
      .post(
        `/api/posts/${props}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const LikeNumber = response.data;
        dispatch(
          likesPost({
            postId: props,
            likesNumber: LikeNumber,
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleBookmark = (props) => {
    const token = localStorage.getItem('token');

    axiosIns
      .post(
        `/api/posts/${props}/bookmarks`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const bookmarksNumber = response.data;
        dispatch(
          bookmarksPost({
            postId: props,
            bookmarksNumber: bookmarksNumber,
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            replay={
              post.originalPost ? (
                post.text === null && post.image === null ? (
                  <ReplyHeader repeat={post.author.name} />
                ) : (
                  <Typography className={classes.reply}>Reply</Typography>
                )
              ) : null
            }
            classes={classes.Page}
            key={post.id}
            avatar={post.author.profileImage}
            name={post.author.name}
            retweet={post.retweetsNumber}
            like={post.likesNumber}
            view={post.view}
            reply={post.repliesNumber}
            content={post.text}
            data={post.createdDate}
            image={post.image}
            originalPost={post.originalPost}
            liked={post.liked}
            bookmarked={post.bookmarked}
            retweeted={post.retweeted}
            bookmark={post.bookmarksNumber}
            handleClick={() => dispatch(getPostId(`${post.id}`))}
            handleClickLike={() => handelLike(`${post.id}`)}
            handleClickReplay={() => handleReplay(`${post.id}`)}
            handleClickRetweet={() => handleRetweet(`${post.id}`)}
            handleClickBookmark={() => handleBookmark(`${post.id}`)}
          >
            {post.originalPost && (
              <Post
                classes={classes.PageSmall}
                key={post.id}
                avatar={post.originalPost.author.profileImage}
                name={post.originalPost.author.name}
                retweet={post.originalPost.retweetsNumber}
                like={post.originalPost.likesNumber}
                view={post.originalPost.view}
                reply={post.originalPost.repliesNumber}
                content={post.originalPost.text}
                data={post.originalPost.createdDate}
                image={post.originalPost.image}
                liked={post.liked}
                bookmarked={post.originalPost.bookmarked}
                retweeted={post.originalPost.retweeted}
                bookmark={post.originalPost.bookmarksNumber}
                handleClick={() => dispatch(getPostId(`${post.originalPost.id}`))}
                handleClickLike={() => handelLike(`${post.originalPost.id}`)}
                handleClickReplay={() => handleReplay(`${post.originalPost.id}`)}
                handleClickRetweet={() => handleRetweet(`${post.originalPost.id}`)}
                handleClickBookmark={() => handleBookmark(`${post.originalPost.id}`)}
              />
            )}
          </Post>
        ))}
    </div>
  );
}
