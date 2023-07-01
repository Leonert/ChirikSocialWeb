import { IconButton } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Chirick } from '../../icon';
import { HOME } from '../../util/path-constants';
import { useSideMenuStyles } from './SideMenuStyles';

const Logo = () => {
  const classes = useSideMenuStyles();

  return (
    <NavLink to={HOME}>
      <div className={classes.logoIcon}>
        <IconButton>
          {Chirick}
          <span className={`${classes.title} ${classes.label}`}>Chirik</span>
        </IconButton>
      </div>
    </NavLink>
  );
};

export default Logo;
