import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    subscriptionsWrap: {
      width: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      padding: '20px 0',
      width: '100%',
      backgroundColor: 'rgb(15, 20, 25)',
    },
    user: {
      display: 'flex',
      padding: '0 20px',
    },
    arrow: {
      marginRight: '20px',
    },
    name: {
      color: '#ffffff',
    },
    username: {
      marginRight: '10px',
      color: 'gray',
      fontSize: ' 12px',
    },
    followersWrap: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
    follower: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: 'rgb(15, 20, 45)',
      },
      cursor: 'pointer',
    },
    followerItem: {
      textAlign: 'center',
      display: 'block',
      padding: '20px',
      boxSizing: 'border-box',
      border: '5px solid transparent',
      borderRadius: '7px',
      fontSize: ' 16px',
    },
  })
);
