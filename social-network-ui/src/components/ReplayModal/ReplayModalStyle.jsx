import { Theme, makeStyles } from '@material-ui/core';

export const useReplayModalStyle = makeStyles((theme: Theme) => ({
  Page: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(11,18,23,0.3)',
  },
  container: {
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.background.paper + ' !important',
    color: '#fff !important',
  },

  btnModal: {
    width: '100%',
    color: '#fff !important',
    '&:hover': {
      background: '#4fc3f7 !important',
    },
  },
  pageItem: {
    marginBottom: theme.spacing(2),
    '& .Mui-focused': {
      borderColor: 'red !important',
    },
  },
}));
