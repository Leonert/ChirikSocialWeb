import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectYourAccount } from '../../features/slices/settingSlice';
import SettingItem from '../SettingItem/SettingItem';

const SettingMenu = () => {
  const dispatch = useDispatch();

  const handelClickYouAccount = () => {
    dispatch(selectYourAccount());
  };

  const account = useSelector((state) => state.setting.yourAccount);
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
      </MenuList>
    </>
  );
};

export default SettingMenu;
