import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import React from 'react';

const LogOutButton = (props) => {
  return (
    <IconButton onClick={props.handelClick} data-testid="log-out-button">
      <LogoutIcon sx={{ color: '#fff' }} />
    </IconButton>
  );
};

export default LogOutButton;
