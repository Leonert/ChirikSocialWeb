import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

import AddTweetForm from './AddTweetForm/AddTweetForm';
import CloseButton from './AddTweetForm/CloseButton/CloseButton';
import { useAddTweetModalStyles } from './AddTweetModalStyles';

function AddTweetModal({ title, visible, onClose }) {
  const classes = useAddTweetModalStyles();

  return (
    <Dialog className={classes.content} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.header} id="form-dialog-title">
        <CloseButton onClose={onClose} />
        {title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <AddTweetForm minRows={6} title={"What's happening?"} buttonName={'Tweet'} onCloseModal={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddTweetModal;
