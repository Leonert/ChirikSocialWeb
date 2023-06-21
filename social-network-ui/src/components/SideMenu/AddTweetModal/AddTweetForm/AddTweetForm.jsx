import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Button, CircularProgress, IconButton, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import axiosIns from '../../../../axiosInstance';
import { addOnePost } from '../../../../features/slices/homeSlice';
import { EmojiIcon } from '../../../../icon';
import ActionIconButton from '../../../ActionIconButton/ActionIconButton';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';

const CustomContentTextarea = styled(TextareaAutosize)(({ theme }) => ({
  marginTop: 10,
  width: '98%',
  border: 0,
  fontSize: 20,
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'none',
  backgroundColor: 'transparent',
  caretColor: localStorage.getItem === 'DEFAULT' ? '#000' : '#fff',
  color: localStorage.getItem === 'DEFAULT' ? '#000' : '#fff',
}));
const MAX_LENGTH = 280;

const AddTweetForm = ({ unsentTweet, quoteTweet, maxRows, title, buttonName, onCloseModal }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  // const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
  const [visiblePoll, setVisiblePoll] = useState(false);
  const [remainingChars, setRemainingChars] = useState(280);
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
      dispatch(addOnePost(response.data));
    });

    setText('');
    setVisiblePoll(false);
    // setSelectedScheduleDate(null);
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
      <div style={{ display: 'flex', width: '100%', backgroundColor: (theme) => theme.palette.background.default }}>
        <ProfileAvatar />
        <div
          style={{
            marginLeft: 15,
            width: '100%',
            backgroundColor: (theme) => theme.palette.background.default,
            borderRadius: '20px !important',
          }}
        >
          <CustomContentTextarea
            onChange={handleChangeTextarea}
            placeholder={visiblePoll ? 'Ask a question...' : title}
            value={text}
            maxRows={maxRows}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            paddingTop: 5,
            paddingBottom: 5,
            left: -13,
            justifyContent: 'space-between',
            maxWidth: 450,
            marginTop: 10,
            paddingLeft: 70,
          }}
        >
          {buttonName !== 'Reply' && (
            <div>
              <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClickImage}>
                <PermMediaIcon />
              </IconButton>
              <IconButton color="primary" aria-label="add to shopping cart">
                <InsertEmoticonIcon />
              </IconButton>
              <ActionIconButton id={'onClickAddEmoji'} actionText={'Emoji'} icon={EmojiIcon} size={'medium'} />
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {text && (
            <>
              <span id={'textCount'} style={{ color: (theme) => theme.palette.text.secondary, zIndex: '2' }}>
                {textCount}
              </span>
              <div
                style={{
                  position: 'relative',
                  width: 20,
                  height: 20,
                  margin: '0 10px',
                  '& .MuiCircularProgress-root': {
                    position: 'absolute',
                  },
                }}
              >
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
