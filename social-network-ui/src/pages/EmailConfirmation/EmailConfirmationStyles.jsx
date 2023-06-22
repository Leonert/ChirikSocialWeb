import { Typography } from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const StyledSentimentVeryDissatisfiedIcon = styled(SentimentVeryDissatisfiedIcon)(({ theme }) => ({
  minWidth: 130,
  maxWidth: 130,
  minHeight: 130,
  maxHeight: 130,
}));

export const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  minWidth: 130,
  maxWidth: 130,
  minHeight: 130,
  maxHeight: 130,
}));

export const StyledCancelIcon = styled(CancelIcon)(({ theme }) => ({
  minWidth: 130,
  maxWidth: 130,
  minHeight: 130,
  maxHeight: 130,
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  border: '1px solid transparent',
  padding: '15px 55px',
  borderRadius: '30px',
  fontWeight: 700,
  backgroundColor: theme.palette.primary.main,
  transition: 'all .3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
