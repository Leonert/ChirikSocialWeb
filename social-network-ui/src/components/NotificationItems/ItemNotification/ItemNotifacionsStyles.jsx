import { createStyles, makeStyles } from '@mui/styles';

export const useStylesItemNotification = makeStyles((theme) =>
  createStyles({
    item: {
      padding: '20px 20px 20px 40px',
      border: '1px solid rgba(0, 0, 0, 0.1)',

      borderCollapse: 'collapse',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: `1px solid transparent`,
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
      color: '#000000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    username: {
      display: 'inline-block',
      fontSize: '16px',
      color: theme.palette.text.primary,
      marginBottom: '14px',
    },
    content: {
      fontSize: '14px',
      color: theme.palette.text.primary,
    },
    post: {
      fontWeight: 600,
    },
  })
);
