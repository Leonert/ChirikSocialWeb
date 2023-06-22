import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import { TOKEN } from '../../util/constants';
import { StyledCancelIcon, StyledCheckCircleIcon, StyledNavLink, StyledTypography } from './EmailConfirmationStyles';

const EmailConfirmation = () => {
  const ACCOUNT_CONFIRMED = 'Your account has been confirmed!';
  const ACCOUNT_NOT_CONFIRMED = (
    <>
      <>Whoops...</>
      <br />
      <>Something went wrong</>
    </>
  );
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async (token) => {
      try {
        const response = await axiosIns.patch(`/api/registration?token=${token}`);

        if (response.status === 200) {
          setIsConfirmed(true);
        }
      } catch (error) {
        setIsConfirmed(false);
      }

      setIsLoading(false);
    };

    const token = searchParams.get(TOKEN);

    if (!token) {
      setIsLoading(false);

      return;
    }

    checkTokenValidity(token);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Box>
            {isConfirmed ? <StyledCheckCircleIcon /> : <StyledCancelIcon />}
            <Box sx={{ marginTop: '24px', marginBottom: '40px' }}>
              <Typography variant="h4">{isConfirmed ? ACCOUNT_CONFIRMED : ACCOUNT_NOT_CONFIRMED}</Typography>
            </Box>
            <StyledNavLink to={'/'}>
              <StyledTypography variant="h4">Home Page</StyledTypography>
            </StyledNavLink>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EmailConfirmation;
