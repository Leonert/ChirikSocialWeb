import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResult: [],
  },
  reducers: {
    addResult: (state, action) => {
      return {
        ...state,
        searchResult: action.payload,
      };
    },
    removeResult: (state) => {
      state.searchResult = [];
    },
    removeResultItem: (state, action) => {
      state.searchResult = state.searchResult.filter((item) => item.id !== action.payload);
    },
  },
});

export default searchSlice.reducer;
export const { addResult, removeResult, removeResultItem } = searchSlice.actions;
