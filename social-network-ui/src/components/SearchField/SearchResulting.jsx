import { CardHeader } from '@mui/material';
import React from 'react';

import AvatarLink from '../UI/AvatarLink';
import NameLink from '../UI/NameLink';

const SearchResulting = (props) => {
  return (
    <CardHeader
      sx={{ width: '90%', padding: '10px 0' }}
      avatar={<AvatarLink alt={props.name} src={props.avatar} to={`/${props.nickname}`} />}
      action={props.action}
      title={<NameLink name={props.name} to={`/${props.nickname}`} />}
      subheader={<NameLink name={props.nickname} to={`/${props.nickname}`} />}
    />
  );
};

export default SearchResulting;
