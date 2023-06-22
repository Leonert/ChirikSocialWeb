import { makeStyles } from '@mui/styles';

export const useAddTweetFormStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  textareaWrapper: {
    marginLeft: 15,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: '20px !important',
  },
  item: {
    margin: '10px 55px !important',
    color: theme.palette.text.secondary,
  },
  textCount: {
    color: theme.palette.text.secondary,
    zIndex: '2',
  },

  itemNick: {
    paddingTop: '8px',
    marginLeft: '15px !important',
    color: theme.palette.text.secondary,
  },
  contentTextarea: {
    marginTop: 10,
    width: '98%',
    border: 0,
    fontSize: 20,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none',
    backgroundColor: 'transparent',
    caretColor: localStorage.getItem === 'DEFAULT' ? '#000' : '#fff',
    color: localStorage.getItem === 'DEFAULT' ? '#000' : '#fff',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerWrapper: {
    display: 'flex',
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 5,
    left: -13,
    justifyContent: 'space-between',
    maxWidth: 450,
    marginTop: 10,
    paddingLeft: 70,
  },
  footerAddForm: {
    display: 'flex',
    alignItems: 'center',
  },
  footerAddFormProgress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerAddFormCircleProgress: {
    position: 'relative',
    width: 20,
    height: 20,
    margin: '0 10px',
    '& .MuiCircularProgress-root': {
      position: 'absolute',
    },
  },
}));
