import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../../src/axiosInstance';
import { changeStatusUserLike } from '../postDatas/likesSlice';
import { changeStatusUserRetweet } from '../postDatas/retweetsSlice';

export const loadFollowing = createAsyncThunk(
  'followingSlice/loadFollowing',
  async ({ username, token, currentPage = 0, quantity = 10 }, { rejectWithValue }) => {
    console.log(username);
    // console.log(token);
    try {
      const { data } = await axiosIns({
        method: 'get',
        url: `api/users/followed`,
        params: {
          p: currentPage,
          n: quantity,
          username: username,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(username);

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
        user,
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
  },
  reducers: {},
  extraReducers: {
    [loadFollowing.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loadFollowing.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user.following.push(action.payload);
    },
    [loadFollowing.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [followUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [followUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload.type === 'unsubscribed') {
        state.followingUsers.filter((user) => user.username !== action.payload.username);
      } else {
        state.followingUsers.push(action.payload.user);
      }
    },
    [followUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const followingReducer = followingSlice.reducer;
