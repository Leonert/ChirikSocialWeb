import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../../src/axiosInstance';

export const loadFollowing = createAsyncThunk(
  'followingSlice/loadFollowing',
  async ({ username, token, currentPage = 0, quantity = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosIns({
        method: 'get',
        url: `/api/users/followed/p=${currentPage}&n=${quantity}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        data: {
          username,
        },
      });

      console.log(username);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'followingSlice/unfollowUser',
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data } = await axiosIns({
        method: 'delete',
        url: `/api/user/following/user${username}`,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const followUser = createAsyncThunk('followingSlice/followUser', async ({ username }, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'put',
      url: `/api/user/following/users`,
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const followingSlice = createSlice({
  name: 'following',
  initialState: {
    users: null,
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
    [unfollowUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user.following.users.filter((user) => user._id !== action.payload);
    },
    [unfollowUser.rejected]: (state, action) => {
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
      state.user.following.users.filter((user) => user._id !== action.payload);
    },
    [followUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const followingReducer = followingSlice.reducer;
