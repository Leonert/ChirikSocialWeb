import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../features/slices/loginUser';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
