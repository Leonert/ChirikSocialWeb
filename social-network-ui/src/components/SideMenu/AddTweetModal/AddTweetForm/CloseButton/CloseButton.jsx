import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { CloseIcon } from '../../../../../icon';

const Close = styled('div')(({ theme }) => ({
  width: '10px ! important',
  '& .MuiIconButton-root': {
    marginRight: 15,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.text.secondary,
  },
}));

const CloseButton = ({ onClose }) => {
  return (
    <Close>
      <Button onClick={onClose} sx={{ color: '#fff !important' }}>
        {CloseIcon}
      </Button>
    </Close>
  );
};

export default CloseButton;
