import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';

import { ListUsersLike } from '../SocialActionsUser/Like/ListUsersLike/ListUsersLike';

export const CustomModalWindow = ({
  children,
  footerBtn = false,
  titleShow = true,
  title = 'Modal window',
  contentText = '',
}) => {
  // handleClickOpen = Function.prototype
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>

      <Box>
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
          <Box sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)', paddingX: '20px' }}>
            <IconButton sx={{ p: 0 }} onClick={handleClose}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
            {titleShow && <DialogTitle id="responsive-dialog-title">{`${title}`}</DialogTitle>}
          </Box>

          <DialogContent>
            {contentText && <DialogContentText>{contentText}</DialogContentText>}
            {children && children}
            <ListUsersLike />
          </DialogContent>

          {footerBtn && (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Box>
    </div>
  );
};
