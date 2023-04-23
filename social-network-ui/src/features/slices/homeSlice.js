import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    recommendation: true,
    following: false,
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
  },
});

export default homeSlice.reducer;
export const { changeStatusRecommendation, changeStatusFollowing } =
  homeSlice.actions;
