import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AATestPostComponent } from '../../components/AATestPostComponent/AATestPostComponent';
import ButtonShowMore from '../../components/ButtonShowMore/ButtonShowMore';
import Following from '../../components/Following/Following';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import ModalUser from '../../components/ModalUser/ModalUser';
import PostList from '../../components/PostList/PostList';
import ReplayModal from '../../components/ReplayModal/ReplayModal';
import SearchField from '../../components/SearchField/SearchField';
import { UsersLikeModal } from '../../components/SocialActionsUser/Like/ListUsersLike/UsersLikeModal';
import { UsersRetweetModal } from '../../components/SocialActionsUser/Retweet/ListUsersRetweet/UsersRetweetModal';
import { GetPosts, clearPosts, getPost } from '../../features/slices/homeSlice';

function Home() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const modalUserState = useSelector((state) => state.home.modalUser);
  // const [portion, setPortion] = useState(0);

  const { isOpenLikeModal } = useSelector((state) => state.likes);
  const { isOpenRetweetModal } = useSelector((state) => state.retweets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPosts(0)).then((result) => {
      if (GetPosts.fulfilled.match(result)) {
        dispatch(getPost(result.payload));
      }
    });

    return () => {
      dispatch(clearPosts());
    };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <HeaderMain />
        <ButtonShowMore />
        {/* <AATestPostComponent /> */}
        {recommendation && <PostList />}
        {following && <Following />}
        {modalUserState && <ModalUser />}
        <ReplayModal />
        {isOpenLikeModal && <UsersLikeModal />}
        {isOpenRetweetModal && <UsersRetweetModal />}
      </Grid>
      <Grid item xs={5}>
        <SearchField />
      </Grid>
    </Grid>
  );
}

export default Home;
