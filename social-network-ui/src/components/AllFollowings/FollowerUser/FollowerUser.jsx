import { Avatar, Box, Chip, ListItem, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { followUser } from '../../../features/slices/authSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowerUser = ({ user }) => {
  const dispatch = useDispatch();
  const { avatar, _id, name, username } = user;

  const handleFollow = useCallback(() => {
    dispatch(followUser(_id));
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
          <Avatar alt="Remy Sharp" src={avatar} />
        </Box>
        <Box>
          <Typography sx={{ color: '#000000' }} variant="h6">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '10px', color: 'gray' }} variant="span">
              @{username}
            </Typography>
            <Chip sx={{ backgroundColor: '#37474f' }} label="Follows you" />
          </Box>
        </Box>
      </Box>
      <Box>
        <CustomButton handleClick={handleFollow}>
          <Typography>Follow</Typography>
        </CustomButton>
      </Box>
    </ListItem>
  );
};
