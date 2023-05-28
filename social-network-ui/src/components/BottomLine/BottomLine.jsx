import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { handleLoginModal, handleModal } from '../../features/slices/authModalSlice';
import { CustomButton } from '../Login/CustomButton';
import { CustomLoginModal } from '../Login/CustomLoginModal';
import { Login } from '../Login/Login';
import RegistrationModal from '../Registration/RegistrationModal';

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
          zIndex: 2,
          width: '100%',
          padding: '20px',
          position: 'fixed',
          bottom: 0,
          backgroundColor: (theme) => theme.palette.background.lightDefault,
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
            p: '7px  34px',
            fontSize: '16px',
            border: '1px ',
          }}
        >
          Log in
        </CustomButton>
        {login && <CustomLoginModal>{<Login />}</CustomLoginModal>}
        <RegistrationModal />
      </Box>
    </Box>
  );
};
