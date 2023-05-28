import { Avatar, CardHeader } from '@mui/material';
import React from 'react';

const SearchResulting = (props) => {
  return (
    <CardHeader
      sx={{ width: '90%' , padding:"10px 0" }}
      avatar={
        <Avatar aria-label="recipe" src={props.avatar}>
          {props.name}
        </Avatar>
      }
      action={props.action}
      title={props.name}
      subheader={props.nickname}
    />
  );
};

export default SearchResulting;
