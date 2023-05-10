import { ListItemIcon, ListItemText, MenuItem, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

const SettingItem = (props) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(max-width: 960px)');

  let fontSize = '1.1rem';
  let spanWidth = '70%';
  if (isSmallScreen) {
    fontSize = '0.6rem';
  } else if (isMediumScreen) {
    fontSize = '0.8rem';
  }

  return (
    <MenuItem onClick={props.handelClick}>
      {props.iconItem && <ListItemIcon >{props.iconItem}</ListItemIcon>}
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
