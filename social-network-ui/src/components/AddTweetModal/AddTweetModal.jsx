import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import React from 'react';

import AddTweetForm from './AddTweetForm/AddTweetForm';
import CloseButton from './AddTweetForm/CloseButton/CloseButton';


function AddTweetModal({ title, visible, onClose }) {

  return (
    <Dialog sx={{
        '& .MuiPaper-root': {
            width: '100%',
        },
        top: '-20%',
        '& .MuiDialogTitle-root': {
            padding: '5px 15px',
            marginBottom: 0,
            borderBottom: `1px solid rgb(56, 68, 77)`,
            backgroundColor: 'rgb(21, 32, 43)',
        },
    }} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle sx={{
          padding: '5px 15px',
          margin: 0,
          '& svg': {
              fontSize: 26,
          },}} id="form-dialog-title">
        <CloseButton onClose={onClose} />
        {title}
      </DialogTitle>
      <DialogContent sx={{
          width: '100%',
          minHeight: 288,
          padding: '10px 20px 10px 20px',
          backgroundColor: 'rgb(21, 32, 43)',
      }}>
        <AddTweetForm minRows={6} title={"What's happening?"} buttonName={'Tweet'} onCloseModal={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddTweetModal;
