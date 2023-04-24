import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/slices/loginSlice';
import { Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { TitleLogin } from './TitleLogin';
import { ButtonsLogin } from './ButtonsLogin';
import { CustomButton } from './CustomButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { handleModal } from '../../features/slices/authModalSlice';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstPage, setFirstPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleNextPage = () => {
    const err = Object.keys(formik.errors);
    if (!err.includes('email')) {
      formik.setErrors({});
      setFirstPage(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      dispatch(loginUser(values));
      resetForm();
      navigate('/');
    },
  });

  useEffect(() => {
    formik.validateField('email');
  }, []);

  return (
    <Box
      sx={{
        width: '60%',
        margin: '0 auto',
        minHeight: '70vh',
      }}
    >
      <TitleLogin firstPage={firstPage} />
      {firstPage && <ButtonsLogin />}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ marginBottom: '20px' }}
          disabled={!firstPage}
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {firstPage ? (
          <>
            <CustomButton
              handleClick={() => handleNextPage()}
              styles={{
                backgroundColor: '#000000',
                width: '100%',
                '&:hover': { backgroundColor: '#191818' },
              }}
            >
              <Typography textTransform="none" sx={{ color: 'white', fontWeight: 600 }}>
                Next{' '}
              </Typography>
            </CustomButton>

            <CustomButton styles={{ width: '100%', '&:hover': { backgroundColor: '#dbdfdf' } }}>
              <Typography textTransform="none" sx={{ color: 'black', fontWeight: 600 }}>
                Forgot password?{' '}
              </Typography>
            </CustomButton>

            <Typography textTransform="none">
              <Typography
                variant="span"
                textTransform="none"
                sx={{ color: 'gray', fontSize: '14px', marginRight: '6px' }}
              >
                Don't have an account?
              </Typography>
              <Typography
                variant="span"
                onClick={() => {
                  dispatch(handleModal(false));
                }}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ display: 'block', marginBottom: '150px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <CustomButton
              handleClick={() => dispatch(handleModal(false))}
              onSubmit={true}
              styles={{
                backgroundColor: '#000000',
                width: '100%',
                '&:hover': { backgroundColor: '#191818' },
              }}
            >
              <Typography textTransform="none" sx={{ color: 'white', fontWeight: 600 }}>
                Log in{' '}
              </Typography>
            </CustomButton>
            <Typography textTransform="none">
              <Typography
                variant="span"
                textTransform="none"
                sx={{ color: 'gray', fontSize: '14px', marginRight: '6px' }}
              >
                Don't have an account?
              </Typography>
              <Typography
                variant="span"
                onClick={() => {
                  dispatch(handleModal(false));
                }}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </>
        )}
      </form>
    </Box>
  );
};
