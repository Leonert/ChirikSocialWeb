import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from '../features/slices/testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});
