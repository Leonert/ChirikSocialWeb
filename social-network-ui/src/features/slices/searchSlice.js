import { createSlice } from '@reduxjs/toolkit';

const search = [
  {
    id: 12,
    name: 'Dialo',
    nickname: 'fgrt',
  },
  {
    id: 13,
    name: 'wrapper',
    nickname: 'tor',
  },
  {
    id: 14,
    name: 'hiuter',
    nickname: 'felix',
  },
  {
    id: 15,
    name: 'tramp',
    nickname: 'donald',
  },
];
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResult: search,
  },
  reducers: {
    addResult: (state, action) => {
      state.searchResult.push(action.payload);
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
