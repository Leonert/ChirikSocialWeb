import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledNavLink,
  StyledSentimentVeryDissatisfiedIcon,
  StyledTypography,
} from '../../pages/EmailConfirmation/EmailConfirmationStyles';
import { TOKEN } from '../../util/constants';

const getURLParam = (param) => {
  return new URLSearchParams(window.location.search).get(param);
}

const OAuthRedirectHandler = () => {
  const token = getURLParam('token');
  const [isTokenExist, setTokenExist] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN, token);

      navigate('/');
    }
    setTokenExist(false);
  }, []);

  if (isTokenExist) return null;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
      >
        <Box>
          <StyledSentimentVeryDissatisfiedIcon />
          <Box sx={{ marginTop: '24px', marginBottom: '40px' }}>
            <Typography variant="h4">
              {' '}
              <>
                <>Whoops...</>
                <br />
                <>Google authorization failed...</>
              </>
            </Typography>
          </Box>
          <StyledNavLink to={'/'}>
            <StyledTypography variant="h4">Home Page</StyledTypography>
          </StyledNavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default OAuthRedirectHandler;
