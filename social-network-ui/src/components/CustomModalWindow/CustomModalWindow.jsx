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
import { cloneElement, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { handleOpenLikeModal, removeListUsersLike } from '../../features/slices/postDatas/likesSlice';
import { handleOpenRetweetModal, removeListUsersRetweet } from '../../features/slices/postDatas/retweetsSlice';

export const CustomModalWindow = ({
  children,
  footerBtn = false,
  titleShow = true,
  title = 'Modal window',
  contentText = '',
  open = false,
  handleCustomModal,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch(handleCustomModal(false));
    dispatch(handleOpenLikeModal(false));
    dispatch(handleOpenRetweetModal(false));
    dispatch(removeListUsersLike());
    dispatch(removeListUsersRetweet());
  };

  return (
    <div>
      <Box>
        <Dialog
          ref={ref}
          fullScreen={smallScreen}
          PaperProps={{
            sx: {
              maxWidth: smallScreen ? '100%' : '45%',
              width: '100%',
            },
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Box sx={{ display: 'grid', justifyItems: 'start', gridTemplateColumns: 'repeat(3, 1fr)', paddingX: '20px' }}>
            <IconButton sx={{ p: 0 }} onClick={handleClose}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {titleShow && <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>}
            </Box>
          </Box>

          <DialogContent>
            {contentText && <DialogContentText>{contentText}</DialogContentText>}
            {children && cloneElement(children, { ref })}
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
