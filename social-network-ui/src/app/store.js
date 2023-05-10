import { configureStore } from '@reduxjs/toolkit';

import { authModalReducer } from '../features/slices/authModalSlice';
import { authReducer } from '../features/slices/authSlice';
import homeSlice from '../features/slices/homeSlice';
import { snackbarReducer } from '../features/slices/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    snackbar: snackbarReducer,
    home: homeSlice,
  },
});
