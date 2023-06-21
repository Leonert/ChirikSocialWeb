import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../../src/axiosInstance';
import { changeStatusUserLike } from '../postDatas/likesSlice';
import { changeStatusUserRetweet } from '../postDatas/retweetsSlice';
import { changeStatusUserFollower } from './followersSlice';

export const loadFollowing = createAsyncThunk(
  'followingSlice/loadFollowing',
  async ({ username, currentPage = 0, quantity = 10 }, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosIns({
        method: 'GET',
        url: `/api/users/${username}/followed`,
        params: {
          p: currentPage,
          n: quantity,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 204) {
        dispatch(followingSlice.actions.setTotalUsers());
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const followUser = createAsyncThunk('following/followUser', async ({ user }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'POST',
      url: `/api/users/p/${user.username}`,
    });

    dispatch(changeStatusUserFollower(user));
    dispatch(changeStatusUserLike(user));
    dispatch(changeStatusUserRetweet(user));

    if (data.message === 'User was unsubscribed') {
      return {
        type: 'unsubscribed',
        username: user.username,
      };
    } else {
      return {
        type: 'subscribed',
        username: user.username,
      };
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const followingSlice = createSlice({
  name: 'following',
  initialState: {
    followingUsers: [],
    error: null,
    loading: false,
    isTotalUsers: false,
  },
  reducers: {
    addFollowingUser(state, action) {
      state.followingUsers.push(action.payload);
    },
    setTotalUsers: (state, action) => {
      state.isTotalUsers = true;
    },
    removeFollowingUsers: (state, action) => {
      state.followingUsers = [];
    },
  },
  extraReducers: {
    [loadFollowing.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loadFollowing.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      if (state.followingUsers.length === 0) {
        state.followingUsers.push(...action.payload);
      } else {
        state.followingUsers = [...state.followingUsers, ...action.payload];
      }
    },
    [loadFollowing.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [followUser.pending]: (state, action) => {
      state.error = null;
    },
    [followUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;

      const userIndex = state.followingUsers.findIndex((item) => item.username === action.payload.username);
      if (userIndex !== -1) {
        state.followingUsers[userIndex].currUserFollower = !state.followingUsers[userIndex].currUserFollower;
      }
    },
    [followUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { addFollowingUser, removeFollowingUsers } = followingSlice.actions;
export const followingReducer = followingSlice.reducer;
