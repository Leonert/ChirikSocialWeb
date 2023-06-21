import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleOpenLikeModal } from '../../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal } from '../../../features/slices/postDatas/retweetsSlice';
import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';

const Item = styled('li')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '26px 26px 26px 40px',
  border: '1px solid #90a4ae',
  borderCollapse: 'collapse',
  '&:hover': {
    backgroundColor: '#132433 ',
  },
  '&:first-child': {
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  '&:last-child': {
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },
}));
const User = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));
const Avatar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));
const AvatarImg = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: '50px',
  height: '50px',
}));
const Name = styled('div')(({ theme }) => ({
  fontSize: '20px',
  color: 'white',
}));
const Username = styled('div')(({ theme }) => ({
  fontSize: '16px',
  color: '#78909c',
}));

export const ItemUser = ({ user }) => {
  const { name, username, profileImage, currUserFollower } = user;
  const dispatch = useDispatch();

  const handleFollow = useCallback(() => {
    dispatch(followUser({ user }));
  }, [user, dispatch]);

  const navigateToUser = useCallback(() => {
    dispatch(handleOpenLikeModal(false));
    dispatch(handleOpenRetweetModal(false));
  }, [user, dispatch]);

  return (
    <Item>
      <User onClick={navigateToUser} to={`/`}>
        <Avatar>
          <AvatarImg src={profileImage} alt={name} />
        </Avatar>
        <div>
          <Name>{name}</Name>
          <Username>{username}</Username>
        </div>
      </User>
      <div>
        <CustomButton
          handleClick={handleFollow}
          styles={
            currUserFollower
              ? {
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#eeeeee',
                  },
                }
              : {}
          }
        >
          <Typography style={currUserFollower ? { color: '#c62828' } : {}}>
            {currUserFollower ? 'Unfollow' : ' Following'}
          </Typography>
        </CustomButton>
      </div>
    </Item>
  );
};
