import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('login/loginUser', async ({ email, password }) => {
  try {
    const { data } = axios.post('/users', {
      email,
      password,
    });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const loginReducer = loginSlice.reducer;
