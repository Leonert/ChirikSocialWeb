import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clothReplayModal } from '../../features/slices/homeSlice';
import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';
import { useAddTweetModalStyles } from '../SideMenu/AddTweetModal/AddTweetModalStyles';
import FormModal from './Form';

const ReplayModal = () => {
  const dispatch = useDispatch();
  const classes = useAddTweetModalStyles();
  const openReplayM = useSelector((state) => state.home.replayModal);
  const handleClose = () => {
    dispatch(clothReplayModal());
  };
  return (
    <Dialog className={classes.content} open={openReplayM} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.header} id="form-dialog-title">
        <CloseButton onClose={handleClose} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <FormModal buttonName={'Replay'} />
      </DialogContent>
    </Dialog>
  );
};
export default ReplayModal;

// maxRows={6} minRows={6} title={"What's happening?"} buttonName={'Tweet'}
