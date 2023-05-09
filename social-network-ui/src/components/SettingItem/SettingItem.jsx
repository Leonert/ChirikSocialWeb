import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import React from 'react';

const SettingItem = (props) => {
  return (
    <MenuItem onClick={props.handelClick}>
      <ListItemText>
        <Typography variant={'h6'}>{props.text}</Typography>
      </ListItemText>
      <ListItemIcon>{props.icon}</ListItemIcon>
    </MenuItem>
  );
};

export default SettingItem;
