import { Button } from '@mui/material';
import React from 'react';

import { CloseIcon } from '../../../../../icon';
import { useCloseButtonStyles } from './CloseButtonStyles';

const CloseButton = ({ onClose }) => {
  const classes = useCloseButtonStyles();

  return (
    <div className={classes.close}>
      <Button onClick={onClose} className={classes.closeButton}>
        {CloseIcon}
      </Button>
    </div>
  );
};

export default CloseButton;
