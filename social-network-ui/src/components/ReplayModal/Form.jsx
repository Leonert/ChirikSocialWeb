import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clothReplayModal } from '../../features/slices/homeSlice';
import { EmojiIcon, MediaIcon } from '../../icon';
import ActionIconButton from '../ActionIconButton/ActionIconButton';
import { useAddTweetFormStyles } from '../SideMenu/AddTweetModal/AddTweetForm/AddTweetFormStyles';

const MAX_LENGTH = 280;

function FormModal({ buttonName }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
  const [visiblePoll, setVisiblePoll] = useState(false);
  const [remainingChars, setRemainingChars] = useState(280);
  const openReplayM = useSelector((state) => state.home.replayModal);
  const id = useSelector((state) => state.home.postId);
  const post = useSelector((state) => state.home.post);
  const classes = useAddTweetFormStyles();
  const MAX_LENGTH = 280;
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = MAX_LENGTH - text.length;
  const fileInputRef = useRef(null);

  const handleClickImage = () => {
    fileInputRef.current.click();
  };
  const handleTextChange = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      setRemainingChars(newCount);
      setText(event.target.value);
    }
  };

  const userPost = 'img';
  const targetPost = post.find((post) => post.id === id);

  const sendRequest = (follower) => {
    alert(`${follower} replay ${text} on tweet ${targetPost.id} to user ${targetPost.nickname}`);
    dispatch(clothReplayModal());
    setText('');
  };
  const userName = 'like This Name';

  return (
    <div>
      {targetPost && (
        <>
          <div className={classes.content}>
            <Avatar aria-label="recipe" alt={targetPost.name} src={targetPost.avatar}></Avatar>
            <Typography className={classes.itemNick}>{targetPost.nickname}</Typography>
          </div>
          <Typography className={classes.item}>Send replay</Typography>
          <div className={classes.content}>
            <Avatar />
            <Typography className={classes.itemNick}>{userName}</Typography>
          </div>
          <div className={classes.textareaWrapper}>
            <TextareaAutosize
              onChange={handleTextChange}
              className={classes.contentTextarea}
              placeholder={'Enter replay...'}
              value={text}
              maxRows={6}
            />
          </div>
          <div className={classes.footer}>
            <div className={classes.footerWrapper}>
              <div className={classes.quoteImage}>
                <ActionIconButton actionText={'Media'} icon={MediaIcon} onClick={handleClickImage} size={'medium'} />
                <ActionIconButton id={'onClickAddEmoji'} actionText={'Emoji'} icon={EmojiIcon} size={'medium'} />
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleTextChange} />
              </div>
            </div>
            <div className={classes.footerAddForm}>
              {text && (
                <>
                  <span id={'textCount'}>{textCount}</span>
                  <div className={classes.footerAddFormCircleProgress}>
                    <CircularProgress
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                      style={text.length >= MAX_LENGTH ? { color: 'red' } : undefined}
                    />
                    <CircularProgress
                      style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={100}
                    />
                  </div>
                </>
              )}
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
