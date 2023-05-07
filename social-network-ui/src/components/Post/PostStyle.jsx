import { makeStyles } from '@material-ui/core';

export const usePostStyle = makeStyles((theme) => ({
  Page: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,


  },
  pageItem:{
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    fontWeight: 800+ ' !important',
    fontSize: 15+ ' !important',
  },
  iconColor: {
    color: '#fff !important',
  },
  iconImg: {
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '2%',
  },
}));
