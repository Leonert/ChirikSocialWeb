import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';

export const getBookmarks = createAsyncThunk('posts/getBookmarks', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosIns.get('/api/bookmarks');

    return data.reverse();
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

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
    removeRetweet: (state, action) => {
      const { id, username } = action.payload;
      state.post = state.post.filter((p) => {
        if (p.originalPost === null) {
          return true;
        } else if (p.originalPost.id === +id && p.author.username === username) {
          return false;
        }

        return true;
      });
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
            originalPost: { ...post.originalPost, bookmarked: !post.originalPost.bookmarked, bookmarksNumber },
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
            originalPost: { ...post.originalPost, liked: !post.originalPost.liked, likesNumber },
          };
        }

        return post;
      });
    },
    addReply: (state, action) => {
      state.post = state.post.map((post) => {
        if (+post.id === +action.payload) {
          return { ...post, repliesNumber: post.repliesNumber + 1 };
        }
        if (post.originalPost && +post.originalPost.id === +action.payload) {
          return {
            ...post,
            originalPost: { ...post.originalPost, repliesNumber: post.originalPost.repliesNumber + 1 },
          };
        }

        return post;
      });
    },
    makeRetweet: (state, action) => {
      const { postId, retweetsNumber } = action.payload;

      state.post = state.post.map((post) =>
        +post.id === +postId ? { ...post, retweeted: !post.retweeted, retweetsNumber } : post
      );
    },
  },
  extraReducers: {
    [getBookmarks.fulfilled]: (state, action) => {
      state.post = [...action.payload];
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
  removeRetweet,
  bookmarksPostNum,
  makeRetweet,
  likesPost,
  addOnePost,
  addReply,
} = homeSlice.actions;
