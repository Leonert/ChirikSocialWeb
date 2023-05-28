import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getUsersRetweet = createAsyncThunk(
  'retweets/getUsersRetweet',
  async ({ id, currentPage = 0 }, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosIns({
        method: 'GET',
        url: `api/posts/${id}/retweets?p=${currentPage}&n=10`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 204) {
        dispatch(retweetsSlice.actions.setTotalUsers());
      }

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
    isTotalUsers: false,
  },
  reducers: {
    handleOpenRetweetModal: (state, action) => {
      state.isOpenRetweetModal = action.payload;
    },
    changeStatusUserRetweet: (state, action) => {
      const elem = state.listUsers.findIndex((user) => user.username === action.payload.username);
      if (state.listUsers.length !== 0 && elem !== -1) {
        state.listUsers[elem].currUserFollower = !state.listUsers[elem].currUserFollower;
      }
    },
    removeListUsersRetweet: (state) => {
      state.listUsers = [];
    },
    setTotalUsers: (state, action) => {
      state.isTotalUsers = true;
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
export const { handleOpenRetweetModal, changeStatusUserRetweet, removeListUsersRetweet } = retweetsSlice.actions;
