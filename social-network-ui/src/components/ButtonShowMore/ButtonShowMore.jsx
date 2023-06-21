import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';

import Button from '../UI/Button';

const ButtonHeader = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper + ' !important',
  border: `1px solid ${theme.palette.divider}  !important`,
  '&:hover': {
    borderRadius: 1,
    backgroundColor: theme.palette.background.paper + ' !important',
  },
}));
const BtnText = styled(Typography)(({ theme }) => ({
  mb: 2,
  paddingBottom: '0',
  margin: '0',
  color: '#fff',
}));
function ButtonShowMore(props) {
  return (
    <ButtonHeader>
      <BtnText>Show {props.text} tweets</BtnText>
    </ButtonHeader>
  );
}

export default ButtonShowMore;
