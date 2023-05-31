import { Avatar, Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { addOnePost, clothReplayModal, replayMessage } from '../../features/slices/homeSlice';
import { EmojiIcon, MediaIcon } from '../../icon';
import ActionIconButton from '../ActionIconButton/ActionIconButton';
import { useAddTweetFormStyles } from '../AddTweetModal/AddTweetForm/AddTweetFormStyles';
import TextInput from './TextInput';

function FormModal({ buttonName }) {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.home.message);
  const id = useSelector((state) => state.home.postId);
  const post = useSelector((state) => state.home.post);
  const user = useSelector((state) => state.auth.user);
  console.log(user)

  const classes = useAddTweetFormStyles();
  const fileInputRef = useRef(null);
  const visiblePoll = false;
  const MAX_LENGTH = 280;
  const handleClickImage = () => {
    fileInputRef.current.click();
  };
  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      dispatch(replayMessage(event.target.value));
    }
  };

  const targetPost = post.find((item) => +item.id === +id);

  const sendRequest = async () => {
    await axiosIns.post('/api/posts', { text, originalPost: targetPost.id }).then((response) => {
      dispatch(addOnePost(response.data));
      dispatch(clothReplayModal());
      dispatch(replayMessage(''));
    });
  };


  return (
    <div>
      {targetPost && (
        <>
          <div className={classes.content}>
            <Avatar aria-label="recipe" alt={targetPost.author.name} src={targetPost.author.profileImage}></Avatar>
            <Typography className={classes.itemNick}>@{targetPost.author.name}</Typography>
          </div>
          <Typography className={classes.item}>Send replay @{targetPost.author.name}</Typography>
          <div className={classes.content}>
            <Avatar />
            <Typography className={classes.itemNick}>@{user.name}</Typography>
          </div>

          <TextInput handleTextChange={handleTextChange} />
          <div className={classes.footer}>
            <div className={classes.footerWrapper}>
              <div className={classes.quoteImage}>
                <ActionIconButton actionText={'Media'} icon={MediaIcon} onClick={handleClickImage} size={'medium'} />
                <ActionIconButton id={'onClickAddEmoji'} actionText={'Emoji'} icon={EmojiIcon} size={'medium'} />
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleTextChange} />
              </div>
            </div>
            <div className={classes.footerAddForm}>
              <Button
                onClick={sendRequest}
                disabled={visiblePoll ? !text || text.length < MAX_LENGTH - 1 : !text || text.length >= MAX_LENGTH + 2}
                color="primary"
                variant="contained"
              >
                {buttonName}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FormModal;
