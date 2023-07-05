import { List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { loadFollowers, removeFollowersUsers } from '../../../features/slices/userDatas/followersSlice';
import Spinner from '../../Spinner/Spinner';
import { FollowerUser } from '../FollowerUser/FollowerUser';
import { Subscriptions } from '../Subscriptions/Subscriptions';

export const Followers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { username } = useParams();

  const path = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const { followersUsers, loading, isTotalUsers } = useSelector((state) => state.followers);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // if (followersUsers.length === 0 && !loading) {
    dispatch(loadFollowers({ username }));
    // }

    return () => {
      dispatch(removeFollowersUsers());
    };
  }, []);

  useEffect(() => {
    if (path === 'followers') {
      dispatch(handleFollowing(false));
      dispatch(handleFollowers(true));
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
        dispatch(loadFollowers({ username, currentPage: currentPage + 1 }));
        document.removeEventListener('scroll', handleScroll);
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
            backgroundColor: 'rgb(21, 32, 43)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {loading && followersUsers.length === 0 && <Spinner p="50px 0" />}
          {followersUsers.length > 0 ? (
            followersUsers.map((user) => {
              return <FollowerUser key={user.username} user={user} />;
            })
          ) : (
            <Typography sx={{ color: '#93989D' }} variant="h5">
              There are no followers.
            </Typography>
          )}
        </List>
      </Box>
    </Subscriptions>
  );
};
