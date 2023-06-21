import { Box, Grid, Typography } from '@mui/material';

import { ListNotifications } from '../../components/NotificationItems/ListNotifications/ListNotifications';

export const Notifications = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box sx={{ width: '100%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              padding: '20px',
              borderBottom: '1px solid #eceff1',
              width: '100%',
              backgroundColor: 'rgb(15, 20, 25)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '24px',
                  textAlign: 'center',
                  paddingLeft: '10px',
                }}
              >
                Notifications
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'items' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'items' }}>
                <Typography
                  sx={{
                    borderBottom: '5px solid rgb(48, 63, 159)',
                    textAlign: 'center',
                    display: 'block',
                    padding: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '5px',
                    fontSize: ' 24px',
                  }}
                >
                  All Notifications
                </Typography>
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
