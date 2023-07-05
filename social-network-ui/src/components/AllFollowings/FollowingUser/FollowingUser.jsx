import { Avatar, Box, ListItem, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleLoginModal, handleModal } from '../../../features/slices/authModalSlice';
import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';

export const FollowingUser = ({ user }) => {
  const dispatch = useDispatch();
  const { profileImage, name, username, currUserFollower } = user;
  const currentUser = useSelector((state) => state.auth.user?.username);

  const handleFollow = useCallback(() => {
    if (currentUser) {
      dispatch(followUser({ user }));
    } else {
      dispatch(handleLoginModal(true));
      dispatch(handleModal(true));
      toast('You need to login');
    }
  }, [user]);

  useEffect(() => {}, [currUserFollower]);

  return (
    <ListItem
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
            backgroundColor: '#3f51b5',
            color: 'white',
            '&:hover': {
              backgroundColor: '#3f51b5',
            },
          }}
        >
          <Typography sx={{ fontSize: '14px' }} style={currUserFollower ? { color: 'white' } : {}}>
            {currUserFollower ? 'Unfollow' : ' Follow'}
          </Typography>
        </CustomButton>
      </Box>
      <Toaster />
    </ListItem>
  );
};
