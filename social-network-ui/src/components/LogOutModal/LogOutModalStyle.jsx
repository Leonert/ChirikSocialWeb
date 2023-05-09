import { makeStyles } from '@mui/styles';

export const useLogOutStyle = makeStyles((theme) => ({
  Page: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
  },
  pageItem: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 40px',
    margin: 0,
    maxWidth: 400,
    '& svg': {
      fill: theme.palette.primary.main,
      width: '40px',
      padding: '10px 0',
    },
  },

  iconImg: {
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '2%',
  },
  button: {
    height: '48px !important',
    padding: theme.spacing(3.2),
    marginTop: '10px !important',
    backgroundColor: `${theme.palette.primary.main} !important`,
    borderRadius: '30px !important',
    '&:hover': {
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
    '& .MuiButton-label': {
      fontSize: 16,
      color: theme.palette.text.primary,
    },
  },
  header: {
    textAlign: 'center',
    paddingBottom: '20px',
    fontSize: ' 1.5rem !important',
  },
  item: {
    paddingBottom: 10,
  },
}));
