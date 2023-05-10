import {
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <Box sx={{ maxWidth: '598px', width: '100%', height: '2000px' }}>
        <Box
          position="sticky"
          sx={{
            background: (theme) => theme.palette.background.default,
            top: '-0.5px',
            p: '5px 0',
            zIndex: 1,
          }}
        >
          <Stack direction="row" alignItems="center">
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'inherit',
                zIndex: 2,
                margin: '4px 26px 0 20px',
              }}
              to="/"
            >
              <ArrowBackIcon />
            </NavLink>
            <Stack>
              <Typography component="h2" fontSize="18px">
                John Doe
              </Typography>
              <Typography sx={{ fontSize: '13px', lineHeight: '16px' }}>2 Tweets</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ height: '200px', background: (theme) => theme.palette.background.lightDefault }}></Box>
        <Stack p="0 20px" direction="row" alignItems="end" justifyContent="space-between">
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
              mt: '-10%',
              border: (theme) => `4px solid ${theme.palette.background.paper}`,
            }}
          />
          <Button variant="outlined" startIcon={<EditIcon />}>
            Edit Profile
          </Button>
        </Stack>
        <Container sx={{ p: 1, maxWidth: '598px' }}>
          <Box>
            <Typography variant="h6">John Doe</Typography>
            <Typography sx={{ mb: '10px' }} variant="body1">
              @Doe
            </Typography>
            <Typography mb="12px" variant="body1">
              www.example.com
            </Typography>
            <Stack direction="row">
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <LocationIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">Kyiv</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <LinkIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">instagram.com</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">Joined March 2020</Typography>
              </div>
            </Stack>
            <Stack direction="row">
              <Stack direction="row" alignItems="center" mt="16px">
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    margin: '',
                    fontSize: '14px',
                    marginRight: '14px',
                  }}
                  to="/profile/following"
                >
                  500 Followings
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    margin: '',
                    fontSize: '14px',
                    marginRight: '14px',
                  }}
                  to="/profile/followers"
                >
                  10 Follower
                </NavLink>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
