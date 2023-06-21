import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'ActionIconButton';
const classes = {
  icon: `${PREFIX}-icon`,
};
const Root = styled('div')(({ theme }) => ({
  [`${classes.icon}`]: {
    display: 'inline-block',
  },
}));
// const HOVER_DELAY = 500;

const ActionIconButton = ({ id, onClick, icon, size = 'small', disabled }) => {
  const delayHandler = null;

  // const handleHoverAction = () => {
  //   setDelayHandler(setTimeout(() => setVisibleHoverAction(true), HOVER_DELAY));
  // };

  const handleLeaveAction = (setVisibleHoverAction) => {
    clearTimeout(delayHandler);
  };

  return (
    <Root id={id} className={classes.icon}>
      <IconButton
        onClick={onClick}
        // onMouseEnter={handleHoverAction}
        onMouseLeave={handleLeaveAction}
        disabled={disabled}
        color="primary"
        size={size}
      >
        <>{icon}</>
      </IconButton>
    </Root>
  );
};
export default ActionIconButton;
