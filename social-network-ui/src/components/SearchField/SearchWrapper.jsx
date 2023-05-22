import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeResult, removeResultItem } from '../../features/slices/searchSlice';
import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';
import SearchResulting from './SearchResulting';

const SearchWrapper = () => {
  const searchResult = useSelector((state) => state.search.searchResult);
  const dispatch = useDispatch();
  const delateResult = () => {
    dispatch(removeResult());
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ width: '88%' }}>
        <CloseButton onClose={delateResult} />
      </Box>

      {searchResult &&
        searchResult.map((res) => (
          <SearchResulting
            key={res.id}
            id={res.id}
            name={res.name}
            nickname={res.username}
            handelClick={(e) => dispatch(removeResultItem(res.id))}
          />
        ))}
    </Box>
  );
};

export default SearchWrapper;
