import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';

export const GetPosts = createAsyncThunk('posts/getPost', async (portion, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns({
      method: 'GET',
      url: `api/posts?p=${portion}&n=20`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data.reverse();
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

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
    getPost: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.post.push(...action.payload);
      } else {
        state.post.push(action.payload);
      }
    },
    addOnePost: (state, action) => {
      state.post.unshift(action.payload);
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
    clearPosts: (state) => {
      state.post = [];
    },

    bookmarksPost: (state, action) => {
      const { postId, bookmarksNumber } = action.payload;

      state.post = state.post.map((post) => {
        if (+post.id === +postId) {
          return { ...post, bookmarked: !post.bookmarked, bookmarksNumber };
        }
        if (post.originalPost && +post.originalPost.id === +postId) {
          return {
            ...post,
            originalPost: { ...post.originalPost, bookmarksNumber },
          };
        }

        return post;
      });
    },

    likesPost: (state, action) => {
      const { postId, likesNumber } = action.payload;

      state.post = state.post.map((post) => {
        if (+post.id === +postId) {
          return { ...post, liked: !post.liked, likesNumber };
        }
        if (post.originalPost && +post.originalPost.id === +postId) {
          return {
            ...post,
            originalPost: { ...post.originalPost, likesNumber },
          };
        }

        return post;
      });
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
  clearPosts,
  bookmarksPost,
  bookmarksPostNum,
  likesPost,
  addOnePost,
} = homeSlice.actions;
