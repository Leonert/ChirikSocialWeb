import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    notificationsWrap: {
      width: '100%',
      backgroundColor: theme.palette.background.paper + ' !important',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      padding: '20px',

      width: '100%',
      backgroundColor: 'rgb(15, 20, 25)',
    },
    wrapTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      textAlign: 'center',
      paddingLeft: '10px',
    },
    settings: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: '50%',
      padding: '10px',
      '&:hover': {
        backgroundColor: 'rgb(19, 36, 51)',
      },
    },
    section: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'items',
    },
    sectionItemWrap: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'items',
    },
    sectionItem: {
      borderBottom: '5px solid rgb(48, 63, 159)',
      textAlign: 'center',
      display: 'block',
      padding: '10px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      fontSize: ' 24px',
    },
  })
);
