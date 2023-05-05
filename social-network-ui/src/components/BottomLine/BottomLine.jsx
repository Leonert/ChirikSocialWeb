import { Box } from '@mui/material';

import RegistrationModal from '../Registration/RegistrationModal';

export const BottomLine = () => {
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
        <RegistrationModal />
      </Box>
    </Box>
  );
};
