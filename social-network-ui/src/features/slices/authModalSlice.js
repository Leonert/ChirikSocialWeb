import { createSlice } from '@reduxjs/toolkit';

export const SIGN_IN = 'signIn';

const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    status: false,
    login: false,
  },
  reducers: {
    handleModal: (state, action) => {
      state.status = action.payload;
    },
    handleLoginModal: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const authModalReducer = authModalSlice.reducer;
export const { handleModal, handleLoginModal } = authModalSlice.actions;
