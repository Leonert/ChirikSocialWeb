import { CalendarToday as CalendarIcon, Link as LinkIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Container, Link as LinkMui, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, matchPath, useLoaderData, useLocation, useParams } from 'react-router-dom';

import EditProfileModal from './EditProfileModal';
import FollowButton from './FollowButton';

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

const formatWebsiteLink = (link) => {
  const withHttp = link.includes('http://') || link.includes('https://');
  if (!withHttp) {
    return `http://${link}`;
  }

  return link;
};

const Profile = (props) => {
  const { username } = useParams();
  const routeMatch = useRouteMatch([`${username}`, `${username}/replies`, `${username}/likes`]);
  const currentTab = routeMatch?.pattern?.path;
  const { user } = useSelector((state) => state.auth);
  const { data } = useLoaderData();
  const isCurrentUserProfile = user?.username === username;
  const createdDate = new Date(data.createdDate) ?? new Date();
  const formattedDate = format(createdDate, 'MMMM yyyy');

  return (
    <>
      <Box sx={{ maxWidth: '598px', width: '100%' }}>
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
                {data.name}
              </Typography>
              <Typography sx={{ fontSize: '13px', lineHeight: '16px' }}>
                {data.withoutAuthorPosts.length} Tweets
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            height: '193px',
            background: (theme) =>
              data.profileBackgroundImage
                ? `url(${data.profileBackgroundImage})`
                : theme.palette.background.lightDefault,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Stack p="20px 20px 0" direction="row" alignItems="end" justifyContent="space-between">
          <Avatar
            alt="Profile Picture"
            src={data.profileImage}
            sx={{
              width: { xs: 80, md: 133 },
              height: { xs: 80, md: 133 },
              minWidth: { xs: 80, md: 100 },
              minHeight: { xs: 80, md: 100 },
              maxWidth: { xs: 80, md: 120 },
              maxHeight: { xs: 80, md: 120 },
              borderRadius: '50%',
              mt: '-14%',
              border: (theme) => `4px solid ${theme.palette.background.paper}`,
            }}
          />
          {(isCurrentUserProfile && <EditProfileModal data={data} />) || (user && <FollowButton user={data} />)}
        </Stack>
        <Container sx={{ p: 1, maxWidth: '598px' }}>
          <Box>
            {data.name && <Typography variant="h6">{data.name}</Typography>}
            <Typography sx={{ mb: '10px' }} variant="body1">
              @{data.username}
            </Typography>
            {data.bio && (
              <Typography mb="12px" variant="body1" sx={{ wordWrap: 'break-word' }}>
                {data.bio === 'null' ? '' : data.bio}
              </Typography>
            )}
            <Stack direction="row" flexWrap="wrap">
              {data.location && data.location !== 'null' && (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <LocationIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body1">{data.location === 'null' ? '' : data.location}</Typography>
                </div>
              )}
              {data.website && data.website !== 'null' && (
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  <LinkIcon sx={{ marginRight: 1 }} />
                  <LinkMui
                    href={formatWebsiteLink(data.website)}
                    target="_blank"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '234px',
                      color: (theme) => theme.palette.background.lightBlue,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    {data.website === 'null' ? '' : data.website}
                  </LinkMui>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ marginRight: 1 }} />
                <Typography variant="body1">Joined {formattedDate}</Typography>
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
                  to={`/${username}/following`}
                >
                  {data.followedCounter} Followings
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    margin: '',
                    fontSize: '14px',
                    marginRight: '14px',
                  }}
                  to={`/${username}/followers`}
                >
                  {data.followersCounter} Follower
                </NavLink>
              </Stack>
            </Stack>
          </Box>
          <ProfileTabs value={currentTab}>
            <ProfileTab label="Posts" value={username} to={`/${username}`} component={Link} />
            <ProfileTab label="Replies" value={`${username}/replies`} to="replies" component={Link} />
            <ProfileTab label="Likes" value={`${username}/likes`} to="likes" component={Link} />
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
