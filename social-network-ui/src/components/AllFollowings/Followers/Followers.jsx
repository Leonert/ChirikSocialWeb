import { List } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { loadFollowers } from '../../../features/slices/authSlice';
import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowerUser } from '../FollowerUser/FollowerUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Followers = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

  useEffect(() => {
    if (path === 'followers') {
      dispatch(handleFollowing(false));
      dispatch(handleFollowers(true));
    }
  }, [path]);
  // const { users } = useSelector((state) => state.auth.user.followers);
  // const { totalUsers } = useSelector((state) => state.auth.followers);
  // const { loading } = useSelector((state) => state.auth);
  // const [currentPage, setCurrentPage] = useState(0);

  // const handleScroll = useCallback(
  //   (e) => {
  //     if (
  //       e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
  //       users.length < totalUsers
  //     ) {
  //       setCurrentPage((prevState) => prevState + 1);
  //       dispatch(loadFollowers(currentPage));
  //     }
  //   },

  //   [loading, loadFollowers]
  // );

  // useEffect(() => {
  //   dispatch(loadFollowers());
  // }, [loadFollowers]);

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
          <FollowerUser />
          <FollowerUser />
          <FollowerUser />
        </List>
      </Box>
    </Subscriptions>
  );
};
