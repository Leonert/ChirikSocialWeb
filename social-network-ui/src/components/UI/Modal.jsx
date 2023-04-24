import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';

const CustomModal = styled(MuiDialog)({
  '.MuiDialog-paper': {
    // backgroundColor: 'black',
    backgroundColor: 'yellow',
    maxWidth: '600px',
    width: '100%',
    borderRadius: '8px',
    // color: 'white',
    color: 'black',
  },
});

const Modal = ({ children, open, onClose, headerText, hasLogoIcon = true, sx }) => {
  return (
    <CustomModal PaperProps={{ sx }} open={open} onClose={onClose}>
      <>
        <DialogTitle
          sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          <IconButton sx={{ p: 0 }} onClick={onClose}>
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
          {headerText ? (
            <Typography sx={{ justifySelf: 'center' }}> {headerText}</Typography>
          ) : (
            hasLogoIcon && (
              <TwitterIcon
                sx={{
                  display: 'block',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  justifySelf: 'center',
                }}
              />
            )
          )}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </>
    </CustomModal>
  );
};

export default Modal;
