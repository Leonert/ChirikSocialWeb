import React from 'react';
import { Link } from 'react-router-dom';

const UsernameLink = ({ username, to }) => {
  return <Link to={to}>{username}</Link>;
};

export default UsernameLink;
