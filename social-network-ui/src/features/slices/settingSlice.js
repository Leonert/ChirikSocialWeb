import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    yourAccount: true,
    // twitterBlue: false,
    security: false,
    // privacy: false,
    // notifications: false,
    // accessibility: false,
    // additional: false,
  },
  reducers: {
    selectYourAccount: (state) => {
      state.yourAccount = true;
      // state.twitterBlue = false;
      state.security = false;
      // state.privacy = false;
      // state.notifications = false;
      // state.accessibility = false;
      // state.additional = false;
    },
    // selectTwitterBlue: (state) => {
    //   state.yourAccount = false;
    //   state.twitterBlue = true;
    //   state.security = false;
    //   state.privacy = false;
    //   state.notifications = false;
    //   state.accessibility = false;
    //   state.additional = false;
    // },
    selectSecurity: (state) => {
      state.yourAccount = false;
      // state.twitterBlue = false;
      state.security = true;
      // state.privacy = false;
      // state.notifications = false;
      // state.accessibility = false;
      // state.additional = false;
    },

    // selectPrivacy: (state) => {
    //   state.yourAccount = false;
    //   state.twitterBlue = false;
    //   state.security = false;
    //   state.privacy = true;
    //   state.notifications = false;
    //   state.accessibility = false;
    //   state.additional = false;
    // },
    // selectNotifications: (state) => {
    //   state.yourAccount = false;
    //   state.twitterBlue = false;
    //   state.security = false;
    //   state.privacy = false;
    //   state.notifications = true;
    //   state.accessibility = false;
    //   state.additional = false;
    // },
    // selectAccessibility: (state) => {
    //   state.yourAccount = false;
    //   state.twitterBlue = false;
    //   state.security = false;
    //   state.privacy = false;
    //   state.notifications = false;
    //   state.accessibility = true;
    //   state.additional = false;
    // },
    // selectAdditional: (state) => {
    //   state.yourAccount = false;
    //   state.twitterBlue = false;
    //   state.security = false;
    //   state.privacy = false;
    //   state.notifications = false;
    //   state.accessibility = false;
    //   state.additional = true;
    // },
  },
});

export default settingSlice.reducer;
export const {
  selectYourAccount,
  // selectTwitterBlue,
  // selectPrivacy,
  // selectNotifications,
  // selectAccessibility,
  // selectAdditional,
  selectSecurity,
} = settingSlice.actions;
