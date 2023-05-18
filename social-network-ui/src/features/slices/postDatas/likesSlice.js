import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getUsersLike = createAsyncThunk(
  'likes/getUsersLike',
  async ({ id, currentPage = 0 }, { rejectWithValue }) => {
    // console.log(currentPage);
    try {
      const { data } = await axiosIns({
        method: 'GET',
        url: `/api/posts/1/likes?p=${currentPage}&n=5`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    listUsers: null,
    error: null,
    loading: false,
    isOpenLikeModal: false,
  },
  reducers: {
    handleOpenLikeModal: (state, action) => {
      state.isOpenLikeModal = action.payload;
    },
  },
  extraReducers: {
    [getUsersLike.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUsersLike.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      if (state.listUsers === null) {
        state.listUsers = action.payload;
      } else {
        state.listUsers = [...state.listUsers, ...action.payload];
      }
    },
    [getUsersLike.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const likesReducer = likesSlice.reducer;
export const { handleOpenLikeModal } = likesSlice.actions;
