import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import axiosIns from '../../axiosInstance';
import { handleRegistrationModal } from '../../features/slices/authModalSlice';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import AccountProfileFields from './AccountProfileFields';
import BIOFields from './BIOFields';
import ConfirmMail from './ConfirmMail';
import InitialStep from './InitialStep';

async function emailAsyncValidation(email) {
  const response = await axiosIns.get('/api/registration/email', {
    params: { q: email },
  });

  return response;
}

async function usernameAsyncValidation(username) {
  const response = await axiosIns.get('/api/registration/username', {
    params: { q: username },
  });

  return response;
}

const accountProfileValidationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .min(4, 'Email should be minimum 6 characters length')
    .max(30, 'Email should be maximum 30 characters length')
    .required('Email is required')
    .test('Email already exists', 'Email already exists', async (email) => {
      let isUnique = false;
      try {
        const response = await emailAsyncValidation(email);
        isUnique = response;
      } catch (e) {
        // console.error('Error: ', e.response.status);
      }

      return isUnique;
    }),
  username: yup
    .string('Enter your username')
    .min(4, 'Username should be minimum 4 characters length')
    .max(20, 'Username should be maximum 20 characters length')
    .required('Username is required')
    .test('Username already exists', 'Username already exists', async (username) => {
      let isUnique = false;
      try {
        const response = await usernameAsyncValidation(username);
        isUnique = response;
      } catch (e) {
        // console.error('Error: ', e.response.status);
      }

      return isUnique;
    }),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be minimum 8 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be minimum 8 characters length')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const maxValidDate = new Date(new Date().getTime() + 1 * 60000);

const BIOValidationSchema = yup.object({
  name: yup
    .string('Enter your Name')
    .min(3, 'Name should be minimum 3 characters length')
    .required('Name is required')
    .max(15, 'Name should be maximum 15 characters length'),
  surname: yup
    .string('Enter your Surname')
    .min(3, 'Surname should be minimum 3 characters length')
    .required('Surname is required')
    .max(15, 'Surname should be maximum 15 characters length'),
  birthDate: yup
    .date('Invalid date')
    .required('Birthdate is required')
    .max(maxValidDate, 'Invalid date')
    .typeError('Invalid date'),
});

const validationSchema = (activeStep) => {
  if (activeStep === 1) {
    return accountProfileValidationSchema;
  } else if (activeStep === 2) {
    return BIOValidationSchema;
  }
};

const RegistrationModal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.authModal.registrationModal);
  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (values, formikHelpers) => {
    if (activeStep !== 2) {
      const errors = await formikHelpers.validateForm();
      if (JSON.stringify(errors) !== '{}') {
        formikHelpers.setTouched(errors);
      } else {
        handleNextStep();
      }
    } else {
      handleNextStep();
      const date = formik.values.birthDate;

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const formattedBirthDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      try {
        await axiosIns.post('/api/registration', {
          emailAddress: formik.values.email,
          username: formik.values.username,
          password: formik.values.password,
          name: formik.values.name + ' ' + formik.values.surname,
          birthDate: formattedBirthDate,
        });
      } catch (e) {
        // console.error('Error: ', e.response.status);
      }
    }
  };

  const handleLastStep = () => {
    dispatch(handleRegistrationModal(false));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      username: '',
      name: '',
      surname: '',
      birthDate: new Date(),
    },
    validationSchema: validationSchema(activeStep),
    onSubmit: handleSubmit,
  });

  const handleOpen = () => {
    setActiveStep(0);
    dispatch(handleRegistrationModal(true));
  };
  const handleClose = () => {
    dispatch(handleRegistrationModal(false));
  };

  const steps = [
    <InitialStep key={1} handleClose={handleClose} onCreateAccount={handleNextStep} />,
    <AccountProfileFields formik={formik} key={2} onSubmit={handleSubmit.bind(null, formik.values, formik)} />,
    <BIOFields key={3} formik={formik} />,
    <ConfirmMail key={4} handleClose={handleClose} onSubmit={handleLastStep} formik={formik} />,
  ];

  return (
    <div>
      <Button sx={{ p: '7px  34px', fontSize: '16px' }} onClick={handleOpen}>
        Sign up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        title="Mytitle"
        sx={{ maxHeight: '650px', height: '100%' }}
        headerText={activeStep > 0 && `Step ${activeStep}/${steps.length - 1}`}
      >
        <form onSubmit={formik.handleSubmit}>{steps[activeStep]} </form>
      </Modal>
    </div>
  );
};

export default RegistrationModal;
