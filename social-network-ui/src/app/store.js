import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../features/slices/loginSlice';
import { authModalReducer } from '../features/slices/authModalSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    authModal: authModalReducer,
  },
});
