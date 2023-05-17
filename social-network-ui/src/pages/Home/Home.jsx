import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ButtonShowMore from '../../components/ButtonShowMore/ButtonShowMore';
import Following from '../../components/Following/Following';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import ModalUser from '../../components/ModalUser/ModalUser';
import PostList from '../../components/PostList/PostList';
import ReplayModal from '../../components/ReplayModal/ReplayModal';
import { loginUser } from '../../features/slices/authSlice';
import { getPost } from '../../features/slices/homeSlice';
import { loadFollowing } from '../../features/slices/userDatas/followingSlice';
import { getNotifications } from '../../features/slices/userDatas/notificationsSlice';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const modalUserState = useSelector((state) => state.home.modalUser);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const { followingUsers } = useSelector((state) => state.following);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && user && !followingUsers) {
      // dispatch(loadFollowing({ username: user.username, token }));
      dispatch(getNotifications({ token }));
    }
  }, [user, token]);

  useEffect(() => {
    const authDatals = localStorage.getItem('authData');
    const authData = JSON.parse(authDatals);
    const token = localStorage.getItem('token');

    if (authData.email && authData.password && authData.rememberMe && token) {
      dispatch(loginUser({ email: authData.email, password: authData.password, rememberMe: authData.rememberMe }));
    }
  }, []);

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
      {recommendation && <PostList />}
      {following && <Following />}
      {modalUserState && <ModalUser />}
      <ReplayModal />
    </Box>
  );
}

export default Home;
