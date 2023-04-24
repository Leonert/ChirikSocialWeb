import { Button } from '@mui/material';

export const CustomButton = ({
  children,
  styles = '',
  onSubmit = false,
  handleClick = Function.prototype,
}) => {
  const settings = {
    border: '1px solid gray',
    // width: '100%',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
  };

  return (
    <Button type={onSubmit ? 'submit' : ''} onClick={handleClick} sx={{ ...settings, ...styles }}>
      {children}
    </Button>
  );
};
