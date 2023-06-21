import { makeStyles } from '@mui/material';

export const useCloseButtonStyles = makeStyles((theme) => ({
  close: {
    width: '10px ! important',
    '& .MuiIconButton-root': {
      marginRight: 15,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  closeButton: {
    color: '#fff !important',
  },
  action: {},
}));
