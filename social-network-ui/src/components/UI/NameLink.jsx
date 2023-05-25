import React from 'react';
import { Link } from 'react-router-dom';

const NameLink = ({ name, to }) => {
  return <Link to={to}>{name}</Link>;
};

export default NameLink;
