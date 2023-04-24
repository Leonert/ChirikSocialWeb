import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    recommendation: true,
    following: false,
    post: [],
  },
  reducers: {
    changeStatusRecommendation: (state) => {
      state.recommendation = true;
      state.following = false;
    },
    changeStatusFollowing: (state) => {
      state.recommendation = false;
      state.following = true;
    },
    getPost: (state, actions) => {
      state.post.push(...actions.payload);
    },
  },
});

export default homeSlice.reducer;
export const { changeStatusRecommendation, changeStatusFollowing, getPost } =
  homeSlice.actions;
