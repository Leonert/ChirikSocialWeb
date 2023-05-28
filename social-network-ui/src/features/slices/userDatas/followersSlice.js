import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../../src/axiosInstance';

export const loadFollowers = createAsyncThunk(
  'followers/loadFollowers',
  async ({ username, currentPage = 0, quantity = 10 }, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosIns({
        method: 'GET',
        url: `/api/users/${username}/followers`,
        params: {
          p: currentPage,
          n: quantity,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 204) {
        dispatch(followersSlice.actions.setTotalUsers());
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const followersSlice = createSlice({
  name: 'followers',
  initialState: {
    followersUsers: [],
    error: null,
    loading: false,
    isTotalUsers: false,
  },
  reducers: {
    changeStatusUserFollower: (state, action) => {
      const index = state.followersUsers.findIndex((el) => el.username === action.payload.username);
      if (index !== -1) {
        state.followersUsers[index].currUserFollower = !state.followersUsers[index].currUserFollower;
      }
    },
    setTotalUsers: (state, action) => {
      state.isTotalUsers = true;
    },
    removeFollowersUsers: (state, action) => {
      state.followersUsers = [];
    },
  },
  extraReducers: {
    [loadFollowers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loadFollowers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;

      if (state.followersUsers.length === 0) {
        state.followersUsers = action.payload;
      } else {
        state.followersUsers.push(...action.payload);
      }
    },
    [loadFollowers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const followersReducer = followersSlice.reducer;
export const { changeStatusUserFollower, removeFollowersUsers } = followersSlice.actions;
