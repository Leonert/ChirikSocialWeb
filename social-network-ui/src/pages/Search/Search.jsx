import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  alpha,
  debounce,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLoaderData, useRevalidator, useSearchParams } from 'react-router-dom';

import FollowButton from '../Profile/FollowButton';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Search = () => {
  const { data } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState('0');
  const searchValue = searchParams.get('value');
  const [searchInputValue, setSearchInputValue] = useState(searchValue);
  const debouncedValue = useDebounce(searchInputValue, 300);
  // const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ value: debouncedValue });
    }
  }, [debouncedValue]);

  // const isCurrentUserProfile = data?.username === user.username;

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  console.log(data);

  return (
    <>
      <Box display="flex" flexDirection="column" maxWidth="600px" width="100%">
        <TextField
          value={searchInputValue}
          onChange={handleSearchInputChange}
          fullWidth
          sx={{
            border: 'none',
            mt: '40px',
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: (theme) => theme.palette.common.white }} />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {data &&
            data.map((user) => (
              <>
                <Link key={user.id} to={`/${user.username}`}>
                  <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
                    <Avatar sx={{ mr: '20px' }} alt={user.name} src={user.profileImage} />
                    <Stack direction="column">
                      <ListItemText primary={user.name} />
                      <ListItemText primary={`@${user.username}`} />
                      <ListItemText primary={user.bio} />
                    </Stack>
                    <FollowButton user={user} />
                    <Divider />
                  </ListItem>
                </Link>
              </>
            ))}
        </List>
      </Box>
    </>
  );
};

export default Search;
