import { Button } from '@material-ui/core';
import React from 'react';

import { CloseIcon } from '../../../../../icon';
import { useCloseButtonStyles } from './CloseButtonStyles';

const CloseButton = ({ onClose, classesProps }) => {
  const classes = useCloseButtonStyles();

  return (
    <div className={classes.close}>
      <Button onClick={onClose} className={classesProps || classes.closeButton} data-testid="close-button">
        {CloseIcon}
      </Button>
    </div>
  );
};

export default CloseButton;
