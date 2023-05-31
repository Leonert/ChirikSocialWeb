import { configureStore } from '@reduxjs/toolkit';

import { authModalReducer } from '../features/slices/authModalSlice';
import { authReducer } from '../features/slices/authSlice';
import { customModalReducer } from '../features/slices/customModalSlice';
import homeSlice from '../features/slices/homeSlice';
import { likesReducer } from '../features/slices/postDatas/likesSlice';
import { retweetsReducer } from '../features/slices/postDatas/retweetsSlice';
import { postReducer } from '../features/slices/postSlice';
import searchSlice from '../features/slices/searchSlice';
import settingSlice from '../features/slices/settingSlice';
import { snackbarReducer } from '../features/slices/snackbarSlice';
import { subscriptionsReducer } from '../features/slices/subscriptionsSlice';
import { followersReducer } from '../features/slices/userDatas/followersSlice';
import { followingReducer } from '../features/slices/userDatas/followingSlice';
import { notificationsReducer } from '../features/slices/userDatas/notificationsSlice';
import messagesSlice from '../features/slices/massagesSlise';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    snackbar: snackbarReducer,
    home: homeSlice,
    post: postReducer,
    subscriptions: subscriptionsReducer,
    following: followingReducer,
    followers: followersReducer,
    notifications: notificationsReducer,
    likes: likesReducer,
    retweets: retweetsReducer,
    customModal: customModalReducer,
    setting: settingSlice,
    search: searchSlice,
    messages: messagesSlice
  },
});
