import { Button } from '@mui/material';

export const CustomButton = ({ children, styles = '', onSubmit = false, handleClick = Function.prototype }) => {
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
    <Button type={onSubmit ? 'submit' : ''} onClick={handleClick} sx={{ ...settings, ...styles }}>
      {children}
    </Button>
  );
};
