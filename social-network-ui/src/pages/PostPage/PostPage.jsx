import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import NotFound from '../../components/NotFound/NotFound';
import Post from '../../components/Post/Post';
import { usePostStyle } from '../../components/Post/PostStyle';
import ReplyHeader from '../../components/Post/ReplyHeader';
import PostList from '../../components/PostList/PostList';
import TextInput from '../../components/ReplayModal/TextInput';
import { addOnePost, clearPosts, getPost, getPostId, replayMessage } from '../../features/slices/homeSlice';
import { addReply, makeRetweet, setBookmark, setLike, setPost } from '../../features/slices/postSlice';
import usePostPageStyles from './PostPageStyles';

const PostPage = () => {
  const pageClasses = usePostPageStyles();
  const postClasses = usePostStyle();
  const dispatch = useDispatch();
  const text = useSelector((state) => state.home.message);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const post = useSelector((state) => state.post);
  console.log(post, 2222);
  const sendRequest = async () => {
    await axiosIns.post('/api/posts', { text, originalPost: id }).then((response) => {
      dispatch(addOnePost(response.data));
      console.log(response.data, 23);
      dispatch(addReply());
      dispatch(replayMessage(''));
    });
  };

  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      dispatch(replayMessage(event.target.value));
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosIns.get(`/api/posts/${id}`);
      dispatch(setPost(response.data));
      console.log(response.data, 34);

      return response;
    };

    const fetchReplies = async () => {
      const response = await axiosIns.get(`/api/posts/${id}/replies`);

      if (response.data !== '') {
        dispatch(getPost(response.data));
        console.log(response.data, 67);
        setIsLoading(false);
      }

      setIsLoading(false);

      return response;
    };

    fetchPost()
      .then(() => fetchReplies())
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(clearPosts());
    };
  }, [id]);

  const handleRetweet = async (id) => {
    const response = await axiosIns.post(`/api/posts`, { originalPost: id });
    const retweetsNumber = response.status === 200 ? response.data : response.data.originalPost.retweetsNumber;
    dispatch(makeRetweet(retweetsNumber));
  };

  const handleLike = async (props) => {
    await axiosIns.post(`/api/posts/${props}/likes`, {}).then((response) => {
      dispatch(setLike(response.data));
    });
  };

  const handleBookmark = (props) => {
    axiosIns.post(`/api/posts/${props}/bookmarks`, {}).then((response) => {
      dispatch(setBookmark(response.data));
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={isLoading ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : { padding: '50px 0' }}
    >
      {isLoading && <CircularProgress />}
      {!isLoading && post.id !== null && (
        <Post
          replay={
            post.originalPost ? (
              post.text === null && post.image === null ? (
                <ReplyHeader repeat={post.author.name} />
              ) : (
                <Typography className={postClasses.reply}>Reply</Typography>
              )
            ) : null
          }
          postPage={true}
          classes={postClasses.Page}
          key={post.id}
          username={post.author.username}
          avatar={post.author.profileImage}
          name={post.author.name}
          retweet={post.retweetsNumber}
          like={post.likesNumber}
          view={post.view}
          reply={post.repliesNumber}
          content={post.text}
          date={post.createdDate}
          image={post.image}
          bookmark={post.bookmarksNumber}
          liked={post.liked}
          bookmarked={post.bookmarked}
          retweeted={post.retweeted}
          originalPost={post.originalPost}
          handleClick={() => dispatch(getPostId(post.id))}
          handleClickLike={() => handleLike(post.id)}
          handleClickRetweet={() => handleRetweet(post.id, post.retweeted)}
          handleClickBookmark={() => handleBookmark(post.id)}
        >
          {post.originalPost && (
            <Post
              IdentifierOriginal={post.text !== null && post.image === null}
              id={post.originalPost.id}
              classes={postClasses.PageSmall}
              key={post.id}
              username={post.originalPost.author.username}
              avatar={post.originalPost.author.profileImage}
              name={post.originalPost.author.name}
              retweet={post.originalPost.retweetsNumber}
              like={post.originalPost.likesNumber}
              view={post.originalPost.view}
              reply={post.originalPost.repliesNumber}
              content={post.originalPost.text}
              liked={post.originalPost.liked}
              bookmarked={post.originalPost.bookmarked}
              retweeted={post.originalPost.retweeted}
              date={post.originalPost.createdDate}
              image={post.originalPost.image}
              bookmark={post.originalPost.bookmarksNumber}
              handleClick={() => dispatch(getPostId(post.originalPost.id))}
              handleClickLike={() => handleLike(post.originalPost.id)}
              handleClickRetweet={() => handleRetweet(post.originalPost.id)}
              handleClickBookmark={() => handleBookmark(post.originalPost.id)}
            />
          )}
        </Post>
      )}

      {!isLoading && post && (
        <Box className={pageClasses.replyWrapper}>
          <TextInput handleTextChange={handleTextChange} />
          <Box sx={{ marginTop: '15px', textAlign: 'right' }}>
            <Button disabled={text.length === 0} onClick={sendRequest} color="primary" variant="contained">
              Reply
            </Button>
          </Box>
        </Box>
      )}

      {!isLoading && post && <PostList isReplyPage={true} />}
      {!isLoading && !post && <NotFound />}
    </Container>
  );
};

export default PostPage;
