import { CardHeader } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleLogOutModal } from '../../features/slices/authModalSlice';
import LogOutButton from '../SideMenu/LogOutButton';
import AvatarLink from '../UI/AvatarLink';
import NameLink from '../UI/NameLink';

const LogOut = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const OpenLogOutModal = () => {
    dispatch(handleLogOutModal(true));
  };

  return (
    <>
      <CardHeader
        key={user.id}
        sx={{ width: '90%', padding: '10px 0' }}
        avatar={<AvatarLink alt={user.name} src={user.profileImage} to={`/${user.username}`} />}
        action={
          <div
            style={{
              paddingTop: '10px',
            }}
          >
            {user.action}
          </div>
        }
        title={<NameLink name={user.name} to={`/${user.username}`} />}
        subheader={<NameLink name={user.username} to={`/${user.username}`} />}
      />
      <LogOutButton handelClick={OpenLogOutModal} />
    </>
  );
};

export default LogOut;
