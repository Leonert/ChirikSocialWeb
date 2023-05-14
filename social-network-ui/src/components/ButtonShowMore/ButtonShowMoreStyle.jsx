import { makeStyles } from '@mui/styles';

export const useButtonShowStyles = makeStyles((theme) => ({
  buttonHeader: {
    width: '100%',
    backgroundColor: theme.palette.background.paper + ' !important',
    border: `1px solid ${theme.palette.divider}  !important`,
    '&:hover': {
      borderRadius: 1,
      backgroundColor: theme.palette.background.paper + ' !important',
    },
  },
  btnText: {
    mb: 2,
    paddingBottom: '0',
    margin: '0',
    color: '#fff',
  },
}));
