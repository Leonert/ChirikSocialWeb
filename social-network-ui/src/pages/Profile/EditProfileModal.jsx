import { Edit as EditIcon } from '@mui/icons-material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Stack, TextField, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// import * as yup from 'yup';
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

const BackgroundImage = styled('img')(({ theme }) => ({
  '&': {
    display: 'block',
    width: '100%',
    objectFit: 'cover',
    height: '193px',
  },
}));

const AvatarImage = styled('img')(({ theme }) => ({
  '&': {
    display: 'block',
    width: '100%',
    objectFit: 'cover',
    height: '120px',
  },
}));

const EditProfileModal = () => {
  const { data } = useLoaderData();
  const formik = useFormik({
    initialValues: {
      name: `${data.name}`,
      BIO: `${data.bio}`,
      location: `${data.location}`,
      website: `${data.website}`,
      // birthDate: `${data.birthDate}`,
    },
    //   validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpenEditModal(false);
      // console.log(values);
    },
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadedBackgroundPicture, setLoadedBackgroundPicture] = useState();
  const [loadedAvatarPicture, setLoadedAvatarPicture] = useState();
  const backgroundBlob = new Blob([loadedBackgroundPicture], { type: 'image/png' });
  const avatarBlob = new Blob([loadedAvatarPicture], { type: 'image/png' });
  // відсилать loadedBackgroundPicture
  // відсилать на бек formData
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
  const ModalTitle = (
    <Typography component="span" sx={{ fontSize: '22px' }}>
      Edit Profile
    </Typography>
  );

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
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="193px"
            sx={{
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
              },
            }}
          >
            {!!loadedBackgroundPicture && <BackgroundImage src={URL.createObjectURL(backgroundBlob)} />}
            <Stack direction="row" position="absolute" gap={1}>
              <IconButton
                component="label"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 1,
                  height: '42px',
                  width: '42px',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <AddAPhotoIcon fontSize="small" />
                <input
                  value=""
                  type="file"
                  hidden
                  onChange={(e) => {
                    setLoadedBackgroundPicture(e.target.files[0]);
                  }}
                />
              </IconButton>
              {!!loadedBackgroundPicture && (
                <IconButton
                  onClick={(e) => {
                    setLoadedBackgroundPicture(null);
                  }}
                  component="label"
                  sx={{
                    zIndex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    height: '42px',
                    width: '42px',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>
          {/* avatar */}
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="120px"
            width="120px"
            marginTop="-9%"
            borderRadius="100%"
            overflow="hidden"
            sx={{
              border: (theme) => `4px solid ${theme.palette.background.paper}`,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundColor: () => (loadedAvatarPicture ? 'rgba(15,22,30, 0.3)' : 'rgba(15,22,30)'),
              },
            }}
          >
            {!!loadedAvatarPicture && <AvatarImage src={URL.createObjectURL(avatarBlob)} />}
            <Stack direction="row" position="absolute">
              <IconButton
                component="label"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: 1,
                  height: '42px',
                  width: '42px',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  },
                }}
              >
                <AddAPhotoIcon fontSize="small" />
                <input
                  value=""
                  type="file"
                  hidden
                  onChange={(e) => {
                    setLoadedAvatarPicture(e.target.files[0]);
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
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
