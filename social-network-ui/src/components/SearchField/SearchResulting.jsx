import { CardHeader } from '@mui/material';
import React from 'react';

import AvatarLink from '../UI/AvatarLink';
import NameLink from '../UI/NameLink';

const SearchResulting = (props) => {
  return (
    <CardHeader
      key={props.id}
      sx={{ width: '90%', padding: '10px 0' }}
      avatar={<AvatarLink alt={props.name} avatar={props.avatar} to={`/${props.nickname}`} />}
      action={
        <div
          style={{
            paddingTop: '10px',
          }}
        >
          {props.action}
        </div>
      }
      title={<NameLink name={props.name} to={`/${props.nickname}`} />}
      subheader={<NameLink name={props.nickname} to={`/${props.nickname}`} />}
    />
  );
};

export default SearchResulting;
