import {
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <>
      <Box>Anton Bakhtin</Box>
      <Grid container spacing={2} alignItems="center" sx={{ p: 1, maxWidth: '598px' }}>
        <Grid item xs={6}>
          <Avatar
            alt="Profile Picture"
            src=""
            sx={{
              width: { xs: 44, sm: 80, md: 133 },
              height: { xs: 44, sm: 80, md: 133 },
              minWidth: { xs: 44, sm: 80, md: 100 },
              minHeight: { xs: 44, sm: 80, md: 100 },
              maxWidth: { xs: 44, sm: 80, md: 120 },
              maxHeight: { xs: 44, sm: 80, md: 120 },
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6" gutterBottom>
            John Doe
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <LocationIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">New York, USA</Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <LinkIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">www.example.com</Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">Joined March 2020</Typography>
          </div>
        </Grid>
        <Grid item xs={6} sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" startIcon={<EditIcon />} sx={{ marginLeft: 2 }}>
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
