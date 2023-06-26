import { Avatar, Box, ListItem, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowerUser = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user.username);
  const { profileImage, name, username, currUserFollower } = user;

  const handleFollow = useCallback(() => {
    dispatch(followUser({ user }));
  }, []);

  useEffect(() => {}, [currUserFollower]);

  return (
    <ListItem
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(21, 32, 43)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          border: `1px solid transparent`,
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Link to={`/${username}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: '10px' }}>
            <Avatar alt="Remy Sharp" src={profileImage} />
          </Box>
        </Link>

        <Box>
          <Link to={`/${username}`}>
            <Typography sx={{ color: 'rgb(255, 255, 255)', fontSize: '16px' }} variant="h6">
              {name}
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/${username}`}>
              <Typography sx={{ mr: '10px', color: 'gray', fontSize: '14px' }}>@{username}</Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box>
        <CustomButton
          disabled={currentUser === username}
          handleClick={handleFollow}
          styles={{
            backgroundColor: 'none',
            border: '1px solid gray',
            color: 'rgb(48, 63, 159)',
            '&:hover': {
              backgroundColor: 'none',
            },
          }}
        >
          <Typography sx={{ fontSize: '14px' }} style={currUserFollower ? { color: '#c62828' } : {}}>
            {currUserFollower ? 'Unfollow' : ' Following'}
          </Typography>
        </CustomButton>
      </Box>
    </ListItem>
  );
};
