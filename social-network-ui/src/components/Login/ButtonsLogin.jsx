import { Box, Divider, Typography } from '@mui/material';
import { BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { CustomButton } from './CustomButton';

export const ButtonsLogin = () => {
  return (
    <>
      <Box>
        {/* <CustomButton
          styles={{ color: 'black', width: '100%', '&:hover': { backgroundColor: '#dbdfdf' } }}
        >
          <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
            <FcGoogle size={20} />
          </Typography>{' '}
          <Typography textTransform="none"> Sign in with Google</Typography>
        </CustomButton> */}
        <CustomButton styles={{ width: '100%', '&:hover': { backgroundColor: '#dbdfdf' } }}>
          <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
            <BsApple size={20} color={'black'} />
          </Typography>
          <Typography textTransform="none" sx={{ color: 'black', fontWeight: 600 }}>
            Sign in with Apple{' '}
          </Typography>
        </CustomButton>
        {/* <Divider sx={{ marginBottom: '20px' }}>or</Divider> */}
      </Box>
    </>
  );
};
