import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

import Button from '../UI/Button';

const AccountProfileFields = ({ formik, onSubmit }) => {
  return (
    <Box
      sx={{
        maxWidth: '438px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 32 }}>Create your profile</Typography>
      <TextField
        sx={{ mt: '20px', mb: '20px' }}
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
      />
      <TextField
        sx={{ mb: '20px' }}
        fullWidth
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        onBlur={formik.handleBlur}
      />
      <TextField
        sx={{ mb: '20px' }}
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
      />
      <TextField
        sx={{ mb: '20px' }}
        fullWidth
        id="repeatPassword"
        name="repeatPassword"
        label="Repeat password"
        type="password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
        onBlur={formik.handleBlur}
      />
      <Button color="primary" variant="contained" fullWidth onClick={onSubmit}>
        Next
      </Button>
    </Box>
  );
};

export default AccountProfileFields;
