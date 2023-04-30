import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clothReplayModal } from '../../features/slices/homeSlice';
import MyForm from './Form';

export default function ReplayModal() {
  const dispatch = useDispatch();
  const openReplayM = useSelector((state) => state.home.replayModal);
  const id = useSelector((state) => state.home.postId);
  const text = useSelector((state) => state.home.message);
  const post = useSelector((state) => state.home.post);
  const handleClose = () => {
    dispatch(clothReplayModal());
  };

  const userPost = 'img';
  const targetPost = post.find((post) => post.id === id);
  const sendRequest = (name, id, message, follower) => {
    alert(`${follower} replay ${message} on tweet ${id} to user ${targetPost.nickname}`);
    dispatch(clothReplayModal());
  };
  const userName = 'like This';
  const useRetweeted = 'some user';
  return (
    <div>
      {targetPost && (
        <Dialog open={openReplayM} onClose={handleClose}>
          <DialogTitle>
            <Avatar aria-label="recipe" alt={targetPost.nickname} src={targetPost.avatar}></Avatar>{' '}
          </DialogTitle>
          <DialogTitle> {targetPost.nickname}</DialogTitle>
          <DialogTitle>From </DialogTitle>
          <DialogTitle>{useRetweeted} </DialogTitle>

          <MyForm />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => sendRequest(userName, id, text, useRetweeted)}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
