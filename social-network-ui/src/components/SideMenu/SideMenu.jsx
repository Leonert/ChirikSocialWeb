import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  BookmarksIcon,
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
import Logo from './Logo';
import { useSideMenuStyles } from './SideMenuStyles';

const SideMenu = ({ handleCloseMenu }) => {
  const classes = useSideMenuStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
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
      {matches && <Logo />}
      <ul className={classes.container}>
        {user ? (
          <>
            <li className={classes.itemWrapper}>
              <NavLink to={HOME} onClick={handleCloseMenu}>
                <div>
                  <span>{HomeIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Home
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={EXPLORE} onClick={handleCloseMenu}>
                <div>
                  <span>{ExploreIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Explore
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={NOTIFICATIONS} onClick={handleCloseMenu}>
                <div>
                  <span>{NotificationsIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Notifications
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={MESSAGES} onClick={handleCloseMenu}>
                <div>
                  <span>{MessagesIcon}</span>
                  <Typography className={classes.label} variant="h5">
                    Messages
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={BOOKMARKS} onClick={handleCloseMenu}>
                <div>
                  <span>{BookmarksIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Bookmarks
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={user?.username} onClick={handleCloseMenu}>
                <div>
                  <span>{ProfileIcon}</span>
                  <Typography className={classes.label} variant={'h5'}>
                    Profile
                  </Typography>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={SETTING} onClick={handleCloseMenu}>
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
                  backgroundColor: (theme) => theme.palette.background.lightBlue,
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
                {/* <CreateIcon /> */}
              </Button>
              <AddTweetModal visible={visibleAddTweet} onClose={onCloseAddTweet} handleCloseMenu={handleCloseMenu} />
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
      </ul>
    </>
  );
};
export default SideMenu;
