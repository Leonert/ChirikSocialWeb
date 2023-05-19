import { List } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { loadFollowers } from '../../../features/slices/userDatas/followersSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowerUser } from '../FollowerUser/FollowerUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Followers = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const { token, user } = useSelector((state) => state.auth);
  const { followersUsers, loading } = useSelector((state) => state.followers);
  const totalUsers = 10;

  useEffect(() => {
    if (path === 'followers') {
      dispatch(handleFollowing(false));
      dispatch(handleFollowers(true));
    }
  }, [path]);

  useEffect(() => {
    if (token && user && followersUsers.length === 0) {
      dispatch(loadFollowers({ username: user.username }));
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
        followersUsers.length < totalUsers
      ) {
        if (loading) return;
        setCurrentPage((prevState) => prevState + 1);
        dispatch(loadFollowers({ username: user.username, currentPage: currentPage + 1 }));
        document.removeEventListener('scroll', handleScroll);
        console.log('load data....');
      }
    },

    [loading, loadFollowers]
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
          {followersUsers.length > 0 &&
            followersUsers.map((user) => {
              return <FollowerUser key={user.username} user={user} />;
            })}
        </List>
      </Box>
    </Subscriptions>
  );
};
