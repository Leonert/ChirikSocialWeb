import { Theme, makeStyles } from '@material-ui/core';

export const useButtonShowStyles = makeStyles((theme: Theme) => ({
  buttonHeader: {
    width: '100%',
    backgroundColor: 'transparent !important',
    '&:hover': {
      background: '#4fc3f7 !important',
    },
  },
  btnText: {
    mb: 1.5,
    paddingBottom: '0',
    margin: '0',
    color: '#fff',
  },
}));
