import { List } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { loadFollowing } from '../../../features/slices/authSlice';
import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowingUser } from '../FollowingUser/FollowingUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Following = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

  useEffect(() => {
    if (path === 'following') {
      dispatch(handleFollowing(true));
      dispatch(handleFollowers(false));
    }
  }, [path]);

  // const { users } = useSelector((state) => state.auth.user.following);
  // const { totalUsers } = useSelector((state) => state.auth.following);
  // const { loading } = useSelector((state) => state.auth);
  // const [currentPage, setCurrentPage] = useState(0);

  // const handleScroll = useCallback(
  //   (e) => {
  //     if (
  //       e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
  //       users.length < totalUsers
  //     ) {
  //       setCurrentPage((prevState) => prevState + 1);
  //       dispatch(loadFollowing(currentPage));
  //     }
  //   },

  //   [loading, loadFollowing]
  // );

  // useEffect(() => {
  //   dispatch(loadFollowing());
  // }, [loadFollowing]);

  // useEffect(() => {
  //   document.addEventListener('scroll', handleScroll);

  //   return () => {
  //     document.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  return (
    <Subscriptions>
      <Box sx={{ width: '100%' }}>
        <List
          sx={{
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {/* {loading && <Spinner />} */}
          {/* {users.map((user) => {
          return <FollowingUser key={user._id} user={user} />;
        })} */}

          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
          <FollowingUser />
        </List>
      </Box>
    </Subscriptions>
  );
};
