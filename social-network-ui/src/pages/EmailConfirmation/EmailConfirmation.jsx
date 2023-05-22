import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import { TOKEN } from '../../util/constants';
import useEmailConfirmationStyles from './EmailConfirmationStyles';

const EmailConfirmation = () => {
  const ACCOUNT_CONFIRMED = 'Your account has been confirmed!';
  const ACCOUNT_NOT_CONFIRMED = (
    <>
      <>Whoops...</>
      <br />
      <>Something went wrong</>
    </>
  );
  const classes = useEmailConfirmationStyles();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async (token) => {
      try {
        const response = axiosIns.patch(`/api/registration?token=${token}`);

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
      <Box className={classes.boxWrapper}>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Box>
            {isConfirmed ? <CheckCircleIcon className={classes.icon} /> : <CancelIcon className={classes.icon} />}
            <Box className={classes.boxInner}>
              <Typography variant="h4">{isConfirmed ? ACCOUNT_CONFIRMED : ACCOUNT_NOT_CONFIRMED}</Typography>
            </Box>
            <NavLink className={classes.link} to={'/'}>
              <Typography className={classes.typography} variant="h4">
                Home Page
              </Typography>
            </NavLink>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EmailConfirmation;
