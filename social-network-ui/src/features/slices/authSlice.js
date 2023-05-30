import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';
import { TOKEN } from '../../util/constants';

export const loginUserWithJwt = createAsyncThunk('auth/loginUserWithJwt', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'GET',
      url: `/api/login/jwt`,
      headers: {
        'Content-Type': 'application/json',
      },
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
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(TOKEN);
    },
  },
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
      localStorage.setItem(TOKEN, action.payload.jwt);
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginUserWithJwt.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginUserWithJwt.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.jwt;
      localStorage.setItem(TOKEN, action.payload.jwt);
    },
    [loginUserWithJwt.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logoutUser } = authSlice.actions;
