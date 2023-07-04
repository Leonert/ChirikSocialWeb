import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import Post from '../../components/Post/Post';
import { usePostStyle } from '../../components/Post/PostStyle';
import ReplyHeader from '../../components/Post/ReplyHeader';
import Spinner from '../../components/Spinner/Spinner';
import {
  bookmarksPost,
  getPostId,
  likesPost,
  makeRetweet,
  openReplayModal,
  removeRetweet,
} from '../../features/slices/homeSlice';

const PostsList = ({ searchValue }) => {
  const username = useSelector((state) => (state.auth.user ? state.auth.user.username : null));
  const classes = usePostStyle();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchPosts = async () => {
    try {
      const encodedSearchValue = encodeURIComponent(searchValue);

      const { data } = await axiosIns.get(`/api/search/posts?q=${encodedSearchValue}&p=${page}`);
      if (data.length === 0) {
        setHasMorePosts(false);
      } else if (data.length < 10 && page === 0) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      return json({ Error: e });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRetweet = async (id) => {
    const response = await axiosIns.post(`/api/posts`, { originalPost: id });
    if (response.status === 200) {
      dispatch(removeRetweet({ id, username }));
      dispatch(makeRetweet({ postId: id, reetweetsNumber: response.data }));
    } else {
      dispatch(makeRetweet({ postId: id, retweetsNumber: response.data.originalPost.retweetsNumber }));
    }
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
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMorePosts}
      endMessage={
        <Typography
          sx={{
            marginTop: '25px',
            color: '#93989D',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '32px',
          }}
        >
          No more results.
        </Typography>
      }
      loader={<Spinner p="50px 0" />}
    >
      <Box>
        {posts.map((post) => (
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
            IdentifierReply={post.text === null && post.image === null}
            id={post.id}
            classes={classes.Page}
            username={post.author.username}
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
            handleClickLike={() => handleLike(`${post.id}`)}
            handleClickReplay={() => handleReplay(`${post.id}`)}
            handleClickRetweet={() => handleRetweet(`${post.id}`)}
            handleClickBookmark={() => handleBookmark(`${post.id}`)}
          >
            {post.originalPost && (
              <Post
                IdentifierOriginal={post.text !== null && post.image === null}
                id={post.originalPost.id}
                classes={classes.PageSmall}
                key={post.originalPost.id}
                username={post.originalPost.author.username}
                avatar={post.originalPost.author.profileImage}
                name={post.originalPost.author.name}
                retweet={post.originalPost.retweetsNumber}
                like={post.originalPost.likesNumber}
                view={post.originalPost.view}
                reply={post.originalPost.repliesNumber}
                content={post.originalPost.text}
                data={post.originalPost.createdDate}
                image={post.originalPost.image}
                liked={post.originalPost.liked}
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
      </Box>
    </InfiniteScroll>
  );
};

export default PostsList;
