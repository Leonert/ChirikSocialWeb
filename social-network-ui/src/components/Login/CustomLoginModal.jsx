import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogContent, DialogTitle, IconButton, Typography, styled } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';
import { Chirick } from '../../icon';

const CustomModal = styled(MuiDialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    backgroundColor: theme.palette.background.default,
    maxWidth: '600px',
    width: '100%',
    borderRadius: '8px',
    color: 'black',
  },
}));

export const CustomLoginModal = ({ children, open, onClose, headerText, hasLogoIcon = true, sx }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.authModal);

  return (
    <CustomModal PaperProps={{ sx }} open={status} onClose={onClose}>
      <>
        <DialogTitle sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <IconButton
            sx={{ p: 0, width: '30px', height: '30px' }}
            onClick={() => {
              dispatch(handleLoginModal(false));
              dispatch(handleModal(false));
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
          {headerText ? (
            <Typography sx={{ justifySelf: 'center' }}> {headerText}</Typography>
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
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </>
    </CustomModal>
  );
};
