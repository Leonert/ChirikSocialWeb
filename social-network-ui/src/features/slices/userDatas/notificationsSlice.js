import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async ({ token }, { rejectWithValue }) => {
    console.log(token);
    try {
      const { data } = await axiosIns({
        method: 'get',
        url: `/api/notifications`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload;
    },
    [getNotifications.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;
