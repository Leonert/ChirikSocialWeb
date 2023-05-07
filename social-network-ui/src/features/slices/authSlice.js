import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password, rememberMe }) => {
  try {
    const { data } = await axiosIns({
      method: 'post',
      url: `/api/login/authenticate`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: email,
        password,
        rememberMe,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    // console.log(error.response.data.errorMessage);
    // throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: null,
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
      state.user = action.payload?.user;
      state.token = action.payload?.jwt;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
