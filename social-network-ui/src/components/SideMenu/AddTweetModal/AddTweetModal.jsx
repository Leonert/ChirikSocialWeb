import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import AddTweetForm from './AddTweetForm/AddTweetForm';
import CloseButton from './AddTweetForm/CloseButton/CloseButton';

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
  width: '100%',
  minHeight: 288,
  padding: '10px 20px 10px 20px',
  backgroundColor: theme.palette.background.default,
}));

function AddTweetModal({ title, visible, onClose }) {
  return (
    <Content open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <Header id="form-dialog-title">
        <CloseButton onClose={onClose} />
        {title}
      </Header>
      <DialogContents>
        <AddTweetForm minRows={6} title={"What's happening?"} buttonName={'Tweet'} onCloseModal={onClose} />
      </DialogContents>
    </Content>
  );
}

export default AddTweetModal;
