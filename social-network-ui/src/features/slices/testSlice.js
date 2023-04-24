import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'loginModal',
  initialState: {
    open: false,
  },
  reducers: {
    handleOpenModal: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const testReducer = testSlice.reducer;
export const { handleOpenModal } = testSlice.actions;
