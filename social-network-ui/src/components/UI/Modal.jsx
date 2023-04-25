import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleModal } from '../../features/slices/authModalSlice';
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
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.authModal);
  return (
    <CustomModal PaperProps={{ sx }} open={status} onClose={onClose}>
      <>
        <DialogTitle
          sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          <IconButton
            sx={{ p: 0, width: '30px', height: '30px' }}
            onClick={() => dispatch(handleModal(false))}
          >
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
