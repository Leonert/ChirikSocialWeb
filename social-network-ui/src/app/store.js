import { configureStore } from '@reduxjs/toolkit';

import { authModalReducer } from '../features/slices/authModalSlice';
import { authReducer } from '../features/slices/authSlice';
import homeSlice from '../features/slices/homeSlice';
import searchSlice from '../features/slices/searchSlice';
import settingSlice from '../features/slices/settingSlice';
import { snackbarReducer } from '../features/slices/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    snackbar: snackbarReducer,
    home: homeSlice,
    setting: settingSlice,
    search: searchSlice,
  },
});
