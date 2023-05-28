import { createSlice } from '@reduxjs/toolkit';

const customModalSlice = createSlice({
  name: 'customModal',
  initialState: {
    open: false,
  },
  reducers: {
    handleCustomModal: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const customModalReducer = customModalSlice.reducer;
export const { handleCustomModal } = customModalSlice.actions;
