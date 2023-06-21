import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getUser } from '../../../api/getUserByUsername';
import { handleFollowers, handleFollowing } from '../../../features/slices/subscriptionsSlice';
import { ArrowBack } from '../../ArrowBack/ArrowBack';

const SubscriptionsWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)(({ theme }) => ({
  padding: '20px 0',
  borderBottom: '1px solid #eceff1',
  width: '100%',
  backgroundColor: 'rgb(15, 20, 25)',
}));
const User = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '0 20px',
}));
const Arrow = styled(Box)(({ theme }) => ({
  marginRight: '20px',
}));
const Name = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
}));
const Username = styled(Typography)(({ theme }) => ({
  marginRight: '10px',
  color: 'gray',
  fontSize: ' 12px',
}));
const FollowersWrap = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
}));
const Follower = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgb(15, 20, 45)',
  },
  cursor: 'pointer',
}));
const FollowerItem = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  display: 'block',
  padding: '20px',
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '7px',
  fontSize: ' 16px',
}));

export const Subscriptions = (props) => {
  const dispatch = useDispatch();

  const { followers } = useSelector((state) => state.subscriptions);
  const { following } = useSelector((state) => state.subscriptions);
  // const { user } = useSelector((state) => state.auth);
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const hadeleFollowersCLick = () => {
    dispatch(handleFollowers(true));
    dispatch(handleFollowing(false));
  };
  const hadeleFollowingCLick = () => {
    dispatch(handleFollowers(false));
    dispatch(handleFollowing(true));
  };

  useEffect(() => {
    // if (notification.post !== null) {
    const fetchData = async (usernameData) => {
      const userInfo = await getUser(usernameData);
      setUser(userInfo);
    };

    fetchData(username);
    // }
  }, []);

  return (
    <SubscriptionsWrap>
      <Header>
        <User>
          <Arrow>
            <ArrowBack />
          </Arrow>
          <Box>
            <Name variant="h6">{user && user?.name}</Name>
            <Username>@{username}</Username>
          </Box>
        </User>
        <FollowersWrap>
          <Link to={`/${username}/followers`}>
            <Follower onClick={hadeleFollowersCLick}>
              <FollowerItem style={followers ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}>
                Followers
              </FollowerItem>
            </Follower>
          </Link>
          <Link to={`/${username}/following`}>
            <Follower onClick={hadeleFollowingCLick}>
              <FollowerItem style={following ? { borderBottom: '5px solid rgb(48, 63, 159)' } : {}}>
                Following
              </FollowerItem>
            </Follower>
          </Link>
        </FollowersWrap>
      </Header>
      <Box>{props.children}</Box>
    </SubscriptionsWrap>
  );
};
