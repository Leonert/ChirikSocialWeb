import { IconButton } from '@mui/material';
import React, { useState } from 'react';

import { useActionIconButtonStyles } from './ActionIconButtonStyles';

const HOVER_DELAY = 500;

const ActionIconButton = ({ id, onClick, icon, size = 'small', disabled }) => {
  const classes = useActionIconButtonStyles();
  const [delayHandler, setDelayHandler] = useState(null);
  const [visibleHoverAction, setVisibleHoverAction] = useState(false);

  const handleHoverAction = () => {
    setDelayHandler(setTimeout(() => setVisibleHoverAction(true), HOVER_DELAY));
  };

  const handleLeaveAction = () => {
    clearTimeout(delayHandler);
    setVisibleHoverAction(false);
  };

  return (
    <div id={id} className={classes.icon}>
      <IconButton
        onClick={onClick}
        onMouseEnter={handleHoverAction}
        onMouseLeave={handleLeaveAction}
        disabled={disabled}
        color="primary"
        size={size}
      >
        <>{icon}</>
      </IconButton>
    </div>
  );
};
export default ActionIconButton;
