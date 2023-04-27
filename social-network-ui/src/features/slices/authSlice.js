import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.URL;

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password, rememberMe }) => {
  try {
    const { data } = axios.post(`${URL}login/authenticate`, {
      email,
      password,
      rememberMe,
    });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
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
      state.token = action.payload?.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
