import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { handleSnackbar } from '../../features/slices/snackbarSlice';

export const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.snackbar);
  const { error } = useSelector((state) => state.auth);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(handleSnackbar(false));
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={status}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error ? `${error}` : 'Login successfully'}
        action={action}
      />
    </div>
  );
};
