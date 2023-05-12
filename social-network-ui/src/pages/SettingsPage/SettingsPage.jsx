import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import YourAccount from '../../components/SettingItem/YourAccount/YourAccount';
import SettingMenu from '../../components/SettingMenu/SettingMenu';

const SettingsPage = () => {
  const account = useSelector((state) => state.setting.yourAccount);
  // const twitterBlue = useSelector((state) => state.setting.twitterBlue);
  // const security = useSelector((state) => state.setting.security);
  // const privacy = useSelector((state) => state.setting.privacy);
  // const notifications = useSelector((state) => state.setting.notifications);
  // const accessibility = useSelector((state) => state.setting.accessibility);
  // const additional = useSelector((state) => state.setting.additional);

  return (
    <Box sx={{ flexGrow: 1, mt: 0 }}>
      <Grid container>
        <Grid item xs={5}>
          <SettingMenu />
        </Grid>
        <Grid item xs={7}>
          {account && <YourAccount />}
          {/* {twitterBlue && <p>twitterBlue</p>}
          {security && <p>security</p>}
          {privacy && <p>privacy</p>}
          {notifications && <p>notifications</p>}
          {accessibility && <p>accessibility</p>}
          {additional && <p>additional</p>} */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
