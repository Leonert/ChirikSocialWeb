import CreateIcon from '@mui/icons-material/Create';
import { Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  BookmarksIcon,
  Chirick,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  NotificationsIcon,
  ProfileIcon,
  SettingsIcon,
} from '../../icon';
import { BOOKMARKS, EXPLORE, HOME, MESSAGES, NOTIFICATIONS, SETTING } from '../../util/path-constants';
import LogOut from '../LogOut/LogOut';
import LogOutModal from '../LogOutModal/LogOutModal';
import ReplayModal from '../ReplayModal/ReplayModal';
import AddTweetModal from './AddTweetModal/AddTweetModal';

const PREFIX = 'SideMenu';
const classes = {
  container: `${PREFIX}-container`,
  logoIcon: `${PREFIX}-logoIcon`,
  title: `${PREFIX}-title`,
  label: `${PREFIX}-label`,
  itemWrapper: `${PREFIX}-itemWrapper`,
  tweetIconButton: `${PREFIX}-tweetIconButton`,
  tweetButton: `${PREFIX}-tweetButton`,
  button: `${PREFIX}-button`,
  tweetBtn: `${PREFIX}-tweetBtn`,
  itemWrapperLogOut: `${PREFIX}-itemWrapperLogOut`,
};

const List = styled('ul')(({ theme }) => ({
  [`${classes.container}`]: {
    position: 'sticky',
    top: 0,
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: 230,
    '& li .selected': {
      '& .MuiTypography-h5': {
        color: theme.palette.primary.main,
      },
      '& svg': {
        fill: theme.palette.primary.main,
      },
    },
  },

  [`${classes.itemWrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 2,
    height: 58,
    '& .MuiTypography-h5': {
      fontWeight: 700,
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '& svg': {
      verticalAlign: 'bottom',
      height: '1.9em',
    },
    cursor: 'pointer',
    '&:hover': {
      '& div': {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiTypography-h5': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },
    '&:has(.active)': {
      '& div': {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiTypography-h5': {
          color: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.primary.main,
        },
      },
    },
    '& div': {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      padding: '0 20px 0 20px',
      borderRadius: 30,
      height: 50,
      marginBottom: 3,
      transition: 'background-color 0.1s ease-in-out',
      gap: 15,
    },
  },
  [`${classes.logoIcon}`]: {
    marginLeft: 7,
    '& .MuiIconButton-root': {
      minWidth: 52,
      minHeight: 52,
      '& svg': {
        color: theme.palette.primary.main,
        height: '2rem',
        width: '2rem',
      },
    },
  },
  // homeNotification: {
  //   position: 'absolute',
  //   marginLeft: 20,
  //   marginBottom: 25,
  //   width: 6,
  //   height: 6,
  //   borderRadius: '50%',
  //   backgroundColor: theme.palette.primary.main,
  // },
  // count: {
  //   position: 'absolute',
  //   marginLeft: 10,
  //   width: 19,
  //   height: 19,
  //   borderRadius: '50%',
  //   backgroundColor: theme.palette.primary.main,
  //   fontSize: 10,
  //   color: theme.palette.common.white,
  //   textAlign: 'center',
  // },

  // popover: {
  //   width: 198,
  //   height: 'auto',
  //   boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px',
  //   marginLeft: 40,
  //   marginTop: 50,
  //   '& svg': {
  //     marginRight: 12,
  //     fill: theme.palette.text.primary,
  //   },
  // },
  // listItemWrapper: {
  //   '& a': {
  //     textDecoration: 'none',
  //   },
  //   '& .MuiListItem-root': {
  //     color: theme.palette.text.primary,
  //     padding: '16px 0px 16px 16px',
  //     '&:hover': {
  //       cursor: 'pointer',
  //       backgroundColor: theme.palette.secondary.main,
  //     },
  //   },
  //   '& .MuiDivider-root': {
  //     backgroundColor: theme.palette.divider,
  //   },
  // },

  // itemWrapperReview: {
  //   marginBottom: 20,
  // },
  [`${classes.itemWrapperLogOut}`]: { marginTop: 40, display: 'flex', justifyContent: 'center', padding: 0 },
  [`${classes.button}`]: {
    height: '52px !important',
    padding: theme.spacing(3.2),
    marginTop: theme.spacing(2),
    borderRadius: '30px !important',
    '& .MuiButton-label': {
      fontSize: 19,
    },
  },

  // followerRequestsCount: {
  //   display: 'inline-block',
  //   marginLeft: 4,
  //   padding: '0px 7px',
  //   borderRadius: '50%',
  //   backgroundColor: theme.palette.primary.main,
  //   fontSize: 12,
  //   color: theme.palette.common.white,
  //   textAlign: 'center',
  // },
  [`${classes.title}`]: {
    marginLeft: 20,
    background: 'linear-gradient(0deg, #ffff00, #0000ff)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  [`${classes.label}`]: { display: 'none' },
  [`${classes.tweetBtn}`]: { display: 'none !important' },

  [theme.breakpoints.up('lg')]: {
    [`${classes.tweetIconButton}`]: { display: 'none !important' },
    [`${classes.tweetBtn}`]: { display: 'inline-flex !important' },
    [`${classes.itemWrapper}`]: { justifyContent: 'flex-start' },
    [`${classes.itemWrapperLogOut}`]: { justifyContent: 'flex-end' },

    [`${classes.label}`]: {
      display: 'block',
    },
  },
}));

const SideMenu = () => {
  // const classes = useSideMenuStyles();

  const [visibleAddTweet, setVisibleAddTweet] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleClickOpenAddTweet = () => {
    setVisibleAddTweet(true);
  };
  const onCloseAddTweet = () => {
    setVisibleAddTweet(false);
  };

  return (
    <>
      <ReplayModal />
      <List className={classes.container}>
        <li>
          <NavLink to={HOME}>
            <div className={classes.logoIcon}>
              <IconButton>
                {Chirick}
                <span className={`${classes.title} ${classes.label}`}>Chirik</span>
              </IconButton>
            </div>
          </NavLink>
        </li>
        {user ? (
          <>
            <li className={classes.itemWrapper}>
              <NavLink to={HOME}>
                <div>
                  <span>{HomeIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Home
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={EXPLORE}>
                <div>
                  <span>{ExploreIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Explore
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={NOTIFICATIONS}>
                <div>
                  <span>{NotificationsIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Notifications
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={MESSAGES}>
                <div>
                  <span>{MessagesIcon}</span>
                  <Typography className={classes.label} variant="h5">
                    Messages
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={BOOKMARKS}>
                <div>
                  <span>{BookmarksIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Bookmarks
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={user?.username}>
                <div>
                  <span>{ProfileIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Profile
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={SETTING}>
                <div>
                  <span>{SettingsIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Setting
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <IconButton
                onClick={handleClickOpenAddTweet}
                sx={{
                  height: '50px',
                  width: '50px',
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: 'white',
                }}
                className={`${classes.tweetIconButton} ${classes.tweetButton}`}
              >
                <CreateIcon />
              </IconButton>
              <Button
                onClick={handleClickOpenAddTweet}
                className={`${classes.button} ${classes.tweetBtn}`}
                variant="contained"
                color="primary"
                fullWidth
              >
                <Typography component="span">Tweet</Typography>
                <CreateIcon />
              </Button>
              <AddTweetModal visible={visibleAddTweet} onClose={onCloseAddTweet} />
            </li>

            <li className={classes.itemWrapperLogOut}>
              <LogOut />
            </li>
          </>
        ) : (
          <li className={classes.itemWrapper}>
            <div>
              <span>{ExploreIcon}</span>
              <Typography className={classes.label} variant={'h5'}>
                Review
              </Typography>
            </div>
          </li>
        )}
        <li>
          <LogOutModal />
        </li>
      </List>
    </>
  );
};
export default SideMenu;
