import {makeStyles} from "@mui/styles";



export const useMessagesStyles = makeStyles((theme) => ({
  grid: {
    padding: "12px 0px 0px 0px !important",
  },
  header: {

    height: 47,
    zIndex: 1,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderRadius: 0,
    alignItems: 'center',
    backgroundColor: theme.palette.background.lightDefault,
    color: theme.palette.text.primary,

    flex: 1,
    '& h6': {
      marginLeft: 15,
      fontWeight: 800,
    },
    "& svg": {
      marginRight: 20
    },
  },
  messagesTitle: {
    paddingTop: 83,
    lineHeight: 1.1,
    fontSize: 29,
    fontWeight: 800,
    margin: "0px 30px",
  },
  messagesText: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    margin: '8px 30px 27px 30px',
  },
  messagesButton: {
    marginLeft: 30,
    height: 48,
    padding: theme.spacing(3.2),
    "& .MuiButton-label": {
      fontSize: 15,
    },
  },
  searchWrapper: {
    paddingTop: 60,
  },
  list: {
    "& .Mui-selected": {
      borderRight: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.secondary.dark,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  },
  listItem: {
    padding: 0,
  },
  '& :hover': {
    backgroundColor: theme.palette.background.lightBlue,
  },
  selected: {
    backgroundColor: theme.palette.background.lightBlue,
  },
  userWrapper: {
    height: 76,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
  },

  userAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: 15,
    mt: '-14%',
    border: `4px solid ${theme.palette.background.paper}`,
  },
  userHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userFullName: {
    display: 'inline-block',
    color: theme.palette.text.primary,
    fontWeight: 800,
    fontSize: 15,
  },

  username: {
    marginLeft: 5,
    display: "inline-block",
    color: "rgb(255,255,255)",
    fontWeight: 400,
    fontSize: 15,
  },
  usernameTop:{
    marginLeft: 200,
    display: "inline-block",
    color: "rgb(255,255,255)",
    fontWeight: 400,
    fontSize: 15,
  },
  chatContainer: {
    minWidth: 600,
    padding: 0,
    borderLeft: 0,
  },
  chatInfoWrapper: {
    width: 320,
    margin: "0px auto",
    color: theme.palette.text.primary,

    paddingTop: 300,
  },
  chatInfoTitle: {
    lineHeight: 1.1,
    fontSize: 29,
    fontWeight: 800,
  },
  chatInfoText: {
    fontSize: 14,
    color: 'rgb(83, 100, 113)',
    margin: '8px 0px 27px 0px',

  },
  chatInfoButton: {
    height: 48,
    padding: theme.spacing(3.2),
    "& .MuiButton-label": {
      fontSize: 15,
    },
  },
  chatHeader: {
    position: 'fixed',
    display: 'flex',
    margin: 0,
    padding: 0,
    paddingLeft: 15,
    width: 601,
    zIndex: 1,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderRadius: 0,
    alignItems: 'center',
    backgroundColor: theme.palette.background.lightDefault,

    flex: 1,
    '& h6': {
      fontWeight: 800,
    },
  },
  chatAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: 15,
    background: theme.palette.background.paper,

  },
  chat: {
    padding: '53px 15px',
    color: theme.palette.text.primary,
    height: 600,
    overflowY: 'auto',
    backgroundColor: theme.palette.background.lightDefault,
    display: 'flex',
    flexDirection: 'column',
  },
  tweetContainer: {
    marginTop: 10,
    display: 'flex',

    flexDirection: 'row-reverse',
    '& a': {

      color: 'inherit',
      textDecoration: 'none',
    },
  },
  messageTimestamp:{
    fontSize:11,
    top: 19
  },

  tweetWrapper: {
    border: '1px solid rgb(29, 161, 242)',
    borderRadius: '16px 16px 0px 16px',
    padding: 12,
    width: 384,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tweetUserInfoWrapper: {
    display: "flex",
  },
  tweetAvatar: {
    width: "18px !important",
    height: "18px !important",
  },
  tweetUserFullName: {
    marginLeft: 3,
    fontWeight: 700,
    fontSize: 15,
    color: theme.palette.text.secondary,

  },
  tweetUsername: {
    marginLeft: 3,
    color: "rgb(83, 100, 113)",
    fontSize: 15,
  },
  myMessage: {
    display:'flex',
    flexDirection: 'column',
    top: 100,
    borderRadius: '16px 16px 0px 16px',
    padding: 12,
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.secondary,
    "& span": {
      color: "#fff",
      padding: "11px 15px",
      maxWidth: 384,
    },

  },
  MyMassageSender:{
    marginLeft: '20%',
    display:'flex',
    flexDirection: 'column',
    top: 100,
    padding: 12,
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.secondary,
    alignItems: 'flex-end',

  },

  ownMessageWith: {
    padding: theme.spacing(1),
    borderRadius: '13px  13px 0px 13px',

    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  senderMessageWith:{
    padding: theme.spacing(1),
    borderRadius: '0px  13px 13px 13px',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.primary.main}`,
  },


  theirMessageWithTweet: {
    marginRight: '20%',
    display:'flex',
    flexDirection: 'column',
    top: 100,
    borderRadius: '16px  0px 16px 16px',
    padding: 10,
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.secondary,
    alignItems: 'flex-start',
  },

  myMessageCommon: {
    marginTop: 10,
    "& .MuiTypography-root": {
      borderRadius: "16px 16px 0px 16px",
    },
  },
  myMessageWithTweet: {
    "& .MuiTypography-root": {
      borderRadius: "0px 0px 0px 16px",
    },
  },
  myMessageDate: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: 5,
    "& svg": {
      marginLeft: 5,
      height: "1.2em",
      color: theme.palette.primary.main
    },
  },
  participantContainer: {
    display: "flex",
    flexDirection: "row",
  },
  participantTweetContainer: {
    marginTop: 10,
    display: "flex",
    alignItems: "flex-start",
    "& a": {
      color: "inherit",
      textDecoration: "none"
    },
  },
  participantTweetWrapper: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "16px 16px 16px 0px",
    padding: 12,
    width: 384,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgb(247, 249, 249)"
    },
  },
  participantTweetInfoWrapper: {
    display: "flex",
  },


  chatFooter: {
    display: 'flex',
    position: 'fixed',
    bottom: 3,
    width: 598,
    padding: 4,
    borderRight: 0,
    borderLeft: 0,
    borderBottom: 0,
  },
  chatIcon: {
    "& .MuiIconButton-root": {
      width: 30,
      height: 30,
      "& span": {
        paddingTop: 2,
        "& svg": {
          height: "0.82em",
        }
      },
    },
  },

  blockedInfoText: {
    textAlign: "center",
    height: 30,
  },
}));
