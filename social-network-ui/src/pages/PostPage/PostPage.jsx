import { CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import NotFound from '../../components/NotFound/NotFound';
import Post from '../../components/Post/Post';
import { usePostStyle } from '../../components/Post/PostStyle';
import ReplyHeader from '../../components/Post/ReplyHeader';
import { openReplayModal } from '../../features/slices/homeSlice';
import usePostPageStyles from './PostPageStyles';

const PostPage = () => {
  const postClasses = usePostStyle();
  const postPageClasses = usePostPageStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosIns.get(`/api/posts/${id}`);
      setIsLoading(false);
      setPost(response.data);
      dispatch(openReplayModal(id));

      return response;
    };

    fetchPost().catch(() => setIsLoading(false));
  }, []);

  return (
    <Container maxWidth="sm" className={postPageClasses.container}>
      {isLoading && <CircularProgress />}
      {!isLoading && post && (
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
          originalPost={post.originalPost}
        >
          {post.originalPost && (
            <Post
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
              date={post.originalPost.createdDate}
              image={post.originalPost.image}
            />
          )}
        </Post>
      )}
      {!isLoading && !post && <NotFound />}
    </Container>
  );
};

export default PostPage;
