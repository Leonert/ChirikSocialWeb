import { makeStyles } from '@mui/styles';

const useEmailConfirmationStyles = makeStyles((theme) => ({
  boxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  icon: {
    minWidth: 130,
    maxWidth: 130,
    minHeight: 130,
    maxHeight: 130,
  },
  link: {
    textDecoration: 'none',
  },
  typography: {
    display: 'inline-block',
    border: '1px solid transparent',
    padding: '15px 55px',
    borderRadius: '30px',
    fontWeight: 700,
    backgroundColor: theme.palette.primary.main,
    transition: 'all .3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  boxInner: {
    marginTop: '24px',
    marginBottom: '40px',
  },
}));

export default useEmailConfirmationStyles;
