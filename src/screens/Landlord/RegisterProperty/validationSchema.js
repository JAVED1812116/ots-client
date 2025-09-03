import * as Yup from 'yup';

export const landlordDetailSchema = Yup.object().shape({
  ownerName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Owner Name must not contain numbers').required('Owner Name is required'),
  fatherName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Father Name must not contain numbers').required('Father Name is required'),
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format XXXXX-XXXXXXX-X')
    .required('CNIC is required'),
  contactNumber: Yup.string().min(10).max(10).required('Contact Number is required'),
  alternateNumber: Yup.string(),
  permenantAddress: Yup.string().required('Permanent Address is required'),
  postalAddress: Yup.string().required('Postal Address is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});


export const landlordPropertySchema = Yup.object().shape({
  propertyAddress: Yup.string().required('Property Address is required'),
totalFloor: Yup.number()
  .transform((val, original) => (original === "" ? undefined : val))
  .typeError("Total Floor must be a number")
  .integer("Total Floor must be an integer")
  .min(1, "Total Floor cannot be 0 and must be at least 1")
  .required("Please enter a valid Total Floor"),
totalFlat: Yup.number()
  .transform((val, original) => (original === "" ? undefined : val))
  .typeError("Total Flat must be a number")
  .integer("Total Flat must be an integer")
  .min(1, "Total Flat cannot be 0 and must be at least 1")
  .required("Please enter a valid Total Flat"),
  // totalFlat: Yup.string()
  // .min(1, 'Total Flat must be at least 1').required('Please enter a valid Total Flat'),
});