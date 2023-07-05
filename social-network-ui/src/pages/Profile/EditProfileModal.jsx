import { Edit as EditIcon } from '@mui/icons-material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { json, useLoaderData, useRevalidator } from 'react-router-dom';
import * as yup from 'yup';

import axiosIns from '../../axiosInstance';
import Modal from '../../components/UI/Modal';
import { MAX_BIO_LENGTH, MAX_LOCATION_LENGTH, MAX_NAME_LENGTH, MAX_WEBSITE_LENGTH } from '../../util/constants';

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadedBackgroundPicture, setLoadedBackgroundPicture] = useState(data.profileBackgroundImage ?? '');
  const [loadedAvatarPicture, setLoadedAvatarPicture] = useState(data.profileImage ?? '');

  const revalidator = useRevalidator();
  const newBirthDate = new Date(data.birthDate);

  const handleLoadBackgroundPicture = async (e) => {
    const backgroundFile = e.target.files[0];
    const backgroundBlob = new Blob([backgroundFile], { type: 'image/png' });
    const backgroundImage = await convertImageToBase64(backgroundBlob);
    setLoadedBackgroundPicture(backgroundImage);
  };

  const handleLoadAvatarPicture = async (e) => {
    const avatarFile = e.target.files[0];
    const avatarBlob = new Blob([avatarFile], { type: 'image/png' });
    const avatarImage = await convertImageToBase64(avatarBlob);
    setLoadedAvatarPicture(avatarImage);
  };

  const convertImageToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const formik = useFormik({
    initialValues: {
      name: `${data.name}`,
      BIO: `${data.bio}` === 'null' ? '' : `${data.bio}`,
      location: `${data.location}`,
      website: `${data.website}`,
      birthDate: `${newBirthDate}`,
    },
    validationSchema: yup.object({
      name: yup.string().required('Name can`t be null'),
    }),
    onSubmit: async (values) => {
      const formattedDate = new Date(values.birthDate).toISOString();
      try {
        const response = await axiosIns.post('/api/users/p', {
          name: values.name,
          profileImage: loadedAvatarPicture,
          profileBackgroundImage: loadedBackgroundPicture,
          bio: values.BIO,
          location: values.location,
          website: values.website,
          birthDate: formattedDate,
        });
        const { profileImage, profileBackgroundImage } = response.data;

        setOpenEditModal(false);
        setLoadedAvatarPicture(profileImage || '');
        setLoadedBackgroundPicture(profileBackgroundImage || '');
        revalidator.revalidate();

        return response;
      } catch (e) {
        return json({ error: e });
      }
    },
  });

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleInputLength = (maxLength) => {
    return function (e) {
      if (e.target.value.length <= maxLength) {
        formik.handleChange(e);
      }
    };
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
            {!!loadedBackgroundPicture && <BackgroundImage src={loadedBackgroundPicture} />}
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
                <input value="" type="file" hidden onChange={handleLoadBackgroundPicture} />
              </IconButton>
              {!!loadedBackgroundPicture && (
                <IconButton
                  onClick={(e) => {
                    setLoadedBackgroundPicture('');
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
            {!!loadedAvatarPicture && <AvatarImage src={loadedAvatarPicture} />}
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
                <input value="" type="file" hidden onChange={handleLoadAvatarPicture} />
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
            onChange={handleInputLength(MAX_NAME_LENGTH)}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ '.MuiTypography-root': { fontSize: '12px', marginTop: '20px' } }}
                >{`${formik.values.name.length}/${MAX_NAME_LENGTH}`}</InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mb: '20px' }}
            rows={4}
            multiline
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ '.MuiTypography-root': { fontSize: '12px', marginTop: '80px' } }}
                >{`${formik.values.BIO.length}/${MAX_BIO_LENGTH}`}</InputAdornment>
              ),
            }}
            fullWidth
            id="BIO"
            name="BIO"
            label="Bio"
            value={formik.values.BIO}
            onChange={handleInputLength(MAX_BIO_LENGTH)}
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
            value={`${formik.values.location}` === 'null' ? '' : `${formik.values.location}`}
            onChange={handleInputLength(MAX_LOCATION_LENGTH)}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ '.MuiTypography-root': { fontSize: '12px', marginTop: '20px' } }}
                >{`${formik.values.location.length}/${MAX_LOCATION_LENGTH}`}</InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mb: '20px' }}
            fullWidth
            id="website"
            name="website"
            label="Website"
            value={`${formik.values.website}` === 'null' ? '' : `${formik.values.website}`}
            onChange={handleInputLength(MAX_WEBSITE_LENGTH)}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ '.MuiTypography-root': { fontSize: '12px', marginTop: '20px' } }}
                >{`${formik.values.website.length}/${MAX_WEBSITE_LENGTH}`}</InputAdornment>
              ),
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={newBirthDate}
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
            />
          </LocalizationProvider>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileModal;
