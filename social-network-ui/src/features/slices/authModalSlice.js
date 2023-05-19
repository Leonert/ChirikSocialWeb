import { createSlice } from '@reduxjs/toolkit';

export const SIGN_IN = 'signIn';

const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    status: false,
    login: false,
    modalLogOut: false,
    registrationModal: false,
  },
  reducers: {
    handleModal: (state, action) => {
      state.status = action.payload;
    },
    handleLoginModal: (state, action) => {
      state.login = action.payload;
    },

    handleLogOutModal: (state, action) => {
      state.modalLogOut = action.payload;
    },
    handleRegistrationModal: (state, action) => {
      state.registrationModal = action.payload;
    },
  },
});

export const authModalReducer = authModalSlice.reducer;

export const { handleModal, handleLoginModal, handleLogOutModal, handleRegistrationModal } = authModalSlice.actions;
