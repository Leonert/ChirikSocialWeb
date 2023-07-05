import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import React from 'react';

import { Chirick } from '../../icon';

const CustomModal = styled(MuiDialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    backgroundColor: theme.palette.background.default,
    maxWidth: '600px',
    width: '100%',
    borderRadius: '8px',
    color: 'white',
  },
}));

const Modal = ({ children, open, onClose, headerText, hasLogoIcon = true, sx, headerActions }) => {
  return (
    <CustomModal PaperProps={{ sx }} open={open} onClose={onClose}>
      <>
        <DialogTitle sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <IconButton sx={{ p: 0 }} onClick={onClose}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
          {headerText ? (
            <Typography sx={{ justifySelf: 'center' }}>{headerText}</Typography>
          ) : (
            hasLogoIcon && (
              <Box
                sx={{
                  marginLeft: 7,
                  '& .MuiIconButton-root': {
                    minWidth: 52,
                    minHeight: 52,
                    '& svg': {
                      color: (theme) => theme.palette.primary.main,
                      height: '2rem',
                      width: '2rem',
                    },
                  },
                }}
              >
                <IconButton>{Chirick}</IconButton>
              </Box>
            )
          )}
          {headerActions}
        </DialogTitle>
        <DialogContent> {children}</DialogContent>
      </>
    </CustomModal>
  );
};

export default Modal;
