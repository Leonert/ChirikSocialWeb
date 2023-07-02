import { configureStore } from '@reduxjs/toolkit';

import homeReducer, {
  addEmoji,
  addOnePost,
  changeStatusFollowing,
  changeStatusRecommendation,
  clearPosts,
  clearTweetedPost,
  clothReplayModal,
  getBookmarks,
  getPost,
  getPostId,
  openReplayModal,
  replayMessage,
  tweetedPost,
} from './homeSlice';

describe('homeSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        home: homeReducer,
      },
    });
  });

  test('should handle getBookmarks fulfilled', () => {
    const bookmarks = [
      { id: 1, title: 'Bookmark 1' },
      { id: 2, title: 'Bookmark 2' },
    ];
    store.dispatch(getBookmarks.fulfilled(bookmarks));

    const state = store.getState().home;
    expect(state.post).toEqual(bookmarks);
  });

  test('should handle getPost', () => {
    const post = { id: 1, content: 'Post content' };
    store.dispatch(getPost(post));

    const state = store.getState().home;
    expect(state.post).toContainEqual(post);
  });

  test('should handle tweetedPost', () => {
    const tweet = 'New tweet';
    store.dispatch(tweetedPost(tweet));

    const state = store.getState().home;
    expect(state.tweetedPost).toBe(tweet);
  });

  test('should handle changeStatusRecommendation', () => {
    store.dispatch(changeStatusRecommendation());

    const state = store.getState().home;
    expect(state.recommendation).toBe(true);
    expect(state.following).toBe(false);
  });

  test('should handle changeStatusFollowing', () => {
    store.dispatch(changeStatusFollowing());

    const state = store.getState().home;
    expect(state.recommendation).toBe(false);
    expect(state.following).toBe(true);
  });

  test('should handle getPostId', () => {
    const postId = '1';
    store.dispatch(getPostId(postId));

    const state = store.getState().home;
    expect(state.postId).toBe(postId);
    expect(state.modalUser).toBe(true);
  });

  test('should handle openReplayModal', () => {
    const postId = '1';
    store.dispatch(openReplayModal(postId));

    const state = store.getState().home;
    expect(state.postId).toBe(postId);
  });

  test('should handle clothReplayModal', () => {
    store.dispatch(clothReplayModal());

    const state = store.getState().home;
    expect(state.postId).toBe('');
  });

  test('should handle replayMessage', () => {
    const message = 'Reply message';
    store.dispatch(replayMessage(message));

    const state = store.getState().home;
    expect(state.message).toBe(message);
  });

  test('should handle clearPosts', () => {
    store.dispatch(clearPosts());

    const state = store.getState().home;
    expect(state.post).toEqual([]);
  });

  test('should handle bookmarksPost', () => {
    const postId = '1';
    const bookmarksNumber = 5;

    const initialState = {
      post: [
        { id: '1', bookmarked: false, bookmarksNumber: 0 },
        { id: '2', bookmarked: true, bookmarksNumber: 10 },
      ],
    };
    store = configureStore({
      reducer: {
        home: homeReducer,
      },
      preloadedState: initialState,
    });
  });

  test('should handle removeRetweet', () => {
    const retweetedPost = { id: '1', author: { username: 'user1' } };

    const initialState = {
      post: [
        { id: '1', originalPost: null },
        { id: '2', originalPost: { id: '1', author: { username: 'user1' } } },
        { id: '3', originalPost: { id: '2', author: { username: 'user2' } } },
      ],
    };
  });

  test('should handle likesPost', () => {
    const likedPost = { id: '1', likesNumber: 10 };

    const initialState = {
      post: [
        { id: '1', liked: false, likesNumber: 0 },
        { id: '2', liked: true, likesNumber: 20 },
      ],
    };
  });

  test('should handle addOnePost', () => {
    const newPost = { id: '1', content: 'New post' };
    store.dispatch(addOnePost(newPost));

    const state = store.getState().home;
    expect(state.post[0]).toEqual(newPost);
  });

  test('should handle addReply', () => {
    const postId = '1';

    const initialState = {
      post: [
        { id: '1', repliesNumber: 0 },
        { id: '2', repliesNumber: 5 },
      ],
    };
  });

  test('should handle clearTweetedPost', () => {
    store.dispatch(clearTweetedPost());

    const state = store.getState().home;
    expect(state.tweetedPost).toBe('');
  });

  test('should handle addEmoji', () => {
    const emoji = '😊';
    store.dispatch(addEmoji(emoji));

    const state = store.getState().home;
    expect(state.message).toBe(emoji);
  });

  test('should handle makeRetweet', () => {
    const retweetedPost = { id: '1', retweetsNumber: 5 };

    // Set up initial state
    const initialState = {
      post: [
        { id: '1', retweeted: false, retweetsNumber: 0 },
        { id: '2', retweeted: true, retweetsNumber: 10 },
      ],
    };
  });
});
