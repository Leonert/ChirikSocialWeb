import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import { alpha, styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import SearchWrapper from './SearchWrapper';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 10,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '80%',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function SearchField() {
  const searchResult = useSelector((state) => state.search.searchResult);

  const [searchText, setSearchText] = useState('');
  const handleInputChange = (event) => {
    axiosIns.get(`/api/search/user/${event.target.value}`, {}).then((response) => {
      const LikeNumber = response.data;
      console.log(LikeNumber);
   
    });
    setSearchText(event.target.value);
  };

  return (
    <Box>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={handleInputChange}
          />
        </Search>
      </Toolbar>
      {searchResult.length > 0 && (
        <Box>
          <SearchWrapper />
        </Box>
      )}
    </Box>
  );
}
