import { makeStyles } from '@mui/styles';

export const useAddTweetModalStyles = makeStyles((theme) => ({
  content: {
    '& .MuiPaper-root': {
      width: '100%',
    },
    top: '-20%',
    '& .MuiDialogTitle-root': {
      padding: '5px 15px',
      marginBottom: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
    },
  },

  header: {
    padding: '5px 15px',
    margin: 0,
    '& svg': {
      fontSize: 26,
    },
  },
  dialogContent: {
    width: '100%',
    minHeight: 288,
    padding: '10px 20px 10px 20px',
    backgroundColor: theme.palette.background.default,
  },
}));
