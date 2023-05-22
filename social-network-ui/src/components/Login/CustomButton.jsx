import { Button } from '@mui/material';

export const CustomButton = ({
  children,
  styles = '',
  onSubmit = false,

  disabled = false,

  handleClick = Function.prototype,
  handleEnter = Function.prototype,
  handleLeave = Function.prototype,
}) => {
  const settings = {
    textTransform: 'unset',
    backgroundColor: 'rgb(63, 81, 181)',
    borderRadius: '4px',
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      backgroundColor: 'rgb(48, 63, 159)',
    },
  };

  return (
    <Button
      disabled={disabled}
      type={onSubmit ? 'submit' : ''}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{ ...settings, ...styles }}
    >
      {children}
    </Button>
  );
};
