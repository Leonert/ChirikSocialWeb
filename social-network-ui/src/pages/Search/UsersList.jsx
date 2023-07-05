import { Avatar, Box, Divider, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import Spinner from '../../components/Spinner/Spinner';
import FollowButton from '../Profile/FollowButton';

const UsersList = ({ searchValue }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  const fetchUsers = async () => {
    try {
      const encodedSearchValue = encodeURIComponent(searchValue);

      const { data } = await axiosIns.get(`/api/search/users?q=${encodedSearchValue}&p=${page}`);
      if (data.length === 0) {
        setHasMoreUsers(false);
      } else if (data.length < 10 && page === 0) {
        setHasMoreUsers(false);
      } else {
        setHasMoreUsers(true);
      }
      setUsers((prevUsers) => [...prevUsers, ...data]);
      setPage((prevPage) => prevPage + 1);

      return { data };
    } catch (e) {
      return json({ Error: e });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <InfiniteScroll
      dataLength={users.length}
      next={fetchUsers}
      hasMore={hasMoreUsers}
      endMessage={
        <Typography
          sx={{
            marginTop: '25px',
            color: '#93989D',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '32px',
          }}
        >
          No more results.
        </Typography>
      }
      loader={<Spinner p="50px 0" />}
    >
      <Box>
        {users.map((user) => (
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
      </Box>
    </InfiniteScroll>
  );
};

export default UsersList;
