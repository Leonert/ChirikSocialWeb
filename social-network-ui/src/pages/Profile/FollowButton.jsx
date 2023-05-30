import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton } from '../../components/Login/CustomButton';
import { addFollowingUser, followUser } from '../../features/slices/userDatas/followingSlice';

const FollowButton = ({ user }) => {
  const dispatch = useDispatch();
  const currUserFollower = useSelector(
    (state) =>
      state.following.followingUsers.find((followingUser) => followingUser.username === user.username)?.currUserFollower
  );
  useEffect(() => {
    if (user.currUserFollower) {
      dispatch(addFollowingUser(user));
    }
  }, []);

  const isFollowed = !!currUserFollower;

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followUser({ user: { ...user, currUserFollower: isFollowed } }));
  };

  return (
    <CustomButton handleClick={handleFollow}>
      <Typography>{isFollowed ? 'Unfollow' : ' Follow'}</Typography>
    </CustomButton>
  );
};

export default FollowButton;
