import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getUsersRetweet = createAsyncThunk(
  'retweets/getUsersRetweet',
  async ({ id, currentPage = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosIns({
        method: 'GET',
        url: `api/posts/1/retweets?p=${currentPage}&n=5`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const retweetsSlice = createSlice({
  name: 'retweets',
  initialState: {
    listUsers: [],
    error: null,
    loading: false,
    isOpenRetweetModal: false,
  },
  reducers: {
    handleOpenRetweetModal: (state, action) => {
      state.isOpenRetweetModal = action.payload;
    },
    changeStatusUserRetweet: (state, action) => {
      const elem = state.listUsers.findIndex((user) => user.username === action.payload.username);
      if (state.listUsers.length !== 0) {
        state.listUsers[elem].currUserFollower = !state.listUsers[elem].currUserFollower;
      }
    },
  },
  extraReducers: {
    [getUsersRetweet.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUsersRetweet.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      if (state.listUsers === null) {
        state.listUsers = action.payload;
      } else {
        state.listUsers = [...state.listUsers, ...action.payload];
      }
    },
    [getUsersRetweet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const retweetsReducer = retweetsSlice.reducer;
export const { handleOpenRetweetModal, changeStatusUserRetweet } = retweetsSlice.actions;
