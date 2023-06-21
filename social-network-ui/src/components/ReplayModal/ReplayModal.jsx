import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clothReplayModal } from '../../features/slices/homeSlice';
import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';
import FormModal from './Form';

const Content = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
  },
  top: '-20%',
  '& .MuiDialogTitle-root': {
    padding: '5px 15px',
    marginBottom: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
}));
const Header = styled(DialogTitle)(({ theme }) => ({
  padding: '5px 15px',
  margin: 0,
  '& svg': {
    fontSize: 26,
  },
}));
const DialogContents = styled(DialogContent)(({ theme }) => ({
  dialogContent: {
    width: '100%',
    minHeight: 288,
    padding: '10px 20px 10px 20px',
    backgroundColor: theme.palette.background.default,
  },
}));

const ReplayModal = () => {
  const dispatch = useDispatch();
  const openReplayM = useSelector((state) => state.home.replayModal);
  const handleClose = () => {
    dispatch(clothReplayModal());
  };

  return (
    <Content open={openReplayM} onClose={handleClose} aria-labelledby="form-dialog-title">
      <Header id="form-dialog-title">
        <CloseButton onClose={handleClose} />
      </Header>
      <DialogContents>
        <FormModal buttonName={'Reply'} />
      </DialogContents>
    </Content>
  );
};
export default ReplayModal;
