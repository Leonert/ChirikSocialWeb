import { CalendarToday as CalendarIcon, Link as LinkIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Container, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import React from 'react';
import { Link, NavLink, Outlet, matchPath, useLoaderData, useLocation } from 'react-router-dom';

import EditProfileModal from './EditProfileModal';

const ProfileTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 60,
    width: '100%',
    backgroundColor: theme.palette.background.lightBlue,
  },
}));

const ProfileTab = styled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    flex: 1,
    color: theme.palette.text.primary,
  },
}));

function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const Profile = () => {
  const routeMatch = useRouteMatch(['profile', 'profile/replies', 'profile/media', 'profile/likes']);
  const currentTab = routeMatch?.pattern?.path;

  const profile = useLoaderData();

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
                {profile.firstName + ' ' + profile.lastName}
              </Typography>
              <Typography sx={{ fontSize: '13px', lineHeight: '16px' }}>
                {Object.keys(profile.userTweets).length} Tweets
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            height: '193px',
            background: (theme) =>
              profile.profileBackground ? `url(${profile.profileBackground})` : theme.palette.background.lightDefault,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Stack p="20px 20px 0" direction="row" alignItems="end" justifyContent="space-between">
          <Avatar
            alt="Profile Picture"
            src=""
            sx={{
              width: { sm: 80, md: 133 },
              height: { sm: 80, md: 133 },
              minWidth: { sm: 80, md: 100 },
              minHeight: { sm: 80, md: 100 },
              maxWidth: { sm: 80, md: 120 },
              maxHeight: { sm: 80, md: 120 },
              borderRadius: '50%',
              mt: '-14%',
              border: (theme) => `4px solid ${theme.palette.background.paper}`,
            }}
          />

          <EditProfileModal />
        </Stack>
        <Container sx={{ p: 1, maxWidth: '598px' }}>
          <Box>
            <Typography variant="h6">{profile.firstName + ' ' + profile.lastName}</Typography>
            <Typography sx={{ mb: '10px' }} variant="body1">
              @{profile.username}
            </Typography>
            <Typography mb="12px" variant="body1">
              {profile.BIO}
            </Typography>
            <Stack direction="row">
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <LocationIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">{profile.location}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                <LinkIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1" component="a">
                  {profile.website}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">{profile.accCreateDate}</Typography>
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
                  // to={`"/${username}/following"`}
                >
                  {profile.followNumber} Followings
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
                  // to={`/${username}/followers`}
                >
                  {profile.subscriberNumber} Follower
                </NavLink>
              </Stack>
            </Stack>
          </Box>
          <ProfileTabs value={currentTab}>
            <ProfileTab label="Posts" value="profile" to="/profile" component={Link} />
            <ProfileTab label="Replies" value="profile/replies" to="replies" component={Link} />
            <ProfileTab label="Media" value="profile/media" to="media" component={Link} />
            <ProfileTab label="Likes" value="profile/likes" to="likes" component={Link} />
          </ProfileTabs>
          <Box>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
