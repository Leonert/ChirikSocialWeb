import { makeStyles } from '@material-ui/core';

export const useCloseButtonStyles = makeStyles((theme) => ({
  close: {
    color: '#fff !important',
    '& .MuiIconButton-root': {
      marginRight: 15,
      // color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.secondary,
    },
  },
  action: {
    color: '#fff !important',
  },
}));
