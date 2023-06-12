import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Divider, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, NavLink, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import Spinner from '../../components/Spinner/Spinner';
import FollowButton from '../Profile/FollowButton';

const Connect = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  const fetchSuggestedUsers = async () => {
    try {
      const { data } = await axiosIns.get(`/api/users/connect?p=${page}`);
      if (data.length === 0) {
        setHasMoreUsers(false);
      } else if (data.length < 10 && page === 0) {
        setHasMoreUsers(false);
      } else {
        setHasMoreUsers(true);
      }
      setUsers((prevUsers) => [...prevUsers, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      return json({ Error: e });
    }
  };
  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <Box display="flex" flexDirection="column" maxWidth="600px" width="100%">
      <Stack direction="row" p="6px 0" alignItems="center">
        <NavLink
          style={{
            textDecoration: 'none',
            color: 'inherit',
            zIndex: 2,
            margin: '4px 26px 0 20px',
          }}
          to="/"
        >
          <ArrowBackIcon />
        </NavLink>
        <Typography component="h2" fontSize="18px">
          Connect
        </Typography>
      </Stack>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchSuggestedUsers}
        hasMore={hasMoreUsers}
        endMessage={
          <Typography
            sx={{
              marginTop: '25px',
              color: '#93989D',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '32px',
              mb: '40px',
            }}
          >
            No more connections
          </Typography>
        }
        loader={<Spinner />}
      >
        {users.length > 0 &&
          users.map((user) => (
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
                <Divider />
              </ListItem>
            </Link>
          ))}
      </InfiniteScroll>
    </Box>
  );
};

export default Connect;
