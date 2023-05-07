import React from 'react';

import { CloseIcon } from '../../../../../icon';
import ActionIconButton from '../../../../ActionIconButton/ActionIconButton';
import { useCloseButtonStyles } from './CloseButtonStyles';

const CloseButton = ({ onClose }) => {
  const classes = useCloseButtonStyles();

  return (
    <div className={classes.close}>
      <ActionIconButton actionText={'Close'} onClick={onClose} icon={CloseIcon} style={{ backgroundColor: 'white' }} />
    </div>
  );
};

export default CloseButton;
