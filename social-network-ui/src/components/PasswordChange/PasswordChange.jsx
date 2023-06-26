import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { changePassword, changePasswordModal } from '../../features/slices/settingSlice';
import CloseButton from '../AddTweetModal/AddTweetForm/CloseButton/CloseButton';

export default function PasswordChange() {
  const [showPassword, setShowPassword] = useState(false);
  const showInput = useSelector((state) => state.setting.status);
  const theme = useTheme(showInput);
  const primaryColor = theme.palette.text.secondary;
  const secondaryColor = theme.palette.background.lightBlue;

  const formik = useFormik({
    initialValues: {
      CurrentPassword: '',
      NewPassword: '',
      ConfirmPassword: '',
    },
    validationSchema: yup.object({
      CurrentPassword: yup.string().required('Mandatory fields'),
      NewPassword: yup
        .string()
        .matches(
          /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{8,}$/,
          'Password must be at least 8 characters long, including letters and numbers'
        )
        .required('Mandatory fields'),
      ConfirmPassword: yup
        .string()
        .oneOf([yup.ref('NewPassword'), null], 'Passwords must match')
        .required('Mandatory fields'),
    }),

    onSubmit: (values) => {
      const { CurrentPassword, NewPassword } = values;
      dispatch(changePassword({ oldPass: CurrentPassword, newPass: NewPassword }));
    },
  });

  const dispatch = useDispatch();

  const handelClickClose = () => {
    dispatch(changePasswordModal(false));
  };

  return (
    <Box
      sx={{
        maxWidth: '400px',
        p: '40px 10px',
        position: 'relative',
      }}
    >
      {showInput && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: '10%',
            }}
          >
            <CloseButton onClose={handelClickClose} />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ margin: '20px 0 ' }}
              id="CurrentPassword"
              label="Current Password"
              variant="outlined"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={formik.values.CurrentPassword}
              onChange={formik.handleChange}
              error={formik.touched.CurrentPassword && Boolean(formik.errors.CurrentPassword)}
              helperText={formik.touched.CurrentPassword && formik.errors.CurrentPassword}
              disabled={false}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ color: showPassword ? `${secondaryColor}` : `${primaryColor}` }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              sx={{ margin: '20px 0 ' }}
              id="NewPassword"
              label="New password"
              variant="outlined"
              autoComplete="new-password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={formik.values.NewPassword}
              onChange={formik.handleChange}
              error={formik.touched.NewPassword && Boolean(formik.errors.NewPassword)}
              helperText={formik.touched.NewPassword && formik.errors.NewPassword}
            />
            <TextField
              sx={{ margin: '20px 0 ' }}
              id="ConfirmPassword"
              label="Confirm password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={formik.values.ConfirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.ConfirmPassword && Boolean(formik.errors.ConfirmPassword)}
              helperText={formik.touched.ConfirmPassword && formik.errors.ConfirmPassword}
              autoComplete="new-password"
            />
            <Button variant="contained" type="submit" sx={{ borderRadius: 20 }}>
              Save
            </Button>
          </form>
        </>
      )}
      {!showInput && <Typography variant="h5">Your password has been changed</Typography>}
    </Box>
  );
}
