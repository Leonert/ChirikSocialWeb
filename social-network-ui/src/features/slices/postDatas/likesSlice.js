import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../../axiosInstance';

export const getUsersLike = createAsyncThunk(
  'likes/getUsersLike',
  async ({ id, currentPage = 0 }, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosIns({
        method: 'GET',
        url: `/api/posts/${id}/likes?p=${currentPage}&n=10`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 204) {
        dispatch(likesSlice.actions.setTotalUsers());
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    listUsers: [],
    error: null,
    loading: false,
    isOpenLikeModal: false,
    isTotalUsers: false,
  },
  reducers: {
    handleOpenLikeModal: (state, action) => {
      state.isOpenLikeModal = action.payload;
    },
    changeStatusUserLike: (state, action) => {
      const elem = state.listUsers.findIndex((user) => user.username === action.payload.username);
      if (state.listUsers.length !== 0 && elem !== -1) {
        state.listUsers[elem].currUserFollower = !state.listUsers[elem].currUserFollower;
      }
    },
    removeListUsersLike: (state) => {
      state.listUsers = [];
    },
    setTotalUsers: (state, action) => {
      state.isTotalUsers = true;
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
export const { handleOpenLikeModal, changeStatusUserLike, removeListUsersLike, setTotalUsers } = likesSlice.actions;
