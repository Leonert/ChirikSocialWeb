import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';
import { CustomButton } from '../Login/CustomButton';

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
          handleClick={() => {
            dispatch(handleLoginModal(true));
            dispatch(handleModal(true));
          }}
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
