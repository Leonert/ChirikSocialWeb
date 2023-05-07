import { Typography } from '@mui/material';

export const TitleLogin = ({ firstPage }) => {
  return (
    <>
      {firstPage ? (
        <Typography
          sx={{ fontSize: '32px', fontWeight: '600', textAlign: 'center', marginBottom: '30px', color: 'white' }}
          variant="h3"
        >
          Sign in to Twitter
        </Typography>
      ) : (
        <Typography
          sx={{ fontSize: '32px', fontWeight: '600', textAlign: 'center', marginBottom: '30px', color: 'white' }}
          variant="h3"
        >
          Enter your password
        </Typography>
      )}
    </>
  );
};
