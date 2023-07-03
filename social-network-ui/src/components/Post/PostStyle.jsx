import { makeStyles } from '@mui/styles';

export const usePostStyle = makeStyles((theme) => ({
  Page: {
    backgroundColor: 'theme.palette.background.paper !important',
    color: 'theme.palette.text.primary',
    border: `1px solid theme.palette.divider`,
    padding: '20px 0',
    marginTop: '20px',
  },
  replyItem: {
    backgroundColor: ' theme.palette.background.paper  !important',
    color: 'theme.palette.text.primary',
    border: `1px solid transparent`,
    boxShadow: 'none !important',
    padding: '20px 0',
  },
  PageSmall: {
    margin: '0 30px',
    border: `1px solid theme.palette.divider`,
    borderRadius: '10px  !important',
  },
  pageItem: {
    color: 'theme.palette.text.primary',
    backgroundColor: 'theme.palette.background.paper',
    fontWeight: 800 + ' !important',
    fontSize: 15 + ' !important',
  },
  iconColor: {
    color: '#fff !important',
  },
  iconActions: {
    color: '#ec2121 !important',
  },
  iconImg: {
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '2%',
  },
  replyHeader: {
    padding: '15px',
    display: 'flex',
    columnGap: '15px',
  },
  date: {
    padding: '15px 0 10px 16px',
    color: '#8a9da8',
  },
  actionTypo: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '14px !important',
    color: 'theme.palette.grey[300]',
    cursor: 'pointer',
  },
  actionNumber: {
    fontWeight: '700 !important',
    fontSize: '15px !important',
    color: 'theme.palette.primary.main',
    marginRight: '5px !important',
  },
  reply: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
}));
