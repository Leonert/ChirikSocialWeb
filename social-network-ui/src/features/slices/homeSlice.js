import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    recommendation: true,
    following: false,
    modalUser: false,
    post: [],
    postId: '',
    replayModal: false,
    message: '',
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
      state.modalUser = true;
    },
    openReplayModal: (state, actions) => {
      state.postId = actions.payload;
      state.replayModal = true;
    },
    clothReplayModal: (state) => {
      state.postId = '';
      state.replayModal = false;
    },
    replayMessage: (state, actions) => {
      state.message = actions.payload;
    },
  },
});

export default homeSlice.reducer;
export const {
  changeStatusRecommendation,
  changeStatusFollowing,
  getPost,
  getPostId,
  openReplayModal,
  clothReplayModal,
  replayMessage,
} = homeSlice.actions;
