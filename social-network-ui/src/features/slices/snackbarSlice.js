import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    status: false,
  },
  reducers: {
    handleSnackbar: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const { handleSnackbar } = snackbarSlice.actions;
