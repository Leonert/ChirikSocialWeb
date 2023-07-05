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
    backgroundColor: 'rgb(19, 36, 51)',
    color: 'rgb(255, 255, 255)',
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
    color: 'rgb(29, 155, 240, 0.1)',
    margin: '8px 30px 27px 30px',
  },
  messagesButton: {
    marginLeft: 30,
    height: 48,

    "& .MuiButton-label": {
      fontSize: 15,
    },
  },
  searchWrapper: {
    paddingTop: 60,
  },
  list: {
    "& .Mui-selected": {
      backgroundColor: 'rgb(255, 255, 255, 0.03)',
      "&:hover": {
        backgroundColor: 'rgb(63, 81, 181)',

      },
    },
  },
  listItem: {
    padding: 0,
    backgroundColor: 'rgb(21, 32, 43)',
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: 'rgb(63, 81, 181)',
    },
  },



  userAvatar: {
    marginRight: 15,
  },
  userFullName: {
    display: 'inline-block',
    color:'rgb(255, 255, 255)',
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
  usernameTop: {
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
  messagesTitleContainer: {
    margin: "10px",
    alignItems: "center",
  },
  chatInfoWrapper: {
    width: 320,
    margin: "50px auto",
    color: 'rgb(255, 255, 255)',
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
  tweetWrapper: {
    border: `1px solid 'rgb(25, 39, 52)'`,
    borderRadius: "16px 16px 0px 16px",
    padding: 12,
    width: 384,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: 'rgb(25, 39, 52)',
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
      padding: "11px 15px",
      maxWidth: 384,
    },
  },
  MyMassageSender: {
    marginLeft: '20%',
    display: 'flex',
    flexDirection: 'column',
    top: 100,
    padding: 12,

    color: 'rgb(175,177,178)',
    alignItems: 'flex-end',
  },
  ownMessageWith: {
    padding:7,
    borderRadius: '13px  13px 0px 13px',
    backgroundColor: 'rgb(63, 81, 181)',
    border: `1px solid 'rgb(25, 39, 52)'`,
  },
  senderMessageWith: {
    color: 'rgb(0,0,0)',
    padding:7,

    borderRadius: '0px  13px 13px 13px',
    backgroundColor: 'rgb(234,237,239)',
    border: `1px solid 'rgb(25, 39, 52)'`,
  },
  theirMessageWithTweet: {
    marginRight: '20%',
    display: 'flex',
    flexDirection: 'column',
    top: 100,
    borderRadius: '16px  0px 16px 16px',
    padding: 10,
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
      color: 'rgb(136, 153, 166)'
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
    border: `1px solid 'rgb(56, 68, 77)'`,
    borderRadius: "16px 16px 16px 0px",
    padding: 12,
    width: 384,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgb(247, 249, 249)"
    },
  },
  messageContent:{
    display:"flex"
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
