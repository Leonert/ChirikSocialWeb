import { createStyles, makeStyles } from '@mui/styles';

export const useStylesItemUser = makeStyles((theme) =>
  createStyles({
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      padding: '26px 26px 26px 40px',
      border: '1px solid #90a4ae',
      borderCollapse: 'collapse',
      '&:hover': {
        backgroundColor: '#132433 ',
      },
      '&:first-child': {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      },
      '&:last-child': {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      },
    },

    user: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },

    avatar: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      backgroundColor: 'gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '20px',
    },
    avatarImg: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
    },
    name: {
      fontSize: '20px',
      color: 'white',
    },
    username: {
      fontSize: '16px',
      color: '#78909c',
    },
  })
);
