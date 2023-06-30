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
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  userWrapper: {
    height: 76,
    borderTop: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
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
  messagesTitleContainer:{
    margin:"1" + "0px",
    alignItems: "center",
  },
  chatInfoWrapper: {
    width: 320,
    margin: "50px auto",
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
    marginTop: 27,
    height: 52,
  },
  chatHeader: {
    width: 598,
  },
  chatAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: "0px 15px",
  },
  chat: {
    padding: "53px 15px",
    height: 600,
    overflowY: "auto",
    border: 0,
  },
  tweetContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row-reverse",
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  messageTimestamp:{
    fontSize:11,
    top: 19
  },

  tweetWrapper: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "16px 16px 0px 16px",
    padding: 12,
    width: 384,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  tweetUserInfoWrapper: {
    display: "flex",
  },
  tweetAvatar: {
    width: "18px !important",
    height: "18px !important",
    marginRight: 3,
  },
  tweetUsername: {
    marginLeft: 3,
    color: "rgb(83, 100, 113)",
    fontSize: 15,
  },
  myMessage: {
    display: "flex",
    flexDirection: "row-reverse",
    "& .MuiTypography-root": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
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
    bottom: 1,
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
