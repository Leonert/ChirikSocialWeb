import { Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { CustomButton } from '../../Login/CustomButton';
import { useStylesItemUser } from './ItemUserStyles';

export const ItemUser = ({ user }) => {
  const { name, username, id, profileImage, currUserFollower } = user;
  const classes = useStylesItemUser();

  // const handleFollow = useCallback(() => {
  //   dispath(followUSer(id));
  // }, []);

  return (
    <li className={classes.item}>
      <Link to={`/`} className={classes.user}>
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
        <CustomButton disabled={currUserFollower}>
          {/* <CustomButton handleClick={handleFollow}> */}
          <Typography>Follow</Typography>
        </CustomButton>
      </div>
    </li>
  );
};
