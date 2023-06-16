import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { handleRegistrationModal } from '../../features/slices/authModalSlice';
import { clothReplayModal, getPostId, openReplayModal } from '../../features/slices/homeSlice';
import Post from '../Post/Post';
import { usePostStyle } from '../Post/PostStyle';
import ReplyHeader from '../Post/ReplyHeader';
import ReplayModal from '../ReplayModal/ReplayModal';
import Spinner from '../Spinner/Spinner';

const PostsContext = React.createContext([]);
export default function PostList({ isBookmarkPage, isReplyPage, apiUrl }) {
  const username = useSelector((state) => (state.auth.user ? state.auth.user.username : null));
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const classes = usePostStyle();
  const dispatch = useDispatch();

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
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      return { Error: e };
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchPosts();
  }, []);

  const handleRetweet = async (id) => {
    if (user) {
      const response = await axiosIns.post(`/api/posts`, { originalPost: id });

      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts
            .map((post) => {
              if (+post.id === +id) {
                console.log(response, 200);
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
      } else if (response.status === 201) {
        if (!isBookmarkPage && !isReplyPage)
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

  const handleLike = (props) => {
    if (user) {
      axiosIns.post(`/api/posts/${props}/likes`, {}).then((response) => {
        const likesNumber = response.data;
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (+post.id === +props || (post.originalPost && +post.originalPost.id === +props)) {
              if (+post.id === +props) {
                return {
                  ...post,
                  liked: !post.liked,
                  likesNumber: likesNumber,
                };
              } else {
                return {
                  ...post,
                  originalPost: {
                    ...post.originalPost,
                    liked: !post.originalPost.liked,
                    likesNumber: likesNumber,
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
    setPosts((prevPosts) => [{ ...props }, ...prevPosts]);
    setOpenModal(false);
  
  };

  return (
    <PostsContext.Provider value={posts}>
      {openModal && (
        <ReplayModal openModal={openModal} handleClose={handleClose} posts={posts} onSendRequest={handleSendRequest} />
      )}
      <div style={{ marginBottom: '40px' }}>
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
          loader={<Spinner />}
        >
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
                IdentifierReply={post.text === null && post.image === null}
                id={post.id}
                classes={isReplyPage ? classes.replyItem : classes.Page}
                username={post.author.username}
                profileImage={post.author.profileImage}
                name={post.author.name}
                isBookmarkPage={isBookmarkPage}
                isReplyPage={isReplyPage}
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
                    IdentifierOriginal={post.text != null && post.image === null}
                    id={post.originalPost.id}
                    classes={classes.PageSmall}
                    key={post.originalPost.id}
                    isBookmarkPage={isBookmarkPage}
                    username={post.originalPost.author.username}
                    profileImage={post.originalPost.author.profileImage}
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
        </InfiniteScroll>
        {!posts.length && isReplyPage && (
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
