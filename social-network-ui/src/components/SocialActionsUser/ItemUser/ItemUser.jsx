import { Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleOpenLikeModal } from '../../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal } from '../../../features/slices/postDatas/retweetsSlice';
import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';
import { useStylesItemUser } from './ItemUserStyles';

export const ItemUser = ({ user }) => {
  const { name, username, id, profileImage, currUserFollower } = user;
  const classes = useStylesItemUser();
  const dispatch = useDispatch();

  const handleFollow = useCallback(() => {
    dispatch(followUser({ user }));
  }, [user, dispatch]);

  const navigateToUser = useCallback(() => {
    dispatch(handleOpenLikeModal(false));
    dispatch(handleOpenRetweetModal(false));
  }, [user, dispatch]);

  return (
    <li className={classes.item}>
      <Link onClick={navigateToUser} to={`/`} className={classes.user}>
        <div className={classes.avatar}>
          <img src={profileImage} alt={name} className={classes.avatarImg} />
        </div>
        <div>
          {' '}
          <div className={classes.name}>{name}</div>
          <div className={classes.username}>{username}</div>
        </div>
      </Link>
      <div>
        <CustomButton handleClick={handleFollow}>
          <Typography style={currUserFollower ? { color: '#c62828' } : {}}>
            {currUserFollower ? 'Unfollow' : ' Following'}
          </Typography>
        </CustomButton>
      </div>
    </li>
  );
};
