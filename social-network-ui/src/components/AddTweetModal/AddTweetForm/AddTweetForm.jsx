import { Button, CircularProgress, IconButton, TextareaAutosize } from '@material-ui/core';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import axiosIns from '../../../axiosInstance';
import { addOnePost, tweetedPost } from '../../../features/slices/homeSlice';
import { EmojiIcon } from '../../../icon';
import ActionIconButton from '../../ActionIconButton/ActionIconButton';
import { useAddTweetFormStyles } from './AddTweetFormStyles';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';

const MAX_LENGTH = 280;

const AddTweetForm = ({ unsentTweet, quoteTweet, maxRows, title, buttonName, onCloseModal }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
  const [visiblePoll, setVisiblePoll] = useState(false);
  const [remainingChars, setRemainingChars] = useState(280);
  const classes = useAddTweetFormStyles({ qT: quoteTweet, isScheduled: selectedScheduleDate !== null });
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = remainingChars;
  const fileInputRef = useRef(null);
  const params = useParams();

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const getBase64Image = async () => {
    const reader = new FileReader();

    await new Promise((resolve, reject) => {
      reader.onload = function (e) {
        resolve(e.target.result);
      };

      reader.onerror = function (e) {
        reject(e);
      };

      reader.readAsDataURL(fileInputRef.current.files[0]);
    });

    return reader.result;
  };

  const handleChangeTextarea = (event) => {
    const newCount = 280 - event.target.value.length;
    if (newCount >= 0) {
      setRemainingChars(newCount);
      setText(event.target.value);
    }
  };

  const uploadTweetImages = async () => {};

  const handleClickAddTweet = async () => {
    const base64Image = fileInputRef.current.files[0] ? await getBase64Image() : null;
    await axiosIns.post('/api/posts', { text, image: base64Image }).then((response) => {
      if (window.location.pathname !== '/') {
        dispatch(addOnePost(response.data));
      }
    });

    setText('');
    setVisiblePoll(false);
    setSelectedScheduleDate(null);
    onCloseModal();
  };

  const handleClickQuoteTweet = async () => {
    const result = await uploadTweetImages();
    dispatch({
      type: 'ADD_TWEET',
      payload: {
        images: result,
        tweetId: quoteTweet.id,
        userId: params.userId,
      },
    });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: 'Your tweet was sent.',
    });
    setText('');
    if (onCloseModal) onCloseModal();
  };

  const handleClickReplyTweet = async () => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: 'Your tweet was sent.',
    });
    setText('');
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      <div className={classes.content}>
        <ProfileAvatar />
        <div className={classes.textareaWrapper}>
          <TextareaAutosize
            onChange={handleChangeTextarea}
            className={classes.contentTextarea}
            placeholder={visiblePoll ? 'Ask a question...' : title}
            value={text}
            maxRows={maxRows}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.footerAddForm}>
          {text && (
            <>
              <span id={'textCount'} className={classes.textCount}>
                {textCount}
              </span>
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
            onClick={
              buttonName === 'Reply'
                ? handleClickReplyTweet
                : quoteTweet !== undefined
                ? handleClickQuoteTweet
                : handleClickAddTweet
            }
            disabled={visiblePoll ? !text || text.length < MAX_LENGTH - 1 : !text || text.length >= MAX_LENGTH + 2}
            color="primary"
            variant="contained"
          >
            {buttonName}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTweetForm;
