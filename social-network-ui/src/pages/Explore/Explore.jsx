import { Avatar, Grid, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import AsideContainer from '../../components/UI/AsideContainer';
import FollowButton from '../Profile/FollowButton';

const Explore = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const fetchRecommendedUsers = async () => {
    try {
      const { data } = await axiosIns.get('api/users/connect');
      setRecommendedUsers(data);
    } catch (e) {
      return json(e);
    }
  };
  useEffect(() => {
    fetchRecommendedUsers();
  }, []);
  console.log(recommendedUsers);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        {/* <SearchField /> */}
        <Typography>Trends for you</Typography>
      </Grid>
      <Grid item xs={5}>
        <AsideContainer header="For you">
          {recommendedUsers.map((user) => (
            <Link key={user.id} to={`/${user.username}`}>
              <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
                <Avatar sx={{ mr: '20px' }} alt={user.name} src={user.profileImage} />
                <Stack justifyContent="space-between" alignItems="center" direction="row" width="100%">
                  <Stack>
                    <ListItemText primary={user.name} />
                    <ListItemText primary={`@${user.username}`} />
                    <ListItemText primary={user.bio} />
                  </Stack>
                  <FollowButton user={user} />
                </Stack>
              </ListItem>
            </Link>
          ))}
        </AsideContainer>
      </Grid>
    </Grid>
  );
};

export default Explore;
