import { CircularProgress, TextareaAutosize } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { useAddTweetFormStyles } from '../SideMenu/AddTweetModal/AddTweetForm/AddTweetFormStyles';

const TextInput = (props) => {
  const MAX_LENGTH = 280;
  const text = useSelector((state) => state.home.message);
  const textCount = 280 - text.length;
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const classes = useAddTweetFormStyles();

  return (
    <div>
      <div className={classes.textareaWrapper}>
        <TextareaAutosize
          onChange={props.handleTextChange}
          className={classes.contentTextarea}
          placeholder={'Enter Reply...'}
          value={text}
        />
      </div>
      <div className={classes.footerAddFormProgress}>
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
            style={{ color: 'rgba(226, 216, 216, 0.1)' }}
            variant="determinate"
            size={20}
            thickness={5}
            value={100}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
