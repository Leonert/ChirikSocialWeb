import { createStyles, makeStyles } from '@mui/styles';

export const useStylesItemNotification = makeStyles((theme) =>
  createStyles({
    item: {
      padding: '20px 20px 20px 40px',
      border: '1px solid #eceff1',

      borderCollapse: 'collapse',
      '&:hover': {
        backgroundColor: '#eceff1',
      },
    },

    link: {
      display: 'inline-block',
    },

    avatar: {
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '4px',
    },
    avatarImg: {
      borderRadius: '50%',
      width: '40px',
      height: '40px',
    },
    avatarText: {
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      fontSize: '20px',
      color: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    username: {
      display: 'inline-block',
      fontSize: '16px',
      color: 'black',
      marginBottom: '14px',
    },
    content: {
      fontSize: '12px',
      color: 'black',
    },
    post: {
      fontWeight: 600,
    },
  })
);
