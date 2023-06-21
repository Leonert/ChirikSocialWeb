import { Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  paddingLeft: 15,
  paddingTop: 8,
  paddingBottom: 8,
  cursor: 'pointer',
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  marginRight: 15,
}));
const Header = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  paddingLeft: 15,
  paddingTop: 8,
  paddingBottom: 8,
  cursor: 'pointer',
}));

const MessagesModalUser = ({ user }) => {
  return (
    <Container>
      <StyledAvatar src={user?.avatar?.src} />
      <div style={{ flex: 1 }}>
        <Header>
          <div style={{ width: 350 }}>
            <Typography sx={{ color: 'rgb(255,255,255)', fontWeight: 800, fontSize: 15 }}>{user?.fullName}</Typography>
            <Typography
              sx={{ color: 'rgb(83, 100, 113)', fontWeight: 400, fontSize: 15 }}
              variant="caption"
              display="block"
              gutterBottom
            >
              @{user?.username}
            </Typography>
          </div>
        </Header>
      </div>
    </Container>
  );
};

export default MessagesModalUser;
