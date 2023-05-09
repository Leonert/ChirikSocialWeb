import { Box, List, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IoIosSettings } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

import { ListNotifications } from '../../components/NotificationItems/ListNotifications/ListNotifications';
import Spinner from '../../components/Spinner/Spinner';
import { useStyles } from './NotificationsStyles';

export const Notifications = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Box className={classes.notificationsWrap}>
      <Box className={classes.header}>
        <Box className={classes.wrapTitle}>
          <Typography variant="h4" className={classes.title}>
            Notifications
          </Typography>
          <Box className={classes.settings}>
            <IoIosSettings size={30} />
          </Box>
        </Box>
        <Box className={classes.section}>
          <Box className={classes.sectionItemWrap}>
            <Typography variant="span" className={classes.sectionItem}>
              All Notifications
            </Typography>
          </Box>
        </Box>
      </Box>
      <>
        <ListNotifications />
      </>
    </Box>
  );
};
