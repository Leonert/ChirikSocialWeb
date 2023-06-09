import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Hidden, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { handleLogOutModal } from '../../features/slices/authModalSlice';
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
import LogOutModal from '../LogOutModal/LogOutModal';
import ReplayModal from '../ReplayModal/ReplayModal';
import SearchResulting from '../SearchField/SearchResulting';
import AddTweetModal from './AddTweetModal/AddTweetModal';
import LogOutButton from './LogOutButton';
import { useSideMenuStyles } from './SideMenuStyles';

const SideMenu = () => {
  const classes = useSideMenuStyles();

  const dispatch = useDispatch();

  const [visibleAddTweet, setVisibleAddTweet] = useState(false);

  const OpenLogOutModal = () => {
    dispatch(handleLogOutModal(true));
  };

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
      <ul className={classes.container}>
       
        <li>
          <NavLink to={HOME} activeclassname={'selected'}>
            <div className={classes.logoIcon}>
              <IconButton>
                {Chirick}
                <span className={classes.title}>Chirik</span>
              </IconButton>
            </div>
          </NavLink>
        </li>
        {user ? (
          <>
            <li className={classes.itemWrapper}>
              <NavLink to={HOME} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{HomeIcon}</span>
                      <Typography variant={'h5'}>Home</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={SEARCH} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{ExploreIcon}</span>
                      <Typography variant={'h5'}>Explore</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={NOTIFICATIONS} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{NotificationsIcon}</span>
                      <Typography variant={'h5'}>Notifications</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={MESSAGES} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <span>{MessagesIcon}</span>
                    <Typography className={classes.label} variant="h5">
                      Messages
                    </Typography>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={BOOKMARKS} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{BookmarksIcon}</span>
                      <Typography variant={'h5'}>Bookmarks</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={user?.username} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{ProfileIcon}</span>
                      <Typography variant={'h5'}>Profile</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <NavLink to={SETTING} activeclassname={'selected'}>
                <div>
                  <Hidden smDown>
                    <>
                      <span>{SettingsIcon}</span>
                      <Typography variant={'h5'}>Setting</Typography>
                    </>
                  </Hidden>
                </div>
              </NavLink>
            </li>
            <li className={classes.itemWrapper}>
              <Button
                onClick={handleClickOpenAddTweet}
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
              >
                <Hidden smDown>Tweet</Hidden>
                <Hidden mdUp>
                  <CreateIcon />
                </Hidden>
              </Button>
              <AddTweetModal visible={visibleAddTweet} onClose={onCloseAddTweet} />
            </li>

            <li className={classes.itemWrapperLogOut}>
              <SearchResulting
                action={<LogOutButton handelClick={OpenLogOutModal} />}
                id={user.username}
                name={user.name}
                nickname={user.username}
              />
            </li>
          </>
        ) : (
          <li className={classes.itemWrapper}>
            <div>
              <Hidden smDown>
                <>
                  <span>{ExploreIcon}</span>
                  <Typography variant={'h5'}>Review</Typography>
                </>
              </Hidden>
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
