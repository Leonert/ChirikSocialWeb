import { makeStyles } from '@material-ui/core';

export const useAddTweetFormStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: '100%',
  },
  textareaWrapper: {
    marginLeft: 15,
    width: '100%',
  },
  item: {
    margin: '10px 55px !important',
  },
  itemNick: {
    paddingTop: '8px',
    marginLeft: '15px !important',
  },
  contentTextarea: {
    width: '100%',
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
