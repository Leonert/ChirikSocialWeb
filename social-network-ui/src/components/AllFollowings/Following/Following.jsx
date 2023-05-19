import { List } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { loadFollowing } from '../../../features/slices/userDatas/followingSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowingUser } from '../FollowingUser/FollowingUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Following = () => {
  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { followingUsers, loading } = useSelector((state) => state.following);
  const [currentPage, setCurrentPage] = useState(0);
  const totalUsers = 10;

  useEffect(() => {
    if (token && user && followingUsers.length === 0) {
      dispatch(loadFollowing({ username: user.username, token }));
    }
  }, []);

  useEffect(() => {
    if (path === 'following') {
      dispatch(handleFollowing(true));
      dispatch(handleFollowers(false));
    }
  }, [path]);

  const handleScroll = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
        followingUsers.length < totalUsers
      ) {
        if (loading) return;
        setCurrentPage((prevState) => prevState + 1);
        dispatch(loadFollowing({ username: user.username, currentPage: currentPage + 1 }));
        document.removeEventListener('scroll', handleScroll);
      }
    },

    [loading, loadFollowing]
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
          {loading && <Spinner />}
          {followingUsers.length > 0 &&
            followingUsers.map((user) => {
              return <FollowingUser key={user.username} user={user} />;
            })}
        </List>
      </Box>
    </Subscriptions>
  );
};

// const handleScroll = useCallback(
//   (e) => {
//     if (
//       e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
//       followingUsers.length < totalUsers
//     ) {
//       if (loading) return;
//       setCurrentPage((prevState) => prevState + 1);
//       dispatch(loadFollowing({ username: user.username, currentPage: currentPage + 1 }));
//       document.removeEventListener('scroll', handleScroll);
//     }
//   },

//   [loading, loadFollowing]
// );
