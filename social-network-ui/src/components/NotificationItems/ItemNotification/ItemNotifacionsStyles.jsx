import { createStyles, makeStyles } from '@mui/styles';

export const useStylesItemNotification = makeStyles((theme) =>
  createStyles({
    item: {
      padding: '26px 26px 26px 40px',
      border: '1px solid #90a4ae',
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
      marginBottom: '20px',
    },
    username: {
      fontSize: '20px',
      color: 'black',
    },
    content: {
      fontSize: '14px',
      color: 'black',
    },
  })
);
