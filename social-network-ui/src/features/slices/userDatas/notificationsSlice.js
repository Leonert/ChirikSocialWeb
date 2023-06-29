import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getNotifications = createAsyncThunk('notifications/getNotifications', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'GET',
      url: `api/notifications`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    error: null,
    loading: false,
  },
  reducers: {
    removeNotifications: (state, actions) => {
      state.list = [];
    },
    addNotification: (state, action) => {
      state.list = [action.payload, ...state.list];
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload === '' ? [] : action.payload;
    },
    [getNotifications.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;
export const { removeNotifications, addNotification } = notificationsSlice.actions;
