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

    borderRadius: '4px',
    color: 'rgb(255, 255, 255)',
  };

  return (
    <Button
      disabled={disabled}
      type={onSubmit ? 'submit' : ''}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{ ...settings, ...styles }}
      variant="contained"
    >
      {children}
    </Button>
  );
};
