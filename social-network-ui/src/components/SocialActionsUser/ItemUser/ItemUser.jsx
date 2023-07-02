import { Typography } from '@material-ui/core';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleLoginModal, handleModal } from '../../../features/slices/authModalSlice';
import { handleOpenLikeModal } from '../../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal } from '../../../features/slices/postDatas/retweetsSlice';
import { followUser } from '../../../features/slices/userDatas/followingSlice';
import { CustomButton } from '../../Login/CustomButton';
import { useStylesItemUser } from './ItemUserStyles';

export const ItemUser = ({ user }) => {
  const currentUser = useSelector((state) => state.auth.user?.username);
  const { name, username, profileImage, currUserFollower } = user;
  const classes = useStylesItemUser();
  const dispatch = useDispatch();

  const handleFollow = useCallback(() => {
    if (currentUser) {
      dispatch(followUser({ user }));
    } else {
      dispatch(handleLoginModal(true));
      dispatch(handleModal(true));
      toast('You need to login');
    }
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
    </li>
  );
};
