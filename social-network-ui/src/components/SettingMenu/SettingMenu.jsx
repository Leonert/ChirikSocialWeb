import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAccessibility,
  selectAdditional,
  selectNotifications,
  selectPrivacy,
  selectSecurity,
  selectTwitterBlue,
  selectYourAccount,
} from '../../features/slices/settingSlice';
import SettingItem from '../SettingItem/SettingItem';

const SettingMenu = () => {
  const dispatch = useDispatch();

  const handelClickYouAccount = () => {
    dispatch(selectYourAccount());
  };
  //   const handelClickTwitterBlue = () => {
  //     dispatch(selectTwitterBlue());
  //   };

  //   const handelClickSecurity = () => {
  //     dispatch(selectSecurity());
  //   };

  //   const handelClickPrivacy = () => {
  //     dispatch(selectPrivacy());
  //   };
  //   const handelClickNotifications = () => {
  //     dispatch(selectNotifications());
  //   };
  //   const handelClickAccessibility = () => {
  //     dispatch(selectAccessibility());
  //   };
  //   const handelClickAdditional = () => {
  //     dispatch(selectAdditional());
  //   };

  const account = useSelector((state) => state.setting.yourAccount);
  //   const twitterBlue = useSelector((state) => state.setting.twitterBlue);
  //   const security = useSelector((state) => state.setting.security);
  //   const privacy = useSelector((state) => state.setting.privacy);
  //   const notifications = useSelector((state) => state.setting.notifications);
  //   const accessibility = useSelector((state) => state.setting.accessibility);
  //   const additional = useSelector((state) => state.setting.additional);
  const theme = useTheme();
  const primaryColor = theme.palette.text.secondary;
  const secondaryColor = theme.palette.background.lightBlue;

  return (
    <>
      <Typography variant={'h5'} sx={{ m: 3 }}>
        Settings
      </Typography>

      <MenuList>
        <SettingItem
          handelClick={handelClickYouAccount}
          text="Your account"
          icon={<ArrowForwardIosIcon sx={{ color: account ? `${secondaryColor}` : `${primaryColor}` }} />}
        />

        {/* <SettingItem
          handelClick={handelClickSecurity}
          text="Security and account access"
          icon={<ArrowForwardIosIcon sx={{ color: security ? `${secondaryColor}` : `${primaryColor}` }} />}
        />
        <SettingItem
          handelClick={handelClickPrivacy}
          text="Privacy and safety"
          icon={<ArrowForwardIosIcon sx={{ color: privacy ? `${secondaryColor}` : `${primaryColor}` }} />}
        />
        <SettingItem
          handelClick={handelClickNotifications}
          text="Notifications"
          icon={<ArrowForwardIosIcon sx={{ color: notifications ? `${secondaryColor}` : `${primaryColor}` }} />}
        />
        <SettingItem
          handelClick={handelClickAccessibility}
          text="Accessibility, display, and languages"
          icon={<ArrowForwardIosIcon sx={{ color: accessibility ? `${secondaryColor}` : `${primaryColor}` }} />}
        />
        <SettingItem
          handelClick={handelClickAdditional}
          text="Additional resources"
          icon={<ArrowForwardIosIcon sx={{ color: additional ? `${secondaryColor}` : `${primaryColor}` }} />}
        /> */}
      </MenuList>
    </>
  );
};

export default SettingMenu;
