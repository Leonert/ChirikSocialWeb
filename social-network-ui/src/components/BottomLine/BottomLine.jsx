import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';
import { CustomButton } from '../Login/CustomButton';
import { Login } from '../Login/Login';
import RegistrationModal from '../Registration/RegistrationModal';
import Modal from '../UI/Modal';

export const BottomLine = () => {
  const { login } = useSelector((state) => state.authModal);
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

          backgroundColor: (theme) => theme.palette.secondary.light,

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
          }}
        >
          Log in
        </CustomButton>
        <CustomButton
          styles={{
            dispaly: 'inline-block',
            margin: '0',
          }}
        >
          Sign up
        </CustomButton>

        {login && <Modal>{<Login />}</Modal>}

        {/* <RegistrationModal /> */}
      </Box>
    </Box>
  );
};
