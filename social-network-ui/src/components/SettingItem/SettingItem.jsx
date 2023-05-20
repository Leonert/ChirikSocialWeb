import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import React from 'react';

const SettingItem = (props) => {
  return (
    <MenuItem onClick={props.handelClick}>
      {props.iconItem && <ListItemIcon>{props.iconItem}</ListItemIcon>}
      <ListItemText>
        <Typography variant={'h6'} style={{ display: 'block', whiteSpace: 'normal' }}>
          {props.text}
        </Typography>
        {props.information && <span style={{ display: 'block', whiteSpace: 'normal' }}>{props.information}</span>}
      </ListItemText>
      <ListItemIcon>{props.icon}</ListItemIcon>
    </MenuItem>
  );
};

export default SettingItem;
