import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {Hidden, IconButton, List, ListItem, Popover, Typography} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from "classnames";

import { handleLogOutModal } from '../../features/slices/authModalSlice';
import {

  BookmarksIcon, Chirick, DisplayIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon, MoreIcon,
  NotificationsIcon,
  ProfileIcon,
  SettingsIcon,
} from '../../icon';
import { BOOKMARKS, HOME, MESSAGES, NOTIFICATIONS, SEARCH, SETTING } from '../../util/path-constants';
import LogOutModal from '../LogOutModal/LogOutModal';
import AddTweetModal from '../AddTweetModal/AddTweetModal';
import LogOutButton from './LogOutButton';
import { useSideMenuStyles } from './SideMenuStyles';
import {useGlobalStyles} from "../../util/globalClasses";
import DisplayModal from "./DisplayModal/DisplayModal";
import ReplayModal from "../ReplayModal/ReplayModal";



const SideMenu = () => {
  const classes = useSideMenuStyles();
  const globalClasses = useGlobalStyles();
  const [visibleDisplayModal, setVisibleDisplayModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
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

  const onOpenDisplayModal = () => {
    setVisibleDisplayModal(true);
    handleClosePopup();
  };

  const onCloseDisplayModal = () => {
    setVisibleDisplayModal(false);
  };
  const handleClosePopup = () => {
    setAnchorEl(null);
  };
  const handleOpenPopup = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
      <>
        <ReplayModal />
        <ul className={classes.container}>
          <li>
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
          </li>
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
            <div onClick={handleOpenPopup}>
              <Hidden smDown>
                <>
                  <span>{MoreIcon}</span>
                  <Typography variant={"h5"}>
                    More
                  </Typography>
                </>
              </Hidden>
            </div>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                classes={{
                  paper: classes.popover,
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
            >
              <div className={classnames(classes.listItemWrapper, globalClasses.svg)}>
                <List>
                  <ListItem onClick={onOpenDisplayModal}>
                    {DisplayIcon}
                    <Typography variant={"body1"} component={"span"}>
                      Display
                    </Typography>
                  </ListItem>
                </List>
              </div>
            </Popover>
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
            <DisplayModal
                visible={visibleDisplayModal}
                onClose={onCloseDisplayModal}
            />
          </li>
          {user && (
              <li className={classes.itemWrapperLogOut}>

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