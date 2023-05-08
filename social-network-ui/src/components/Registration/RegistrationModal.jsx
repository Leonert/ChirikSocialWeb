import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

// import axiosIns from '../../axiosInstance';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import AccountProfileFields from './AccountProfileFields';
import BIOFields from './BIOFields';
import ConfirmMail from './ConfirmMail';
import InitialStep from './InitialStep';

const accountProfileValidationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be minimum 8 characters length')
    .required('Password is required'),
  repeatPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be minimum 8 characters length')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  username: yup
    .string('Enter your username')
    .min(4, 'Username should be minimum 4 characters length')
    .required('Username is required'),
});

const maxValidDate = new Date(new Date().getTime() + 1 * 60000);

const BIOValidationSchema = yup.object({
  name: yup.string('Enter your Name').min(3, 'Name should be minimum 3 characters length').required('Name is required'),
  surname: yup
    .string('Enter your Surname')
    .min(3, 'Surname should be minimum 3 characters length')
    .required('Surname is required'),
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
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
      try {
        // const data = {
        //   emailAddress: values.email,
        //   username: values.username,
        //   password: values.password,
        //   firstName: values.name,
        //   lastName: values.surname,
        //   birthDate: values.birthDate,
        // };
        // const response = await axiosIns.post('/api/registration/save-user', data);
      } catch (e) {}
    }
  };

  const handleLastStep = () => {
    setOpen(false);
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
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handlePrevStep = () => {
  //   setActiveStep((prevStep) => prevStep - 1);
  // };

  const steps = [
    <InitialStep key={1} onCreateAccount={handleNextStep} />,
    <AccountProfileFields formik={formik} key={2} onSubmit={handleSubmit.bind(null, formik.values, formik)} />,
    <BIOFields key={3} formik={formik} />,
    <ConfirmMail key={4} onSubmit={handleLastStep} formik={formik} />,
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
