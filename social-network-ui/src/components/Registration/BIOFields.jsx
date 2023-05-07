import { Box, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

import Button from '../UI/Button';

const BIOFields = ({ formik }) => {
  return (
    <Box
      sx={{
        maxWidth: '438px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 32 }}>Add your BIO</Typography>
      <TextField
        sx={{ mt: '20px', mb: '20px' }}
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        onBlur={formik.handleBlur}
      />
      <TextField
        sx={{ mb: '20px' }}
        fullWidth
        id="surname"
        name="surname"
        label="Surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
        error={formik.touched.surname && Boolean(formik.errors.surname)}
        helperText={formik.touched.surname && formik.errors.surname}
        onBlur={formik.handleBlur}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={formik.values.birthDate}
          onChange={(newValue) => {
            formik.setFieldValue('birthDate', newValue);
          }}
          disableFuture
          slotProps={{
            textField: {
              error: formik.touched.birthDate && Boolean(formik.errors.birthDate),
              helperText: formik.errors.birthDate,
              onBlur: formik.handleBlur,
            },
          }}
          id="birthDate"
          name="birthDate"
          label="Birthdate"
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
      <Button sx={{ mt: '20px' }} color="primary" variant="contained" fullWidth type="submit">
        Next
      </Button>
    </Box>
  );
};

export default BIOFields;
