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

  const classes = usePostStyle();
  const dispatch = useDispatch();

  const handleRetweet = (id) => {
    axiosIns.post('/api/posts', { originalPost: id });
  };

  const handleReplay = (props) => {
    dispatch(openReplayModal(props));
  };

  const handleLike = (props) => {
    axiosIns.post(`/api/posts/${props}/likes`, {}).then((response) => {
      const LikeNumber = response.data;
      dispatch(
        likesPost({
          postId: props,
          likesNumber: LikeNumber,
        })
      );
    });
  };

  const handleBookmark = (props) => {
    axiosIns.post(`/api/posts/${props}/bookmarks`, {}).then((response) => {
      const bookmarksNum = response.data;
      dispatch(
        bookmarksPost({
          postId: props,
          bookmarksNumber: bookmarksNum,
        })
      );
    });
  };

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            replay={
              post.originalPost ? (
                post.text === null && post.image === null ? (
                  <ReplyHeader repeat={post.author.name} />
                ) : (
                  <Typography className={classes.reply}>Reply</Typography>
                )
              ) : null
            }
            id={post.id}
            classes={classes.Page}
            username={post.author.username}
            avatar={post.author.profileImage}
            name={post.author.name}
            username={post.author.username}
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
            handleClickLike={() => handleLike(`${post.id}`)}
            handleClickReplay={() => handleReplay(`${post.id}`)}
            handleClickRetweet={() => handleRetweet(`${post.id}`)}
            handleClickBookmark={() => handleBookmark(`${post.id}`)}
          >
            {post.originalPost && (
              <Post
                id={post.originalPost.id}
                classes={classes.PageSmall}
                key={post.originalPost.id}
                username={post.originalPost.author.username}
                avatar={post.originalPost.author.profileImage}
                name={post.originalPost.author.name}
                username={post.originalPost.author.username}
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
                handleClickLike={() => handleLike(`${post.originalPost.id}`)}
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
