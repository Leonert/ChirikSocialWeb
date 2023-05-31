import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    id: null,
    createdDate: null,
    text: null,
    image: null,
    likesNumber: null,
    bookmarksNumber: null,
    retweetsNumber: null,
    repliesNumber: null,
    originalPost: null,
    author: null,
    retweeted: null,
    liked: null,
    bookmarked: null,
  },
  reducers: {
    setPost: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBookmark: (state, action) => {
      return { ...state, bookmarked: !state.bookmarked, bookmarksNumber: action.payload };
    },
    setLike: (state, action) => {
      return { ...state, liked: !state.liked, likesNumber: action.payload };
    },
    addReply: (state) => {
      return { ...state, repliesNumber: state.repliesNumber + 1 };
    },
    makeRetweet: (state, action) => {
      return { ...state, retweeted: !state.retweeted, retweetsNumber: action.payload };
    },
  },
});

export const postReducer = postSlice.reducer;
export const { setPost, setBookmark, setLike, addReply, makeRetweet } = postSlice.actions;
