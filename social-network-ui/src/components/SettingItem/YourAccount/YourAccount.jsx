import ArchiveIcon from '@mui/icons-material/Archive';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import KeyIcon from '@mui/icons-material/Key';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import React from 'react';

import SettingItem from '../SettingItem';

const YourAccount = () => {
  return (
    <div>
      <Typography variant={'h5'} sx={{ m: 3 }}>
        You Account
      </Typography>
      <Typography variant={'h7'} style={{ display: 'block', whiteSpace: 'normal', margin: '20px 10px' }}>
        See information about your account, download an archive of your data, or learn about your account deactivation
        options
      </Typography>
      <SettingItem
        iconItem=<PersonIcon color="primary" />
        text="Account information"
        information="See your account information like your phone number and email address."
        icon={<ArrowForwardIosIcon color="primary" />}
      />
      <SettingItem
        iconItem=<KeyIcon color="primary" />
        text="Change your password"
        information="Change your password at any time."
        icon={<ArrowForwardIosIcon color="primary" />}
      />
      <SettingItem
        iconItem=<ArchiveIcon color="primary" />
        text="Download an archive of your data"
        information="Get insights into the type of information stored for your account."
        icon={<ArrowForwardIosIcon color="primary" />}
      />
      <SettingItem
        iconItem=<PeopleAltIcon color="primary" />
        text="TweetDeck Teams"
        information="Invite anyone to Tweet from this account using the Teams feature in TweetDeck."
        icon={<ArrowForwardIosIcon color="primary" />}
      />
      <SettingItem
        iconItem=<DoNotTouchIcon color="primary" />
        text="Deactivate your account"
        information="Find out how you can deactivate your account."
        icon={<ArrowForwardIosIcon color="primary" />}
      />
    </div>
  );
};

export default YourAccount;
