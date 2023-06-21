import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';
import { useAddTweetModalStyles } from '../SideMenu/AddTweetModal/AddTweetModalStyles';
import FormModal from './Form';

const ReplayModal = ({ openModal, handleClose, posts, onSendRequest }) => {
  const classes = useAddTweetModalStyles();
  const open = openModal || false;

  return (
    <Dialog className={classes.content} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.header} id="form-dialog-title">
        <CloseButton onClose={handleClose} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <FormModal buttonName={'Reply'} posts={posts} onSendRequest={onSendRequest} />
      </DialogContent>
    </Dialog>
  );
};

export default ReplayModal;
