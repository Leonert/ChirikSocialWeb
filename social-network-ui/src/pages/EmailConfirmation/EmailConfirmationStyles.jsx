import { makeStyles } from '@material-ui/core';

const useEmailConfirmationStyles = makeStyles((theme) => ({
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
}));

export default useEmailConfirmationStyles;
