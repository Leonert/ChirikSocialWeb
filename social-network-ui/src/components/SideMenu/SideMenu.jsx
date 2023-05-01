import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Hidden, IconButton, Typography } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  ListsIcon,
  MessagesIcon,
  NotificationsIcon,
  ProfileIcon,
  TweetIcon,
} from '../../icon';
import { BOOKMARKS, HOME, LISTS, MESSAGES, NOTIFICATIONS, PROFILE, SEARCH } from '../../util/path-constants';
import AddTweetModal from './AddTweetModal/AddTweetModal';
import { useSideMenuStyles } from './SideMenuStyles';

const SideMenu = (): ReactElement => {
  const classes = useSideMenuStyles();
  const [visibleAddTweet, setVisibleAddTweet] = useState(false);
  const handleClickOpenAddTweet = (): void => {
    setVisibleAddTweet(true);
  };
  const onCloseAddTweet = (): void => {
    setVisibleAddTweet(false);
  };

  return (
    <>
      <ul className={classes.container}>
        <li>
          <NavLink to={HOME} activeClassName={'selected'}>
            <div className={classes.logoIcon}>
              <IconButton>{TweetIcon}</IconButton>
            </div>
          </NavLink>
        </li>
        <li className={classes.itemWrapper}>
          <NavLink to={HOME} activeClassName={'selected'}>
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
          <NavLink to={SEARCH} activeClassName={'selected'}>
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
          <NavLink to={NOTIFICATIONS} activeClassName={'selected'}>
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
          <NavLink to={MESSAGES} activeClassName={'selected'}>
            <div>
              <Hidden smDown>
                <>
                  <span>{MessagesIcon}</span>
                  <Typography variant={'h5'}>Messages</Typography>
                </>
              </Hidden>
            </div>
          </NavLink>
        </li>
        <li className={classes.itemWrapper}>
          <NavLink to={BOOKMARKS} activeClassName={'selected'}>
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
          <NavLink to={LISTS} activeClassName={'selected'}>
            <div>
              <Hidden smDown>
                <>
                  <span>{ListsIcon}</span>
                  <Typography variant={'h5'}>Lists</Typography>
                </>
              </Hidden>
            </div>
          </NavLink>
        </li>
        <li className={classes.itemWrapper}>
          <NavLink to={PROFILE} activeClassName={'selected'}>
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
      </ul>
    </>
  );
};
export default SideMenu;
