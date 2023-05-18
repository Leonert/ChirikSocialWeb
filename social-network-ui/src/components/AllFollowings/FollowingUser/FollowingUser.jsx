import { Avatar, Box, ListItem, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { unfollowUser } from '../../../features/slices/authSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowingUser = ({ user }) => {
  const dispatch = useDispatch();
  // const { avatar, _id, name, username } = user;

  const [onActive, setOnActive] = useState(false);

  const handleMouseenter = useCallback(() => {
    setOnActive(true);
  }, []);
  const handleMouseleave = useCallback(() => {
    setOnActive(false);
  }, []);
  const handleUnfollow = useCallback(() => {
    // dispatch(unfollowUser(_id));
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
          {/* <Avatar alt="Remy Sharp" src={avatar} /> */}
        </Box>
        <Box>
          <Typography sx={{ color: '#000000' }} variant="h6">
            {/* {name} */}
            name
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '10px', color: 'gray' }}>
              {/* @{username} */}
              username
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomButton
          handleEnter={handleMouseenter}
          handleLeave={handleMouseleave}
          handleClick={handleUnfollow}
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
          <Typography style={onActive ? { color: '#c62828' } : {}}>{onActive ? 'Unfollow' : ' Following'}</Typography>
        </CustomButton>
      </Box>
    </ListItem>
  );
};
