import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = process.env.URL;
const URL = 'http://localhost:8080/';
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password, rememberMe }) => {
  try {
    const { data } = axios({
      method: 'post',
      url: `${URL}api/login/authenticate`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: email,
        password,
        rememberMe,
      },
    });

    return data;
  } catch (error) {
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
      state.token = action.payload?.jwt;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
