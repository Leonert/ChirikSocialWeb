import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AATestPostComponent } from '../../components/AATestPostComponent/AATestPostComponent';
import ButtonShowMore from '../../components/ButtonShowMore/ButtonShowMore';
import Following from '../../components/Following/Following';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import ModalUser from '../../components/ModalUser/ModalUser';
import PostList from '../../components/PostList/PostList';
import ReplayModal from '../../components/ReplayModal/ReplayModal';
import { UsersLikeModal } from '../../components/SocialActionsUser/Like/ListUsersLike/UsersLikeModal';
import { UsersRetweetModal } from '../../components/SocialActionsUser/Retweet/ListUsersRetweet/UsersRetweetModal';
import { getPost } from '../../features/slices/homeSlice';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const modalUserState = useSelector((state) => state.home.modalUser);

  const { isOpenLikeModal } = useSelector((state) => state.likes);
  const { isOpenRetweetModal } = useSelector((state) => state.retweets);

  const dispatch = useDispatch();

  const fetchPost = () => {
    fetch('./data.json')
      .then((r) => r.json())
      .then((products) => {
        dispatch(getPost(products));
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: ' #1e2028',
        display: 'grid',
        paddingBottom: '20px',
        border: '1px solid #faf5f5',
      }}
    >
      <HeaderMain />
      <ButtonShowMore />
      <AATestPostComponent />
      {recommendation && <PostList />}
      {following && <Following />}
      {modalUserState && <ModalUser />}
      <ReplayModal />
      {isOpenLikeModal && <UsersLikeModal />}
      {isOpenRetweetModal && <UsersRetweetModal />}
    </Box>
  );
}

export default Home;
