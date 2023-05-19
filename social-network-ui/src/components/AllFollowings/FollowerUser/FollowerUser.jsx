import { Avatar, Box, Chip, ListItem, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowerUser = ({ user }) => {
  const dispatch = useDispatch();
  const { profileImage, name, username, currUserFollower, bio } = user;

  const handleFollow = useCallback(() => {
    dispatch(followUser({ user }));
  }, []);

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
            <Chip sx={{ backgroundColor: '#37474f' }} label="Follows you" />
          </Box>
        </Box>
      </Box>
      {/* <Box>
        <CustomButton handleClick={handleFollow}>
          <Typography>Follow</Typography>
        </CustomButton>
      </Box> */}
      <Box>
        <CustomButton
          // handleEnter={handleMouseenter}
          // handleLeave={handleMouseleave}
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
