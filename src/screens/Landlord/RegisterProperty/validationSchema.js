import * as Yup from 'yup';

export const landlordDetailSchema = Yup.object().shape({
  ownerName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Owner Name must not contain numbers').required('Owner Name is required'),
  fatherName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Father Name must not contain numbers').required('Father Name is required'),
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format XXXXX-XXXXXXX-X')
    .required('CNIC is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  alternateNumber: Yup.string(),
  permenantAddress: Yup.string().required('Permanent Address is required'),
  postalAddress: Yup.string().required('Postal Address is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});


export const landlordPropertySchema = Yup.object().shape({
  propertyAddress: Yup.string().required('Property Address is required'),
  totalFloor: Yup.string().required('Please enter a valid Total Floor'),
});