import { styled } from '@mui/material';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton)({
  textTransform: 'unset',
  backgroundColor: 'rgb(63, 81, 181)',
  borderRadius: '4px',
  color: 'rgb(255, 255, 255)',
  '&:hover': {
    backgroundColor: 'rgb(48, 63, 159)',
  },
});

export default Button;
