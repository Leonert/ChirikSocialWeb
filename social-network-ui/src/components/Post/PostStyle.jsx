import { Theme, makeStyles } from '@material-ui/core';

export const usePostStyle = makeStyles((theme: Theme) => ({
  Page: {
    backgroundColor: theme.palette.background.paper + ' !important',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
  },
  pageItem:{
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper 
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
