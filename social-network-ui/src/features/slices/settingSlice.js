import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosIns from '../../axiosInstance';

export const changePassword = createAsyncThunk(
  'oldPassword/newPassword',
  async ({ oldPass, newPass }, { dispatch, rejectWithValue }) => {
    try {
      const { data, status } = await axiosIns.post(`/api/login/password-change`, {
        oldPassword: oldPass,
        newPassword: newPass,
      });

      if (status === 200) {
        dispatch(changePasswordOk(false));
        setTimeout(() => {
          dispatch(changePasswordModal(false));
          dispatch(changePasswordOk(true));
        }, 2000);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    yourAccount: true,
    security: false,
    status: true,
    changePassword: false,
    accountInformation: false,
    sideSetting: true,
  },
  reducers: {
    selectYourAccount: (state) => {
      state.yourAccount = true;

      state.security = false;
    },

    selectSecurity: (state) => {
      state.yourAccount = false;

      state.security = true;
    },
    changePasswordOk: (state, action) => {
      state.status = action.payload;
    },
    changePasswordModal: (state, action) => {
      state.changePassword = action.payload;
      state.sideSetting = !action.payload;
    },
  },
});

export default settingSlice.reducer;
export const { selectYourAccount, selectSecurity, changePasswordModal, changePasswordOk } = settingSlice.actions;
