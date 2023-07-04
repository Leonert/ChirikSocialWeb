import { styled } from '@mui/material/styles';
import React from 'react';

const SpinnerCircle = styled('div')(({ theme }) => ({
  height: 26,
  width: 26,
  animation: 'spin 0.75s linear 0s infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const Spinner = ({ p }) => {
  const SpinnerContainer = styled('div')(({ theme }) => ({
    width: 30,
    margin: '0px auto',
    padding: p,
  }));

  return (
    <SpinnerContainer>
      <SpinnerCircle>
        <svg style={{ height: '100%', width: '100%' }} viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            style={{ stroke: 'rgb(25, 39, 52)', strokeWidth: 4, opacity: 0.2 }}
          />
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            style={{
              stroke: 'rgb(63, 81, 181)',
              strokeWidth: 4,
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          />
        </svg>
      </SpinnerCircle>
    </SpinnerContainer>
  );
};

export default Spinner;
