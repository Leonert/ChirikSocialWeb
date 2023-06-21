import { TextField, withStyles } from '@mui/material';

export const MessagesModalInput = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused': {
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
      '& fieldset': {
        border: 0,
      },
      '& .MuiInputAdornment-root': {
        '& svg': {
          color: 'rgb(83, 100, 113)',
          height: '1.25em',
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px 14px 5px',
    },
  },
}))(TextField);
