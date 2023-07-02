import { Button, CircularProgress, IconButton, TextareaAutosize } from '@material-ui/core';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiPicker from 'emoji-picker-react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import axiosIns from '../../../../axiosInstance';
import { tweetedPost } from '../../../../features/slices/homeSlice';
import { EmojiIcon } from '../../../../icon';
import ActionIconButton from '../../../ActionIconButton/ActionIconButton';
import AvatarLink from '../../../UI/AvatarLink';
import { useAddTweetFormStyles } from './AddTweetFormStyles';
import CloseButton from './CloseButton/CloseButton';

const MAX_LENGTH = 280;

const AddTweetForm = ({ unsentTweet, quoteTweet, maxRows, title, buttonName, onCloseModal, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
  const [visiblePoll, setVisiblePoll] = useState(false);
  const [remainingChars, setRemainingChars] = useState(280);
  const [selectedImage, setSelectedImage] = useState(null);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const classes = useAddTweetFormStyles({ qT: quoteTweet, isScheduled: selectedScheduleDate !== null });
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = remainingChars;
  const fileInputRef = useRef(null);
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const handleEmojiSelect = (data) => {
    setText((prevText) => prevText + data.emoji);

    setEmojiVisible(false);
  };
  const handleClickImage = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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
    const base64Image = selectedImage ? await getBase64Image() : null;
    await axiosIns.post('/api/posts', { text, image: base64Image }).then((res) => {
      if (window.location.pathname !== '/') {
        dispatch(tweetedPost(res.data));
      }
      if (handleCloseMenu) {
        handleCloseMenu();
      }
    });

    setText('');
    setVisiblePoll(false);
    setSelectedScheduleDate(null);
    onCloseModal();
    setSelectedImage(null);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
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
        <AvatarLink avatar={user.profileImage} name={user.username} />
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
        <div className={classes.footerWrapper}>
          {buttonName !== 'Reply' && (
            <div className={classes.quoteImage}>
              <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClickImage}>
                <PermMediaIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={(e) => setEmojiVisible(!emojiVisible)}
              >
                <InsertEmoticonIcon />
              </IconButton>
              <ActionIconButton id={'onClickAddEmoji'} actionText={'Emoji'} icon={EmojiIcon} size={'medium'} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
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
            disabled={(visiblePoll ? !text || text.length < MAX_LENGTH - 1 : !text) && !selectedImage}
            color="primary"
            variant="contained"
          >
            {buttonName}
          </Button>
        </div>
      </div>
      {selectedImage && (
        <div className={classes.selectedImageWrapper}>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={classes.selectedImage} />

          <CloseButton onClose={handleCloseImage} classesProps={classes.selectedImageClothe} />
        </div>
      )}
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
  );
};

export default AddTweetForm;
