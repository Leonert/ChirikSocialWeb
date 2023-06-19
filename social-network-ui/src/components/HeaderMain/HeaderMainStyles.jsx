import { makeStyles } from '@mui/styles';

export const useHeaderMenuStyles = makeStyles((theme) => ({
  container: {
    top: '0',
    listStyle: 'none',
    margin: '0',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(11,18,23,0.7)',
    padding: '20px 0 ',
    zIndex: '2',
  },
  buttonHeader: {
    width: '100%',
    color: '#fff !important',
    '&:hover': {
      borderRadius: 1,
    },
  },
  gridWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
