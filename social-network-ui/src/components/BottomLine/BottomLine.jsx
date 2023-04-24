import { Box, Button } from '@mui/material';
import { CustomButton } from '../Login/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal } from '../../features/slices/authModalSlice';

export const BottomLine = () => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          position: 'fixed',
          bottom: 0,
          backgroundColor: 'blue',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <CustomButton
          handleClick={() => dispatch(handleModal(true))}
          styles={{
            dispaly: 'inline-block',
            margin: '0 16px',
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          Log in
        </CustomButton>
        <CustomButton
          styles={{
            dispaly: 'inline-block',
            margin: '0',
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          Sign up
        </CustomButton>
      </Box>
    </Box>
  );
};
