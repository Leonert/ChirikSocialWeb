import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeResult, removeResultItem } from '../../features/slices/searchSlice';
import CloseButton from '../AddTweetModal/AddTweetForm/CloseButton/CloseButton';
import SearchResulting from './SearchResulting';

const SearchWrapper = () => {
  const searchResult = useSelector((state) => state.search.searchResult);
  const dispatch = useDispatch();
  const delateResult = () => {
    dispatch(removeResult());
  };

  return (
    <Box sx={{ padding: '30px' }}>
      <Box display="flex" justifyContent="flex-end" sx={{ width: '92%' }}>
        <CloseButton onClose={delateResult} />
      </Box>

      {searchResult &&
        searchResult.map((res) => (
          <SearchResulting
            action={<CloseButton onClose={(e) => dispatch(removeResultItem(res.id))} />}
            key={res.id}
            id={res.id}
            name={res.name}
            nickname={res.username}
          />
        ))}
    </Box>
  );
};

export default SearchWrapper;
