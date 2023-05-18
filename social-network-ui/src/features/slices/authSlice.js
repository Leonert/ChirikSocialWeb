import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';

export const loadFollowers = createAsyncThunk('auth/loadFollowers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'get',
      url: `/api/user/followers`,
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loadFollowing = createAsyncThunk('auth/loadFollowing', async ({ currentPage }, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'get',
      url: `/api/user/following${currentPage}`,
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const unfollowUser = createAsyncThunk('auth/unfollowUser', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'delete',
      url: `/api/user/following/user${id}`,
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
export const followUser = createAsyncThunk('auth/unfollowUser', async ({ username }, { rejectWithValue }) => {
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { data } = await axiosIns({
        method: 'post',
        url: `/api/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          emailAddress: email,
          password,
          rememberMe,
        },
      });

      localStorage.setItem(
        'authData',
        JSON.stringify({
          email,
          password,
          rememberMe,
        })
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.jwt;
      localStorage.setItem('token', action.payload.jwt);
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [loadFollowers.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loadFollowers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user.followers.push(action.payload);
    },
    [loadFollowers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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

export const authReducer = authSlice.reducer;
