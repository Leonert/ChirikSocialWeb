import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import { TOKEN } from '../../util/constants';

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  minWidth: 130,
  maxWidth: 130,
  minHeight: 130,
  maxHeight: 130,
}));
const StyledCancelIcon = styled(CancelIcon)(({ theme }) => ({
  minWidth: 130,
  maxWidth: 130,
  minHeight: 130,
  maxHeight: 130,
}));
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  border: '1px solid transparent',
  padding: '15px 55px',
  borderRadius: '30px',
  fontWeight: 700,
  backgroundColor: theme.palette.primary.main,
  transition: 'all .3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
