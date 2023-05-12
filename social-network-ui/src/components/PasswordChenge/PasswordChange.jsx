import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changePasswordModal } from '../../features/slices/settingSlice';
import CloseButton from '../SideMenu/AddTweetModal/AddTweetForm/CloseButton/CloseButton';

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const passwordComparison = newPassword === confirmPassword;
  const passwordMatch = { error: false };
  const passwordLength = newPassword.length;
  const dispatch = useDispatch();
  const handelClickSave = () => {
    if (!passwordComparison) {
      setErrorMessage('Passwords do not match');
      setErr(true);
    } else if (passwordLength < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setErr(true);
    } else {
      setErrorMessage('');
      dispatch(changePasswordModal(false));
    }
  };
  const handelClickClose = () => {
    dispatch(changePasswordModal(false));
  };

  return (
    <Box
      sx={{
        border: '1px soled ',
      }}
    >
      <CloseButton onClose={handelClickClose} />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="current-password"
          label="Current Password"
          variant="outlined"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          id="new-password"
          label="New password"
          variant="outlined"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErr(false);
            setErrorMessage('');
          }}
          error={err}
        />
        <TextField
          id="confirm-password"
          label="Confirm password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErr(false);
            setErrorMessage('');
          }}
          {...passwordMatch}
          helperText={errorMessage}
          error={err}
        />
        <Button variant="contained" onClick={handelClickSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
