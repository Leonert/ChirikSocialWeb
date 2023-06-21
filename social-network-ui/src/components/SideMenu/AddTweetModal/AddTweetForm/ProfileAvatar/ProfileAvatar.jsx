import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import { PROFILE } from '../../../../../util/path-constants';

const CustomProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '46px !important',
  height: '46px !important',
}));

const ProfileAvatar = () => {
  return (
    <Link to={`${PROFILE}`}>
      <CustomProfileAvatar />
    </Link>
  );
};

export default ProfileAvatar;
