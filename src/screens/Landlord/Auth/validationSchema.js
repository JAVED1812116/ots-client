import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string().min(2).required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});