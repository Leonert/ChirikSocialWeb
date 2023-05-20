import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AvatarLink = ({ to, name, avatar }) => {
  return (
    <Link to={to}>
      <Avatar aria-label="recipe" alt={name} src={avatar} />
    </Link>
  );
};

export default AvatarLink;
