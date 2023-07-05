import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Avatar,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import Spinner from '../Spinner/Spinner';

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

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const debouncedValue = useDebounce(inputValue, 400);

  const handleInputChange = async (event, value) => {
    setInputValue(value);
  };

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axiosIns(`/api/search/users?q=${debouncedValue}`);

        setSearchResult(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);

        return json('Error: ', error);
      }
    };
    if (debouncedValue !== '') {
      searchUsers();
    }
  }, [debouncedValue]);

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={searchResult}
      getOptionLabel={(option) => option.username}
      renderOption={(props, option) => (
        <Link key={option.id} to={`/${option.username}`}>
          <ListItem {...props}>
            <ListItemAvatar>
              <Avatar src={option.profileImage} />
            </ListItemAvatar>
            <Stack>
              <ListItemText primary={option.name} />
              <ListItemText primary={'@' + option.username} />
            </Stack>
          </ListItem>
        </Link>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          name="search"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon sx={{ color: (theme) => theme.palette.divider }} />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading && <Spinner />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{ marginTop: '16px' }}
        />
      )}
    />
  );
};

export default SearchInput;
