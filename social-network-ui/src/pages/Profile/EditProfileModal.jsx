import { Edit as EditIcon } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

import Modal from '../../components/UI/Modal';

// const validationSchema = yup.object({
// name: yup.string().max(50, 'Max'),
// BIO: yup.max(160),
// location: yup.max(30),
// website: yup.max(100),
// birthDate: yup
//   .date('Invalid date')
//   .required('Birthdate is required')
//   .max(maxValidDate, 'Invalid date')
//   .typeError('Invalid date'),
// });

const EditProfileModal = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      BIO: '',
      location: '',
      website: '',
      birthDate: new Date(),
    },
    //   validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpenEditModal(false);
      console.log(values);
    },
  });
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const saveEditInfo = (
    <Button onClick={formik.handleSubmit} variant="contained" sx={{ justifySelf: 'end' }}>
      Save
    </Button>
  );
  const ModalTitle = <Typography sx={{ fontSize: '22px' }}>Edit Profile</Typography>;

  return (
    <>
      <Button
        onClick={handleOpenEditModal}
        variant="outlined"
        startIcon={<EditIcon />}
        sx={{
          textTransform: 'unset',
          backgroundColor: (theme) => theme.palette.background.lightBlue,
          borderRadius: '4px',
          color: (theme) => theme.palette.text.primary,
          '&:hover': {
            backgroundColor: 'rgb(48, 63, 159)',
          },
        }}
      >
        Edit Profile
      </Button>
      <Modal
        headerActions={saveEditInfo}
        open={openEditModal}
        onClose={handleCloseEditModal}
        headerText={ModalTitle}
        sx={{ maxHeight: '650px', height: '100%' }}
      >
        <form onSubmit={formik.handleSubmit}>
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
            id="BIO"
            name="BIO"
            label="Bio"
            value={formik.values.BIO}
            onChange={formik.handleChange}
            error={formik.touched.BIO && Boolean(formik.errors.BIO)}
            helperText={formik.touched.BIO && formik.errors.BIO}
            onBlur={formik.handleBlur}
          />
          <TextField
            sx={{ mb: '20px' }}
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            onBlur={formik.handleBlur}
          />
          <TextField
            sx={{ mb: '20px' }}
            fullWidth
            id="website"
            name="website"
            label="Website"
            value={formik.values.website}
            onChange={formik.handleChange}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
            onBlur={formik.handleBlur}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={formik.values.birthDate}
              // onChange={(newValue) => {
              //   formik.setFieldValue('birthDate', newValue);
              // }}
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
            />
          </LocalizationProvider>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileModal;
