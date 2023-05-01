import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NavLink } from 'react-router-dom';

import { LOGIN } from '../../util/path-constants';
import useEmailConfirmationStyles from './EmailConfirmationStyles';

const EmailConfirmation = () => {
  const classes = useEmailConfirmationStyles();

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', textAlign: 'center' }} paddingTop={20}>
        <CheckCircleIcon className={classes.icon} sx={{ width: 130, height: 130, fill: 'primary.main' }} />
        <Box mb={5} mt={3}>
          <Typography variant="h4">Your account has been confirmed!</Typography>
        </Box>
        <NavLink className={classes.link} to={LOGIN}>
          <Typography className={classes.typography} variant="h4">
            Log In
          </Typography>
        </NavLink>
      </Box>
    </Container>
  );
};

export default EmailConfirmation;
