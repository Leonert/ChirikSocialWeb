import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import React from 'react';
import { useDispatch } from 'react-redux';

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

// selectYourAccount

const SettingMenu = () => {
  const dispatch = useDispatch();

  const handelClickYouAccount = () => {
    dispatch(selectYourAccount());
  };
  const handelClickTwitterBlue = () => {
    dispatch(selectTwitterBlue());
  };

  const handelClickSecurity = () => {
    dispatch(selectSecurity());
  };

  const handelClickPrivacy = () => {
    dispatch(selectPrivacy());
  };
  const handelClickNotifications = () => {
    dispatch(selectNotifications());
  };
  const handelClickAccessibility = () => {
    dispatch(selectAccessibility());
  };
  const handelClickAdditional = () => {
    dispatch(selectAdditional());
  };

  return (
    <>
      <Typography variant={'h5'} sx={{ m: 3 }}>
        Settings
      </Typography>

      <MenuList>
        <SettingItem
          text="Your account"
          icon={<ArrowForwardIosIcon color="primary" />}
          handelClick={handelClickYouAccount}
        />
        <SettingItem
          handelClick={handelClickTwitterBlue}
          text="Twitter Blue"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
        <SettingItem
          handelClick={handelClickSecurity}
          text="Security and account access"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
        <SettingItem
          handelClick={handelClickPrivacy}
          text="Privacy and safety"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
        <SettingItem
          handelClick={handelClickNotifications}
          text="Notifications"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
        <SettingItem
          handelClick={handelClickAccessibility}
          text="Accessibility, display, and languages"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
        <SettingItem
          handelClick={handelClickAdditional}
          text="Additional resources"
          icon={<ArrowForwardIosIcon color="primary" />}
        />
      </MenuList>
    </>
  );
};

export default SettingMenu;
