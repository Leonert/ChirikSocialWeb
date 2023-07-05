import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { handleRegistrationModal } from '../../features/slices/authModalSlice';
import { clearTweetedPost, getPostId, openReplayModal } from '../../features/slices/homeSlice';
import Post from '../Post/Post';
import ReplyHeader from '../Post/ReplyHeader';
import ReplayModal from '../ReplayModal/ReplayModal';
import Spinner from '../Spinner/Spinner';

const PostsContext = React.createContext([]);

const TypographyWrapper = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '20px',
}));

export default function PostList({ isBookmarkPage, isreplypage, apiUrl, incomingPost, lickedProfile, author }) {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const tweetPost = useSelector((state) => state.home.tweetedPost);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setPosts([]);
      setPage(0);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      setHasMorePosts(true);
      const { data } = await axiosIns.get(`${apiUrl}p=${page}&n=5`);

      if (data.length === 0) {
        setHasMorePosts(false);
      } else if (data.length < 5 && page === 0) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      const filteredPosts = data.filter((post, index, self) => self.findIndex((p) => p.id === post.id) === index);

      if (page === 0) {
        setPosts(filteredPosts);
      } else {
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts, ...filteredPosts];
          const uniquePosts = updatedPosts.filter(
            (post, index, self) => self.findIndex((p) => p.id === post.id) === index
          );

          return uniquePosts;
        });
      }
      setPage(page + 1);
    } catch (e) {
      return { Error: e };
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!incomingPost) {
      setPosts([]);
      setPage(0);
      fetchPosts();
    } else {
      setPosts([]);
      setHasMorePosts(false);
      setPosts(incomingPost);
    }
  }, [incomingPost]);

  useEffect(() => {
    if (typeof tweetPost === 'object' && tweetPost !== null) {
      setPosts((prevPost) => [tweetPost, ...prevPost]);
      dispatch(clearTweetedPost());
    }
  }, [tweetPost]);

  const handleRetweet = async (id) => {
    if (user) {
      const response = await axiosIns.post(`/api/posts`, { originalPost: id });
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts
            .map((post) => {
              if (+post.id === +id) {
                return {
                  ...post,
                  retweeted: false,
                  retweetsNumber: response.data,
                };
              } else if (post.originalPost && +post.originalPost.id === +id) {
                return null;
              } else {
                return post;
              }
            })
            .filter(Boolean)
        );
      } else if (response.status === 201 && window.location.pathname !== '/') {
        if (!isBookmarkPage && !isreplypage)
          setPosts((prevPosts) => [
            {
              ...response.data,
            },
            ...prevPosts.map((post) => {
              if (+post.id === +id) {
                return {
                  ...post,
                  retweeted: true,
                  retweetsNumber: response.data.originalPost.retweetsNumber,
                };
              } else {
                return post;
              }
            }),
          ]);
      } else if (response.status === 201 && window.location.pathname === '/') {
        setPosts((prevPosts) => [
          ...prevPosts.map((post) => {
            if (+post.id === +id) {
              return {
                ...post,
                retweeted: true,
                retweetsNumber: response.data.originalPost.retweetsNumber,
              };
            } else {
              return post;
            }
          }),
        ]);
      }
    } else {
      dispatch(handleRegistrationModal(true));
    }
  };

  const handleReplay = (props) => {
    if (user) {
      dispatch(openReplayModal(props));
      setOpenModal(true);
    } else {
      dispatch(handleRegistrationModal(true));
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickDelete = (props) => {
    if (user) {
      axiosIns.delete(`/api/posts/${props}`, {}).then((response) => {
        setPosts((prevPosts) =>
          prevPosts.filter(
            (post) => post.id && +post.id !== +props && (!post.originalPost || +post.originalPost.id !== +props)
          )
        );
      });
    } else {
      dispatch(handleRegistrationModal(true));
    }
  };

  const handleLike = (props) => {
    if (user) {
      axiosIns.post(`/api/posts/${props}/likes`, {}).then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (+post.id === +props || (post.originalPost && +post.originalPost.id === +props)) {
              if (+post.id === +props) {
                return {
                  ...post,
                  liked: !post.liked,
                  likesNumber: response.data,
                };
              } else {
                return {
                  ...post,
                  originalPost: {
                    ...post.originalPost,
                    liked: !post.originalPost.liked,
                    likesNumber: response.data,
                  },
                };
              }
            }

            return post;
          })
        );
        lickedProfile && setPosts((prevPosts) => prevPosts.filter((post) => +post.id !== +props));
      });
    } else {
      dispatch(handleRegistrationModal(true));
    }
  };

  const handleBookmark = (props) => {
    if (user) {
      axiosIns.post(`/api/posts/${props}/bookmarks`, {}).then((response) => {
        const bookmarksNum = response.data;
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (+post.id === +props || (post.originalPost && +post.originalPost.id === +props)) {
              if (+post.id === +props) {
                return {
                  ...post,
                  bookmarked: !post.bookmarked,
                  bookmarksNumber: bookmarksNum,
                };
              } else {
                return {
                  ...post,
                  originalPost: {
                    ...post.originalPost,
                    bookmarked: !post.originalPost.bookmarked,
                    bookmarksNumber: bookmarksNum,
                  },
                };
              }
            }

            return post;
          })
        );
      });
    } else {
      dispatch(handleRegistrationModal(true));
    }
  };
  const handleSendRequest = (props) => {
    if (window.location.pathname !== '/') {
      setPosts((prevPosts) => [{ ...props }, ...prevPosts]);
    }
    setOpenModal(false);
  };

  return (
    <PostsContext.Provider value={posts}>
      {openModal && (
        <ReplayModal openModal={openModal} handleClose={handleClose} posts={posts} onSendRequest={handleSendRequest} />
      )}
      <div style={{ marginBottom: '40px', marginTop: posts.length === 0 && isBookmarkPage ? '50%' : '0' }}>
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
          loader={posts.length === 0 ? null : <Spinner p="50px 0" />}
        >
          {posts &&
            posts.map((post) => (
              <React.Fragment key={post.id}>
                <Post
                  key={post.id}
                  replay={
                    post.originalPost ? (
                      post.text === null && post.image === null ? (
                        <ReplyHeader repeat={post.author && post.author.name ? post.author.name : author.name} />
                      ) : (
                        <TypographyWrapper>Reply</TypographyWrapper>
                      )
                    ) : null
                  }
                  IdentifierReply={post.text === null && post.image === null}
                  id={post.id}
                  size={isreplypage}
                  username={post.author && post.author.username ? post.author.username : author.username}
                  profileImage={
                    post.author && post.author.profileImage
                      ? post.author.profileImage
                      : (author && author.profileImage) || null
                  }
                  name={post.author && post.author.name ? post.author.name : author.name}
                  isBookmarkPage={isBookmarkPage}
                  isreplypage={isreplypage}
                  retweet={post.retweetsNumber}
                  retweeted={post.retweeted}
                  like={post.likesNumber}
                  view={post.view}
                  reply={post.repliesNumber}
                  content={post.text}
                  data={post.createdDate}
                  image={post.image}
                  originalPost={post.originalPost}
                  liked={post.liked}
                  bookmarked={post.bookmarked}
                  bookmark={post.bookmarksNumber}
                  handleClick={() => dispatch(getPostId(`${post.id}`))}
                  handleClickLike={() => handleLike(`${post.id}`)}
                  handleClickReplay={() => handleReplay(`${post.id}`)}
                  handleClickRetweet={() => handleRetweet(`${post.id}`)}
                  handleClickBookmark={() => handleBookmark(`${post.id}`)}
                  handleClickDelete={() => handleClickDelete(`${post.id}`)}
                >
                  {post.originalPost && (
                    <Post
                      IdentifierOriginal={post.text != null && post.image === null}
                      id={post.originalPost.id}
                      key={post.originalPost.id}
                      isBookmarkPage={isBookmarkPage}
                      username={post.originalPost.author.username}
                      profileImage={post.originalPost.author.profileImage}
                      name={post.originalPost.author.name}
                      retweet={post.originalPost.retweetsNumber}
                      retweeted={post.originalPost.retweeted}
                      like={post.originalPost.likesNumber}
                      view={post.originalPost.view}
                      reply={post.originalPost.repliesNumber}
                      content={post.originalPost.text}
                      data={post.originalPost.createdDate}
                      image={post.originalPost.image}
                      liked={post.originalPost.liked}
                      bookmarked={post.originalPost.bookmarked}
                      bookmark={post.originalPost.bookmarksNumber}
                      handleClick={() => dispatch(getPostId(`${post.originalPost.id}`))}
                      handleClickLike={() => handleLike(`${post.originalPost.id}`)}
                      handleClickReplay={() => handleReplay(`${post.originalPost.id}`)}
                      handleClickRetweet={() => handleRetweet(`${post.originalPost.id}`)}
                      handleClickBookmark={() => handleBookmark(`${post.originalPost.id}`)}
                      handleClickDelete={() => handleClickDelete(`${post.originalPost.id}`)}
                    />
                  )}
                </Post>
              </React.Fragment>
            ))}
        </InfiniteScroll>
        {!posts.length && isreplypage && (
          <Typography
            sx={{
              marginTop: '25px',
              color: '#93989D',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
            }}
          >
            So far, there are no replies. <br /> But you can fix it :)
          </Typography>
        )}
      </div>
    </PostsContext.Provider>
  );
}
export { PostsContext };
