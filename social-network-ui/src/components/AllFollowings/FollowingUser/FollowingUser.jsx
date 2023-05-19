import { Avatar, Box, ListItem, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowingUser = ({ user }) => {
  const dispatch = useDispatch();
  const { profileImage, id, name, username, bio, currUserFollower } = user;

  const [onActive, setOnActive] = useState(false);

  const handleMouseenter = useCallback(() => {
    setOnActive(true);
  }, []);
  const handleMouseleave = useCallback(() => {
    setOnActive(false);
  }, []);

  const handleFollow = useCallback(() => {
    dispatch(followUser({ user }));
  }, [user]);

  return (
    <ListItem
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor: '#eceff1',
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: '10px' }}>
          <Avatar alt="Remy Sharp" src={profileImage} />
        </Box>
        <Box>
          <Typography sx={{ color: '#000000' }} variant="h6">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '10px', color: 'gray' }}>@{username}</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomButton
          handleEnter={handleMouseenter}
          handleLeave={handleMouseleave}
          handleClick={handleFollow}
          styles={{
            backgroundColor: 'none',
            border: '1px solid gray',
            color: 'rgb(48, 63, 159)',
            minWidth: '100px',
            '&:hover': {
              backgroundColor: '#ffcdd2',
            },
          }}
        >
          <Typography style={currUserFollower ? { color: '#c62828' } : {}}>
            {currUserFollower ? 'Unfollow' : ' Following'}
          </Typography>
        </CustomButton>
      </Box>
    </ListItem>
  );
};
