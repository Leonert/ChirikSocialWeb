import { Grid } from '@material-ui/core';
import { Box, Typography } from '@mui/material';

import { ListNotifications } from '../../components/NotificationItems/ListNotifications/ListNotifications';
import { useStyles } from './NotificationsStyles';

export const Notifications = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box className={classes.notificationsWrap}>
          <Box className={classes.header}>
            <Box className={classes.wrapTitle}>
              <Typography variant="h4" className={classes.title}>
                Notifications
              </Typography>
            </Box>
            <Box className={classes.section}>
              <Box className={classes.sectionItemWrap}>
                <Typography className={classes.sectionItem}>All Notifications</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <ListNotifications />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
