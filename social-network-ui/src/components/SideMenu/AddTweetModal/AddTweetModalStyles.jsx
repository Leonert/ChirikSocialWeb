import { makeStyles } from '@mui/styles';

export const useAddTweetModalStyles = makeStyles((theme) => ({
  content: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',

      overflow: 'visible',
    },
    '& .MuiPaper-root': {
      width: '100%',
      border: `1px solid ${theme.palette.divider} !important`,
      boxShadow: 'none !important',
    },
    '& .MuiDialogTitle-root': {
      padding: '5px 15px',
      marginBottom: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
    },
  },

  header: {
    padding: '5px 15px',
    position: 'relative',
    margin: 0,
    border: `2px solid ${theme.palette.divider} !important`,
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: '50px',
  },
  dialogContent: {
    width: '100%',
    minHeight: 288,
    padding: '10px 20px 10px 20px',
    backgroundColor: theme.palette.background.default,
    border: `2px solid ${theme.palette.divider} !important`,
  },
  closeButton: {
    position: 'absolute !important',
    top: '2px',
    right: '0px',
    color: '#fff !important',
  },
}));
