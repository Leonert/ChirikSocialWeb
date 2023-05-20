import { Avatar, CardHeader } from '@mui/material';
import React from 'react';

import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';

const SearchResulting = (props) => {
  return (
    <CardHeader
      sx={{ width: '90%' }}
      avatar={
        <Avatar aria-label="recipe" src={props.avatar}>
          {props.name}
        </Avatar>
      }
      action={<CloseButton onClose={props.handelClick} />}
      title={props.name}
      subheader={props.nickname}
    />
  );
};

export default SearchResulting;
