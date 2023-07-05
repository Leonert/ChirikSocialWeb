import {makeStyles} from "@mui/styles";



export const useMessagesStyles = makeStyles(() => ({
  MyMassageSender: {
    marginLeft: '20%',
    display: 'flex',
    flexDirection: 'column',
    top: 100,
    padding: 12,

    color: 'rgb(175,177,178)',
    alignItems: 'flex-end',
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
}));
