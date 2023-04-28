import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    recommendation: true,
    following: false,
    modalUser: false,
    post: [],
    postId: "",
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
    getPostId: (state, actions) => {
      state.postId = actions.payload;
      state.modalUser= true
    },
  },
});

export default homeSlice.reducer;
export const { changeStatusRecommendation, changeStatusFollowing, getPost, getPostId } = homeSlice.actions;
