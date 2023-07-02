import { Avatar, Button, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Typography from '@mui/material/Typography';
import EmojiPicker from 'emoji-picker-react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axiosIns from '../../axiosInstance';
import { addEmoji, replayMessage } from '../../features/slices/homeSlice';
import { MediaIcon } from '../../icon';
import ActionIconButton from '../ActionIconButton/ActionIconButton';
import { useAddTweetFormStyles } from '../SideMenu/AddTweetModal/AddTweetForm/AddTweetFormStyles';
import TextInput from './TextInput';

function FormModal({ buttonName, posts, onSendRequest }) {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.home.message);
  const id = useSelector((state) => state.home.postId);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const classes = useAddTweetFormStyles();
  const fileInputRef = useRef(null);
  const visiblePoll = false;
  const MAX_LENGTH = 280;

  const handleEmojiSelect = (data) => {
    dispatch(addEmoji(data.emoji));

    setEmojiVisible(false);
  };
  const handleClickImage = () => {
    fileInputRef.current.click();
  };
  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      dispatch(replayMessage(event.target.value));
    }
  };
  let targetPost = posts.find((item) => {
    if (+item.id === +id) {
      return true;
    }
    if (item.originalPost && +item.originalPost.id === +id) {
      return true;
    }

    return false;
  });

  if (targetPost && targetPost.originalPost && +targetPost.originalPost.id === +id) {
    targetPost = targetPost.originalPost;
  }

  const sendRequest = async () => {
    await axiosIns.post('/api/posts', { text, originalPost: targetPost.id }).then((response) => {
      dispatch(replayMessage(''));
      onSendRequest(response.data);
    });
  };

  return (
    <div>
      {targetPost && (
        <>
          <div className={classes.content}>
            <Avatar
              aria-label="recipe"
              alt={targetPost.author && targetPost.author.name ? targetPost.author.name : user.name}
              src={
                targetPost.originalPost
                  ? targetPost.originalPost && targetPost.text != null && targetPost.image == null
                    ? targetPost.author && targetPost.author.profileImage
                      ? targetPost.author.profileImage
                      : user.profileImage
                    : targetPost.originalPost.author.profileImage
                  : targetPost.author && targetPost.author.profileImage
                  ? targetPost.author.profileImage
                  : user.profileImage
              }
            ></Avatar>
            <Typography className={classes.itemNick}>
              @
              {targetPost.originalPost
                ? targetPost.originalPost && targetPost.text != null && targetPost.image == null
                  ? targetPost.author && targetPost.author.name
                    ? targetPost.author.name
                    : user.name
                  : targetPost.originalPost.author.name
                : targetPost.author && targetPost.author.name
                ? targetPost.author.name
                : user.name}
            </Typography>
          </div>
          <Typography className={classes.item}>
            Send replay @{targetPost.author && targetPost.author.name ? targetPost.author.name : user.name}
          </Typography>
          <div className={classes.content}>
            <Avatar aria-label="recipe" alt={user.name} src={user.profileImage} />
            <Typography className={classes.itemNick}>@{user.name}</Typography>
          </div>
          <TextInput handleTextChange={handleTextChange} />
          <IconButton color="primary" aria-label="add to shopping cart" onClick={(e) => setEmojiVisible(!emojiVisible)}>
            <InsertEmoticonIcon />
          </IconButton>
          <div className={classes.footer}>
            <div className={classes.footerWrapper}>
              <div className={classes.quoteImage}>
                <ActionIconButton actionText={'Media'} icon={MediaIcon} onClick={handleClickImage} size={'medium'} />

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
          </div>{' '}
          {emojiVisible && (
            <div className={classes.emojiPickerWrapper}>
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                searchDisabled={true}
                emojiStyle="twitter"
                lazyLoadEmojis={true}
                width="100%"
                height="300px"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FormModal;
