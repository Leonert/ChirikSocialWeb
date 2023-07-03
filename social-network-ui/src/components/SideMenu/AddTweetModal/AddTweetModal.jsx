import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import AddTweetForm from './AddTweetForm/AddTweetForm';
import { useAddTweetModalStyles } from './AddTweetModalStyles';

function AddTweetModal({ title, visible, onClose, handleCloseMenu }) {
  const classes = useAddTweetModalStyles();

  return (
    <Dialog className={classes.content} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography className={classes.header} id="form-dialog-title">
        {title}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <AddTweetForm
          minRows={6}
          title={"What's happening?"}
          buttonName={'Tweet'}
          onCloseModal={onClose}
          handleCloseMenu={handleCloseMenu}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddTweetModal;
