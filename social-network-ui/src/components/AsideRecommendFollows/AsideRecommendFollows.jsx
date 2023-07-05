import { Avatar, ListItem, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import FollowButton from '../../pages/Profile/FollowButton';
import Spinner from '../Spinner/Spinner';
import AsideContainer from '../UI/AsideContainer';

const AsideRecommendFollows = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRecommendedUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosIns.get('api/users/connect?n=3');
      setRecommendedUsers(data || []);
    } catch (e) {
      return json(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendedUsers();
  }, []);

  return (
    <AsideContainer header="For you" asideActions="/connect_people">
      {loading && <Spinner p="50px 0" />}
      {recommendedUsers.map((user) => (
        <Link key={user.id} to={`/${user.username}`}>
          <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
            <Avatar sx={{ mr: '20px' }} alt={user.name} src={user.profileImage} />
            <Stack justifyContent="space-between" alignItems="center" direction="row" width="100%">
              <Stack sx={{ overflow: 'hidden' }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '14px',
                    minWidth: '145px',
                    width: '100%',
                    maxWidth: '145px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '14px',
                    minWidth: '145px',
                    width: '100%',
                    maxWidth: '145px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {`@${user.username}`}
                </Typography>
              </Stack>
              <FollowButton user={user} />
            </Stack>
          </ListItem>
        </Link>
      ))}
    </AsideContainer>
  );
};

export default AsideRecommendFollows;
