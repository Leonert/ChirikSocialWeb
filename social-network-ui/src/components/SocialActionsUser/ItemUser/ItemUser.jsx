import { Typography } from '@material-ui/core';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { CustomButton } from '../../Login/CustomButton';
import { useStylesItemUser } from './ItemUserStyles';

export const ItemUser = ({ user }) => {
  // const { name, username, id } = user;
  const classes = useStylesItemUser();

  // const handleFollow = useCallback(() => {
  //   dispath(followUSer(id));
  // }, []);

  return (
    <li className={classes.item}>
      <Link to={`/`} className={classes.user}>
        <div className={classes.avatar}>Avatar</div>
        <div>
          {' '}
          <div className={classes.name}>Name</div>
          <div className={classes.username}>Username</div>
        </div>
      </Link>
      <div>
        <CustomButton>
          {/* <CustomButton handleClick={handleFollow}> */}
          <Typography variant="span">Follow</Typography>
        </CustomButton>
      </div>
    </li>
  );
};
