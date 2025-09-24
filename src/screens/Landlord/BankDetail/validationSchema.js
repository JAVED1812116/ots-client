import * as Yup from 'yup';

export const bankDetailSchema = Yup.object().shape({
  bankName: Yup.string().min(2).required('Bank Name is required'),
  accountName: Yup.string().min(2).required('Account Name is required'),
  accountNumber: Yup.string().min(11).max(30).required('Account Number is required'),
  ibanNumber: Yup.string().min(24).required('IBAN Number is required'),
});