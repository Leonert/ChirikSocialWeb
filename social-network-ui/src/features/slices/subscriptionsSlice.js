import { createSlice } from '@reduxjs/toolkit';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    followers: false,
    following: false,
  },
  reducers: {
    handleFollowers: (state, action) => {
      state.followers = action.payload;
    },
    handleFollowing: (state, action) => {
      state.following = action.payload;
    },
  },
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
export const { handleFollowers, handleFollowing } = subscriptionsSlice.actions;
