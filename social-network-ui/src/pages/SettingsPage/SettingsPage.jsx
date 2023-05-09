import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';

import SettingMenu from '../../components/SettingMenu/SettingMenu';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const SettingsPage = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 0 }}>
      <Grid container>
        <Grid item xs={5}>
          <SettingMenu />
        </Grid>
        <Grid item xs={7}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
