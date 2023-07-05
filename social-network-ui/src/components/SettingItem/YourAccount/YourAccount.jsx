// import ArchiveIcon from '@mui/icons-material/Archive';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import KeyIcon from '@mui/icons-material/Key';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changePasswordModal } from '../../../features/slices/settingSlice';
import PasswordChange from '../../PasswordChange/PasswordChange';
import SettingItem from '../SettingItem';

const YourAccount = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.text.secondary;
  const dispatch = useDispatch();
  const sideMenu = useSelector((state) => state.setting.sideSetting);
  const passwordModal = useSelector((state) => state.setting.changePassword);
  const handelClickPassword = () => {
    dispatch(changePasswordModal(true));
  };

  return (
    <div>
      {sideMenu && (
        <>
          <Typography variant={'h5'} sx={{ m: 3 }}>
            Your Account
          </Typography>
          {/* <Typography variant={'h7'} style={{ display: 'block', whiteSpace: 'normal', margin: '20px 10px' }}>
            See information about your account, download an archive of your data, or learn about your account
            deactivation options
          </Typography> */}
          {/* <SettingItem
            // handelClick={handelClickAccount}
            iconItem=<PersonIcon sx={{ color: `${primaryColor}` }} />
            text="Account information"
            information="See your account information like your phone number and email address."
            icon={<ArrowForwardIosIcon sx={{ color: `${primaryColor}` }} />}
          /> */}
          <SettingItem
            handelClick={handelClickPassword}
            iconItem=<KeyIcon sx={{ color: `${primaryColor}` }} />
            text="Change your password"
            information="Change your password at any time."
            icon={<ArrowForwardIosIcon sx={{ color: `${primaryColor}` }} />}
          />
          {/* <SettingItem
        iconItem=<ArchiveIcon sx={{ color: `${primaryColor}` }} />
        text="Download an archive of your data"
        information="Get insights into the type of information stored for your account."
        icon={<ArrowForwardIosIcon sx={{ color: `${primaryColor}` }} />}
      />
      <SettingItem
        iconItem=<PeopleAltIcon sx={{ color: `${primaryColor}` }} />
        text="TweetDeck Teams"
        information="Invite anyone to Tweet from this account using the Teams feature in TweetDeck."
        icon={<ArrowForwardIosIcon sx={{ color: `${primaryColor}` }} />}
      />
      <SettingItem
        iconItem=<DoNotTouchIcon sx={{ color: `${primaryColor}` }} />
        text="Deactivate your account"
        information="Find out how you can deactivate your account."
        icon={<ArrowForwardIosIcon sx={{ color: `${primaryColor}` }} />}
      /> */}
        </>
      )}
      {passwordModal && <PasswordChange />}
    </div>
  );
};

export default YourAccount;
