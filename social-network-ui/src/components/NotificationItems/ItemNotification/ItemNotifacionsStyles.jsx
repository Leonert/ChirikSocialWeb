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

    avatar: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '4px',
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
