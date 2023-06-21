import { CircularProgress, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const ContentTextarea = styled(TextareaAutosize)(({ theme }) => ({
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

const TextInput = (props) => {
  const MAX_LENGTH = 280;
  const text = useSelector((state) => state.home.message);
  const textCount = 280 - text.length;
  const textLimitPercent = Math.round((text.length / 280) * 100);

  return (
    <div>
      <div
        style={{
          marginLeft: 15,
          width: '100%',
          backgroundColor: (theme) => theme.palette.background.default,
          borderRadius: '20px !important',
        }}
      >
        <ContentTextarea onChange={props.handleTextChange} placeholder={'Enter Reply...'} value={text} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
