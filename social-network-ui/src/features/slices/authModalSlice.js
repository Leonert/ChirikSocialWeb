import { createSlice } from '@reduxjs/toolkit';

const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    status: false,
  },
  reducers: {
    handleModal: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const authModalReducer = authModalSlice.reducer;
export const { handleModal } = authModalSlice.actions;
