import { configureStore } from '@reduxjs/toolkit';

import { authModalReducer } from '../features/slices/authModalSlice';
import homeSlice from '../features/slices/homeSlice';

export const store = configureStore({
  reducer: { authModal: authModalReducer, home: homeSlice },
});
