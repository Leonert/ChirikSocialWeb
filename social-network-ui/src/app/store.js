import { configureStore } from '@reduxjs/toolkit';

import { authModalReducer } from '../features/slices/authModalSlice';
import { authReducer } from '../features/slices/authSlice';
import { customModalReducer } from '../features/slices/customModalSlice';
import homeSlice from '../features/slices/homeSlice';
import { likesReducer } from '../features/slices/postDatas/likesSlice';
import { retweetsReducer } from '../features/slices/postDatas/retweetsSlice';
import { snackbarReducer } from '../features/slices/snackbarSlice';
import { subscriptionsReducer } from '../features/slices/subscriptionsSlice';
import { followingReducer } from '../features/slices/userDatas/followingSlice';
import { notificationsReducer } from '../features/slices/userDatas/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    snackbar: snackbarReducer,
    home: homeSlice,
    subscriptions: subscriptionsReducer,
    following: followingReducer,
    notifications: notificationsReducer,
    likes: likesReducer,
    retweets: retweetsReducer,
    customModal: customModalReducer,
  },
});
