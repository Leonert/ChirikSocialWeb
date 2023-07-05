import { List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { loadFollowing, removeFollowingUsers } from '../../../features/slices/userDatas/followingSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowingUser } from '../FollowingUser/FollowingUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Following = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { username } = useParams();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];

  const { followingUsers, loading, isTotalUsers } = useSelector((state) => state.following);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // if (followingUsers.length === 0) {
    dispatch(loadFollowing({ username }));
    // }

    return () => {
      dispatch(removeFollowingUsers());
    };
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
        !isTotalUsers
      ) {
        if (loading) return;
        setCurrentPage((prevState) => prevState + 1);
        dispatch(loadFollowing({ username, currentPage: currentPage + 1 }));
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
            backgroundColor: 'rgb(21, 32, 43)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {loading && followingUsers.length === 0 && <Spinner p="50px 0" />}
          {followingUsers.length > 0 ? (
            followingUsers.map((user) => {
              return <FollowingUser key={user.username} user={user} />;
            })
          ) : (
            <Typography sx={{ color: '#93989D' }} variant="h5">
              There are no followings.
            </Typography>
          )}
        </List>
      </Box>
    </Subscriptions>
  );
};
