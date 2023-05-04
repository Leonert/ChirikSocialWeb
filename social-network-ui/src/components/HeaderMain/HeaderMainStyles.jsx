import { Theme, makeStyles } from '@material-ui/core';

export const useHeaderMenuStyles = makeStyles((theme: Theme) => ({
  container: {
    top: '0',
    listStyle: 'none',
    margin: '0',
    maxWidth: '600px',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(11,18,23,0.7)',
    padding: '20px 0 ',
    zIndex: '2',
  },
  buttonHeader: {
    width: '100%',
    color: '#fff !important',
    '&:hover': {
      background: '#4fc3f7 !important',
    },
  },
  gridWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
