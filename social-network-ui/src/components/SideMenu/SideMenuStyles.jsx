import { makeStyles } from '@mui/styles';

export const useSideMenuStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: '10px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: 230,

    '& li .selected': {
      '& .MuiTypography-h5': {
        color: theme.palette.primary.main,
      },
      '& svg': {
        fill: theme.palette.primary.main,
      },
    },
  },

  itemWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 2,
    height: 58,
    '& .MuiTypography-h5': {
      fontWeight: 700,
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '& svg': {
      verticalAlign: 'bottom',
      height: '1.9em',
    },
    cursor: 'pointer',
    '&:hover': {
      '& div': {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiTypography-h5': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },
    '&:has(.active)': {
      '& div': {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiTypography-h5': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },
    '& div': {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 20px 0 20px',
      borderRadius: 30,
      height: 50,
      marginBottom: 3,
      transition: 'background-color 0.1s ease-in-out',
      gap: 15,
    },
  },
  logoIcon: {
    marginLeft: 7,
    '& .MuiIconButton-root': {
      minWidth: 52,
      minHeight: 52,
      '& svg': {
        color: theme.palette.primary.main,
        height: '2rem',
        width: '2rem',
      },
    },
  },
  homeNotification: {
    position: 'absolute',
    marginLeft: 20,
    marginBottom: 25,
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  count: {
    position: 'absolute',
    marginLeft: 10,
    width: 19,
    height: 19,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    fontSize: 10,
    color: theme.palette.common.white,
    textAlign: 'center',
  },

  popover: {
    width: 198,
    height: 'auto',
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px',
    marginLeft: 40,
    marginTop: 50,
    '& svg': {
      marginRight: 12,
      fill: theme.palette.text.primary,
    },
  },
  listItemWrapper: {
    '& a': {
      textDecoration: 'none',
    },
    '& .MuiListItem-root': {
      color: theme.palette.text.primary,
      padding: '16px 0px 16px 16px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.secondary.main,
      },
    },
    '& .MuiDivider-root': {
      backgroundColor: theme.palette.divider,
    },
  },

  itemWrapperReview: {
    marginBottom: 20,
  },
  itemWrapperLogOut: { marginTop: 40, display: 'flex', justifyContent: 'center', padding: 0 },
  button: {
    height: '52px !important',
    padding: theme.spacing(3.2),
    marginTop: theme.spacing(2),
    borderRadius: '30px !important',
    '& .MuiButton-label': {
      fontSize: 19,
    },
  },

  followerRequestsCount: {
    display: 'inline-block',
    marginLeft: 4,
    padding: '0px 7px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    fontSize: 12,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  title: {
    marginLeft: 20,
    background: 'linear-gradient(0deg, #ffff00, #0000ff)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  label: { display: 'none' },
  tweetBtn: { display: 'none !important' },

  [theme.breakpoints.up('lg')]: {
    tweetIconButton: { display: 'none !important' },
    tweetBtn: { display: 'inline-flex !important' },
    itemWrapper: { justifyContent: 'flex-start' },
    itemWrapperLogOut: { justifyContent: 'flex-end' },

    label: {
      display: 'block',
    },
  },
  [theme.breakpoints.down('xs')]: {
    tweetIconButton: { display: 'none !important' },
    tweetBtn: { display: 'inline-flex !important' },
    container: {
      backgroundColor: theme.palette.secondary.main,
    },
    label: {
      display: 'block',
    },
  },
}));
